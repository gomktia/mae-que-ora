import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

/* ───────────────────────────────────────────
   Quiz de 15 etapas (sa + s1→s13 + loader s14)
   Fluxo linear de engajamento emocional.
   Todas as respostas levam à mesma próxima etapa.
   ─────────────────────────────────────────── */

const STEPS = [
  // 0 — sa (landing)
  {
    type: 'landing',
    headline: 'Existe uma oração capaz de transformar a vida do seu filho hoje.',
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
  // 5 — s5
  {
    question: 'Se você pudesse mudar UMA coisa na vida do seu filho(a), seria:',
    options: [
      { text: 'Mais paz e leveza' },
      { text: 'Mais proteção espiritual' },
      { text: 'Relacionamento mais próximo comigo' },
      { text: 'Propósito e direção de vida' },
    ],
  },
  // 6 — s6
  {
    question: 'Qual frase mais se aproxima do que você sente hoje?',
    options: [
      { emoji: '😔', text: 'Sinto que estou perdendo meu filho(a) aos poucos' },
      { emoji: '🌧️', text: 'Tenho medo do futuro dele(a)' },
      { emoji: '🔄', text: 'Já tentei de tudo e nada parece mudar' },
      { emoji: '🔮', text: 'Sinto que só Deus pode fazer algo por ele(a)' },
    ],
  },
  // 7 — s7
  {
    question: 'Qual é a MAIOR preocupação com seu filho(a)?',
    options: [
      { emoji: '😔', text: 'Comportamento e atitudes' },
      { emoji: '😟', text: 'Emoções e paz interior' },
      { emoji: '😰', text: 'Relacionamentos' },
      { emoji: '💔', text: 'Vida espiritual' },
    ],
  },
  // 8 — s8
  {
    question: 'Qual é a idade do seu filho(a)?',
    options: [
      { text: '0-5 anos' },
      { text: '6-12 anos' },
      { text: '13-17 anos' },
      { text: '18+ anos' },
    ],
  },
  // 9 — s9 (social proof)
  {
    type: 'social_proof',
    headline: 'Essas mães também sofreram muito pelos seus filhos...',
    highlight: 'Dê uma olhada, você vai se identificar!',
    cta: 'CONTINUAR',
  },
  // 10 — s10
  {
    question: 'Qual dessas frases mais representa o que você sente hoje?',
    options: [
      { emoji: '😔', text: 'Eu quero acreditar que ainda há esperança' },
      { emoji: '🌧️', text: 'Tenho chorado muito por causa disso' },
      { emoji: '🔄', text: 'Estou disposta a fazer qualquer coisa pelo meu filho(a)' },
      { emoji: '🔮', text: 'Preciso de uma direção, de um caminho' },
    ],
  },
  // 11 — s11
  {
    question: 'Você já tentou orar pelo seu filho(a) antes?',
    options: [
      { text: 'Sim, mas não vi resultado' },
      { text: 'Sim, e vi alguma mudança' },
      { text: 'Não, nunca tentei' },
      { text: 'Oro todos os dias, mas quero orar com mais direção' },
    ],
  },
  // 12 — s12
  {
    question:
      'Se existisse um plano de oração de 14 dias específico para o seu filho(a), você faria?',
    options: [
      { text: 'Com certeza! Preciso disso!' },
      { text: 'Sim, se fosse algo prático e fácil de seguir' },
      { text: 'Talvez, depende do que inclui' },
      { text: 'Não tenho certeza' },
    ],
  },
  // 13 — s13
  {
    question:
      'O que você estaria disposta a investir para ver a transformação na vida do seu filho(a)?',
    options: [
      { text: 'Qualquer valor se realmente funcionar' },
      { text: 'Algo acessível' },
      { text: 'O mínimo possível' },
      { text: 'Nada, quero algo gratuito' },
    ],
  },
  // 14 — s14 (loader)
  {
    type: 'loader',
    headline: 'Estamos Preparando Seu Diagnóstico...',
    subtitle: 'Analisando suas respostas para encontrar as orações perfeitas para o seu filho(a)',
  },
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
        <span className="font-[family-name:var(--font-inter)] text-navy/40 text-xs">
          Pergunta {current} de {total - 2}
        </span>
        <span className="font-[family-name:var(--font-inter)] text-gold text-xs font-semibold">
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 bg-ice rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-500 ease-out"
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
      className="group w-full text-left bg-white border border-ice rounded-xl p-5
                 shadow-sm hover:shadow-lg hover:border-gold/50
                 transition-all duration-300 ease-out cursor-pointer
                 animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="flex items-center gap-4">
        {option.emoji && (
          <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {option.emoji}
          </span>
        )}
        <span className="font-[family-name:var(--font-inter)] text-navy text-sm sm:text-base leading-snug group-hover:text-gold transition-colors duration-300">
          {option.text}
        </span>
        <span className="ml-auto flex-shrink-0 text-navy/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300">
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
  const [loaderProgress, setLoaderProgress] = useState(0);

  const currentStep = STEPS[step];

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

    const duration = 5000; // 5 seconds
    const interval = 50;
    let elapsed = 0;

    const id = setInterval(() => {
      elapsed += interval;
      setLoaderProgress(Math.min(100, Math.round((elapsed / duration) * 100)));
      if (elapsed >= duration) {
        clearInterval(id);
        router.push('/vsl?dor=diagnostico');
      }
    }, interval);

    return () => clearInterval(id);
  }, [currentStep, router]);

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
                Mãe que Ora
              </span>
            </div>
          </header>

          <section className="bg-gradient-to-b from-navy to-navy-light py-16 px-4 text-center flex-1 flex items-center">
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <span className="inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Diagnóstico Espiritual Personalizado
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                {currentStep.headline}{' '}
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

              <p className="text-center font-[family-name:var(--font-inter)] text-white/30 text-xs mt-6">
                &#x1F512; Suas respostas são 100% confidenciais
              </p>
            </div>
          </section>

          <footer className="bg-navy py-6 px-4 text-center">
            <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">
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

        <main className="min-h-screen bg-snow flex flex-col">
          <header className="bg-navy py-4">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
                Mãe que Ora
              </span>
            </div>
          </header>

          <section className="flex-1 px-4 py-10 bg-snow">
            <div className="max-w-xl mx-auto">
              <ProgressBar current={step} total={TOTAL_QUESTIONS} />

              <div className="mt-8 animate-fade-in-up text-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-navy text-2xl sm:text-3xl font-bold leading-tight mb-2">
                  {currentStep.headline}
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-gold text-base font-semibold mb-8">
                  {currentStep.highlight}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[1, 2, 3, 4].map((n) => (
                    <img
                      key={n}
                      src={`/assets/depoimento-0${n}.png`}
                      alt={`Depoimento ${n}`}
                      className="rounded-xl shadow-sm w-full h-auto"
                    />
                  ))}
                </div>

                <button
                  onClick={advance}
                  className="inline-block w-full max-w-sm mx-auto bg-green-cta text-white text-center
                            font-[family-name:var(--font-inter)] font-bold text-base tracking-wide
                            py-4 px-8 rounded-full shadow-lg
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
            <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">
              &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            </p>
          </footer>
        </main>
      </>
    );
  }

  // ── LOADER (s14) ──
  if (currentStep.type === 'loader') {
    return (
      <>
        <Head>
          <title>Mãe que Ora — Preparando Diagnóstico...</title>
        </Head>

        <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center animate-fade-in-up">
            <div className="mb-8">
              <span className="text-5xl block mb-4">🙏</span>
              <h1 className="font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold leading-tight mb-3">
                {currentStep.headline}
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-white/60 text-sm leading-relaxed">
                {currentStep.subtitle}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${loaderProgress}%` }}
                />
              </div>
              <p className="font-[family-name:var(--font-inter)] text-gold text-sm font-semibold">
                {loaderProgress}%
              </p>
            </div>

            <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs mt-8">
              Por favor, não feche esta página...
            </p>
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

      <main className="min-h-screen bg-snow flex flex-col">
        <header className="bg-navy py-4">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que Ora
            </span>
          </div>
        </header>

        <section className="flex-1 px-4 py-10 bg-snow">
          <div className="max-w-xl mx-auto">
            <ProgressBar current={step} total={TOTAL_QUESTIONS} />

            <GoldDivider />

            <div
              className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl sm:text-2xl font-bold leading-tight text-center mb-8 animate-fade-in-up">
                {currentStep.question}
              </h2>

              <div className="space-y-3">
                {currentStep.options.map((opt, i) => (
                  <OptionCard key={i} option={opt} index={i} onSelect={advance} />
                ))}
              </div>
            </div>

            <GoldDivider />

            <p className="text-center font-[family-name:var(--font-inter)] text-navy/40 text-xs">
              &#x1F512; Suas respostas são confidenciais e servem apenas para personalizar sua
              experiência.
            </p>
          </div>
        </section>

        <footer className="bg-navy py-6 px-4 text-center">
          <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
