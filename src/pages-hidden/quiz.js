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
  // 5 — s14 (Conclusion / Capture Replacement) -- REMOVED BY REQUEST
  // The flow now goes directly from the last question to the loader.
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
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-[family-name:var(--font-inter)] text-[#3E2C22]/60 text-[10px] font-black uppercase tracking-widest">
          Pergunta {current} de {total - 1}
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

function OptionCard({ option, index, onSelect }) {
  return (
    <button
      onClick={() => onSelect(index)}
      className="group w-full text-left bg-white hover:bg-[#FDFCFB] border border-bronze/10 rounded-xl p-4 sm:p-5
                 shadow-sm hover:shadow-md hover:border-bronze/30 hover:-translate-y-0.5
                 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-center gap-4 sm:gap-6 relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-sand flex items-center justify-center text-lg sm:text-xl shadow-inner group-hover:bg-bronze group-hover:text-white transition-colors duration-300">
          {option.emoji || (index + 1)}
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[#3E2C22] text-lg sm:text-xl leading-snug font-bold">
          {option.text}
        </span>
        <span className="ml-auto flex-shrink-0 text-bronze/30 group-hover:text-bronze group-hover:translate-x-1 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
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
    }, 300);
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
      <main className="min-h-screen bg-black relative flex flex-col items-center justify-between py-10 px-6 overflow-hidden">
        {/* Background Overlay Image */}
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

        {/* Top Card Section */}
        <div className="relative z-10 w-full max-w-[380px] md:max-w-2xl bg-white/50 backdrop-blur-lg rounded-[2.5rem] p-8 sm:p-12 shadow-xl animate-fade-in-up border border-white/40 ring-1 ring-white/60">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 text-center drop-shadow-sm">
              {currentStep.headline}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#3E2C22] text-lg sm:text-xl md:text-2xl leading-relaxed font-bold text-center drop-shadow-sm">
              Analisamos suas respostas e encontramos um caminho de oração específico para o seu caso.
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Bottom Action Area */}
        <div className="relative z-10 w-full max-w-[380px] md:max-w-md flex flex-col items-center animate-fade-in-up">
          <button
            onClick={advance}
            className="group w-full bg-[#A37838] text-white font-[family-name:var(--font-inter)] font-black text-lg py-6 px-4 rounded-full shadow-[0_15px_40px_-5px_rgba(163,120,56,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 border border-white/10"
          >
            <span className="uppercase tracking-tight">{currentStep.cta}</span>
            <span className="text-3xl leading-none group-hover:translate-x-2 transition-transform">&rarr;</span>
          </button>

          <div className="mt-8 flex items-center gap-2 text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full border border-white/5">
            <span className="text-sm">🔒</span>
            <span>Diagnóstico confidencial</span>
          </div>

          <div className="mt-8 opacity-30">
            <p className="font-[family-name:var(--font-inter)] text-white text-[10px] font-black uppercase tracking-[0.4em]">
              &copy; 2026 MÃE QUE ORA
            </p>
          </div>
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
      <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-6 overflow-hidden">
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

        <div className="max-w-[380px] md:max-w-2xl w-full z-10 bg-white/60 backdrop-blur-lg rounded-[2.5rem] p-8 sm:p-12 shadow-2xl animate-fade-in text-center border border-white/50 ring-1 ring-white/60 relative overflow-hidden">
          {/* Decorative shine effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-sm mb-4">
              {currentStep.headline}
            </h1>
            <div className="w-16 h-1 bg-[#A37838]/30 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="w-full space-y-6 md:space-y-8">
            {loadingSteps.map((text, idx) => {
              const currentStepIndex = Math.floor(totalProgress / 100);
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${isActive || isCompleted ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}
                >
                  <div className="flex justify-between items-end mb-2">
                    <span className={`font-[family-name:var(--font-inter)] text-lg sm:text-xl font-bold text-[#3E2C22] tracking-tight ${isActive ? 'text-[#A37838]' : ''}`}>
                      {text}
                    </span>
                    {isCompleted && (
                      <span className="text-[#A37838] text-lg animate-fade-in">✓</span>
                    )}
                  </div>
                  <div className="h-2 w-full bg-[#3E2C22]/10 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ease-out ${isCompleted ? 'bg-[#A37838] w-full shadow-[0_0_10px_rgba(163,120,56,0.5)]' : isActive ? 'bg-[#A37838]' : 'w-0'}`}
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

      <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background Overlay */}
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

        {/* Top Header - Minimal */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-center z-20">
          <span className="font-[family-name:var(--font-playfair)] text-white/90 text-lg font-black tracking-tight drop-shadow-md">
            Mãe que ora, transforma!
          </span>
        </div>

        <section className="relative z-10 w-full max-w-[380px] md:max-w-3xl">
          {/* Main Quiz Card */}
          <div className="bg-white/50 backdrop-blur-lg p-6 sm:p-8 rounded-[2rem] shadow-xl animate-fade-in border border-white/40 ring-1 ring-white/60">
            <ProgressBar current={step + 1} total={TOTAL_QUESTIONS} />

            <div
              className={`transition-opacity duration-300 mt-6 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-center mb-8 md:mb-12 animate-fade-in-up drop-shadow-sm">
                {currentStep.question}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {currentStep.options.map((opt, i) => (
                  <OptionCard key={i} option={opt} index={i} onSelect={handleOptionSelect} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-1.5 text-[#3E2C22]/40 text-[10px] sm:text-xs font-[family-name:var(--font-inter)] font-bold uppercase tracking-widest">
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
