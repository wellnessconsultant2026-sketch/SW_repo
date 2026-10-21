import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import ImageCropModal from '../../components/admin/ImageCropModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import styles from './AdminGallery.module.css';
import adminStyles from '../../styles/admin.module.css';

export default function AdminGallery() {
  const { content, saveLanguageContent } = useContent();
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState('en');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Parse and normalize categories from content
  const galleryData = content?.gallery || {};
  const rawCategories = galleryData.categories || [];
  const categories = rawCategories.map((c, idx) => {
    if (typeof c === 'string') {
      const slug = c.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        id: `cat_${slug}`,
        name: c,
        slug,
        description: '',
        order: idx + 1,
        visible: true,
        showOnHomepage: true,
        images: []
      };
    }
    return c;
  });

  // Active selected category for image view
  const [selectedCatId, setSelectedCatId] = useState(() => {
    return categories.length > 0 ? categories[0].id : null;
  });

  // Category creation / edit dialog state
  const [categoryModal, setCategoryModal] = useState({
    isOpen: false,
    isEdit: false,
    catId: null,
    name: '',
    description: '',
    showOnHomepage: true
  });

  const [deleteCatTarget, setDeleteCatTarget] = useState(null);
  const [deleteImageTarget, setDeleteImageTarget] = useState(null);
  const [selectedImageIds, setSelectedImageIds] = useState([]);

  // Image Crop / Studio modal state
  const [cropModal, setCropModal] = useState({
    isOpen: false,
    imageSrc: null,
    filename: '',
    catId: null,
    targetImgId: null // If editing an existing image
  });

  const [uploadingQueue, setUploadingQueue] = useState([]);
  const [imageFieldDrafts, setImageFieldDrafts] = useState({});
  const fileInputRef = useRef(null);

  const activeCategory = categories.find(c => c.id === selectedCatId) || categories[0] || null;

  // -------------------------------------------------------------
  // HELPER: Persist all categories to disk
  // -------------------------------------------------------------
  const persistCategories = async (updatedCategories) => {
    setIsSaving(true);
    try {
      const updatedContent = JSON.parse(JSON.stringify(content));
      if (!updatedContent.gallery) updatedContent.gallery = {};
      updatedContent.gallery.categories = updatedCategories;

      // Also maintain flat items array for backwards compatibility
      const flattenedItems = [];
      updatedCategories.forEach(cat => {
        (cat.images || []).forEach(img => {
          flattenedItems.push({
            id: img.id,
            title: img.title || cat.name,
            category: cat.name,
            categoryId: cat.id,
            image: img.url,
            videoUrl: img.videoUrl || '',
            reflection: img.reflection || '',
            visible: img.visible !== false
          });
        });
      });
      updatedContent.gallery.items = flattenedItems;

      await saveLanguageContent(activeTab, updatedContent, token);
      setStatus({ type: 'success', msg: 'Sanctuary gallery updated & published successfully!' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to persist gallery changes.' });
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------------------------------------------
  // CATEGORY OPERATIONS
  // -------------------------------------------------------------
  const handleOpenCreateCategory = () => {
    setCategoryModal({
      isOpen: true,
      isEdit: false,
      catId: null,
      name: '',
      description: '',
      showOnHomepage: true
    });
  };

  const handleOpenEditCategory = (cat) => {
    setCategoryModal({
      isOpen: true,
      isEdit: true,
      catId: cat.id,
      name: cat.name,
      description: cat.description || '',
      showOnHomepage: cat.showOnHomepage !== false
    });
  };

  const handleSaveCategoryModal = async (e) => {
    e.preventDefault();
    if (!categoryModal.name.trim()) return;

    let updatedList = [...categories];

    if (categoryModal.isEdit) {
      updatedList = updatedList.map(c => {
        if (c.id === categoryModal.catId) {
          return {
            ...c,
            name: categoryModal.name.trim(),
            description: categoryModal.description.trim(),
            showOnHomepage: categoryModal.showOnHomepage
          };
        }
        return c;
      });
    } else {
      const newCat = {
        id: `cat_${Date.now()}`,
        name: categoryModal.name.trim(),
        slug: categoryModal.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: categoryModal.description.trim(),
        order: updatedList.length + 1,
        visible: true,
        showOnHomepage: categoryModal.showOnHomepage,
        images: []
      };
      updatedList.push(newCat);
      setSelectedCatId(newCat.id);
    }

    setCategoryModal({ isOpen: false, isEdit: false, catId: null, name: '', description: '', showOnHomepage: true });
    await persistCategories(updatedList);
  };

  const handleDeleteCategory = async () => {
    if (!deleteCatTarget) return;
    const updatedList = categories.filter(c => c.id !== deleteCatTarget.id);
    setDeleteCatTarget(null);
    if (selectedCatId === deleteCatTarget.id) {
      setSelectedCatId(updatedList.length > 0 ? updatedList[0].id : null);
    }
    await persistCategories(updatedList);
  };

  const handleMoveCategory = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const updated = [...categories];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    await persistCategories(updated);
  };

  // -------------------------------------------------------------
  // IMAGE OPERATIONS & UPLOADS
  // -------------------------------------------------------------
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0 || !activeCategory) return;

    // Pick first file to open directly in Crop/Adjust Studio
    const firstFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({
        isOpen: true,
        imageSrc: reader.result,
        filename: firstFile.name,
        catId: activeCategory.id,
        targetImgId: null
      });
    };
    reader.readAsDataURL(firstFile);

    // Queue remaining files if user selected multiple
    if (files.length > 1) {
      setUploadingQueue(files.slice(1));
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCropSave = async ({ dataUrl, width, height, aspectRatio }) => {
    const { filename, catId, targetImgId } = cropModal;
    setCropModal({ isOpen: false, imageSrc: null, filename: '', catId: null, targetImgId: null });

    try {
      setStatus({ type: 'success', msg: 'Uploading and optimizing image to server...' });

      // Upload through /api/upload
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          filename: filename || `sanctuary_${Date.now()}.webp`,
          base64Data: dataUrl,
          category: 'gallery'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Upload failed');
      }

      const updatedCategories = categories.map(cat => {
        if (cat.id === catId) {
          let updatedImages = [...(cat.images || [])];
          if (targetImgId) {
            // Replace / update existing image URL and dimensions
            updatedImages = updatedImages.map(img => {
              if (img.id === targetImgId) {
                return {
                  ...img,
                  url: data.url,
                  aspectRatio,
                  width,
                  height
                };
              }
              return img;
            });
          } else {
            // Add new image
            const newImg = {
              id: `img_${Date.now()}`,
              url: data.url,
              title: filename ? filename.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') : 'Sanctuary Moment',
              videoUrl: '',
              reflection: 'Stillness unfolds in every conscious breath.',
              order: updatedImages.length + 1,
              visible: true,
              aspectRatio,
              width,
              height
            };
            updatedImages.push(newImg);
          }
          return { ...cat, images: updatedImages };
        }
        return cat;
      });

      await persistCategories(updatedCategories);

      // If more files queued in multi-upload, process next
      if (uploadingQueue.length > 0) {
        const nextFile = uploadingQueue[0];
        setUploadingQueue(prev => prev.slice(1));
        const r = new FileReader();
        r.onload = () => {
          setCropModal({
            isOpen: true,
            imageSrc: r.result,
            filename: nextFile.name,
            catId,
            targetImgId: null
          });
        };
        r.readAsDataURL(nextFile);
      }
    } catch (err) {
      setStatus({ type: 'error', msg: `Upload error: ${err.message}` });
    }
  };

  const handleOpenAdjustExistingImage = (catId, img) => {
    setCropModal({
      isOpen: true,
      imageSrc: img.url,
      filename: `adjusted_${img.id}.webp`,
      catId,
      targetImgId: img.id
    });
  };

  const getImageFieldKey = (catId, imgId, field) => `${catId}:${imgId}:${field}`;

  const handleUpdateImageField = (catId, imgId, field, val) => {
    const key = getImageFieldKey(catId, imgId, field);
    setImageFieldDrafts(prev => ({ ...prev, [key]: val }));
  };

  const handleCommitImageField = async (catId, imgId, field, val) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          images: (cat.images || []).map(img => {
            if (img.id === imgId) {
              return { ...img, [field]: val };
            }
            return img;
          })
        };
      }
      return cat;
    });
    const key = getImageFieldKey(catId, imgId, field);
    setImageFieldDrafts(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    await persistCategories(updatedCategories);
  };

  const handleToggleImageVisibility = (catId, imgId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          images: (cat.images || []).map(img => {
            if (img.id === imgId) {
              return { ...img, visible: img.visible === false ? true : false };
            }
            return img;
          })
        };
      }
      return cat;
    });
    persistCategories(updatedCategories);
  };

  const handleMoveImage = (catId, index, direction) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    const images = [...(cat.images || [])];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const [moved] = images.splice(index, 1);
    images.splice(targetIdx, 0, moved);

    const updatedCategories = categories.map(c => {
      if (c.id === catId) {
        return { ...c, images };
      }
      return c;
    });
    persistCategories(updatedCategories);
  };

  const handleDeleteImage = (catId, imgId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          images: (cat.images || []).filter(img => img.id !== imgId)
        };
      }
      return cat;
    });
    persistCategories(updatedCategories);
  };

  const toggleImageSelection = (imgId) => {
    setSelectedImageIds(prev => prev.includes(imgId)
      ? prev.filter(id => id !== imgId)
      : [...prev, imgId]);
  };

  const handleDeleteSelectedImages = () => {
    if (!activeCategory || selectedImageIds.length === 0) return;
    setDeleteImageTarget({ catId: activeCategory.id, imageIds: selectedImageIds });
  };

  const confirmDeleteImages = async () => {
    if (!deleteImageTarget) return;
    const { catId, imageIds } = deleteImageTarget;
    const updatedCategories = categories.map(cat => cat.id === catId
      ? { ...cat, images: (cat.images || []).filter(img => !imageIds.includes(img.id)) }
      : cat);
    setDeleteImageTarget(null);
    setSelectedImageIds([]);
    await persistCategories(updatedCategories);
  };

  return (
    <div className={styles.container}>
      {/* Header Bar */}
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.pageTitle}>Sanctuary Imagery & Category Studio</h2>
          <p className={styles.pageDesc}>
            Manage all image categories and independent continuous photo loops on the website.
            Zero placeholder images. Every uploaded photo can be cropped, adjusted, and linked to a YouTube video.
          </p>
        </div>

        <button
          type="button"
          className={styles.createCategoryBtn}
          onClick={handleOpenCreateCategory}
        >
          + Create New Category
        </button>
      </div>

      {/* Notice Message */}
      {status.msg && (
        <div className={status.type === 'success' ? adminStyles.noticeSuccess : adminStyles.noticeError}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.msg}
        </div>
      )}

      {/* If No Categories Exist Yet */}
      {categories.length === 0 ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyStateTitle}>No Image Categories Created Yet</h3>
          <p className={styles.emptyStateText}>
            Begin by creating your first image category (e.g. &ldquo;Meditation Sanctuary&rdquo;, &ldquo;Retreats&rdquo;, or &ldquo;Sound & Breath&rdquo;).
            Each category automatically gets its own continuous auto-looping carousel on the Home Page.
          </p>
          <button
            type="button"
            className={styles.createCategoryBtn}
            style={{ marginTop: '1.25rem' }}
            onClick={handleOpenCreateCategory}
          >
            + Create First Category
          </button>
        </div>
      ) : (
        <>
          {/* Category Pill Tabs */}
          <div className={styles.categoryBar}>
            {categories.map((cat, idx) => {
              const isActive = cat.id === (activeCategory?.id);
              const count = (cat.images || []).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ''}`}
                  onClick={() => setSelectedCatId(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className={styles.categoryCount}>{count}</span>
                </button>
              );
            })}
            <button
              type="button"
              className={styles.categoryPill}
              style={{
                borderStyle: 'dashed',
                borderColor: 'var(--gold-accent, #C4A076)',
                color: 'var(--plum-primary, #3B1439)',
                fontWeight: 600,
                background: 'rgba(196, 160, 118, 0.08)'
              }}
              onClick={handleOpenCreateCategory}
            >
              + New Category
            </button>
          </div>

          {/* Active Category Banner & Controls */}
          {activeCategory && (
            <div className={styles.categoryBanner}>
              <div className={styles.categoryInfo}>
                <div className={styles.categoryNameRow}>
                  <h3 className={styles.categoryHeading}>{activeCategory.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                    {(activeCategory.images || []).length} photos
                  </span>
                  {activeCategory.showOnHomepage !== false && (
                    <span style={{ fontSize: '0.7rem', background: 'rgba(40, 167, 69, 0.12)', color: '#1E7E34', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                      ● Active Home Loop
                    </span>
                  )}
                </div>
                {activeCategory.description && (
                  <p className={styles.categoryDesc}>{activeCategory.description}</p>
                )}
              </div>

              <div className={styles.categoryControls}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleOpenEditCategory(activeCategory)}
                  title="Edit Category Name, Description or Homepage Visibility"
                >
                  ✎ Edit Category
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleMoveCategory(categories.findIndex(c => c.id === activeCategory.id), -1)}
                  title="Move Category Earlier in Order"
                >
                  ↑ Move Earlier
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleMoveCategory(categories.findIndex(c => c.id === activeCategory.id), 1)}
                  title="Move Category Later in Order"
                >
                  ↓ Move Later
                </button>
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={() => setDeleteCatTarget(activeCategory)}
                >
                  🗑 Delete Category
                </button>
              </div>
            </div>
          )}

          {/* Multi-Photo Upload Dropzone */}
          {activeCategory && (
            <div
              className={styles.uploadSection}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFilesSelected}
              />
              <span className={styles.uploadIcon}>📷</span>
              <h4 className={styles.uploadTitle}>+ Upload Photos to &ldquo;{activeCategory.name}&rdquo;</h4>
              <p className={styles.uploadHint}>
                Click to select one or multiple images (JPEG, PNG, WebP).
                Every photo automatically opens in the live <strong>Crop, Resize & Adjustment Studio</strong> before publishing.
              </p>
            </div>
          )}

          {/* Image Collection Grid */}
          {activeCategory && (
            <div>
              {selectedImageIds.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={handleDeleteSelectedImages}
                  >
                    Delete {selectedImageIds.length} selected photo{selectedImageIds.length === 1 ? '' : 's'}
                  </button>
                </div>
              )}
              {(!activeCategory.images || activeCategory.images.length === 0) ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No photos uploaded to &ldquo;{activeCategory.name}&rdquo; yet. Use the upload area above to add moments.
                </div>
              ) : (
                <div className={styles.imagesGrid}>
                  {activeCategory.images.map((img, idx) => (
                    <div key={img.id} className={styles.imageCard}>
                      <div className={styles.imageThumbWrap}>
                        <img src={img.url} alt={img.title || 'Sanctuary'} className={styles.imageThumb} />
                        <span className={styles.orderBadge}>#{idx + 1}</span>
                        {img.videoUrl && (
                          <span style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(204, 0, 0, 0.92)',
                            color: '#FFFFFF',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                            zIndex: 2
                          }}>
                            ▶ Video
                          </span>
                        )}
                        <input
                          type="checkbox"
                          checked={selectedImageIds.includes(img.id)}
                          onChange={() => toggleImageSelection(img.id)}
                          aria-label={`Select ${img.title || 'photo'}`}
                          style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', width: '18px', height: '18px' }}
                        />
                      </div>

                      <div className={styles.imageActionsBar}>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button
                            type="button"
                            className={styles.btnSecondary}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
                            onClick={() => handleMoveImage(activeCategory.id, idx, -1)}
                            disabled={idx === 0}
                            title="Move left"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            className={styles.btnSecondary}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
                            onClick={() => handleMoveImage(activeCategory.id, idx, 1)}
                            disabled={idx === activeCategory.images.length - 1}
                            title="Move right"
                          >
                            →
                          </button>
                        </div>

                        <button
                          type="button"
                          className={styles.btnSecondary}
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', color: 'var(--gold-dark)', fontWeight: 600 }}
                          onClick={() => handleOpenAdjustExistingImage(activeCategory.id, img)}
                        >
                          ✂ Crop / Adjust
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleImageVisibility(activeCategory.id, img.id)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.72rem',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: img.visible !== false ? 'rgba(40, 167, 69, 0.15)' : 'rgba(108, 117, 125, 0.15)',
                            color: img.visible !== false ? '#1E7E34' : '#6C757D'
                          }}
                        >
                          {img.visible !== false ? '● Visible' : '○ Hidden'}
                        </button>

                        <button
                          type="button"
                          className={styles.btnDanger}
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
                          onClick={() => setDeleteImageTarget({ catId: activeCategory.id, imageIds: [img.id] })}
                          title="Delete photo"
                        >
                          ✕
                        </button>
                      </div>

                      <div className={styles.imageCardBody}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                            Photo Title
                          </label>
                          <input
                            type="text"
                            className={styles.inputField}
                            value={imageFieldDrafts[getImageFieldKey(activeCategory.id, img.id, 'title')] ?? (img.title || '')}
                            onChange={(e) => handleUpdateImageField(activeCategory.id, img.id, 'title', e.target.value)}
                            onBlur={(e) => handleCommitImageField(activeCategory.id, img.id, 'title', e.target.value)}
                            placeholder="e.g. Morning Meditation"
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#C4302B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>▶ YouTube Video Link</span>
                            </label>
                            {(imageFieldDrafts[getImageFieldKey(activeCategory.id, img.id, 'videoUrl')] ?? img.videoUrl) && (
                              <a
                                href={imageFieldDrafts[getImageFieldKey(activeCategory.id, img.id, 'videoUrl')] ?? img.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '0.68rem', color: '#C4302B', textDecoration: 'underline', fontWeight: 600 }}
                                title="Open video in new tab"
                              >
                                Test Link ↗
                              </a>
                            )}
                          </div>
                          <input
                            type="url"
                            className={styles.inputField}
                            style={{ borderColor: (img.videoUrl ? 'rgba(196, 48, 43, 0.45)' : undefined) }}
                            value={imageFieldDrafts[getImageFieldKey(activeCategory.id, img.id, 'videoUrl')] ?? (img.videoUrl || '')}
                            onChange={(e) => handleUpdateImageField(activeCategory.id, img.id, 'videoUrl', e.target.value)}
                            onBlur={(e) => handleCommitImageField(activeCategory.id, img.id, 'videoUrl', e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                            Reflection / Quote
                          </label>
                          <textarea
                            className={styles.textareaField}
                            value={imageFieldDrafts[getImageFieldKey(activeCategory.id, img.id, 'reflection')] ?? (img.reflection || '')}
                            onChange={(e) => handleUpdateImageField(activeCategory.id, img.id, 'reflection', e.target.value)}
                            onBlur={(e) => handleCommitImageField(activeCategory.id, img.id, 'reflection', e.target.value)}
                            placeholder="Add an inspiring reflection..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Category Creation / Editing Modal */}
      {categoryModal.isOpen && (
        <div className={styles.modalBackdrop} onClick={() => setCategoryModal(prev => ({ ...prev, isOpen: false }))}>
          <div className={styles.dialogBox} onClick={e => e.stopPropagation()}>
            <h3 className={styles.dialogTitle}>
              {categoryModal.isEdit ? 'Edit Category' : 'Create New Image Category'}
            </h3>

            <form onSubmit={handleSaveCategoryModal} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={categoryModal.name}
                  onChange={e => setCategoryModal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Meditation Retreats"
                  className={styles.inputField}
                  style={{ fontSize: '0.9rem', padding: '0.6rem 0.8rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Category Description (Optional)
                </label>
                <textarea
                  value={categoryModal.description}
                  onChange={e => setCategoryModal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g. Immersive residential retreats cultivating deep silence and peaceful calm."
                  className={styles.textareaField}
                  style={{ minHeight: '70px', fontStyle: 'normal' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="checkbox"
                  id="showHomepageLoop"
                  checked={categoryModal.showOnHomepage}
                  onChange={e => setCategoryModal(prev => ({ ...prev, showOnHomepage: e.target.checked }))}
                />
                <label htmlFor="showHomepageLoop" style={{ fontSize: '0.84rem', cursor: 'pointer' }}>
                  Display an independent auto-loop for this category on the Home Page
                </label>
              </div>

              <div className={styles.dialogActions} style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setCategoryModal(prev => ({ ...prev, isOpen: false }))}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.createCategoryBtn}
                  disabled={isSaving}
                >
                  {categoryModal.isEdit ? 'Save Changes ✓' : 'Create Category ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Dialog */}
      {deleteCatTarget && (
        <div className={styles.modalBackdrop} onClick={() => setDeleteCatTarget(null)}>
          <div className={styles.dialogBox} onClick={e => e.stopPropagation()}>
            <h3 className={styles.dialogTitle}>Confirm Category Deletion</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              Are you sure you want to delete the category <strong>&ldquo;{deleteCatTarget.name}&rdquo;</strong> and all of its {deleteCatTarget.images?.length || 0} associated photos?
              This will remove its independent loop from the website.
            </p>
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setDeleteCatTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.btnDanger}
                onClick={handleDeleteCategory}
              >
                Delete Category & Photos
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteImageTarget)}
        title={deleteImageTarget?.imageIds.length > 1 ? 'Delete selected photos?' : 'Delete this photo?'}
        message={deleteImageTarget?.imageIds.length > 1
          ? `This will permanently remove ${deleteImageTarget.imageIds.length} photos from the gallery.`
          : 'This photo will be permanently removed from the gallery.'}
        confirmLabel="Delete permanently"
        onCancel={() => setDeleteImageTarget(null)}
        onConfirm={confirmDeleteImages}
      />

      {/* Image Cropper, Resizer & Visual Adjustment Studio */}
      <ImageCropModal
        isOpen={cropModal.isOpen}
        imageSrc={cropModal.imageSrc}
        title={cropModal.filename}
        onClose={() => setCropModal({ isOpen: false, imageSrc: null, filename: '', catId: null, targetImgId: null })}
        onSave={handleCropSave}
      />
    </div>
  );
}
