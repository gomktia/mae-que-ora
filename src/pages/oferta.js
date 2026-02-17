import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import BotaoCheckout from '@/components/BotaoCheckout';
import PrecoAncorado from '@/components/PrecoAncorado';
import AcordeaoFAQ from '@/components/AcordeaoFAQ';

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-12">
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-bronze opacity-30" />
      <span className="text-bronze text-3xl filter drop-shadow-[0_0_10px_rgba(163,120,56,0.3)]">✦</span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-bronze opacity-30" />
    </div>
  );
}

function SectionTitle({ children, light = false }) {
  return (
    <h2
      className={`font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] text-center mb-8 tracking-tighter
                  ${light ? 'text-white' : 'text-brown'}`}
    >
      {children}
    </h2>
  );
}

export default function OfertaPage() {
  return (
    <>
      <Head>
        <title>Mãe que Ora — Transforme a Vida do Seu Filho Através da Oração</title>
        <meta
          name="description"
          content="Devocional de 14 dias para mães que querem interceder com poder pelos seus filhos. Orações guiadas, versículos e exercícios práticos."
        />
      </Head>

      <main className="min-h-screen flex flex-col bg-sand text-brown">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md py-6 border-b border-bronze/10 sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-bronze text-3xl font-black tracking-tighter">
              Mãe que ora, transforma!
            </span>
          </div>
        </header>

        {/* 1. Hero */}
        <section className="relative py-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 grayscale-[20%]">
            <Image src="/assets/landingpage/01.jpeg" alt="Background" layout="fill" objectFit="cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block font-[family-name:var(--font-inter)] text-bronze text-xs font-black tracking-[0.3em] uppercase mb-6 bg-white/60 px-6 py-2.5 rounded-full border border-bronze/20 shadow-sm backdrop-blur-md">
              Atenção: esta mensagem é para mães
            </span>
            <SectionTitle>
              Você sente que está{' '}
              <span className="text-bronze italic">perdendo seu filho</span> e não sabe mais o
              que fazer?
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-brown/70 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
              Existe um caminho que vai além dos conselhos humanos. Um plano de oração
              poderoso que já transformou a vida de centenas de famílias.
            </p>
          </div>
        </section>

        {/* 2. Dor */}
        <section className="bg-brown py-24 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <SectionTitle light>
              Você já perdeu o sono pensando no futuro do{' '}
              <span className="text-bronze">seu filho(a)</span>?
            </SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 mt-12">
              {[
                'Você sente no coração que ele(a) precisa de uma força maior?',
                'Percebe que está caminhando sozinha nessa batalha?',
                'Já tentou de tudo, mas parece que nada funciona?',
                'Tem medo do que pode acontecer se você não agir agora?',
              ].map((pergunta, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex items-start gap-4 transition-all hover:bg-white/10 hover:border-bronze/30 group"
                >
                  <span className="text-bronze text-2xl font-black">✦</span>
                  <p className="font-[family-name:var(--font-inter)] text-white/90 text-lg leading-relaxed font-medium">
                    {pergunta}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-[family-name:var(--font-inter)] text-bronze font-black uppercase tracking-widest text-center text-sm mt-12 animate-pulse-gentle">
              Se você respondeu "sim" para alguma dessas perguntas, esta mensagem é para você.
            </p>
          </div>
        </section>

        {/* 3. Produto */}
        <section className="py-24 px-4 bg-sand">
          <div className="max-w-4xl mx-auto text-center">
            <GoldDivider />
            <span className="inline-block font-[family-name:var(--font-inter)] text-bronze text-xs font-black tracking-[0.3em] uppercase mb-6">
              Apresentamos
            </span>
            <SectionTitle>
              <span className="text-bronze italic">Mãe que Ora</span> Transforma
            </SectionTitle>
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="font-[family-name:var(--font-inter)] text-brown text-xl sm:text-2xl font-bold leading-tight">
                O Único Devocional de 14 Dias Criado Para Mães Que Querem Ver Seus
                Filhos Vivendo o Extraordinário.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown/60 text-lg leading-relaxed">
                Não é mais um livro que você vai comprar e deixar na estante.
                É um caminho espiritual completo, com começo, meio e fim, que vai te
                guiar passo a passo em orações poderosas.
              </p>
            </div>
            <GoldDivider />
          </div>
        </section>

        {/* 4. Para Quem */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <SectionTitle>
              Para mães de filhos em{' '}
              <span className="text-bronze">qualquer fase</span>
            </SectionTitle>
            <div className="grid gap-8 sm:grid-cols-3 mt-12">
              {[
                { fase: 'Infância', desc: 'Pequeno(a), que você quer cercar de proteção e direção divina desde cedo.', icon: '👶' },
                { fase: 'Adolescência', desc: 'Passando por fases desafiadoras, em más companhias ou se afastando de casa.', icon: '👦' },
                { fase: 'Fase Adulta', desc: 'Enfrentando prisões emocionais e espirituais, dificuldades financeiras ou conflitos familiares.', icon: '👨' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-sand/20 border border-bronze/10 rounded-[2.5rem] p-10 text-center shadow-sm transition-all hover:shadow-2xl hover:shadow-bronze/10 hover:-translate-y-2 hover:bg-sand/40"
                >
                  <span className="text-5xl block mb-6 transition-transform group-hover:scale-125">{item.icon}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mb-4 group-hover:text-bronze transition-colors">
                    {item.fase}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-brown/60 text-base leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Preço */}
        <section className="bg-brown py-24 px-4 pb-32">
          <div className="max-w-4xl mx-auto">
            <SectionTitle light>
              Quanto vale a paz da sua{' '}
              <span className="text-bronze">família</span>?
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-center text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Quantas noites sem paz a preocupação já te custou? Quanto vale ver
              seu filho(a) livre, feliz e vivendo o propósito de Deus?
            </p>

            <div className="bg-white/95 backdrop-blur-md p-12 sm:p-20 rounded-[3rem] border-4 border-white shadow-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-bronze to-amber-500"></div>
              <PrecoAncorado />
              <div className="mt-12 scale-110 sm:scale-125">
                <BotaoCheckout />
              </div>
              <div className="mt-16 flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src="/assets/landingpage/selo-garantia.png"
                    alt="Garantia"
                    layout="fill"
                    objectFit="contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. FAQ */}
        <section className="py-24 px-4 bg-sand/30">
          <div className="max-w-3xl mx-auto">
            <SectionTitle>
              Perguntas <span className="text-bronze italic">frequentes</span>
            </SectionTitle>
            <div className="mt-12 bg-white rounded-[2rem] p-4 sm:p-8 shadow-xl border border-bronze/10">
              <AcordeaoFAQ />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-20 px-4 text-center border-t border-bronze/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 mb-8 font-black text-xs uppercase tracking-widest text-brown/40">
              <Link href="/termos" className="hover:text-bronze transition-colors">Termos de Uso</Link>
              <Link href="/privacidade" className="hover:text-bronze transition-colors">Privacidade</Link>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-brown/20 text-xs font-black tracking-widest">
              © {new Date().getFullYear()} MÃE QUE ORA — TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
