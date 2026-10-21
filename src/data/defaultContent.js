import en from '../../content/en.json';
import ru from '../../content/ru.json';
import ro from '../../content/ro.json';
import fr from '../../content/fr.json';
import de from '../../content/de.json';
import it from '../../content/it.json';
import es from '../../content/es.json';

export const defaultContentBundle = {
  en,
  ru,
  ro,
  fr,
  de,
  it,
  es
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' }
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguageMetadata(code) {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
}
