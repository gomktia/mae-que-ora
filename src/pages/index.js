import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

/* ───────────────────────────────────────────
   Quiz — Formato de clique único por tela.
   Cada tela avança ao clicar no botão CTA.
   Intro → 3 perguntas → Loader → Resultado
   ─────────────────────────────────────────── */

const STEPS = [
  // 0 — Tela de entrada
  {
    type: 'intro',
    headline:
      'Descubra se o seu filho(a) anda passando por problemas espirituais e qual oração deve fazer por ele.',
    cta: 'Quero muito ajudar meu filho(a)',
  },
  // 1 — Situações do filho
  {
    type: 'confirm',
    question: 'O seu filho(a) está passando por alguma dessas situações?',
    items: [
      { emoji: '😔', text: 'Não parece viver em paz, não dorme direito e passa o dia no quarto' },
      { emoji: '😟', text: 'Está inquieto(a), agressivo(a) ou distante' },
      { emoji: '😰', text: 'Carrega problemas emocionais e psicológicos difíceis' },
      { emoji: '😭', text: 'Está com problemas de saúde e não encontra uma solução' },
      { emoji: '😱', text: 'Está em más companhias e se envolvendo com coisas erradas' },
    ],
    cta: '💔 Sim! Eu estou angustiada por isso!',
  },
  // 2 — Tempo da situação
  {
    type: 'confirm',
    question: 'Seu filho(a) está nessa situação há mais de um mês ou até mesmo anos?',
    items: [],
    cta: 'Sim! Eu sinto que preciso de ajuda urgente para libertá-lo(a)!',
  },
  // 3 — Sensações da mãe
  {
    type: 'confirm',
    question: 'Quando pensa no seu filho, tem alguma dessas sensações?',
    items: [
      { emoji: '😔', text: 'Medo de não estar no caminho certo' },
      { emoji: '😟', text: 'Medo de estar falhando como mãe' },
      { emoji: '😰', text: 'Medo de perdê-lo(a) para o mundo' },
      { emoji: '😥', text: 'Se culpa e se sente ansiosa quase todos os dias' },
      { emoji: '💔', text: 'Um aperto no peito difícil de explicar' },
    ],
    cta: '💔 Sim! Quero que tudo isso passe, estou exausta!',
  },
  // 4 — Tela de carregamento
  {
    type: 'loader',
    headline: 'Gerando seu Diagnóstico Personalizado...',
  },
  // 5 — Resultado com botão verde pulsante
  {
    type: 'result',
    headline: 'Seu diagnóstico está pronto!',
    subtext:
      'Analisamos suas respostas e encontramos a oração certa para o seu filho(a). Clique abaixo para ver o resultado completo.',
    cta: 'VER MEU DIAGNÓSTICO AGORA',
  },
];

