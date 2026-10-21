import Providers from '@/components/common/Providers';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ru' },
    { lang: 'ro' },
    { lang: 'fr' },
    { lang: 'de' },
    { lang: 'it' },
    { lang: 'es' }
  ];
}

export default async function LangLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  return (
    <Providers initialLang={lang}>
      {children}
    </Providers>
  );
}
