import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';

/* ───────────────────────────────────────────
   Quiz de 15 etapas (sa + s1→s13 + loader s14)
   Fluxo linear de engajamento emocional.
   Todas as respostas levam à mesma próxima etapa.
   ─────────────────────────────────────────── */

const STEPS = [
  // 0 — sa (landing)
  {
    type: 'landing',
    headline: '',
    highlight: 'Descubra qual é!',
    subtitle:
      'Responda essas perguntas rápidas e receba um diagnóstico personalizado sobre a vida espiritual do seu filho(a) + as orações exatas que você precisa fazer hoje.',
    socialProof:
      'Mais de 3.247 mães já descobriram o caminho certo para transformar a vida de seus filhos através da oração direcionada',
    cta: 'COMEÇAR MEU DIAGNÓSTICO AGORA',
  },
  // 1 — s1
  {
    question: 'O que tem pesado no seu coração em relação à vida do seu filho(a)?',
    options: [
      { emoji: '😔', text: 'Ele(a) não parece viver com a paz que deveria' },
      { emoji: '😟', text: 'Algo nele(a) me deixa inquieta, mesmo quando tudo parece normal' },
      { emoji: '😰', text: 'Sinto que ele(a) carrega um peso que não sei tirar' },
      { emoji: '💔', text: 'Meu coração sente que algo não está certo' },
    ],
  },
  // 2 — s2
  {
    question: 'Há quanto tempo isso te preocupa?',
    options: [
      { text: 'Menos de 1 mês' },
      { text: '1-6 meses' },
      { text: '6 meses - 1 ano' },
      { text: 'Mais de 1 ano' },
    ],
  },
  // 3 — s3
  {
    question: 'Sobre a vida do seu filho(a), qual pensamento volta com frequência?',
    options: [
      { emoji: '😔', text: 'Será que ele(a) está no caminho certo?' },
      { emoji: '😟', text: 'E se eu não estiver fazendo o suficiente?' },
      { emoji: '😰', text: 'Tenho medo de perdê-lo(a) para o mundo' },
      { emoji: '💔', text: 'Sinto que algo precisa mudar, mas não sei como' },
    ],
  },
  // 4 — s4
  {
    question: 'Quando você tenta entender o que está acontecendo, o que mais sente?',
    options: [
      { text: 'Confusão por não saber a causa' },
      { text: 'Angústia por não conseguir ajudar' },
      { text: 'Medo de estar falhando como mãe' },
      { text: 'Um aperto no coração difícil de explicar' },
    ],
  },
  // 5 — s14 (Conclusion / Capture Replacement)
  {
    type: 'capture', // Using capture type to render the conclusion screen logic
    headline: 'Seu diagnóstico está pronto.',
    cta: 'VER MEU DIAGNÓSTICO AGORA',
    isConclusion: true, // Flag to identify this modified capture step
  },
  // 6 — Loader (Transição 5 Barras)
  {
    type: 'loader',
    headline: 'Gerando seu Diagnóstico Personalizado...',
  },
  /* 
  // PRESERVED STEPS (s5 - s13 + Bridge)
  // 5 — Capture (Old)
  {
    type: 'capture',
    headline: 'Para receber seu diagnóstico detalhado e as orações, preencha abaixo:',
    cta: 'CONTINUAR',
  },
  // 6 — s5
  {
    question: 'Se você pudesse mudar UMA coisa na vida do seu filho(a), seria:',
    options: [
      { text: 'Mais paz e leveza' },
      { text: 'Mais proteção espiritual' },
      { text: 'Relacionamento mais próximo comigo' },
      { text: 'Propósito e direção de vida' },
    ],
  },
  // ... (Other steps preserved in comments)
  */
];

const TOTAL_QUESTIONS = STEPS.length;

/* ── Componentes auxiliares ─────────────────── */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-lg">✦</span>
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

