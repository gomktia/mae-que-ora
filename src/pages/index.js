import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

/* ───────────────────────────────────────────
   Quiz de 15 etapas (sa + s1→s13 + loader s14)
   Fluxo linear de engajamento emocional.
   Todas as respostas levam à mesma próxima etapa.
   ─────────────────────────────────────────── */

const STEPS = [
  // 1 — s1
  {
    question: 'O que tem pesado no seu coração em relação à vida do seu filho(a)?',
    options: [
      { emoji: '😔', text: 'Ele(a) não parece viver com a paz que deveria.' },
      { emoji: '😟', text: 'Algo nele(a) me deixa inquieta, mesmo quando tudo parece normal.' },
      { emoji: '😰', text: 'Sinto que ele(a) carrega um peso que não sei tirar.' },
      { emoji: '💔', text: 'Meu coração sente que algo não está certo.' },
    ],
  },
  // 2 — s2
  {
    question: 'Há quanto tempo isso te preocupa?',
    options: [
      { text: 'Menos de 1 mês.' },
      { text: '1-6 meses.' },
      { text: '6 meses - 1 ano.' },
      { text: 'Mais de 1 ano.' },
    ],
  },
  // 3 — s3
  {
    question: 'Sobre a vida do seu filho(a), qual pensamento volta com frequência?',
    options: [
      { emoji: '😔', text: 'Será que ele(a) está no caminho certo?' },
      { emoji: '😟', text: 'E se eu não estiver fazendo o suficiente?' },
      { emoji: '😰', text: 'Tenho medo de perdê-lo(a) para o mundo.' },
      { emoji: '💔', text: 'Sinto que algo precisa mudar, mas não sei como.' },
    ],
  },
  // 4 — s4
  {
    question: 'Quando você tenta entender o que está acontecendo, o que mais sente?',
    options: [
      { text: 'Confusão por não saber a causa.' },
      { text: 'Angústia por não conseguir ajudar.' },
      { text: 'Medo de estar falhando como mãe.' },
      { text: 'Um aperto no coração difícil de explicar.' },
    ],
  },
  // 5 — s14 (Conclusion / Capture Replacement)
  {
    type: 'capture',
    headline: 'Seu diagnóstico está pronto.',
    cta: 'VER MEU DIAGNÓSTICO AGORA',
    isConclusion: true,
  },
  // 6 — Loader
  {
    type: 'loader',
    headline: 'Gerando seu Diagnóstico Personalizado...',
  },
];

const TOTAL_QUESTIONS = STEPS.length;

