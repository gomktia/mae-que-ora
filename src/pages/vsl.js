import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

const VIDEO_IDS = {
  s10: '6976875aa19ff9c17f8fb644', // Main VSL (Relacionamento)
  s12: '695c31ac19650840e5c003e0', // Protection/Other VSL
  default: '6976875aa19ff9c17f8fb644',
};

const HEADLINES = {
  afastamento: 'Seu filho se afastou... mas Deus não desistiu dele',
  rebeldia: 'A rebeldia do seu filho tem uma raiz... e a oração pode alcançá-la',
  protecao: 'Blindar seu filho com oração é o maior ato de amor',
  diagnostico: 'Seu diagnóstico está pronto. O que descobrimos vai te surpreender...',
};

const DELAY_SECONDS = 130;

function CtaButton({ text = "QUERO ACESSAR O DEVOCIONAL", className = "" }) {
  return (
    <div className={`text-center py-8 px-4 ${className}`}>
      <a
        href="https://pay.kiwify.com.br/C10XqRz"
        target="_blank"
        className="inline-block bg-bronze text-white
                   font-[family-name:var(--font-inter)] font-black text-lg sm:text-xl md:text-2xl
                   py-5 px-10 sm:px-14 md:px-20 rounded-2xl
                   shadow-[0_15px_35px_-10px_rgba(163,120,56,0.5)]
                   animate-pulse-gentle hover:scale-[1.03] hover:shadow-[0_20px_45px_-10px_rgba(163,120,56,0.6)]
                   active:scale-95 transition-all duration-300 cursor-pointer uppercase tracking-tighter"
      >
        {text}
      </a>
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-12">
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-bronze opacity-30" />
      <span className="text-bronze text-3xl filter drop-shadow-[0_0_10px_rgba(163,120,56,0.3)]">✦</span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-bronze opacity-30" />
    </div>
  );
}

function GuaranteeSeal() {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/assets/landingpage/selo-garantia.png"
          alt="Garantia de 7 Dias"
          layout="fill"
          objectFit="contain"
          priority
          unoptimized
        />
      </div>
      <p className="font-[family-name:var(--font-inter)] text-brown/90 text-[16px] text-center max-w-sm leading-relaxed tracking-wide">
        Você tem <strong className="text-bronze">7 dias de garantia incondicional</strong>.
        <br />Se não amar, devolvemos 100% do seu dinheiro.
      </p>
    </div>
  );
}

function TestimonialCard({ src, index }) {
  return (
    <div className="group w-full rounded-2xl overflow-hidden shadow-xl border border-bronze/10 bg-white
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-bronze/10 hover:-translate-y-2 hover:border-bronze/30">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-sand/20">
        <Image
          src={src}
          alt={`Depoimento ${index + 1}`}
          layout="fill"
          objectFit="contain"
          loading="lazy"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );
}

