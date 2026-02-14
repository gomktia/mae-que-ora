import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import BotaoCheckout from '@/components/BotaoCheckout';
import PrecoAncorado from '@/components/PrecoAncorado';

const HEADLINES = {
  afastamento: 'Seu filho se afastou... mas Deus não desistiu dele',
  rebeldia: 'A rebeldia do seu filho tem uma raiz... e a oração pode alcançá-la',
  protecao: 'Blindar seu filho com oração é o maior ato de amor',
  diagnostico: 'Seu diagnóstico está pronto. O que descobrimos vai te surpreender...',
};

const DELAY_SECONDS = 130;

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-lg">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60" />
    </div>
  );
}

export default function VslPage() {
  const router = useRouter();
  const { dor } = router.query;
  const [mostrarOferta, setMostrarOferta] = useState(false);

  const headline = HEADLINES[dor] || HEADLINES.protecao;

  useEffect(() => {
    if (!dor) return;

    let intervalId;
    let backupTimeoutId;

    // Backup timeout: delay + 10s in case player fails
    backupTimeoutId = setTimeout(() => {
      setMostrarOferta(true);
    }, (DELAY_SECONDS + 10) * 1000);

    // Poll Vturb player every second
    intervalId = setInterval(() => {
      try {
        const smartplayer = document.getElementById('vid-6976875aa19ff9c17f8fb644');
        if (smartplayer && typeof smartplayer.getPlayedTime === 'function') {
          const played = smartplayer.getPlayedTime();
          if (played >= DELAY_SECONDS) {
            setMostrarOferta(true);
            clearInterval(intervalId);
            clearTimeout(backupTimeoutId);
          }
        }
      } catch (e) {
        // Player not ready yet
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(backupTimeoutId);
    };
  }, [dor]);

  return (
    <>
      <Head>
        <title>Mãe que Ora — A Revelação</title>
        <meta name="description" content="Descubra como a oração pode transformar a vida do seu filho." />
      </Head>

      <Script
        src="https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/6976875aa19ff9c17f8fb644/v4/player.js"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-snow flex flex-col">
        {/* Header */}
        <header className="bg-navy py-4">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que Ora
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-b from-navy to-navy-light py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <span className="inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Uma mensagem para você, mãe
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-5">
              {headline}
            </h1>
          </div>
        </section>

        {/* Video */}
        <section className="bg-snow py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-gold/40 rounded-2xl overflow-hidden shadow-xl">
              <div
                id="vid-6976875aa19ff9c17f8fb644"
                style={{ position: 'relative', width: '100%', padding: '56.25% 0 0 0' }}
              />
            </div>

            <p className="text-center font-[family-name:var(--font-inter)] text-navy/50 text-sm mt-4">
              🔊 Verifique se o som está ligado
            </p>
          </div>
        </section>

        {/* Offer — revealed after delay */}
        {mostrarOferta && (
          <section className="bg-snow px-4 pb-16 animate-fade-in-up">
            <div className="max-w-2xl mx-auto">
              <GoldDivider />

              <PrecoAncorado />

              <div className="mt-8 text-center">
                <BotaoCheckout />
              </div>

              {/* Garantia */}
              <div className="mt-10 text-center">
                <img
                  src="/assets/garantia-7-dias.webp"
                  alt="Garantia de 7 dias"
                  className="w-28 h-auto mx-auto mb-3"
                />
                <p className="font-[family-name:var(--font-inter)] text-navy/60 text-sm max-w-sm mx-auto leading-relaxed">
                  Você tem <strong className="text-navy">7 dias de garantia</strong> incondicional.
                  Se não ficar satisfeita, devolvemos 100% do seu investimento.
                </p>
              </div>

              <GoldDivider />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-navy py-6 px-4 text-center mt-auto">
          <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">
            © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
