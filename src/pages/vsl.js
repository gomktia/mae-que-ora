
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

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-2xl">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60" />
    </div>
  );
}

function GuaranteeSeal() {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/assets/garantia-7-dias.webp"
          alt="Garantia de 7 Dias"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="font-[family-name:var(--font-inter)] text-white/90 text-[16px] text-center max-w-sm leading-relaxed tracking-wide">
        Você tem <strong className="text-gold">7 dias de garantia incondicional</strong>.
        <br />Se não amar, devolvemos 100% do seu dinheiro.
      </p>
    </div>
  );
}

function TestimonialCard({ src, index }) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border border-gold/20 flex flex-col h-full bg-white">
      <div className="relative w-full aspect-square sm:aspect-[4/5]">
        <Image
          src={src}
          alt={`Depoimento ${index + 1}`}
          layout="fill"
          objectFit="contain"
          className="p-4"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function BonusCard({ title, items, subtitle }) {
  return (
    <div className="bg-white border-2 border-gold/50 rounded-2xl p-6 shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="text-4xl filter drop-shadow-sm animate-bounce-slow">🎁</div>
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-navy text-xl sm:text-2xl font-bold mb-1 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="font-[family-name:var(--font-inter)] text-gold font-bold text-sm uppercase tracking-wider mb-3">
              {subtitle}
            </p>
          )}
          <ul className="space-y-2 mt-2">
            {items.map((item, i) => (
              <li key={i} className="font-[family-name:var(--font-inter)] text-navy/80 text-base leading-[1.6]">
                {item}
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
    <div className="bg-white border border-gold/20 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col">
      {image ? (
        <div className="relative w-full aspect-square sm:aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-square sm:aspect-video bg-navy/5 flex items-center justify-center text-4xl">
          {icon}
        </div>
      )}
      <div className="p-6 text-center flex-grow flex flex-col justify-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-navy text-xl sm:text-2xl font-bold mb-3 leading-tight">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-navy/70 text-sm sm:text-base leading-relaxed">
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

  useAnimateOnScroll(); // Activate animations

  // VSL Logic - Forced to main ID
  const videoId = '6976875aa19ff9c17f8fb644';
  // Headline Logic
  const headlineText = HEADLINES[dor] || HEADLINES.diagnostico;

  useEffect(() => {
    // 1. Check LocalStorage for persistence
    const alreadyRevealed = localStorage.getItem('vsl_offer_revealed');
    if (alreadyRevealed) {
      console.log('Vturb Debug: Oferta já revelada anteriormente (Local Storage).');
      setMostrarOferta(true);
    }

    const TEMPO_ALVO = DELAY_SECONDS;
    let revelado = alreadyRevealed === 'true';

    function executarRevelacao() {
      if (revelado) return;
      console.log("Vturb Debug: EXECUTANDO REVELAÇÃO AGORA.");
      setMostrarOferta(true);
      localStorage.setItem('vsl_offer_revealed', 'true');
      revelado = true;
    }

    // 2. Monitoring via getPlayedTime (Official WebComponent API)
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

    // 3. Backup Safety Fallback (130s + 15s margin)
    const safetyTimeout = setTimeout(() => {
      if (!revelado) {
        console.log("Vturb Debug: Revelação via Backup (Timeout de página).");
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

        {/* Otimização de Performance Vturb Oficial - Embed V4 Vertical */}
        <link rel="preload" href={`https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`} as="script" />
        <link rel="preconnect" href="https://cdn.converteai.net" />
        <link rel="preconnect" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />

        <script
          dangerouslySetInnerHTML={{
            __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`
          }}
        />
      </Head>

      <main className="min-h-screen bg-navy text-white flex flex-col">
        {/* Header */}
        <header className="bg-navy-light py-5 shadow-md z-10">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-2xl font-bold tracking-wide">
              Mãe que Ora
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-navy to-navy-light pt-8 pb-10 px-4 text-center">
          <div className="max-w-3xl md:max-w-5xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug mb-6">
              {headlineText}
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl md:max-w-4xl mx-auto mb-8">
              Assista a este vídeo curto para entender como começar.
            </p>
          </div>

          {/* Video Container (Otimizado Mobile - 400px - Vtub Smartplayer) */}
          <div className="max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-gold/20 mb-8">
            <Script
              id="vturb-script"
              src={`https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`}
              strategy="afterInteractive"
            />
            {/* 
                Usando o WebComponent nativo da Vturb como no seu exemplo funcional do Elementor.
                O script da Vturb injeta o conteúdo nesta tag automaticamente.
            */}
            <vturb-smartplayer
              id={`vid-${videoId}`}
              style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
              referrerPolicy="origin"
            ></vturb-smartplayer>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-[family-name:var(--font-inter)] animate-pulse">
            🔊 Por favor, certifique-se de que seu som está ligado.
          </div>
        </section>

        {/* OFFER SECTION - REVEALED AFTER DELAY */}
        {mostrarOferta && (
          <div className="animate-fade-in-up">

            {/* 1. PURPOSE SECTION */}
            <section className="bg-navy px-4 py-8 text-center scroll-animate transition-all duration-1000">
              <div className="max-w-2xl md:max-w-4xl mx-auto mb-8">
                <a
                  href="https://pay.kiwify.com.br/C10XqRz"
                  target="_blank"
                  className="inline-block bg-green-cta text-white font-bold text-xl md:text-2xl py-4 px-10 md:px-14 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] animate-pulse-gentle hover:scale-105 transition-transform"
                >
                  QUERO ACESSAR O DEVOCIONAL
                </a>
              </div>

              <div className="max-w-3xl md:max-w-5xl mx-auto">
                <h2 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Deus tem um propósito lindo para a vida do seu filho(a)
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-white/80 text-lg md:text-xl leading-relaxed mb-6">
                  Mas esse propósito precisa ser regado com oração, clamor, confiança e entrega. <br /><br />
                  <span className="text-gold font-bold">Quando uma mãe ora, o céu se abre.</span> <br /><br />
                  Não deixe para amanhã o que pode mudar a vida do seu filho(a) HOJE.<br />
                  Seu filho(a) veio ao mundo para viver o extraordinário.<br />
                  Permita que Deus prepare esse caminho.
                </p>
                <GoldDivider />
              </div>
            </section>

            {/* 2. DELIVERABLES SECTION */}
            <section className="bg-navy-light/30 px-4 py-12 scroll-animate transition-all duration-1000 delay-200">
              <div className="max-w-4xl md:max-w-6xl mx-auto">
                <div className="bg-gold/90 text-navy font-bold text-center py-4 rounded-xl mb-10 shadow-lg transform hover:scale-[1.01] transition-transform">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-playfair)]">
                    O Que Você Vai Receber Durante os 14 Dias:
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

            {/* 3. TESTIMONIALS (TRANSFORMATIONS) */}
            <section className="bg-white px-4 py-16 scroll-animate transition-all duration-1000">
              <div className="max-w-4xl mx-auto">
                <h3 className="font-[family-name:var(--font-playfair)] text-navy text-3xl sm:text-4xl font-bold text-center mb-12">
                  TRANSFORMAÇÕES REAIS DE MÃES COMO VOCÊ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "depoimento-marcia.jpg",
                    "depoimento-daniela.jpg",
                    "depoimento-cleonice.jpg",
                    "depoimento-aline.jpg",
                    "depoimento-fabiana.jpg",
                    "depoimento-suzana.jpg"
                  ].map((img, idx) => (
                    <div key={idx} className="transition-all duration-300">
                      <TestimonialCard src={`/assets/uploads/2026/01/${img}`} index={idx} />
                    </div>
                  ))}
                </div>

                <p className="text-center text-navy/60 text-sm mt-6 font-medium">
                  * Resultados podem variar, mas a fé é o fundamento de tudo.
                </p>
              </div>
            </section>

            {/* 4. BONUSES SECTION */}
            <section className="bg-navy px-4 py-16 scroll-animate transition-all duration-1000 delay-200">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-[family-name:var(--font-playfair)] text-gold text-3xl sm:text-4xl font-bold text-center mb-10 leading-tight">
                  BÔNUS EXCLUSIVOS <br /> <span className="text-white text-2xl">(Áudios Guiados de Oração)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* 5. PRICING & CLOSING SECTION */}
            <section className="bg-navy-light/20 px-4 py-16 pb-24 scroll-animate transition-all duration-1000">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl font-bold mb-10">
                  QUANTO VALE A PAZ DA SUA FAMÍLIA?
                </h2>

                <div className="grid grid-cols-1 gap-4 mb-12 text-left">
                  <div className="bg-navy border border-white/10 p-5 rounded-xl flex items-center gap-4 transform hover:scale-[1.02] transition-transform duration-300">
                    <span className="text-gold text-3xl font-bold">?</span>
                    <p className="text-white/90">Quantas noites sem paz a preocupação já te custou?</p>
                  </div>
                  <div className="bg-navy border border-white/10 p-5 rounded-xl flex items-center gap-4 transform hover:scale-[1.02] transition-transform duration-300">
                    <span className="text-gold text-3xl font-bold">?</span>
                    <p className="text-white/90">Quanto você já gastou tentando resolver sozinha?</p>
                  </div>
                  <div className="bg-navy border border-white/10 p-5 rounded-xl flex items-center gap-4 transform hover:scale-[1.02] transition-transform duration-300">
                    <span className="text-gold text-3xl font-bold">?</span>
                    <p className="text-white/90">Quanto vale ver seu filho(a) livre, feliz e vivendo o propósito de Deus?</p>
                  </div>
                </div>

                {/* PRICING BOX */}
                <div className="bg-navy-light/40 backdrop-blur-md p-8 rounded-3xl border border-gold/40 shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold to-yellow-500"></div>

                  <p className="font-[family-name:var(--font-inter)] text-white/60 text-lg mb-2 uppercase tracking-widest font-bold">
                    De <span className="line-through text-red-400">R$ 197,00</span> por apenas
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-[family-name:var(--font-playfair)] text-white text-6xl sm:text-7xl font-bold mb-2 tracking-tight">
                      R$ 67,00
                    </p>
                    <span className="text-gold text-sm font-bold uppercase tracking-widest mb-4">à vista</span>
                  </div>

                  <div className="w-16 h-1 bg-gold/30 mx-auto mb-4 rounded-full"></div>

                  <p className="font-[family-name:var(--font-inter)] text-white/90 text-xl mb-10">
                    Ou parcele em até <strong className="text-green-400">8x de R$ 9,83</strong>
                  </p>

                  <a
                    href="https://pay.kiwify.com.br/C10XqRz"
                    target="_blank"
                    className="group relative flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 text-white 
                                 font-[family-name:var(--font-inter)] font-bold text-[20px] sm:text-[24px] tracking-wide uppercase
                                 py-6 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)]
                                 hover:scale-105 hover:shadow-[0_0_50px_rgba(37,211,102,0.6)]
                                 transition-all duration-300 ease-in-out animate-pulse-gentle cursor-pointer"
                  >
                    QUERO QUE MEU FILHO VIVA O EXTRAORDINÁRIO
                  </a>
                </div>

                <GuaranteeSeal />

                <p className="mt-8 text-white/50 text-sm max-w-lg mx-auto leading-relaxed italic">
                  "Seja o exemplo que seu filho(a) vai seguir. Dê esse passo de fé agora."
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-navy py-10 px-4 text-center border-t border-white/5 mt-auto">
          <p className="font-[family-name:var(--font-inter)] text-white/40 text-sm">
            © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            <br />
            <span className="text-[10px] mt-2 block opacity-60">
              Os resultados podem variar de pessoa para pessoa. Este site não é afiliado ao Facebook ou Google.
            </span>
          </p>
        </footer>
      </main>
    </>
  );
}
