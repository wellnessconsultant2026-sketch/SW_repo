import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ImageCropModal.module.css';

const ASPECT_RATIOS = [
  { label: '4:3 Sanctuary', value: '4:3', ratio: 4 / 3 },
  { label: '16:9 Cinema', value: '16:9', ratio: 16 / 9 },
  { label: '1:1 Square', value: '1:1', ratio: 1 },
  { label: '3:4 Portrait', value: '3:4', ratio: 3 / 4 },
  { label: 'Free Aspect', value: 'free', ratio: null }
];

export default function ImageCropModal({
  isOpen,
  imageSrc,
  title = 'Sanctuary Photo',
  onClose,
  onSave
}) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [aspect, setAspect] = useState('4:3');
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  // Visual adjustments
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  // Load image object
  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImgLoaded(true);
      // Reset position & zoom
      setZoom(1.0);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      setBrightness(0);
      setContrast(0);
      setSaturation(0);
    };
    img.src = imageSrc;
  }, [isOpen, imageSrc]);

  // Compute preview viewport size
  const getViewportDimensions = useCallback(() => {
    const maxWidth = 520;
    const maxHeight = 390;

    const currentAspectObj = ASPECT_RATIOS.find(a => a.value === aspect);
    let targetRatio = currentAspectObj?.ratio;

    if (!targetRatio && imgRef.current) {
      targetRatio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
    }
    targetRatio = targetRatio || (4 / 3);

    let w = maxWidth;
    let h = w / targetRatio;

    if (h > maxHeight) {
      h = maxHeight;
      w = h * targetRatio;
    }

    return { width: Math.round(w), height: Math.round(h) };
  }, [aspect]);

  // Draw onto the interactive canvas
  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imgLoaded) return;

    const ctx = canvas.getContext('2d');
    const { width: viewW, height: viewH } = getViewportDimensions();

    canvas.width = viewW;
    canvas.height = viewH;

    ctx.clearRect(0, 0, viewW, viewH);

    // Apply color adjustments filter
    ctx.save();
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) saturate(${100 + saturation}%)`;

    // Calculate base fit scale (contain or cover)
    const isRotatedSideways = rotation % 180 !== 0;
    const effImgW = isRotatedSideways ? img.naturalHeight : img.naturalWidth;
    const effImgH = isRotatedSideways ? img.naturalWidth : img.naturalHeight;

    const scaleCover = Math.max(viewW / effImgW, viewH / effImgH);
    const finalScale = scaleCover * zoom;

    // Transform coordinate system
    ctx.translate(viewW / 2 + pan.x, viewH / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(finalScale, finalScale);

    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();

    // Draw Rule of Thirds Guide Lines
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Horizontal thirds
    ctx.beginPath();
    ctx.moveTo(0, viewH / 3);
    ctx.lineTo(viewW, viewH / 3);
    ctx.moveTo(0, (viewH * 2) / 3);
    ctx.lineTo(viewW, (viewH * 2) / 3);

    // Vertical thirds
    ctx.moveTo(viewW / 3, 0);
    ctx.lineTo(viewW / 3, viewH);
    ctx.moveTo((viewW * 2) / 3, 0);
    ctx.lineTo((viewW * 2) / 3, viewH);
    ctx.stroke();
    ctx.restore();
  }, [getViewportDimensions, imgLoaded, zoom, rotation, pan, brightness, contrast, saturation]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  if (!isOpen) return null;

  // Mouse & Touch Pan Handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1.0);
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
  };

  // Generate high-resolution optimized WebP export
  const handleApply = () => {
    const img = imgRef.current;
    if (!img) return;

    const currentAspectObj = ASPECT_RATIOS.find(a => a.value === aspect);
    let targetRatio = currentAspectObj?.ratio;
    if (!targetRatio) {
      targetRatio = img.naturalWidth / img.naturalHeight;
    }

    // High quality export size constraint
    const maxExportDim = 1600;
    let exportW = maxExportDim;
    let exportH = Math.round(exportW / targetRatio);

    if (exportH > maxExportDim) {
      exportH = maxExportDim;
      exportW = Math.round(exportH * targetRatio);
    }

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportW;
    exportCanvas.height = exportH;
    const ctx = exportCanvas.getContext('2d');

    ctx.save();
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) saturate(${100 + saturation}%)`;

    const { width: viewW, height: viewH } = getViewportDimensions();
    const scaleRatio = exportW / viewW;

    const isRotatedSideways = rotation % 180 !== 0;
    const effImgW = isRotatedSideways ? img.naturalHeight : img.naturalWidth;
    const effImgH = isRotatedSideways ? img.naturalWidth : img.naturalHeight;

    const scaleCover = Math.max(exportW / effImgW, exportH / effImgH);
    const finalScale = scaleCover * zoom;

    ctx.translate(exportW / 2 + pan.x * scaleRatio, exportH / 2 + pan.y * scaleRatio);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(finalScale, finalScale);

    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();

    // Export as optimized WebP (or JPEG fallback) with 0.88 quality compression
    let dataUrl;
    try {
      dataUrl = exportCanvas.toDataURL('image/webp', 0.88);
      if (!dataUrl.startsWith('data:image/webp')) {
        dataUrl = exportCanvas.toDataURL('image/jpeg', 0.88);
      }
    } catch (e) {
      dataUrl = exportCanvas.toDataURL('image/jpeg', 0.88);
    }

    onSave({
      dataUrl,
      width: exportW,
      height: exportH,
      aspectRatio: aspect
    });
  };

  const { width: canvasW, height: canvasH } = getViewportDimensions();

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h3 className={styles.title}>Crop & Adjust Sanctuary Photo</h3>
            <span className={styles.subtitleBadge}>Live Studio</span>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        {/* Body Studio */}
        <div className={styles.body}>
          {/* Interactive Canvas */}
          <div className={styles.canvasArea}>
            <div
              className={styles.canvasContainer}
              style={{ width: `${canvasW}px`, height: `${canvasH}px` }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <canvas ref={canvasRef} className={styles.canvas} />
            </div>
            <div className={styles.dragHint}>
              <span>Click & drag to reposition · Sliders to adjust</span>
            </div>
          </div>

          {/* Controls Column */}
          <div className={styles.controls}>
            {/* Aspect Ratio Presets */}
            <div className={styles.controlSection}>
              <label className={styles.controlLabel}>Aspect Framing</label>
              <div className={styles.aspectRatios}>
                {ASPECT_RATIOS.map(a => (
                  <button
                    key={a.value}
                    type="button"
                    className={`${styles.aspectBtn} ${aspect === a.value ? styles.aspectBtnActive : ''}`}
                    onClick={() => setAspect(a.value)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Zoom / Scale */}
            <div className={styles.controlSection}>
              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Zoom / Scale</span>
                  <span className={styles.sliderVal}>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.05"
                  value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  className={styles.slider}
                />
              </div>
            </div>

            {/* Orientation & Quick Tools */}
            <div className={styles.controlSection}>
              <label className={styles.controlLabel}>Orientation</label>
              <div className={styles.toolButtons}>
                <button type="button" className={styles.toolBtn} onClick={handleRotate}>
                  <span>↻</span> Rotate 90°
                </button>
              </div>
            </div>

            {/* Visual Adjustments */}
            <div className={styles.controlSection}>
              <label className={styles.controlLabel}>Visual Balance</label>

              {/* Brightness */}
              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Brightness</span>
                  <span className={styles.sliderVal}>{brightness > 0 ? `+${brightness}` : brightness}</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={brightness}
                  onChange={e => setBrightness(parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
              </div>

              {/* Contrast */}
              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Contrast</span>
                  <span className={styles.sliderVal}>{contrast > 0 ? `+${contrast}` : contrast}</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={contrast}
                  onChange={e => setContrast(parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
              </div>

              {/* Saturation */}
              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Saturation</span>
                  <span className={styles.sliderVal}>{saturation > 0 ? `+${saturation}` : saturation}</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={saturation}
                  onChange={e => setSaturation(parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
              </div>
            </div>

            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              ↺ Reset to Original
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.infoBadge}>
            Original: {imgDimensions.width} &times; {imgDimensions.height}px · WebP Optimized
          </div>
          <div className={styles.footerActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="button" className={styles.saveBtn} onClick={handleApply}>
              Apply & Optimize ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