/* ── Componentes auxiliares ─────────────────── */

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-[family-name:var(--font-inter)] text-[#3E2C22]/60 text-[10px] font-black uppercase tracking-widest">
          Pergunta {current} de {total}
        </span>
        <span className="font-[family-name:var(--font-inter)] text-bronze text-xs font-black">
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 bg-[#3E2C22]/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-bronze rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Página principal do Quiz ───────────────── */

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);

  const currentStep = STEPS[step];

  const advance = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
      setTransitioning(false);
    }, 300);
  }, []);

  /* Loader — avança automaticamente para tela de resultado */
  useEffect(() => {
    if (currentStep.type !== 'loader') return;

    const numberOfSteps = 5;
    const durationPerStep = 1800;
    const intervalTime = 50;
    let done = false;

    const id = setInterval(() => {
      setTotalProgress((prev) => {
        const increment = (100 / durationPerStep) * intervalTime;
        const next = prev + increment;
        if (next >= numberOfSteps * 100 && !done) {
          clearInterval(id);
          done = true;
          setTimeout(() => setStep((s) => s + 1), 600);
          return numberOfSteps * 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(id);
  }, [currentStep]);

  /* ── INTRO ── */
  if (currentStep.type === 'intro') {
    return (
      <>
        <Head>
          <title>Mãe que Ora — Diagnóstico Espiritual</title>
        </Head>

        <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/landingpage/01.jpeg"
              alt="Fundo Devocional"
              layout="fill"
              objectFit="cover"
              className="opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <section className="relative z-10 w-full max-w-[92vw] sm:max-w-[380px] md:max-w-2xl mx-auto">
            <div
              className={`bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-xl animate-fade-in-up border border-white/60 ring-1 ring-white/70 transition-opacity duration-300 ${
                transitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="text-center mb-8 sm:mb-10">
                <h1 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-xl sm:text-2xl md:text-4xl font-black leading-tight drop-shadow-sm">
                  {currentStep.headline}
                </h1>
              </div>

              <button
                onClick={advance}
                className="group w-full bg-[#A37838] text-white font-[family-name:var(--font-inter)] font-black text-lg sm:text-xl py-5 sm:py-6 px-6 rounded-full shadow-[0_15px_40px_-5px_rgba(163,120,56,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-white/10 cursor-pointer"
              >
                <span>{currentStep.cta}</span>
                <span className="text-2xl leading-none group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-[#3E2C22]/40 text-[10px] sm:text-xs font-[family-name:var(--font-inter)] font-bold uppercase tracking-widest">
                <span>🔒</span>
                <span>Diagnóstico confidencial</span>
              </div>
            </div>
          </section>

          <footer className="absolute bottom-4 left-0 right-0 z-10 text-center pointer-events-none">
            <p className="font-[family-name:var(--font-inter)] text-white/20 text-[9px] font-black tracking-[0.3em] uppercase">
              &copy; 2026 Mãe que Ora
            </p>
          </footer>
        </main>
      </>
    );
  }

  /* ── CONFIRM (pergunta + lista de situações + botão único) ── */
  if (currentStep.type === 'confirm') {
    const questionNumber = step; // steps 1,2,3 → perguntas 1,2,3
    const hasItems = currentStep.items && currentStep.items.length > 0;

    return (
      <>
        <Head>
          <title>Mãe que Ora — Diagnóstico</title>
        </Head>

        <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/landingpage/01.jpeg"
              alt="Fundo Devocional"
              layout="fill"
              objectFit="cover"
              className="opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-center z-20">
            <span className="font-[family-name:var(--font-playfair)] text-white/90 text-lg font-black tracking-tight drop-shadow-md">
              Mãe que ora, transforma!
            </span>
          </div>

          <section className="relative z-10 w-full max-w-[92vw] sm:max-w-[380px] md:max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-[2rem] shadow-xl animate-fade-in border border-white/60 ring-1 ring-white/70">
              <ProgressBar current={questionNumber} total={3} />

              <div
                className={`transition-opacity duration-300 mt-5 sm:mt-6 ${
                  transitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {/* Pergunta */}
                <h2 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-xl sm:text-2xl md:text-4xl font-black leading-tight text-center mb-6 sm:mb-8 animate-fade-in-up drop-shadow-sm">
                  {currentStep.question}
                </h2>

                {/* Lista de situações (somente exibição) */}
                {hasItems && (
                  <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8">
                    {currentStep.items.map((item, i) => (
                      <div
                        key={i}
                        className="w-full text-left bg-white/90 border border-bronze/10 rounded-xl p-3 sm:p-4 shadow-sm animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-xl sm:text-2xl flex-shrink-0">
                            {item.emoji}
                          </span>
                          <span className="font-[family-name:var(--font-inter)] text-[#3E2C22] text-sm sm:text-base md:text-lg leading-snug font-bold">
                            {item.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Botão CTA único */}
                <button
                  onClick={advance}
                  className="group w-full bg-[#A37838] text-white font-[family-name:var(--font-inter)] font-black text-base sm:text-lg md:text-xl py-4 sm:py-5 md:py-6 px-4 sm:px-6 rounded-full shadow-[0_15px_40px_-5px_rgba(163,120,56,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 cursor-pointer animate-bounce-slow"
                >
                  <span className="text-center leading-tight">{currentStep.cta}</span>
                </button>
              </div>

              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1.5 text-[#3E2C22]/40 text-[10px] sm:text-xs font-[family-name:var(--font-inter)] font-bold uppercase tracking-widest">
                <span>🔒</span>
                <span>Resposta confidencial</span>
              </div>
            </div>
          </section>

          <footer className="absolute bottom-4 left-0 right-0 z-10 text-center pointer-events-none">
            <p className="font-[family-name:var(--font-inter)] text-white/20 text-[9px] font-black tracking-[0.3em] uppercase">
              &copy; 2026 Mãe que Ora
            </p>
          </footer>
        </main>
      </>
    );
  }

  /* ── LOADER ── */
  if (currentStep.type === 'loader') {
    const loadingSteps = [
      'Analisando Perfil Espiritual...',
      'Identificando Raízes Emocionais...',
      'Cruzando Dados de Comportamento...',
      'Verificando Linhagem e Herança...',
      'Gerando Diagnóstico Final...',
    ];

    return (
      <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landingpage/04.jpeg"
            alt="Espírito Santo"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-white/10 to-black/40" />
        </div>

        <div className="max-w-[92vw] sm:max-w-[380px] md:max-w-2xl w-full z-10 bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl animate-fade-in text-center border border-white/60 ring-1 ring-white/70 relative overflow-hidden mx-auto">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

          <div className="mb-8 sm:mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-xl sm:text-3xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-sm mb-4">
              {currentStep.headline}
            </h1>
            <div className="w-16 h-1 bg-[#A37838]/30 mx-auto rounded-full mt-4 sm:mt-6"></div>
          </div>

          <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
            {loadingSteps.map((text, idx) => {
              const currentStepIndex = Math.floor(totalProgress / 100);
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${
                    isActive || isCompleted ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'
                  }`}
                >
                  <div className="flex justify-between items-end mb-2">
                    <span
                      className={`font-[family-name:var(--font-inter)] text-sm sm:text-lg md:text-xl font-bold text-[#3E2C22] tracking-tight text-left ${
                        isActive ? 'text-[#A37838]' : ''
                      }`}
                    >
                      {text}
                    </span>
                    {isCompleted && (
                      <span className="text-[#A37838] text-base sm:text-lg animate-fade-in flex-shrink-0">✓</span>
                    )}
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-[#3E2C22]/10 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ease-out ${
                        isCompleted
                          ? 'bg-[#A37838] w-full shadow-[0_0_10px_rgba(163,120,56,0.5)]'
                          : isActive
                          ? 'bg-[#A37838]'
                          : 'w-0'
                      }`}
                      style={{
                        width: isActive
                          ? `${Math.round(totalProgress % 100)}%`
                          : isCompleted
                          ? '100%'
                          : '0%',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  /* ── RESULTADO — botão verde pulsante ── */
  if (currentStep.type === 'result') {
    return (
      <>
        <Head>
          <title>Mãe que Ora — Diagnóstico Pronto</title>
        </Head>

        <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/landingpage/02.jpeg"
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </div>

          <section className="relative z-10 w-full max-w-[92vw] sm:max-w-[380px] md:max-w-2xl mx-auto animate-fade-in-up">
            {/* Card de resultado */}
            <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-white/60 ring-1 ring-white/70 text-center mb-6 sm:mb-8">
              <span className="inline-block text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">✅</span>
              <h1 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-2xl sm:text-3xl md:text-5xl font-black leading-tight drop-shadow-sm mb-3 sm:mb-4">
                {currentStep.headline}
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-[#3E2C22]/80 text-base sm:text-lg md:text-xl leading-relaxed font-bold">
                {currentStep.subtext}
              </p>
            </div>

            {/* Botão verde pulsante */}
            <button
              onClick={() => router.push('/vsl?video=s10&dor=diagnostico')}
              className="group w-full bg-[#1a9d55] hover:bg-[#158247] text-white font-[family-name:var(--font-inter)] font-black text-lg sm:text-xl md:text-3xl py-5 sm:py-6 md:py-8 px-4 sm:px-6 rounded-full shadow-[0_20px_50px_-5px_rgba(26,157,85,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 border-2 border-white/20 cursor-pointer animate-pulse-gentle"
            >
              <span>{currentStep.cta}</span>
              <span className="text-2xl sm:text-3xl md:text-4xl leading-none group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full border border-white/5">
              <span className="text-sm">🔒</span>
              <span>Diagnóstico confidencial</span>
            </div>
          </section>

          <footer className="absolute bottom-4 left-0 right-0 z-10 text-center pointer-events-none">
            <p className="font-[family-name:var(--font-inter)] text-white/20 text-[9px] font-black tracking-[0.3em] uppercase">
              &copy; 2026 Mãe que Ora
            </p>
          </footer>
        </main>
      </>
    );
  }

  return null;
}