/* ── Página principal do Quiz ───────────────── */

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

  // ── LANDING (sa) ──
  if (currentStep.type === 'landing') {
    return (
      <>
        <Head>
          <title>Mãe que Ora — Diagnóstico Espiritual</title>
          <meta
            name="description"
            content="Descubra qual oração pode transformar a vida do seu filho. Diagnóstico espiritual personalizado para mães."
          />
        </Head>

        <main className="min-h-screen bg-snow flex flex-col">
          <header className="bg-navy py-4">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
                Mãe que ora, transforma!
              </span>
            </div>
          </header>

          <section className="bg-gradient-to-b from-navy to-navy-light py-16 px-4 text-center flex-1 flex items-center">
            <div className="max-w-2xl mx-auto">
              <span className="inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
                Diagnóstico Espiritual Personalizado
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
                &#x1F512; Suas respostas são 100% confidenciais
              </p>
            </div>
          </section>

          <footer className="bg-navy py-6 px-4 text-center">
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
              &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            </p>
          </footer>
        </main>
      </>
    );
  }

  // ── SOCIAL PROOF (s9) ──
  if (currentStep.type === 'social_proof') {
    return (
      <>
        <Head>
          <title>Mãe que Ora — Diagnóstico</title>
        </Head>

        <main className="min-h-screen bg-navy flex flex-col">
          <header className="bg-navy-light/50 py-4 shadow-sm">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
                Mãe que ora, transforma!
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
                  {/* Botão Esquerda */}
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

                  {/* Botão Direita */}
                  <button
                    onClick={() => document.getElementById('testimonials-scroll').scrollBy({ left: 300, behavior: 'smooth' })}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-navy-light/80 text-gold p-2 rounded-full shadow-lg border border-gold/20 hover:bg-navy hover:scale-110 transition-all hidden md:block"
                    aria-label="Próximo"
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
              &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            </p>
          </footer>
        </main>
      </>
    );
  }

  // ── LOADER (s14) ──
  // ── BRIDGE STEP (s15) ──
  // ── BRIDGE STEP (s15) ──
  if (currentStep.type === 'bridge') {
    const answerS5 = answers[6] || '';
    const isRelacionamento = answerS5.includes('Relacionamento');
    const isProtecao = answerS5.includes('Proteção');

    // Default to Relacionamento if neither (fallback)
    const showVideo = isRelacionamento || (!isRelacionamento && !isProtecao);

    return (
      <main className="min-h-screen bg-navy flex flex-col">
        <header className="bg-navy-light/50 py-4 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que ora, transforma!
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
                  Ela passou exatamente pelo que você está passando com <span className="text-gold font-bold">{displaySonName}</span>.
                </p>
              </>
            ) : (
              /* Bridge Statistic */
              <>
                <div className="border-2 border-gold/50 rounded-2xl overflow-hidden shadow-2xl shadow-gold/10 mb-8 max-w-sm mx-auto">
                  <img
                    src="/assets/estatistica-mae.jpg"
                    alt="87% das mães relataram mudanças"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-white/90 text-lg sm:text-xl mb-8 font-medium">
                  O diagnóstico de <span className="text-gold font-bold">{displaySonName}</span> vai te mostrar o caminho.
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
              Quero ver o diagnóstico de {displaySonName}
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ── CAPTURE STEP──
  // ── CAPTURE STEP (Modified for Conclusion) ──
  if (currentStep.type === 'capture') {
    return (
      <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full mx-auto bg-navy-light/30 border border-gold/10 p-6 rounded-2xl shadow-2xl animate-fade-in-up backdrop-blur-sm">
          <div className="text-center mb-8">
            <span className="text-5xl block mb-4">✨</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold leading-tight mb-4">
              {currentStep.headline}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-white/80 text-base leading-relaxed">
              Analisamos suas respostas e encontramos um caminho de oração específico para o seu caso.
            </p>
          </div>

          {/* Botão de Conclusão */}
          <button
            onClick={advance}
            className="w-full bg-gold text-navy font-[family-name:var(--font-inter)] font-bold text-lg sm:text-xl tracking-wide py-5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-gold-light hover:scale-105 transition-all animate-pulse-gentle"
          >
            {currentStep.cta}
          </button>

          <p className="text-center text-white/30 text-xs mt-6">
            🔒 Diagnóstico confidencial e seguro.
          </p>
        </div>
      </main>
    );
  }

  // ── FILTERED LOADER (s16) ──
  if (currentStep.type === 'loader') {
    const loadingSteps = [
      'Analisando Perfil Espiritual...',
      'Identificando Raízes Emocionais...',
      'Cruzando Dados de Comportamento...',
      'Verificando Linhagem e Herança...',
      'Gerando Diagnóstico Final...',
    ];

    return (
      <>
        <Head>
          <title>Mãe que Ora — Preparando Diagnóstico...</title>
        </Head>

        {/* Fundo Navy (Azul Escuro) com Dourado */}
        <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center animate-fade-in-up">
            <div className="mb-8">
              <span className="text-5xl block mb-4">🙏</span>
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

  // ── QUESTION (padrão: s1→s13) ──
  return (
    <>
      <Head>
        <title>Mãe que Ora — Diagnóstico</title>
        <meta
          name="description"
          content="Diagnóstico espiritual personalizado para mães que querem transformar a vida dos seus filhos."
        />
      </Head>

      <main className="min-h-screen bg-navy flex flex-col">
        <header className="bg-navy-light/50 py-4 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que ora, transforma!
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
              &#x1F512; Suas respostas são confidenciais e servem apenas para personalizar sua
              experiência.
            </p>
          </div>
        </section>

        <footer className="bg-navy py-6 px-4 text-center">
          <p className="font-[family-name:var(--font-inter)] text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
