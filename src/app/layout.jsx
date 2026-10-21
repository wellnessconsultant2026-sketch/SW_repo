import '@/styles/tokens.css';
import '@/styles/reset.css';
import '@/styles/global.css';

export const metadata = {
  metadataBase: new URL('https://drmayankahooja.com'),
  title: {
    default: 'Dr. Mayank Ahooja | Doctor of Medicine & Meditation Master',
    template: '%s | Dr. Mayank Ahooja'
  },
  description: 'Doctor of Medicine, Meditation Master, Spiritual Coach, and Motivational Speaker. Personalized wellness, stress management, chakra and energy practices.',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ru': '/ru',
      'ro': '/ro',
      'fr': '/fr',
      'de': '/de',
      'x-default': '/en'
    }
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='30' fill='%23C8954A'/%3E%3C/svg%3E"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