/* ── Componentes auxiliares ─────────────────── */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-bronze opacity-40" />
      <span className="text-bronze text-2xl filter drop-shadow-[0_0_8px_rgba(163,120,56,0.3)]">✦</span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-bronze opacity-40" />
    </div>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-3">
        <span className="font-[family-name:var(--font-inter)] text-[#3E2C22]/60 text-xs font-bold uppercase tracking-widest">
          Progresso do Diagnóstico
        </span>
        <span className="font-[family-name:var(--font-inter)] text-bronze text-sm font-black">
          {pct}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-[#3E2C22]/5 rounded-full overflow-hidden border border-[#3E2C22]/5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-bronze to-amber-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(163,120,56,0.4)]"
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
      className="group w-full text-left bg-white/60 hover:bg-white backdrop-blur-sm border border-bronze/10 rounded-2xl p-5
                 shadow-sm hover:shadow-xl hover:shadow-bronze/10 hover:-translate-y-1
                 transition-all duration-400 ease-out cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-center gap-5 relative z-10">
        <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-lg shadow-sm group-hover:bg-bronze group-hover:text-white transition-colors duration-400">
          {option.emoji || (index + 1)}
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[#3E2C22] text-base sm:text-lg leading-snug font-bold">
          {option.text}
        </span>
        <span className="ml-auto flex-shrink-0 text-bronze/40 group-hover:text-bronze group-hover:translate-x-1 transition-all duration-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
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
    }, 400);
  }, [step]);

  // Loader auto-redirect
  useEffect(() => {
    if (currentStep.type !== 'loader') return;

    const numberOfSteps = 5;
    const durationPerStep = 1800; // 1.8s per step
    const intervalTime = 50;

    const id = setInterval(() => {
      setTotalProgress((prev) => {
        const increment = (100 / durationPerStep) * intervalTime;
        const next = prev + increment;
        if (next >= numberOfSteps * 100) {
          clearInterval(id);
          router.push(`/vsl?video=s10&dor=diagnostico`);
          return numberOfSteps * 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(id);
  }, [currentStep, router]);

  // ── CAPTURE STEP (Conclusion Screen) ──
  if (currentStep.type === 'capture') {
    return (
      <main className="min-h-screen bg-sand relative flex flex-col items-center justify-center p-4">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landingpage/01.jpeg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-15 grayscale-[30%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-transparent to-sand/80" />
        </div>

        <div className="max-w-lg w-full z-10 bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-bronze/20 shadow-2xl animate-fade-in text-center">
          <div className="mb-8">
            <span className="text-6xl block mb-6 animate-bounce-slow">✨</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-3xl sm:text-4xl font-black leading-tight mb-4">
              {currentStep.headline}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#3E2C22]/80 text-lg leading-relaxed">
              Analisamos suas respostas e encontramos um caminho de oração específico para o seu caso.
            </p>
          </div>

          <button
            onClick={advance}
            className="w-full bg-bronze text-white font-[family-name:var(--font-inter)] font-black text-xl tracking-wide py-6 rounded-2xl shadow-[0_10px_25px_-5px_rgba(163,120,56,0.4)] hover:bg-[#8e682f] hover:scale-[1.02] active:scale-95 transition-all animate-pulse-gentle cursor-pointer"
          >
            {currentStep.cta}
          </button>

          <p className="text-[#3E2C22]/40 text-xs mt-8 flex items-center justify-center gap-2">
            <span>🔒</span> Diagnóstico confidencial e seguro.
          </p>
        </div>
      </main>
    );
  }

  // ── LOADER ──
  if (currentStep.type === 'loader') {
    const loadingSteps = [
      'Analisando Perfil Espiritual...',
      'Identificando Raízes Emocionais...',
      'Cruzando Dados de Comportamento...',
      'Verificando Linhagem e Herança...',
      'Gerando Diagnóstico Final...',
    ];

    return (
      <main className="min-h-screen bg-sand relative flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landingpage/01.jpeg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-15 grayscale-[30%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-transparent to-sand/80" />
        </div>

        <div className="max-w-lg w-full z-10 bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-bronze/20 shadow-2xl animate-fade-in text-center">
          <div className="mb-10">
            <span className="text-6xl block mb-6 animate-pulse-gentle">🙏</span>
            <h1 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-3xl sm:text-4xl font-black leading-tight tracking-tight">
              {currentStep.headline}
            </h1>
          </div>

          <div className="w-full space-y-6">
            {loadingSteps.map((text, idx) => {
              const currentStepIndex = Math.floor(totalProgress / 100);
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-500 ${isActive || isCompleted ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-2'
                    }`}
                >
                  <div className="flex justify-between items-end mb-2">
                    <span className={`font-[family-name:var(--font-inter)] text-base sm:text-lg font-bold text-[#3E2C22] ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                      {text}
                    </span>
                    <span className={`font-[family-name:var(--font-inter)] text-sm sm:text-base font-black ${isCompleted ? 'text-[#3E2C22]' : isActive ? 'text-bronze' : 'text-[#3E2C22]/40'}`}>
                      {isCompleted ? '100%' : isActive ? `${Math.round(totalProgress % 100)}%` : '0%'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#3E2C22]/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-bronze w-full' : isActive ? 'bg-gradient-to-r from-bronze to-amber-500' : 'w-0'
                        }`}
                      style={{ width: isActive ? `${Math.round(totalProgress % 100)}%` : isCompleted ? '100%' : '0%' }}
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

  // ── QUESTION STEP ──
  return (
    <>
      <Head>
        <title>Mãe que Ora — Diagnóstico</title>
      </Head>

      <main className="min-h-screen bg-sand relative flex flex-col">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landingpage/02.jpeg"
            alt="Fundo Devocional"
            layout="fill"
            objectFit="cover"
            className="opacity-15 grayscale-[20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/50 via-transparent to-sand/50" />
        </div>

        <header className="relative z-10 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-bronze text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">
              Mãe que ora, transforma!
            </span>
            <div className="w-16 h-1 bg-bronze/30 mx-auto mt-2 rounded-full" />
          </div>
        </header>

        <section className="relative z-10 flex-1 px-4 py-8 sm:py-12 flex items-center justify-center">
          <div className="w-full max-w-xl">
            {/* Main Quiz Card */}
            <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-bronze/20 shadow-2xl animate-fade-in">
              <ProgressBar current={step + 1} total={TOTAL_QUESTIONS} />

              <div
                className={`transition-opacity duration-300 mt-8 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-2xl sm:text-3xl font-bold leading-tight text-center mb-10 animate-fade-in-up">
                  {currentStep.question}
                </h2>

                <div className="space-y-4">
                  {currentStep.options.map((opt, i) => (
                    <OptionCard key={i} option={opt} index={i} onSelect={handleOptionSelect} />
                  ))}
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-[#3E2C22]/40 text-xs sm:text-sm font-[family-name:var(--font-inter)]">
                <span>🔒</span>
                <span>Suas respostas são confidenciais e seguras.</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 py-10 px-4 text-center">
          <p className="font-[family-name:var(--font-inter)] text-[#3E2C22]/40 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
