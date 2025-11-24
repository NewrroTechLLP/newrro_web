import './globals.css';
import type { Metadata } from 'next';
import { Nunito, Source_Sans_3 } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const nunito = Nunito({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans' });

export const metadata: Metadata = {
  title: 'NEWRRO',
  description: 'Explore the latest in robotics technology at NEWRRO, a hub for innovation and revolutionary robotics research. Discover AI-powered robotics and cutting-edge tech.',
  keywords: 'Robotics, AI, Technology, Innovation, Robotics Lab, NEWRRO, Revolutionary Robotics, Robotics Research, AI-powered Robotics, Robotics Startup India',
  authors: [{ name: 'NEWRRO Team' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'NEWRRO - Tech New Revolutionary Robotics Lab',
    description: 'Explore the latest in robotics technology at NEWRRO, a hub for innovation and revolutionary robotics research. Discover AI-powered robotics and cutting-edge tech.',
    type: 'website',
    url: 'https://www.newrro.in',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'NEWRRO Robotics Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEWRRO - Tech New Revolutionary Robotics Lab',
    description: 'Explore the latest in robotics technology at NEWRRO, a hub for innovation and revolutionary robotics research. Discover AI-powered robotics and cutting-edge tech.',
    site: '@newrro',
    creator: '@newrro',
    images: ['/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sourceSans.variable}`}>
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://www.newrro.in/" />

        {/* SEO Meta Tags */}
        <meta name="description" content="Explore the latest in robotics technology at NEWRRO, a hub for innovation and revolutionary robotics research. Discover AI-powered robotics and cutting-edge tech." />
        <meta name="keywords" content="Robotics, AI, Technology, Innovation, Robotics Lab, NEWRRO, Revolutionary Robotics, Robotics Research, AI-powered Robotics, Robotics Startup India" />
        <meta name="author" content="NEWRRO Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="NEWRRO - Tech New Revolutionary Robotics Lab" />
        <meta property="og:description" content="Explore the latest in robotics technology at NEWRRO, a hub for innovation and revolutionary robotics research. Discover AI-powered robotics and cutting-edge tech." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.newrro.in" />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NEWRRO - Tech New Revolutionary Robotics Lab" />
        <meta name="twitter:description" content="Explore the latest in robotics technology at NEWRRO, a hub for innovation and revolutionary robotics research. Discover AI-powered robotics and cutting-edge tech." />
        <meta name="twitter:site" content="@newrro" />
        <meta name="twitter:creator" content="@newrro" />
        <meta name="twitter:image" content="/logo.jpg" />

        {/* Structured Data for SEO (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NEWRRO",
              "url": "https://www.newrro.in",
              "logo": "https://www.newrro.in/logo.jpg",
              "sameAs": [
                "https://www.linkedin.com/company/newrro/?originalSubdomain=in",
                "https://www.instagram.com/newrro_tech?igsh=MXA3dGJkazhlMjVucw%3D%3D"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1234567890",
                "contactType": "Customer Support",
                "areaServed": "IN",
                "availableLanguage": "English"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.newrro.in"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About Us",
                    "item": "https://www.newrro.in/about"
                  }
                ]
              }
            }
          `}
        </script>
      </head>
      <body className={nunito.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