function BonusCard({ title, items, subtitle }) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-bronze/20 rounded-3xl px-8 py-8 shadow-sm
                    transition-all duration-500 ease-out cursor-default
                    hover:shadow-2xl hover:shadow-bronze/15 hover:border-bronze/50 hover:-translate-y-2">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative w-16 h-16 flex items-center justify-center bg-sand rounded-2xl group-hover:bg-bronze transition-colors duration-500">
          <span className="text-4xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:filter group-hover:invert">
            🎁
          </span>
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-brown text-xl sm:text-2xl font-black leading-tight mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="font-[family-name:var(--font-inter)] text-bronze font-black text-xs uppercase tracking-[0.2em] mb-4">
              {subtitle}
            </p>
          )}
          <ul className="space-y-2 mt-4">
            {items.map((item, i) => (
              <li key={i} className="font-[family-name:var(--font-inter)] text-brown/70 text-sm sm:text-base leading-snug">
                <span className="text-bronze mr-2">✦</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DeliverableCard({ title, description, image, icon }) {
  return (
    <div className="group bg-white border border-bronze/10 rounded-3xl overflow-hidden shadow-xl
                    transition-all duration-500 ease-out h-full flex flex-col
                    hover:shadow-3xl hover:shadow-bronze/10 hover:-translate-y-3 hover:border-bronze/30">
      {image ? (
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ) : (
        <div className="w-full aspect-[4/5] bg-sand/30 flex items-center justify-center text-6xl">
          <span className="transition-transform duration-500 group-hover:scale-125">{icon}</span>
        </div>
      )}
      <div className="p-8 text-center flex-grow flex flex-col justify-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-brown text-xl lg:text-2xl font-black mb-3 leading-tight">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-brown/60 text-sm lg:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function useAnimateOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

export default function VslPage() {
  const router = useRouter();
  const { dor, video } = router.query;
  const [mostrarOferta, setMostrarOferta] = useState(false);

  useAnimateOnScroll();

  const videoId = '6976875aa19ff9c17f8fb644';
  const headlineText = HEADLINES[dor] || HEADLINES.diagnostico;

  useEffect(() => {
    const alreadyRevealed = localStorage.getItem('vsl_offer_revealed');
    if (alreadyRevealed) {
      setMostrarOferta(true);
    }

    const TEMPO_ALVO = DELAY_SECONDS;
    let revelado = alreadyRevealed === 'true';

    function executarRevelacao() {
      if (revelado) return;
      setMostrarOferta(true);
      localStorage.setItem('vsl_offer_revealed', 'true');
      revelado = true;
    }

    const monitor = setInterval(() => {
      const player = document.querySelector("vturb-smartplayer");
      if (player && typeof player.getPlayedTime === 'function') {
        player.getPlayedTime((seconds) => {
          if (seconds >= TEMPO_ALVO) {
            executarRevelacao();
            clearInterval(monitor);
          }
        });
      }
    }, 1000);

    const safetyTimeout = setTimeout(() => {
      if (!revelado) {
        executarRevelacao();
      }
    }, (TEMPO_ALVO + 15) * 1000);

    return () => {
      clearInterval(monitor);
      clearTimeout(safetyTimeout);
    };
  }, [videoId]);

  return (
    <>
      <Head>
        <title>Mãe que Ora — A Revelação</title>
        <meta name="description" content="Descubra o plano de oração para transformar a vida do seu filho." />
        <meta name="referrer" content="origin" />
        <link rel="preload" href={`https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`} as="script" />
        <link rel="preconnect" href="https://cdn.converteai.net" />
        <link rel="preconnect" href="https://scripts.converteai.net" />
        <script dangerouslySetInnerHTML={{ __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);` }} />
      </Head>

      <main className="min-h-screen bg-sand text-brown flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md py-6 shadow-sm z-10 sticky top-0 border-b border-bronze/10">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-bronze text-3xl font-black tracking-tighter">
              Mãe que ora, transforma!
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-sand pt-12 pb-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-brown text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-8 tracking-tight">
              {headlineText}
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-brown/70 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12">
              Assista a este vídeo curto para entender como começar a sua transformação hoje.
            </p>
          </div>

          <div className="max-w-[400px] mx-auto bg-black rounded-[2rem] overflow-hidden shadow-3xl border-4 border-white mb-10 ring-1 ring-bronze/20">
            <Script id="vturb-script" src={`https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`} strategy="afterInteractive" />
            <vturb-smartplayer id={`vid-${videoId}`} style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }} referrerPolicy="origin"></vturb-smartplayer>
          </div>

          <div className="flex items-center justify-center gap-3 text-brown/40 text-sm font-bold animate-pulse-gentle">
            <span className="text-xl">🔊</span> Por favor, certifique-se de que seu som está ligado.
          </div>
        </section>

        {/* OFFER SECTION */}
        {mostrarOferta && (
          <div className="animate-fade-in-up">
            {/* 1. PURPOSE SECTION */}
            <section className="bg-sand px-4 py-8 text-center scroll-animate transition-all duration-1000">
              <CtaButton />

              <div className="max-w-3xl md:max-w-5xl mx-auto">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Deus tem um propósito lindo para a vida do seu filho(a)
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-brown/80 text-lg md:text-xl leading-relaxed mb-6">
                  Mas esse propósito precisa ser regado com oração, clamor, confiança e entrega. <br /><br />
                  <span className="text-bronze font-bold">Quando uma mãe ora, o céu se abre.</span> <br /><br />
                  Não deixe para amanhã o que pode mudar a vida do seu filho(a) HOJE.<br />
                  Seu filho(a) veio ao mundo para viver o extraordinário.<br />
                  Permita que Deus prepare esse caminho.
                </p>

                {/* Statistic Image Highlight */}
                <div className="max-w-md mx-auto mb-10 transform hover:scale-[1.03] transition-transform duration-500">
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-bronze/20">
                    <Image
                      src="/assets/landingpage/estatistica-mae.jpg"
                      alt="Estatística: 87% das mães relatam mudanças"
                      width={400}
                      height={600}
                      layout="responsive"
                      objectFit="contain"
                      unoptimized
                    />
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-inter)] text-brown/60 text-sm font-medium italic">
                    * 87% das mães que realizaram o diagnóstico relataram mudanças nos primeiros 7 dias.
                  </p>
                </div>

                <GoldDivider />
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-white px-4 py-20 scroll-animate">
              <div className="max-w-6xl mx-auto text-center">
                <h3 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-5xl font-black mb-4">Mães Transformadas</h3>
                <p className="font-[family-name:var(--font-inter)] text-bronze font-black uppercase tracking-widest mb-16">Relatos de fé e vitória</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <TestimonialCard key={n} src={`/depoimentos/0${n}.jpeg`} index={n - 1} />
                  ))}
                </div>
                <CtaButton text="EU TAMBÉM QUERO ESSA TRANSFORMAÇÃO" />
              </div>
            </section>

            {/* DELIVERABLES */}
            <section className="bg-sand/30 px-4 py-20 scroll-animate">
              <div className="max-w-6xl mx-auto">
                <h3 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-5xl font-black text-center mb-16 italic">O Que Você Vai Receber</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  <DeliverableCard icon="🎧" title="Orações Diárias" description="Áudios profundos para ouvir onde estiver, guiando seu clamor." />
                  <DeliverableCard icon="📖" title="Versículos Chave" description="A Palavra viva para cada momento da jornada de 14 dias." />
                  <DeliverableCard icon="🛡️" title="Blindagem Espiritual" description="Aprenda a proteger seu lar e seus filhos contra todo mal." />
                  <DeliverableCard icon="👥" title="Comunidade" description="União com outras mães guerreiras na mesma fé." />
                </div>
              </div>
            </section>

            {/* BONUSES */}
            <section className="bg-white px-4 py-20 scroll-animate">
              <div className="max-w-5xl mx-auto">
                <h3 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-5xl font-black text-center mb-16">Presentes Exclusivos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <BonusCard title="BÔNUS 1 – Força Emocional" items={['Renovação das forças', 'Equilíbrio emocional']} subtitle="CUIDANDO DA MÃE" />
                  <BonusCard title="BÔNUS 2 – Noite de Paz" items={['Proteção noturna', 'Sono reparador']} subtitle="FILHOS DORMINDO" />
                  <BonusCard title="BÔNUS 3 – Batalha Espiritual" items={['Autoridade espiritual', 'Corte de laços']} subtitle="LIBERTAÇÃO" />
                  <BonusCard title="BÔNUS 4 – Consagração 2026" items={['Entrega do futuro', 'Bênção profética']} subtitle="PREPARANDO O CAMINHO" />
                </div>
              </div>
            </section>

            {/* PRICING */}
            <section className="bg-sand px-4 py-24 scroll-animate">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-5xl font-black mb-16">Sua Melhor Decisão Por Apenas:</h2>
                <div className="bg-white/90 backdrop-blur-md p-12 rounded-[3rem] border border-bronze/30 shadow-3xl">
                  <p className="text-brown/50 text-xl line-through mb-2 font-bold">R$ 197,00</p>
                  <p className="text-brown text-7xl sm:text-8xl font-black mb-6 tracking-tighter">R$ 67,00</p>
                  <p className="text-bronze font-black text-2xl mb-12 uppercase tracking-widest">À Vista Or 8x de R$ 9,83</p>
                  <CtaButton text="SIM! QUERO MEU FILHO TRANSFORMADO" className="p-0" />
                  <div className="mt-12 flex justify-center">
                    <GuaranteeSeal />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <footer className="bg-white py-14 px-4 text-center border-t border-bronze/10">
          <p className="font-[family-name:var(--font-inter)] text-brown/40 text-sm font-medium">
            © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
