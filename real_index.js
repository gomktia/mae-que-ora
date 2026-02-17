import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';

/* ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
   Quiz de 15 etapas (sa + s1ÔåÆs13 + loader s14)
   Fluxo linear de engajamento emocional.
   Todas as respostas levam ├á mesma pr├│xima etapa.
   ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

const STEPS = [
  // 0 ÔÇö sa (landing)
  {
    type: 'landing',
    headline: '',
    highlight: 'Descubra qual ├®!',
    subtitle:
      'Responda essas perguntas r├ípidas e receba um diagn├│stico personalizado sobre a vida espiritual do seu filho(a) + as ora├º├Áes exatas que voc├¬ precisa fazer hoje.',
    socialProof:
      'Mais de 3.247 m├úes j├í descobriram o caminho certo para transformar a vida de seus filhos atrav├®s da ora├º├úo direcionada',
    cta: 'COME├çAR MEU DIAGN├ôSTICO AGORA',
  },
  // 1 ÔÇö s1
  {
    question: 'O que tem pesado no seu cora├º├úo em rela├º├úo ├á vida do seu filho(a)?',
    options: [
      { emoji: '­ƒÿö', text: 'Ele(a) n├úo parece viver com a paz que deveria' },
      { emoji: '­ƒÿƒ', text: 'Algo nele(a) me deixa inquieta, mesmo quando tudo parece normal' },
      { emoji: '­ƒÿ░', text: 'Sinto que ele(a) carrega um peso que n├úo sei tirar' },
      { emoji: '­ƒÆö', text: 'Meu cora├º├úo sente que algo n├úo est├í certo' },
    ],
  },
  // 2 ÔÇö s2
  {
    question: 'H├í quanto tempo isso te preocupa?',
    options: [
      { text: 'Menos de 1 m├¬s' },
      { text: '1-6 meses' },
      { text: '6 meses - 1 ano' },
      { text: 'Mais de 1 ano' },
    ],
  },
  // 3 ÔÇö s3
  {
    question: 'Sobre a vida do seu filho(a), qual pensamento volta com frequ├¬ncia?',
    options: [
      { emoji: '­ƒÿö', text: 'Ser├í que ele(a) est├í no caminho certo?' },
      { emoji: '­ƒÿƒ', text: 'E se eu n├úo estiver fazendo o suficiente?' },
      { emoji: '­ƒÿ░', text: 'Tenho medo de perd├¬-lo(a) para o mundo' },
      { emoji: '­ƒÆö', text: 'Sinto que algo precisa mudar, mas n├úo sei como' },
    ],
  },
  // 4 ÔÇö s4
  {
    question: 'Quando voc├¬ tenta entender o que est├í acontecendo, o que mais sente?',
    options: [
      { text: 'Confus├úo por n├úo saber a causa' },
      { text: 'Ang├║stia por n├úo conseguir ajudar' },
      { text: 'Medo de estar falhando como m├úe' },
      { text: 'Um aperto no cora├º├úo dif├¡cil de explicar' },
    ],
  },
  // 5 ÔÇö s14 (Conclusion / Capture Replacement)
  {
    type: 'capture', // Using capture type to render the conclusion screen logic
    headline: 'Seu diagn├│stico est├í pronto.',
    cta: 'VER MEU DIAGN├ôSTICO AGORA',
    isConclusion: true, // Flag to identify this modified capture step
  },
  // 6 ÔÇö Loader (Transi├º├úo 5 Barras)
  {
    type: 'loader',
    headline: 'Gerando seu Diagn├│stico Personalizado...',
  },
  /* 
  // PRESERVED STEPS (s5 - s13 + Bridge)
  // 5 ÔÇö Capture (Old)
  {
    type: 'capture',
    headline: 'Para receber seu diagn├│stico detalhado e as ora├º├Áes, preencha abaixo:',
    cta: 'CONTINUAR',
  },
  // 6 ÔÇö s5
  {
    question: 'Se voc├¬ pudesse mudar UMA coisa na vida do seu filho(a), seria:',
    options: [
      { text: 'Mais paz e leveza' },
      { text: 'Mais prote├º├úo espiritual' },
      { text: 'Relacionamento mais pr├│ximo comigo' },
      { text: 'Prop├│sito e dire├º├úo de vida' },
    ],
  },
  // ... (Other steps preserved in comments)
  */
];

