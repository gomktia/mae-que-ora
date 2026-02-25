import '@/styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { FontSizeProvider } from '@/components/FontSizeSelector';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Small timeout to ensure the external script has parsed
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('track', 'PageView');
        }
      }, 100);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <FontSizeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mãe que Ora</title>
      </Head>



      <div className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </FontSizeProvider>
  );
}
