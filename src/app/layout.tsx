import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';
import './globals.css';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kamil-portfolio.vercel.app'),
  title: `${PORTFOLIO_DATA.name} | Full Stack Developer & Next.js Specialist`,
  description: `${PORTFOLIO_DATA.name} is a Full Stack Developer specializing in Next.js, React, Node.js, Express, and MongoDB. View production projects, interactive terminal, and technical skill radar.`,
  keywords: [
    'Mohammad Kamil Akhtar',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Next.js Engineer',
    'React Developer',
    'Node.js Developer',
    'Jamshedpur Software Engineer',
    'Web Developer India'
  ],
  authors: [{ name: PORTFOLIO_DATA.name, url: 'https://kamil-portfolio.vercel.app' }],
  creator: PORTFOLIO_DATA.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kamil-portfolio.vercel.app',
    title: `${PORTFOLIO_DATA.name} — Full Stack & Next.js Engineer`,
    description: PORTFOLIO_DATA.tagline,
    siteName: `${PORTFOLIO_DATA.name} Portfolio`,
    images: [
      {
        url: '/assets/projects/profile.jpeg',
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_DATA.name} - Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PORTFOLIO_DATA.name} | Full Stack Engineer`,
    description: PORTFOLIO_DATA.tagline,
    images: ['/assets/projects/profile.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PORTFOLIO_DATA.name,
    jobTitle: 'Full Stack Developer',
    description: PORTFOLIO_DATA.tagline,
    email: PORTFOLIO_DATA.email,
    telephone: PORTFOLIO_DATA.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jamshedpur',
      addressRegion: 'Jharkhand',
      addressCountry: 'India',
    },
    sameAs: [
      PORTFOLIO_DATA.social.LinkedIn,
      PORTFOLIO_DATA.social.GitHub,
    ],
    knowsAbout: [
      'Next.js',
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'TypeScript',
      'REST APIs',
      'Full Stack Web Development'
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans bg-[#080b11] text-slate-100 antialiased min-h-screen relative selection:bg-emerald-500/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
