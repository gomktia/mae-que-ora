import Head from 'next/head';
import Link from 'next/link';
import BotaoCheckout from '@/components/BotaoCheckout';
import PrecoAncorado from '@/components/PrecoAncorado';
import AcordeaoFAQ from '@/components/AcordeaoFAQ';

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-lg">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60" />
    </div>
  );
}

function SectionTitle({ children, light = false }) {
  return (
    <h2
      className={`font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center mb-6
                  ${light ? 'text-white' : 'text-navy'}`}
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

      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-navy py-4">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que Ora
            </span>
          </div>
        </header>

        {/* 1. Hero */}
        <section className="bg-snow py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block font-[family-name:var(--font-inter)] text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Atenção: esta mensagem é para mães
            </span>
            <SectionTitle>
              Você sente que está{' '}
              <span className="text-gold">perdendo seu filho</span> e não sabe mais o
              que fazer?
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Existe um caminho que vai além dos conselhos humanos. Um plano de oração
              poderoso que já transformou a vida de centenas de famílias.
            </p>
          </div>
        </section>

        {/* 2. Dor */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle light>
              Você já perdeu o sono pensando no futuro do{' '}
              <span className="text-gold">seu filho(a)</span>?
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                'Você sente no coração que ele(a) precisa de uma força maior?',
                'Percebe que está caminhando sozinha nessa batalha?',
                'Já tentou de tudo, mas parece que nada funciona?',
                'Tem medo do que pode acontecer se você não agir agora?',
              ].map((pergunta, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5"
                >
                  <p className="font-[family-name:var(--font-inter)] text-white/90 text-sm leading-relaxed">
                    {pergunta}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-[family-name:var(--font-inter)] text-gold/80 text-center text-sm mt-8">
              Se você respondeu &ldquo;sim&rdquo; para alguma dessas perguntas,
              esta mensagem foi escrita especialmente para você.
            </p>
          </div>
        </section>

        {/* 3. Produto */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <GoldDivider />
            <span className="inline-block font-[family-name:var(--font-inter)] text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Apresentamos
            </span>
            <SectionTitle>
              <span className="text-gold">Mãe que Ora</span> Transforma
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-base max-w-xl mx-auto leading-relaxed mb-4">
              O Único Devocional de 14 Dias Criado Para Mães Que Querem Ver Seus
              Filhos Vivendo o Extraordinário.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-navy/50 text-sm max-w-xl mx-auto leading-relaxed mb-6">
              Não é mais um livro que você vai comprar e deixar na estante.
              É um caminho espiritual completo, com começo, meio e fim, que vai te
              guiar passo a passo em orações poderosas que já transformaram centenas
              de famílias.
            </p>
            <img
              src="/assets/logo.png"
              alt="Mãe que Ora"
              className="w-40 h-auto mx-auto"
            />
            <GoldDivider />
          </div>
        </section>

        {/* 4. Para Quem */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Para mães de filhos em{' '}
              <span className="text-gold">qualquer fase</span>
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-3 mt-8">
              {[
                { fase: 'Infância', desc: 'Pequeno(a), que você quer cercar de proteção e direção divina desde cedo.' },
                { fase: 'Adolescência', desc: 'Passando por fases desafiadoras, em más companhias ou se afastando de casa.' },
                { fase: 'Fase Adulta', desc: 'Enfrentando prisões emocionais e espirituais, dificuldades financeiras ou conflitos familiares.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-ice rounded-xl p-6 text-center shadow-sm"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-navy text-lg font-bold mb-2">
                    {item.fase}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-navy/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4b. A Verdade */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle light>
              A verdade que ninguém te conta{' '}
              <span className="text-gold">(mas você já sabe)</span>
            </SectionTitle>
            <div className="font-[family-name:var(--font-inter)] text-white/70 text-base max-w-lg mx-auto leading-relaxed space-y-4 mb-8">
              <p>Você pode passar anos tentando resolver tudo sozinha...</p>
              <p>
                Você pode gastar fortunas em terapias, cursos e soluções
                temporárias...
              </p>
              <p>Você pode perder noites de sono com preocupações...</p>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-gold font-semibold text-lg max-w-lg mx-auto">
              Ou você pode fazer o que realmente funciona: ORAR COM PROPÓSITO E
              DIREÇÃO.
            </p>
            <GoldDivider />
            <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
              Existe um poder que você tem em suas mãos. Um poder que nenhum
              psicólogo, nenhum remédio, nenhum conselho humano pode substituir.
              É o poder da oração profunda e direcionada. E nos próximos 14 dias,
              você aprenderá a usar esse poder para transformar completamente a
              vida do seu filho(a).
            </p>
          </div>
        </section>

        {/* 5. Custo da Inação */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Cada dia que passa sem você agir espiritualmente{' '}
              <span className="text-gold">pelo seu filho(a)</span> é:
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                { icon: '🌙', titulo: 'Mais uma noite sem paz', desc: 'O medo e a angústia continuam tomando conta das suas madrugadas.' },
                { icon: '😰', titulo: 'Mais uma preocupação que te consome', desc: 'A ansiedade cresce e você sente que está perdendo o controle.' },
                { icon: '⏳', titulo: 'Mais uma oportunidade que escapa', desc: 'O tempo não espera. Cada dia sem oração direcionada é um dia perdido.' },
                { icon: '💔', titulo: 'Mais um pedaço do coração que dói', desc: 'A dor de ver um filho longe de Deus só cresce quando não fazemos nada.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-ice rounded-xl p-6 shadow-sm"
                >
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-navy text-base font-bold mb-2">
                    {item.titulo}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-navy/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. O Que Recebe */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle light>
              O que você vai receber durante os{' '}
              <span className="text-gold">14 dias</span>
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                { icon: '🙏', titulo: 'Orações Diárias', desc: 'Em áudio (para você ouvir onde estiver) e em formato digital (para ler e meditar).' },
                { icon: '📖', titulo: 'Versículos Diários', desc: 'Palavra de Deus direcionada para cada dia de oração.' },
                { icon: '✍️', titulo: 'Exercícios Exclusivos', desc: 'Para fortalecer espiritualmente seu filho(a).' },
                { icon: '👩‍👩‍👦', titulo: 'Comunidade de Apoio', desc: 'Outras mães que relatam batalhas vencidas — você não estará sozinha nessa jornada.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-white text-base font-bold mb-2">
                    {item.titulo}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-white/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Bônus */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Bônus <span className="text-gold">exclusivos</span>
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-center text-sm mb-8 max-w-lg mx-auto">
              Além do devocional completo, você ainda recebe:
            </p>
            <div className="space-y-4">
              {[
                { num: '01', titulo: 'Oração pela Força Emocional da Mãe', desc: 'Porque você também precisa estar forte para ser o exemplo.' },
                { num: '02', titulo: 'Oração pelo Filho(a) Enquanto Dorme', desc: 'O momento mais poderoso para interceder.' },
                { num: '03', titulo: 'Consagração Materna para 2026', desc: 'Prepare seu filho(a) para viver o extraordinário este ano.' },
                { num: '04', titulo: 'Oração para Vencer Batalhas Espirituais', desc: 'Quebre cadeias e prisões invisíveis.' },
                { num: '05', titulo: 'Oração para Fazer Junto com os Filhos', desc: 'Ensine-os o poder da oração desde cedo.' },
              ].map((bonus, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white border border-ice rounded-xl p-5 shadow-sm"
                >
                  <span className="font-[family-name:var(--font-playfair)] text-gold text-2xl font-bold flex-shrink-0">
                    {bonus.num}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-navy text-base font-bold mb-1">
                      {bonus.titulo}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-navy/60 text-sm leading-relaxed">
                      {bonus.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Preço */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle light>
              Quanto vale a paz da sua{' '}
              <span className="text-gold">família</span>?
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-center text-sm mb-8 max-w-lg mx-auto">
              Quantas noites sem paz a preocupação já te custou? Quanto vale ver
              seu filho(a) livre, feliz e vivendo o propósito de Deus?
            </p>

            <PrecoAncorado />

            <div className="mt-8 text-center">
              <BotaoCheckout />
            </div>
          </div>
        </section>

        {/* 9. Depoimentos */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Transformações reais de mães{' '}
              <span className="text-gold">como você</span>
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-3 mt-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <img
                  key={n}
                  src={`/assets/depoimento-0${n}.png`}
                  alt={`Depoimento ${n}`}
                  className="rounded-xl shadow-sm w-full h-auto"
                />
              ))}
            </div>
          </div>
        </section>

        {/* 10. Garantia */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <GoldDivider />
            <img
              src="/assets/garantia-7-dias.webp"
              alt="Garantia de 7 dias"
              className="w-32 h-auto mx-auto mb-5"
            />
            <SectionTitle>
              Garantia incondicional de{' '}
              <span className="text-gold">7 dias</span>
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-base max-w-lg mx-auto leading-relaxed">
              Se dentro de 7 dias você sentir que o devocional não é para você,
              basta enviar um e-mail e devolvemos{' '}
              <strong className="text-navy">100% do seu investimento</strong>.
              Sem perguntas, sem burocracia. O risco é todo nosso.
            </p>
            <GoldDivider />
          </div>
        </section>

        {/* 11. Duas Escolhas */}
        <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle light>
              Você tem <span className="text-gold">duas escolhas</span> agora
            </SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 mt-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-white/60 text-lg font-bold mb-3">
                  Escolha 1
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-white/40 text-sm leading-relaxed">
                  Continuar do jeito que está. Continuar com as preocupações, as noites
                  sem dormir, a sensação de impotência. E daqui a 1 ano, estar no mesmo
                  lugar (ou pior).
                </p>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-gold text-lg font-bold mb-3">
                  Escolha 2
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-white/80 text-sm leading-relaxed">
                  Dar esse passo de fé. Investir 14 dias da sua vida em orações
                  profundas e direcionadas. E ver a transformação acontecer na vida
                  do seu filho(a).
                </p>
              </div>
            </div>
            <div className="mt-10">
              <BotaoCheckout texto="QUERO O CAMINHO 2 — COMEÇAR AGORA" />
            </div>
          </div>
        </section>

        {/* 12. Fechamento */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle light>
              Deus tem um propósito lindo para a vida do{' '}
              <span className="text-gold">seu filho(a)</span>
            </SectionTitle>
            <div className="font-[family-name:var(--font-inter)] text-white/70 text-sm leading-relaxed max-w-lg mx-auto space-y-4">
              <p>
                Mas esse propósito precisa ser regado com oração, clamor, confiança
                e entrega. Quando uma mãe ora, o céu se abre.
              </p>
              <p>
                Não deixe para amanhã o que pode mudar a vida do seu filho(a) HOJE.
                Seu filho(a) veio ao mundo para viver o extraordinário. Permita que
                Deus prepare esse caminho.
              </p>
              <p className="text-gold font-semibold">
                Seja o exemplo que seu filho(a) vai seguir. Dê esse passo de fé agora.
              </p>
              <p className="text-white/40 text-xs mt-6">
                <strong>P.S.</strong> — Daqui a 14 dias, você pode estar lendo isso
                novamente, desejando ter começado hoje. Ou pode estar testemunhando a
                transformação que Deus operou na vida do seu filho(a). A escolha é sua.
              </p>
              <p className="text-white/40 text-xs">
                <strong>P.P.S.</strong> — Lembre-se: o valor é pequeno. O impacto é
                eterno. E você tem garantia total de 7 dias. Não há nada a perder,
                apenas uma vida para transformar.
              </p>
            </div>
            <div className="mt-8">
              <BotaoCheckout />
            </div>
          </div>
        </section>

        {/* 13. FAQ */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Perguntas <span className="text-gold">frequentes</span>
            </SectionTitle>
            <div className="mt-8">
              <AcordeaoFAQ />
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-navy/95 py-6 px-4">
          <p className="font-[family-name:var(--font-inter)] text-white/20 text-[10px] text-center max-w-xl mx-auto leading-relaxed">
            Este site não é afiliado ao Facebook ou a qualquer entidade do
            Facebook. Depois que você sair do Facebook, a responsabilidade não é
            deles e sim do nosso site. Fazemos todos os esforços para indicar
            claramente e mostrar todas as provas do produto e usamos resultados
            reais.
          </p>
        </section>

        {/* 14. Footer */}
        <footer className="bg-navy py-6 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center gap-4 mb-3">
              <Link
                href="/termos"
                className="font-[family-name:var(--font-inter)] text-white/40 text-xs hover:text-gold transition-colors"
              >
                Termos de Uso
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/privacidade"
                className="font-[family-name:var(--font-inter)] text-white/40 text-xs hover:text-gold transition-colors"
              >
                Política de Privacidade
              </Link>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">
              © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
