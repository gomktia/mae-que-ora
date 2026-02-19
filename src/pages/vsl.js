
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

const DELAY_SECONDS = 90;

function CtaButton({ text = "QUERO ACESSAR O DEVOCIONAL", className = "" }) {
  return (
    <div className={`text-center py-8 px-4 ${className}`}>
      <a
        href="https://pay.kiwify.com.br/C10XqRz"
        target="_blank"
        className="inline-block bg-gradient-to-r from-[#A37838] to-[#C89B55] text-white
                   font-[family-name:var(--font-inter)] font-black text-lg sm:text-xl md:text-2xl
                   py-4 px-8 sm:px-12 md:px-14 rounded-full
                   shadow-[0_0_20px_rgba(163,120,56,0.5)]
                   animate-pulse-gentle hover:scale-105 hover:shadow-[0_0_40px_rgba(163,120,56,0.6)]
                   hover:from-[#3E2C22] hover:to-[#5A4033]
                   transition-all duration-300 cursor-pointer uppercase tracking-tight"
      >
        {text}
      </a>
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-bronze opacity-60" />
      <span className="text-bronze text-2xl">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-bronze opacity-60" />
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

function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-scale-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-h-[85vh]">
          <Image
            src={src}
            layout="fill"
            objectFit="contain"
            className="drop-shadow-2xl rounded-lg"
            priority
          />
        </div>
        <p className="absolute bottom-4 text-white/60 text-sm font-medium">Toque fora para fechar</p>
      </div>
    </div>
  )
}

function TestimonialCard({ src, index, onClick }) {
  return (
    <div
      onClick={() => onClick(src)}
      className="group break-inside-avoid mb-6 cursor-zoom-in relative"
    >
      <div className="w-full rounded-2xl overflow-hidden shadow-md border border-bronze/10 bg-white
                      transition-all duration-500 ease-out
                      hover:shadow-xl hover:shadow-bronze/15 hover:-translate-y-1 hover:border-bronze/30">
        <div className="relative w-full aspect-[4/3] bg-black/5">
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
    </div>
  );
}

function BonusCard({ title, items, subtitle }) {
  return (
    <div className="group bg-white border-2 border-bronze/20 rounded-2xl px-6 py-4 shadow-md
                    transition-all duration-500 ease-out cursor-default
                    hover:shadow-2xl hover:shadow-bronze/20 hover:border-bronze hover:-translate-y-1 hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center bg-sand rounded-xl group-hover:bg-bronze transition-colors duration-500">
          <span className="text-2xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:filter group-hover:invert">
            🎁
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-[family-name:var(--font-playfair)] text-brown text-lg sm:text-xl font-bold leading-tight
                         transition-colors duration-300 group-hover:text-bronze">
            {title}
          </h3>
          {subtitle && (
            <p className="font-[family-name:var(--font-inter)] text-bronze font-bold text-xs uppercase tracking-wider mt-1">
              {subtitle}
            </p>
          )}
          <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {items.map((item, i) => (
              <li key={i} className="font-[family-name:var(--font-inter)] text-brown/80 text-sm leading-snug">
                {i > 0 && <span className="text-bronze mr-1">•</span>}{item}
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
    <div className="group bg-white border border-bronze/20 rounded-3xl overflow-hidden shadow-lg
                    transition-all duration-500 ease-out h-full flex flex-col
                    hover:shadow-2xl hover:shadow-bronze/20 hover:-translate-y-2 hover:border-bronze/40">
      {image ? (
        <div className="relative w-full aspect-[3/4] sm:aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ) : (
        <div className="w-full aspect-[3/4] sm:aspect-video bg-sand/30 flex items-center justify-center text-4xl
                        transition-colors duration-500 group-hover:bg-bronze/10">
          <span className="transition-transform duration-500 group-hover:scale-125">{icon}</span>
        </div>
      )}
      <div className="p-3 sm:p-6 text-center flex-grow flex flex-col justify-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-brown text-base sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-3 leading-tight
                       transition-colors duration-300 group-hover:text-bronze">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-brown/70 text-xs sm:text-sm lg:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// Hook for scroll animations
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
      el.classList.add('opacity-0'); // Start hidden
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

export default function VslPage() {
  const router = useRouter();
  const { dor, video } = router.query;
  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [childName, setChildName] = useState('seu filho(a)');
  const [lightboxSrc, setLightboxSrc] = useState(null); // Lightbox state

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

  const openLightbox = (src) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  // Close lightbox on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <Head>
        <title>Mãe que Ora — A Revelação</title>
        <meta name="description" content="Descubra o plano de oração para transformar a vida do seu filho." />
        <meta name="referrer" content="origin" />
        <link rel="preload" href={`https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`} as="script" />
        <link rel="preconnect" href="https://cdn.converteai.net" />
        <link rel="preconnect" href="https://scripts.converteai.net" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`
          }}
        />
      </Head>

      <Lightbox src={lightboxSrc} onClose={closeLightbox} />

      <main className="min-h-screen bg-sand text-brown flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md py-5 shadow-sm z-10 sticky top-0 border-b border-bronze/10">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-bronze text-2xl font-black tracking-tight">
              Mãe que ora, transforma!
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/landingpage/03.jpeg"
              alt="Mãe com filho"
              layout="fill"
              objectFit="cover"
              priority
              className="opacity-40"
            />
            <div className="absolute inset-0 bg-white/60" />
          </div>

          <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center">
            <div className="max-w-3xl md:max-w-5xl mx-auto mb-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50">
              <h1 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-tight mb-4 tracking-tight">
                {headlineText}
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-brown/80 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                Assista a este vídeo curto para entender como começar a transformação.
              </p>
            </div>

            <Script
              id="vturb-script"
              src={`https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`}
              strategy="afterInteractive"
            />

            <div className="w-full max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-bronze/20 mb-8 aspect-[9/16]">
              <vturb-smartplayer
                key={`player-${videoId}`}
                id={`vid-${videoId}`}
                style={{ display: 'block', margin: '0 auto', width: '100%', height: '100%' }}
                referrerPolicy="origin"
              ></vturb-smartplayer>
            </div>

            <div className="flex items-center justify-center gap-2 text-brown/60 text-sm font-[family-name:var(--font-inter)] animate-pulse font-bold bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
              🔊 Por favor, certifique-se de que seu som está ligado.
            </div>
          </div>
        </section>

        {/* OFFER SECTION */}
        {mostrarOferta && (
          <div className="animate-fade-in-up">
            {/* 1. PURPOSE SECTION */}
            <section className="bg-white px-4 py-8 text-center scroll-animate transition-all duration-1000">
              <CtaButton />
              <div className="max-w-3xl md:max-w-5xl mx-auto mt-10">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
                  Deus tem um propósito lindo para a vida do seu filho(a)
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-brown/80 text-lg md:text-xl leading-relaxed mb-6">
                  Mas esse propósito precisa ser regado com oração, clamor, confiança e entrega. <br /><br />
                  <span className="text-bronze font-black">Quando uma mãe ora, o céu se abre.</span> <br /><br />
                  Não deixe para amanhã o que pode mudar a vida do seu filho(a) HOJE.<br />
                  Seu filho(a) veio ao mundo para viver o extraordinário.<br />
                  Permita que Deus prepare esse caminho.
                </p>
                <GoldDivider />
              </div>
            </section>

            {/* Image separated from the white card */}
            <div className="bg-sand/30 px-4 pb-16 scroll-animate transition-all duration-1000">
              <div className="w-full max-w-4xl mx-auto">
                <img
                  src="/assets/landingpage/estatistica-mae.jpg"
                  alt="Estatística sobre o poder da oração materna"
                  className="w-full h-auto rounded-3xl shadow-lg"
                />
              </div>
            </div>

            {/* NEW SECTION A */}
            <section className="relative overflow-hidden scroll-animate transition-all duration-1000 py-16 bg-sand">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/uploads/2026/01/mae-orando.jpg"
                  alt="Mãe orando"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-60"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
              <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-8 drop-shadow-md">
                  O Que Você Está Prestes a Descobrir Pode Mudar Tudo — Se Você Se Posicionar
                </h2>
                <div className="space-y-6 text-brown font-[family-name:var(--font-inter)] text-lg md:text-xl leading-relaxed bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50">
                  <p>Existe um poder espiritual que Deus confiou somente às mães.</p>
                  <p>Um poder que nenhum psicólogo, nenhum remédio, nenhum conselho humano pode substituir.</p>
                  <p className="font-black text-bronze text-2xl">Esse poder está na oração que só uma mãe consegue fazer.</p>
                  <p>Deus entregou à você a autoridade e a responsabilidade espiritual pela vida do seu filho(a).</p>
                  <p>Nos próximos 14 dias, você receberá um direcionamento diário de oração profunda para interceder e despertar o propósito de Deus na vida do seu filho(a).</p>
                </div>
              </div>
            </section>

            {/* NEW SECTION B - MÃE QUE ORA TRANSFORMA */}
            <section className="bg-brown px-4 py-16 scroll-animate transition-all duration-1000 text-sand">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-[family-name:var(--font-playfair)] text-bronze text-3xl sm:text-4xl md:text-5xl font-black text-center mb-14 leading-tight">
                  MÃE QUE ORA TRANSFORMA
                </h2>

                {/* Block 1 - Devocional description + images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
                  <div className="space-y-5">
                    <h3 className="font-[family-name:var(--font-playfair)] text-sand text-2xl sm:text-3xl font-bold leading-tight">
                      O Único Devocional de 14 Dias Criado Para Mães Que Querem Ver Seus Filhos Vivendo o Extraordinário
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-sand/80 text-lg leading-relaxed">
                      Não é mais um livro que você vai comprar e deixar na estante.
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-sand/80 text-lg leading-relaxed">
                      Não é mais uma promessa vazia.
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-sand text-lg leading-relaxed font-bold bg-black/20 p-4 rounded-xl border-l-4 border-bronze">
                      É um caminho espiritual completo, com começo, meio e fim, que vai te guiar passo a passo em orações poderosas que já transformaram centenas de famílias.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-bronze/20 border border-white/10">
                      <div className="relative w-full aspect-[3/4]">
                        <Image src="/assets/uploads/2026/01/Design-sem-nome.jpg" alt="Mãe orando com filho" layout="fill" objectFit="cover" className="transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    </div>
                    <div className="group rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-bronze/20 border border-white/10">
                      <div className="relative w-full aspect-[3/4]">
                        <Image src="/assets/uploads/2026/01/Design-sem-nome-2.jpg" alt="Criança em oração" layout="fill" objectFit="cover" className="transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 2 - Para quem é (Fases) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div className="group rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-bronze/20 order-2 md:order-1 border border-white/10">
                    <div className="relative w-full aspect-[4/3]">
                      <Image src="/assets/uploads/2026/01/Design-sem-nome-1.jpg" alt="Família unida em oração" layout="fill" objectFit="cover" className="transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </div>

                  <div className="order-1 md:order-2">
                    <h3 className="font-[family-name:var(--font-playfair)] text-sand text-2xl sm:text-3xl font-bold leading-tight mb-6">
                      Este Devocional Foi Criado Para Você Que Tem Um Filho(a)
                    </h3>

                    <div className="space-y-6">
                      {/* Fase Infância */}
                      <div className="group/fase bg-white/5 rounded-xl p-5 border border-white/10 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-bronze/40 hover:-translate-y-1 hover:bg-white/10">
                        <h4 className="font-[family-name:var(--font-playfair)] text-bronze text-xl font-bold mb-3">Fase da Infância:</h4>
                        <ul className="space-y-2 font-[family-name:var(--font-inter)] text-sand/80 text-sm">
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que não dorme bem, vive agitado(a) e irritado(a)</li>
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que vive fases intensas da infância, exigindo cuidado e oração constante</li>
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que você quer cercar de proteção e direção divina desde cedo</li>
                        </ul>
                      </div>

                      {/* Fase Adolescência */}
                      <div className="group/fase bg-white/5 rounded-xl p-5 border border-white/10 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-bronze/40 hover:-translate-y-1 hover:bg-white/10">
                        <h4 className="font-[family-name:var(--font-playfair)] text-bronze text-xl font-bold mb-3">Fase da Adolescência:</h4>
                        <ul className="space-y-2 font-[family-name:var(--font-inter)] text-sand/80 text-sm">
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que está passando por fases desafiadoras que te deixam sem chão</li>
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que anda com más companhias ou está se afastando de casa</li>
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que enfrenta ansiedade, fobias, medos intensos ou tristeza constante</li>
                        </ul>
                      </div>

                      {/* Fase Adulta */}
                      <div className="group/fase bg-white/5 rounded-xl p-5 border border-white/10 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-bronze/40 hover:-translate-y-1 hover:bg-white/10">
                        <h4 className="font-[family-name:var(--font-playfair)] text-bronze text-xl font-bold mb-3">Fase Adulta:</h4>
                        <ul className="space-y-2 font-[family-name:var(--font-inter)] text-sand/80 text-sm">
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que enfrenta prisões emocionais e espirituais</li>
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que passa por dificuldades financeiras ou conflitos familiares</li>
                          <li className="flex items-start gap-2"><span className="text-bronze mt-0.5">✦</span> Que precisa de fortalecimento emocional e espiritual</li>
                        </ul>
                      </div>
                    </div>

                    <p className="font-[family-name:var(--font-inter)] text-sand text-lg font-bold mt-6 text-center md:text-left">
                      Seja qual for a fase, chegou a hora de colocar seu filho(a) nos braços de Deus.
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <CtaButton text="QUERO COMEÇAR A ORAR PELO MEU FILHO" />
                </div>
              </div>
            </section>

            {/* NEW SECTION C - APP / DIGITAL EXPERIENCE */}
            <section className="bg-white px-4 py-16 scroll-animate transition-all duration-1000">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-bronze/20 transform hover:scale-[1.02] transition-transform duration-500 mb-8 md:mb-0">
                    <Image
                      src="/assets/uploads/mockup-app.jpg"
                      alt="Aplicativo Mãe Que Ora"
                      width={600}
                      height={600}
                      style={{ width: '100%', height: 'auto' }}
                      className="transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 text-left">
                  <div className="inline-block bg-bronze/10 text-bronze px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6">
                    MUITO MAIS QUE UM LIVRO DIGITAL
                  </div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                    Tenha o Controle Espiritual da Sua Casa <span className="text-bronze">Na Palma da Sua Mão</span>
                  </h2>
                  <p className="font-[family-name:var(--font-inter)] text-brown/80 text-lg leading-relaxed mb-6">
                    Esqueça materiais complicados. Você terá acesso imediato a uma <strong>Área de Membros Exclusiva</strong>, que funciona como um aplicativo no seu celular.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-4">
                      <div className="bg-sand p-2 rounded-full text-xl mt-1">🎧</div>
                      <div>
                        <h4 className="font-bold text-brown text-lg">Ouça Onde Estiver</h4>
                        <p className="text-sm text-brown/70">No carro, lavando louça ou antes de dormir. Basta dar o play e deixar a oração guiar seu coração.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-sand p-2 rounded-full text-xl mt-1">📖</div>
                      <div>
                        <h4 className="font-bold text-brown text-lg">Leia e Medite</h4>
                        <p className="text-sm text-brown/70">Acesse os materiais em PDF com alta qualidade para leitura profunda e reflexão bíblica.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-sand p-2 rounded-full text-xl mt-1">👥</div>
                      <div>
                        <h4 className="font-bold text-brown text-lg">Acesso à Comunidade Mãe que Ora, Transforma!</h4>
                        <p className="text-sm text-brown/70">Caminhe junto com outras mães que, assim como você, estão lutando pela vida dos seus filhos.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. DELIVERABLES SECTION */}
            <section className="bg-sand/30 px-4 py-16 scroll-animate transition-all duration-1000 delay-200">
              <div className="max-w-4xl md:max-w-6xl mx-auto">
                <div className="bg-bronze text-white font-bold text-center py-4 rounded-xl mb-10 shadow-lg transform hover:scale-[1.01] transition-transform max-w-2xl mx-auto">
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-[family-name:var(--font-playfair)] uppercase tracking-widest">
                    O Que Você Vai Receber Durante os 14 Dias:
                  </h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                  <DeliverableCard
                    image="/assets/uploads/2026/01/Design-sem-nome.jpg"
                    icon="🎧"
                    title="Orações Diárias"
                    description="Em áudio (para você ouvir onde estiver) e em formato digital (para ler e meditar)."
                  />
                  <DeliverableCard
                    image="/assets/uploads/2026/01/Design-sem-nome-2.jpg"
                    icon="📖"
                    title="Versículos Diários"
                    description="Palavra de Deus direcionada para cada dia de oração e reflexão."
                  />
                  <DeliverableCard
                    image="/assets/uploads/2026/01/Design-sem-nome-5.jpg"
                    icon="🛡️"
                    title="Blindagem Materna"
                    description="Fortaleça espiritualmente seu filho(a) e sua casa contra inimigos."
                  />
                  <DeliverableCard
                    image="/assets/uploads/2026/01/Design-sem-nome-1.jpg"
                    icon="👥"
                    title="Comunidade de Apoio"
                    description="Outras mães que relatam batalhas vencidas. Você não estará sozinha."
                  />
                </div>
              </div>
            </section>

            {/* 3. BONUSES SECTION */}
            <section className="relative px-4 py-16 scroll-animate transition-all duration-1000 delay-200">
              {/* Background Image for Bonuses */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/uploads/2026/01/mae-orando.jpg"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-15 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-white/80" /> {/* Strong overlay for readability */}
              </div>

              <div className="relative z-10 max-w-5xl mx-auto">
                <h2 className="font-[family-name:var(--font-playfair)] text-bronze text-3xl sm:text-4xl font-black text-center mb-10 leading-tight">
                  BÔNUS EXCLUSIVOS <br /> <span className="text-brown text-2xl font-medium italic">(Áudios Guiados de Oração)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BonusCard
                    title="BÔNUS 1 – Oração pela Força Emocional da Mãe"
                    subtitle="Porque você também precisa estar forte"
                    items={['Renovação das forças', 'Equilíbrio emocional', 'Paz interior']}
                  />
                  <BonusCard
                    title="BÔNUS 2 – Oração pelo Filho(a) Enquanto Dorme"
                    subtitle="O momento mais poderoso para interceder"
                    items={['Proteção noturna', 'Libertação de pesadelos', 'Sono reparador']}
                  />
                  <BonusCard
                    title="BÔNUS 3 – Oração para Vencer Batalhas Espirituais"
                    subtitle="Quebre cadeias e prisões invisíveis"
                    items={['Autoridade espiritual', 'Corte de laços', 'Proteção divina']}
                  />
                  <BonusCard
                    title="BÔNUS 4 – Consagração Materna para 2026"
                    subtitle="Prepare seu filho(a) para viver o extraordinário"
                    items={['Entrega do futuro', 'Bênção profética', 'Alinhamento com o céu']}
                  />
                  <BonusCard
                    title="BÔNUS 5 – Oração para Fazer Junto com os Filhos"
                    subtitle="Ensine-os o poder da oração desde cedo"
                    items={['União familiar', 'Legado de fé', 'Intimidade com Deus']}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 4. TESTIMONIALS (IMPROVED MASONRY GRID) */}
        <section className="bg-sand/20 px-4 py-20 scroll-animate transition-all duration-1000">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl font-black text-center mb-6">
              TRANSFORMAÇÕES REAIS DE MÃES COMO VOCÊ
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-bronze font-black uppercase tracking-widest text-center mb-16 text-sm">
              CLIQUE NAS FOTOS PARA AMPLIAR
            </p>

            {/* Masonry Layout: columns-count-2 on sm, 3 on lg, 4 on xl */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <TestimonialCard
                  key={n}
                  src={`/depoimentos/0${n}.jpeg`}
                  index={n - 1}
                  onClick={openLightbox}
                />
              ))}
            </div>

            <p className="text-center text-brown/60 text-sm mt-12 font-medium italic">
              * Resultados reais compartilhados em nossa comunidade exclusiva.
            </p>

            {mostrarOferta && (
              <div className="mt-12 flex justify-center">
                <CtaButton text="EU TAMBÉM QUERO ESSA TRANSFORMAÇÃO" />
              </div>
            )}
          </div>
        </section>

        {mostrarOferta && (
          <div className="animate-fade-in-up">
            <section className="bg-gradient-to-b from-white to-sand/50 px-4 py-16 pb-24 scroll-animate transition-all duration-1000 border-t border-bronze/10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl font-black mb-10">
                  QUANTO VALE A PAZ DA SUA FAMÍLIA?
                </h2>
                <div className="grid grid-cols-1 gap-4 mb-12 text-left">
                  <div className="group bg-white border border-bronze/10 p-5 rounded-2xl flex items-center gap-4 transition-all duration-500 ease-out cursor-default shadow-sm hover:border-bronze/40 hover:bg-white hover:-translate-x-1 hover:shadow-md">
                    <span className="text-bronze text-3xl font-black transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">?</span>
                    <p className="text-brown/80 transition-colors duration-300 group-hover:text-brown font-medium">Quantas noites sem paz a preocupação já te custou?</p>
                  </div>
                  <div className="group bg-white border border-bronze/10 p-5 rounded-2xl flex items-center gap-4 transition-all duration-500 ease-out cursor-default shadow-sm hover:border-bronze/40 hover:bg-white hover:translate-x-1 hover:shadow-md">
                    <span className="text-bronze text-3xl font-black transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">?</span>
                    <p className="text-brown/80 transition-colors duration-300 group-hover:text-brown font-medium">Quanto você já gastou tentando resolver sozinha?</p>
                  </div>
                  <div className="group bg-white border border-bronze/10 p-5 rounded-2xl flex items-center gap-4 transition-all duration-500 ease-out cursor-default shadow-sm hover:border-bronze/40 hover:bg-white hover:-translate-x-1 hover:shadow-md">
                    <span className="text-bronze text-3xl font-black transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">?</span>
                    <p className="text-brown/80 transition-colors duration-300 group-hover:text-brown font-medium">Quanto vale ver seu filho(a) livre, feliz e vivendo o propósito de Deus?</p>
                  </div>
                </div>
                <div className="group bg-white/80 backdrop-blur-md p-8 rounded-[3rem] border border-bronze/20 shadow-[0_20px_50px_-12px_rgba(163,120,56,0.15)] relative overflow-hidden transition-all duration-700 ease-out animate-glow-pulse hover:border-bronze/50 hover:shadow-[0_20px_60px_-12px_rgba(163,120,56,0.25)]">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-bronze to-yellow-500"></div>
                  <p className="font-[family-name:var(--font-inter)] text-brown/50 text-lg mb-2 uppercase tracking-widest font-bold mt-4">
                    De <span className="line-through text-red-400">R$ 197,00</span> por apenas
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-[family-name:var(--font-playfair)] text-brown text-7xl sm:text-8xl font-black mb-2 tracking-tighter drop-shadow-sm">
                      R$ 67,00
                    </p>
                    <span className="text-bronze text-sm font-black uppercase tracking-[0.2em] mb-4">à vista</span>
                  </div>
                  <div className="w-16 h-1 bg-bronze/20 mx-auto mb-6 rounded-full"></div>
                  <p className="font-[family-name:var(--font-inter)] text-brown/80 text-xl font-medium mb-10">
                    Ou parcele em até <strong className="text-green-600 font-bold">8x de R$ 9,83</strong>
                  </p>
                  <a href="https://pay.kiwify.com.br/C10XqRz" target="_blank" className="group/btn relative flex items-center justify-center w-full bg-gradient-to-r from-[#A37838] to-[#C89B55] hover:from-[#3E2C22] hover:to-[#5A4033] text-white font-[family-name:var(--font-inter)] font-black text-[20px] sm:text-[22px] tracking-wide uppercase py-6 rounded-2xl shadow-[0_10px_30px_rgba(163,120,56,0.4)] hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(163,120,56,0.5)] transition-all duration-300 ease-in-out animate-pulse-gentle cursor-pointer">
                    QUERO QUE MEU FILHO VIVA O EXTRAORDINÁRIO
                  </a>
                </div>
                <div className="mt-8 animate-float">
                  <GuaranteeSeal />
                </div>
                <p className="mt-8 text-brown/40 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed italic font-medium">
                  "Seja o exemplo que seu filho(a) vai seguir. Dê esse passo de fé agora."
                </p>
              </div>
            </section>
          </div>
        )}

        <footer className="bg-white py-10 px-4 text-center border-t border-bronze/10 mt-auto">
          <p className="font-[family-name:var(--font-inter)] text-brown/40 text-sm font-medium">
            © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            <br />
            <span className="text-[10px] mt-2 block opacity-60 uppercase tracking-widest">
              Os resultados podem variar de pessoa para pessoa. Este site não é afiliado ao Facebook ou Google.
            </span>
          </p>
        </footer>
      </main>
    </>
  );
}
