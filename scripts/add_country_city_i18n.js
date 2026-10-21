import fs from 'fs';
import path from 'path';

const i18nData = {
  en: {
    countrySelect: "Select Country",
    citySelect: "Select City",
    selectCountryFirst: "Select country first",
    cityOther: "Other / Type city manually...",
    optgroupPopular: "Popular / Regional",
    optgroupAllCountries: "All Countries (A-Z)"
  },
  de: {
    countrySelect: "Land auswählen",
    citySelect: "Stadt auswählen",
    selectCountryFirst: "Zuerst Land auswählen",
    cityOther: "Andere / Stadt eingeben...",
    optgroupPopular: "Beliebt / Regional",
    optgroupAllCountries: "Alle Länder (A-Z)"
  },
  fr: {
    countrySelect: "Sélectionnez le pays",
    citySelect: "Sélectionnez la ville",
    selectCountryFirst: "Sélectionnez d'abord le pays",
    cityOther: "Autre / Saisir la ville...",
    optgroupPopular: "Populaire / Régional",
    optgroupAllCountries: "Tous les pays (A-Z)"
  },
  ro: {
    countrySelect: "Selectați țara",
    citySelect: "Selectați orașul",
    selectCountryFirst: "Selectați țara mai întâi",
    cityOther: "Altul / Introduceți orașul...",
    optgroupPopular: "Populare / Regionale",
    optgroupAllCountries: "Toate țările (A-Z)"
  },
  ru: {
    countrySelect: "Выберите страну",
    citySelect: "Выберите город",
    selectCountryFirst: "Сначала выберите страну",
    cityOther: "Другой / Ввести город...",
    optgroupPopular: "Популярные / Региональные",
    optgroupAllCountries: "Все страны (А-Я)"
  },
  it: {
    countrySelect: "Seleziona Paese",
    citySelect: "Seleziona città",
    selectCountryFirst: "Prima seleziona il paese",
    cityOther: "Altro / Inserisci città...",
    optgroupPopular: "Popolari / Regionali",
    optgroupAllCountries: "Tutti i paesi (A-Z)"
  },
  es: {
    countrySelect: "Seleccionar país",
    citySelect: "Seleccionar ciudad",
    selectCountryFirst: "Primero seleccione el país",
    cityOther: "Otro / Escribir ciudad...",
    optgroupPopular: "Populares / Regionales",
    optgroupAllCountries: "Todos los países (A-Z)"
  }
};

for (const [lang, keys] of Object.entries(i18nData)) {
  const filePath = path.resolve(`content/${lang}.json`);
  if (!fs.existsSync(filePath)) continue;
  
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (content.modal) {
    Object.assign(content.modal, keys);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`Updated content/${lang}.json`);
  }
}