const TOTAL_QUESTIONS = STEPS.length;

/* ÔöÇÔöÇ Componentes auxiliares ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-lg">Ô£ª</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60" />
    </div>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-1">
        <span className="font-[family-name:var(--font-inter)] text-white/50 text-xs">
          Pergunta {current} de {total - 2}
        </span>
        <span className="font-[family-name:var(--font-inter)] text-gold text-xs font-semibold">
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 bg-navy-light/50 rounded-full overflow-hidden border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(255,215,0,0.4)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OptionCard({ option, index, onSelect }) {
  return (
    <button
      onClick={() => onSelect(index)}
      className="group w-full text-left bg-white border-2 border-gold/50 rounded-xl p-5
                 shadow-md
                 hover:bg-snow hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]
                 transition-all duration-300 ease-out cursor-pointer
                 animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="flex items-center gap-4">
        {option.emoji && (
          <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
            {option.emoji}
          </span>
        )}
        <span className="font-[family-name:var(--font-inter)] text-navy text-sm sm:text-base leading-snug font-medium">
          {option.text}
        </span>
        <span className="ml-auto flex-shrink-0 text-gold font-bold group-hover:translate-x-1 transition-all duration-300">
          &rarr;
        </span>
      </div>
    </button>
  );
}

/* ÔöÇÔöÇ P├ígina principal do Quiz ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', childName: '' });

  const currentStep = STEPS[step];
  const displaySonName = formData.childName || 'seu filho(a)';

  useEffect(() => {
    const savedChildName = localStorage.getItem('filhonome');
    if (savedChildName) {
      setFormData((prev) => ({ ...prev, childName: savedChildName }));
    }
  }, []);

  const handleOptionSelect = useCallback((index) => {
    if (currentStep.options && currentStep.options[index]) {
      setAnswers((prev) => ({ ...prev, [step]: currentStep.options[index].text }));
    }
    advance();
  }, [step, currentStep]);

  const advance = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      if (step < STEPS.length - 1) {
        setStep((s) => s + 1);
      }
      setTransitioning(false);
    }, 300);
  }, [step]);

  const handleCaptureSubmit = (e) => {
    e.preventDefault();
    if (formData.childName) {
      localStorage.setItem('filhonome', formData.childName);
    }
    advance();
  };

  // Loader auto-redirect
  // Loader auto-redirect
  // Loader auto-redirect
  useEffect(() => {
    if (currentStep.type !== 'loader') return;

    const numberOfSteps = 5; // Updated to 5 steps
    const durationPerStep = 1500; // 1.5s per step
    const intervalTime = 50;

    const id = setInterval(() => {
      setTotalProgress((prev) => {
        const increment = (100 / durationPerStep) * intervalTime;
        const next = prev + increment;
        if (next >= numberOfSteps * 100) {
          clearInterval(id);

          // Redirect to VSL
          // Using s10 (Relacionamento) by default as requested
          router.push(`/vsl?video=s10&dor=diagnostico`);
          return numberOfSteps * 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(id);
  }, [currentStep, router, answers]);

  // ÔöÇÔöÇ LANDING (sa) ÔöÇÔöÇ
  if (currentStep.type === 'landing') {
    return (
      <>
        <Head>
          <title>M├úe que Ora ÔÇö Diagn├│stico Espiritual</title>
          <meta
            name="description"
            content="Descubra qual ora├º├úo pode transformar a vida do seu filho. Diagn├│stico espiritual personalizado para m├úes."
          />
        </Head>

        <main className="min-h-screen bg-snow flex flex-col">
          <header className="bg-navy py-4">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
                M├úe que ora, transforma!
              </span>
            </div>
          </header>

          <section className="bg-gradient-to-b from-navy to-navy-light py-16 px-4 text-center flex-1 flex items-center">
            <div className="max-w-2xl mx-auto">
              <span className="inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
                Diagn├│stico Espiritual Personalizado
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                {currentStep.headline}{currentStep.headline && ' '}
                <span className="text-gold">{currentStep.highlight}</span>
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-white/70 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-6">
                {currentStep.subtitle}
              </p>

              <p className="font-[family-name:var(--font-inter)] text-gold/80 text-sm mb-8">
                &#x2705; {currentStep.socialProof}
              </p>

              <button
                onClick={advance}
                className="inline-block w-full max-w-md mx-auto bg-green-cta text-white text-center
                          font-[family-name:var(--font-inter)] font-bold text-lg tracking-wide
                          py-4 px-8 rounded-full shadow-lg
                          hover:bg-green-cta-hover hover:scale-105
                          transition-all duration-300 ease-out
                          animate-pulse-gentle cursor-pointer"
              >
                {currentStep.cta}
              </button>

              <p className="text-center font-[family-name:var(--font-inter)] text-white/60 text-xs mt-6">
                &#x1F512; Suas respostas s├úo 100% confidenciais
              </p>
            </div>
          </section>

          <footer className="bg-navy py-6 px-4 text-center">
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
              &copy; {new Date().getFullYear()} M├úe que Ora ÔÇö Todos os direitos reservados.
            </p>
          </footer>
        </main>
      </>
    );
  }

  // ÔöÇÔöÇ SOCIAL PROOF (s9) ÔöÇÔöÇ
  if (currentStep.type === 'social_proof') {
    return (
      <>
        <Head>
          <title>M├úe que Ora ÔÇö Diagn├│stico</title>
        </Head>

        <main className="min-h-screen bg-navy flex flex-col">
          <header className="bg-navy-light/50 py-4 shadow-sm">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
                M├úe que ora, transforma!
              </span>
            </div>
          </header>

          <section className="flex-1 px-4 py-10 bg-navy">
            <div className="max-w-xl mx-auto">
              <ProgressBar current={step} total={TOTAL_QUESTIONS} />

              <div className="mt-8 animate-fade-in-up text-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold leading-tight mb-2">
                  {currentStep.headline}
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-gold text-base font-semibold mb-8">
                  {currentStep.highlight}
                </p>

                {/* Carrossel de Depoimentos com Setas */}
                <div className="relative group">
                  {/* Bot├úo Esquerda */}
                  <button
                    onClick={() => document.getElementById('testimonials-scroll').scrollBy({ left: -300, behavior: 'smooth' })}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-navy-light/80 text-gold p-2 rounded-full shadow-lg border border-gold/20 hover:bg-navy hover:scale-110 transition-all hidden md:block"
                    aria-label="Anterior"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {/* Container Scrollavel */}
                  <div
                    id="testimonials-scroll"
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 mb-8 px-2 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="snap-center shrink-0 w-[85%] sm:w-[45%] md:w-[40%] first:pl-2 last:pr-2 transform transition-transform duration-300 hover:scale-[1.02]">
                        <img
                          src={`/assets/prova-social-${n}.jpg`}
                          alt={`Depoimento ${n}`}
                          className="rounded-xl shadow-lg border border-gold/20 w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Bot├úo Direita */}
                  <button
                    onClick={() => document.getElementById('testimonials-scroll').scrollBy({ left: 300, behavior: 'smooth' })}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-navy-light/80 text-gold p-2 rounded-full shadow-lg border border-gold/20 hover:bg-navy hover:scale-110 transition-all hidden md:block"
                    aria-label="Pr├│ximo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-center gap-1 mb-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="w-2 h-2 rounded-full bg-gold/30" />
                  ))}
                </div>

                <button
                  onClick={advance}
                  className="inline-block w-full max-w-sm mx-auto bg-green-cta text-white text-center
                            font-[family-name:var(--font-inter)] font-bold text-base tracking-wide
                            py-4 px-8 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)]
                            hover:bg-green-cta-hover hover:scale-105
                            transition-all duration-300 ease-out
                            animate-pulse-gentle cursor-pointer"
                >
                  {currentStep.cta}
                </button>
              </div>
            </div>
          </section>

          <footer className="bg-navy py-6 px-4 text-center">
            <p className="font-[family-name:var(--font-inter)] text-white/40 text-xs">
              &copy; {new Date().getFullYear()} M├úe que Ora ÔÇö Todos os direitos reservados.
            </p>
          </footer>
        </main>
      </>
    );
  }

  // ÔöÇÔöÇ LOADER (s14) ÔöÇÔöÇ
  // ÔöÇÔöÇ BRIDGE STEP (s15) ÔöÇÔöÇ
  // ÔöÇÔöÇ BRIDGE STEP (s15) ÔöÇÔöÇ
  if (currentStep.type === 'bridge') {
    const answerS5 = answers[6] || '';
    const isRelacionamento = answerS5.includes('Relacionamento');
    const isProtecao = answerS5.includes('Prote├º├úo');

    // Default to Relacionamento if neither (fallback)
    const showVideo = isRelacionamento || (!isRelacionamento && !isProtecao);

    return (
      <main className="min-h-screen bg-navy flex flex-col">
        <header className="bg-navy-light/50 py-4 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              M├úe que ora, transforma!
            </span>
          </div>
        </header>

        <section className="flex-1 px-4 py-8 bg-navy flex items-center justify-center">
          <div className="max-w-xl mx-auto text-center animate-fade-in-up">
            {showVideo ? (
              /* Bridge Social Proof (Video Ana - S10) */
              <>
                <h2 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold mb-6">
                  Veja o que aconteceu com a Ana...
                </h2>

                {/* Vturb Player S10 */}
                <div className="mb-8">
                  <Script
                    src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
                    strategy="afterInteractive"
                  />
                  <div id="ifr_697687b1ac47f102b3690c41_wrapper" style={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}>
                    <div style={{ position: 'relative', padding: '177.77777777777777% 0 0 0' }} id="ifr_697687b1ac47f102b3690c41_aspect">
                      <iframe
                        frameBorder="0"
                        allowFullScreen
                        src="about:blank"
                        id="ifr_697687b1ac47f102b3690c41"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        referrerPolicy="origin"
                        onLoad={(e) => {
                          const t = e.target;
                          if (!t.dataset.loaded) {
                            t.dataset.loaded = "true";
                            t.src = 'https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/697687b1ac47f102b3690c41/v4/embed.html' + (window.location.search || '?') + '&vl=' + encodeURIComponent(window.location.href);
                          }
                        }}
                      ></iframe>
                    </div>
                  </div>
                </div>

                <p className="font-[family-name:var(--font-inter)] text-white/90 text-lg sm:text-xl mb-8 px-2 font-medium">
                  Ela passou exatamente pelo que voc├¬ est├í passando com <span className="text-gold font-bold">{displaySonName}</span>.
                </p>
              </>
            ) : (
              /* Bridge Statistic */
              <>
                <div className="border-2 border-gold/50 rounded-2xl overflow-hidden shadow-2xl shadow-gold/10 mb-8 max-w-sm mx-auto">
                  <img
                    src="/assets/estatistica-mae.jpg"
                    alt="87% das m├úes relataram mudan├ºas"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-white/90 text-lg sm:text-xl mb-8 font-medium">
                  O diagn├│stico de <span className="text-gold font-bold">{displaySonName}</span> vai te mostrar o caminho.
                </p>
              </>
            )}

            <button
              onClick={advance}
              className="inline-block w-full max-w-md mx-auto bg-green-cta text-white text-center
                          font-[family-name:var(--font-inter)] font-bold text-lg tracking-wide
                          py-4 px-8 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)]
                          hover:bg-green-cta-hover hover:scale-105
                          transition-all duration-300 ease-out
                          animate-pulse-gentle cursor-pointer"
            >
              Quero ver o diagn├│stico de {displaySonName}
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ÔöÇÔöÇ CAPTURE STEPÔöÇÔöÇ
  // ÔöÇÔöÇ CAPTURE STEP (Modified for Conclusion) ÔöÇÔöÇ
  if (currentStep.type === 'capture') {
    return (
      <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full mx-auto bg-navy-light/30 border border-gold/10 p-6 rounded-2xl shadow-2xl animate-fade-in-up backdrop-blur-sm">
          <div className="text-center mb-8">
            <span className="text-5xl block mb-4">Ô£¿</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold leading-tight mb-4">
              {currentStep.headline}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-white/80 text-base leading-relaxed">
              Analisamos suas respostas e encontramos um caminho de ora├º├úo espec├¡fico para o seu caso.
            </p>
          </div>

          {/* Bot├úo de Conclus├úo */}
          <button
            onClick={advance}
            className="w-full bg-gold text-navy font-[family-name:var(--font-inter)] font-bold text-lg sm:text-xl tracking-wide py-5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-gold-light hover:scale-105 transition-all animate-pulse-gentle"
          >
            {currentStep.cta}
          </button>

          <p className="text-center text-white/30 text-xs mt-6">
            ­ƒöÆ Diagn├│stico confidencial e seguro.
          </p>
        </div>
      </main>
    );
  }

  // ÔöÇÔöÇ FILTERED LOADER (s16) ÔöÇÔöÇ
  if (currentStep.type === 'loader') {
    const loadingSteps = [
      'Analisando Perfil Espiritual...',
      'Identificando Ra├¡zes Emocionais...',
      'Cruzando Dados de Comportamento...',
      'Verificando Linhagem e Heran├ºa...',
      'Gerando Diagn├│stico Final...',
    ];

    return (
      <>
        <Head>
          <title>M├úe que Ora ÔÇö Preparando Diagn├│stico...</title>
        </Head>

        {/* Fundo Navy (Azul Escuro) com Dourado */}
        <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center animate-fade-in-up">
            <div className="mb-8">
              <span className="text-5xl block mb-4">­ƒÖÅ</span>
              <h1 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold leading-tight mb-3">
                {currentStep.headline}
              </h1>
            </div>

            <div className="w-full max-w-md mx-auto space-y-4">
              {loadingSteps.map((text, idx) => {
                const currentStepIndex = Math.floor(totalProgress / 100);
                let pct = 0;
                if (idx < currentStepIndex) pct = 100;
                else if (idx === currentStepIndex) pct = Math.min(100, totalProgress % 100);

                const isActive = idx === currentStepIndex;
                const isCompleted = idx < currentStepIndex;

                return (
                  <div
                    key={idx}
                    className={`transition-opacity duration-500 ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'
                      }`}
                  >
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-[family-name:var(--font-inter)] text-white text-sm text-left font-medium">
                        {text}
                      </span>
                      <span className="text-gold text-xs font-bold">{Math.round(pct)}%</span>
                    </div>
                    {/* Barra Dourada sobre fundo escuro */}
                    <div className="h-2 bg-navy-light rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-gold to-yellow-400 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </>
    );
  }

  // ÔöÇÔöÇ QUESTION (padr├úo: s1ÔåÆs13) ÔöÇÔöÇ
  return (
    <>
      <Head>
        <title>M├úe que Ora ÔÇö Diagn├│stico</title>
        <meta
          name="description"
          content="Diagn├│stico espiritual personalizado para m├úes que querem transformar a vida dos seus filhos."
        />
      </Head>

      <main className="min-h-screen bg-navy flex flex-col">
        <header className="bg-navy-light/50 py-4 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              M├úe que ora, transforma!
            </span>
          </div>
        </header>

        <section className="flex-1 px-4 py-10 bg-navy">
          <div className="max-w-xl mx-auto">
            <ProgressBar current={step} total={TOTAL_QUESTIONS} />

            <GoldDivider />

            <div
              className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-white text-xl sm:text-2xl font-bold leading-tight text-center mb-8 animate-fade-in-up">
                {currentStep.question}
              </h2>

              <div className="space-y-3">
                {currentStep.options.map((opt, i) => (
                  <OptionCard key={i} option={opt} index={i} onSelect={handleOptionSelect} />
                ))}
              </div>
            </div>

            <GoldDivider />

            <p className="text-center font-[family-name:var(--font-inter)] text-white/30 text-xs">
              &#x1F512; Suas respostas s├úo confidenciais e servem apenas para personalizar sua
              experi├¬ncia.
            </p>
          </div>
        </section>

        <footer className="bg-navy py-6 px-4 text-center">
          <p className="font-[family-name:var(--font-inter)] text-white/40 text-xs">
            &copy; {new Date().getFullYear()} M├úe que Ora ÔÇö Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
