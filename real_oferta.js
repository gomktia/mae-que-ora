import Head from 'next/head';
import Link from 'next/link';
import BotaoCheckout from '@/components/BotaoCheckout';
import PrecoAncorado from '@/components/PrecoAncorado';
import AcordeaoFAQ from '@/components/AcordeaoFAQ';

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-lg">Ô£ª</span>
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
        <title>M├úe que Ora ÔÇö Transforme a Vida do Seu Filho Atrav├®s da Ora├º├úo</title>
        <meta
          name="description"
          content="Devocional de 14 dias para m├úes que querem interceder com poder pelos seus filhos. Ora├º├Áes guiadas, vers├¡culos e exerc├¡cios pr├íticos."
        />
      </Head>

      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-navy py-4">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              M├úe que ora, transforma!
            </span>
          </div>
        </header>

        {/* 1. Hero */}
        <section className="bg-snow py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block font-[family-name:var(--font-inter)] text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Aten├º├úo: esta mensagem ├® para m├úes
            </span>
            <SectionTitle>
              Voc├¬ sente que est├í{' '}
              <span className="text-gold">perdendo seu filho</span> e n├úo sabe mais o
              que fazer?
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Existe um caminho que vai al├®m dos conselhos humanos. Um plano de ora├º├úo
              poderoso que j├í transformou a vida de centenas de fam├¡lias.
            </p>
          </div>
        </section>

        {/* 2. Dor */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle light>
              Voc├¬ j├í perdeu o sono pensando no futuro do{' '}
              <span className="text-gold">seu filho(a)</span>?
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                'Voc├¬ sente no cora├º├úo que ele(a) precisa de uma for├ºa maior?',
                'Percebe que est├í caminhando sozinha nessa batalha?',
                'J├í tentou de tudo, mas parece que nada funciona?',
                'Tem medo do que pode acontecer se voc├¬ n├úo agir agora?',
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
              Se voc├¬ respondeu &ldquo;sim&rdquo; para alguma dessas perguntas,
              esta mensagem foi escrita especialmente para voc├¬.
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
              <span className="text-gold">M├úe que Ora</span> Transforma
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-base max-w-xl mx-auto leading-relaxed mb-4">
              O ├Ünico Devocional de 14 Dias Criado Para M├úes Que Querem Ver Seus
              Filhos Vivendo o Extraordin├írio.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-navy/50 text-sm max-w-xl mx-auto leading-relaxed mb-6">
              N├úo ├® mais um livro que voc├¬ vai comprar e deixar na estante.
              ├ë um caminho espiritual completo, com come├ºo, meio e fim, que vai te
              guiar passo a passo em ora├º├Áes poderosas que j├í transformaram centenas
              de fam├¡lias.
            </p>
            <img
              src="/assets/logo.png"
              alt="M├úe que Ora"
              className="w-40 h-auto mx-auto"
            />
            <GoldDivider />
          </div>
        </section>

        {/* 4. Para Quem */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Para m├úes de filhos em{' '}
              <span className="text-gold">qualquer fase</span>
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-3 mt-8">
              {[
                { fase: 'Inf├óncia', desc: 'Pequeno(a), que voc├¬ quer cercar de prote├º├úo e dire├º├úo divina desde cedo.' },
                { fase: 'Adolesc├¬ncia', desc: 'Passando por fases desafiadoras, em m├ís companhias ou se afastando de casa.' },
                { fase: 'Fase Adulta', desc: 'Enfrentando pris├Áes emocionais e espirituais, dificuldades financeiras ou conflitos familiares.' },
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
              A verdade que ningu├®m te conta{' '}
              <span className="text-gold">(mas voc├¬ j├í sabe)</span>
            </SectionTitle>
            <div className="font-[family-name:var(--font-inter)] text-white/70 text-base max-w-lg mx-auto leading-relaxed space-y-4 mb-8">
              <p>Voc├¬ pode passar anos tentando resolver tudo sozinha...</p>
              <p>
                Voc├¬ pode gastar fortunas em terapias, cursos e solu├º├Áes
                tempor├írias...
              </p>
              <p>Voc├¬ pode perder noites de sono com preocupa├º├Áes...</p>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-gold font-semibold text-lg max-w-lg mx-auto">
              Ou voc├¬ pode fazer o que realmente funciona: ORAR COM PROP├ôSITO E
              DIRE├ç├âO.
            </p>
            <GoldDivider />
            <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
              Existe um poder que voc├¬ tem em suas m├úos. Um poder que nenhum
              psic├│logo, nenhum rem├®dio, nenhum conselho humano pode substituir.
              ├ë o poder da ora├º├úo profunda e direcionada. E nos pr├│ximos 14 dias,
              voc├¬ aprender├í a usar esse poder para transformar completamente a
              vida do seu filho(a).
            </p>
          </div>
        </section>

        {/* 5. Custo da Ina├º├úo */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              Cada dia que passa sem voc├¬ agir espiritualmente{' '}
              <span className="text-gold">pelo seu filho(a)</span> ├®:
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                { icon: '­ƒîÖ', titulo: 'Mais uma noite sem paz', desc: 'O medo e a ang├║stia continuam tomando conta das suas madrugadas.' },
                { icon: '­ƒÿ░', titulo: 'Mais uma preocupa├º├úo que te consome', desc: 'A ansiedade cresce e voc├¬ sente que est├í perdendo o controle.' },
                { icon: 'ÔÅ│', titulo: 'Mais uma oportunidade que escapa', desc: 'O tempo n├úo espera. Cada dia sem ora├º├úo direcionada ├® um dia perdido.' },
                { icon: '­ƒÆö', titulo: 'Mais um peda├ºo do cora├º├úo que d├│i', desc: 'A dor de ver um filho longe de Deus s├│ cresce quando n├úo fazemos nada.' },
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
              O que voc├¬ vai receber durante os{' '}
              <span className="text-gold">14 dias</span>
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                { icon: '­ƒÖÅ', titulo: 'Ora├º├Áes Di├írias', desc: 'Em ├íudio (para voc├¬ ouvir onde estiver) e em formato digital (para ler e meditar).' },
                { icon: '­ƒôû', titulo: 'Vers├¡culos Di├írios', desc: 'Palavra de Deus direcionada para cada dia de ora├º├úo.' },
                { icon: 'Ô£ì´©Å', titulo: 'Exerc├¡cios Exclusivos', desc: 'Para fortalecer espiritualmente seu filho(a).' },
                { icon: '­ƒæ®ÔÇì­ƒæ®ÔÇì­ƒæª', titulo: 'Comunidade de Apoio', desc: 'Outras m├úes que relatam batalhas vencidas ÔÇö voc├¬ n├úo estar├í sozinha nessa jornada.' },
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

        {/* 7. B├┤nus */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle>
              B├┤nus <span className="text-gold">exclusivos</span>
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-navy/60 text-center text-sm mb-8 max-w-lg mx-auto">
              Al├®m do devocional completo, voc├¬ ainda recebe:
            </p>
            <div className="space-y-4">
              {[
                { num: '01', titulo: 'Ora├º├úo pela For├ºa Emocional da M├úe', desc: 'Porque voc├¬ tamb├®m precisa estar forte para ser o exemplo.' },
                { num: '02', titulo: 'Ora├º├úo pelo Filho(a) Enquanto Dorme', desc: 'O momento mais poderoso para interceder.' },
                { num: '03', titulo: 'Consagra├º├úo Materna para 2026', desc: 'Prepare seu filho(a) para viver o extraordin├írio este ano.' },
                { num: '04', titulo: 'Ora├º├úo para Vencer Batalhas Espirituais', desc: 'Quebre cadeias e pris├Áes invis├¡veis.' },
                { num: '05', titulo: 'Ora├º├úo para Fazer Junto com os Filhos', desc: 'Ensine-os o poder da ora├º├úo desde cedo.' },
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

        {/* 8. Pre├ºo */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <SectionTitle light>
              Quanto vale a paz da sua{' '}
              <span className="text-gold">fam├¡lia</span>?
            </SectionTitle>
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-center text-sm mb-8 max-w-lg mx-auto">
              Quantas noites sem paz a preocupa├º├úo j├í te custou? Quanto vale ver
              seu filho(a) livre, feliz e vivendo o prop├│sito de Deus?
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
              Transforma├º├Áes reais de m├úes{' '}
              <span className="text-gold">como voc├¬</span>
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
              Se dentro de 7 dias voc├¬ sentir que o devocional n├úo ├® para voc├¬,
              basta enviar um e-mail e devolvemos{' '}
              <strong className="text-navy">100% do seu investimento</strong>.
              Sem perguntas, sem burocracia. O risco ├® todo nosso.
            </p>
            <GoldDivider />
          </div>
        </section>

        {/* 11. Duas Escolhas */}
        <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle light>
              Voc├¬ tem <span className="text-gold">duas escolhas</span> agora
            </SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 mt-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-white/60 text-lg font-bold mb-3">
                  Escolha 1
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-white/40 text-sm leading-relaxed">
                  Continuar do jeito que est├í. Continuar com as preocupa├º├Áes, as noites
                  sem dormir, a sensa├º├úo de impot├¬ncia. E daqui a 1 ano, estar no mesmo
                  lugar (ou pior).
                </p>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-gold text-lg font-bold mb-3">
                  Escolha 2
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-white/80 text-sm leading-relaxed">
                  Dar esse passo de f├®. Investir 14 dias da sua vida em ora├º├Áes
                  profundas e direcionadas. E ver a transforma├º├úo acontecer na vida
                  do seu filho(a).
                </p>
              </div>
            </div>
            <div className="mt-10">
              <BotaoCheckout texto="QUERO O CAMINHO 2 ÔÇö COME├çAR AGORA" />
            </div>
          </div>
        </section>

        {/* 12. Fechamento */}
        <section className="bg-navy py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle light>
              Deus tem um prop├│sito lindo para a vida do{' '}
              <span className="text-gold">seu filho(a)</span>
            </SectionTitle>
            <div className="font-[family-name:var(--font-inter)] text-white/70 text-sm leading-relaxed max-w-lg mx-auto space-y-4">
              <p>
                Mas esse prop├│sito precisa ser regado com ora├º├úo, clamor, confian├ºa
                e entrega. Quando uma m├úe ora, o c├®u se abre.
              </p>
              <p>
                N├úo deixe para amanh├ú o que pode mudar a vida do seu filho(a) HOJE.
                Seu filho(a) veio ao mundo para viver o extraordin├írio. Permita que
                Deus prepare esse caminho.
              </p>
              <p className="text-gold font-semibold">
                Seja o exemplo que seu filho(a) vai seguir. D├¬ esse passo de f├® agora.
              </p>
              <p className="text-white/40 text-xs mt-6">
                <strong>P.S.</strong> ÔÇö Daqui a 14 dias, voc├¬ pode estar lendo isso
                novamente, desejando ter come├ºado hoje. Ou pode estar testemunhando a
                transforma├º├úo que Deus operou na vida do seu filho(a). A escolha ├® sua.
              </p>
              <p className="text-white/40 text-xs">
                <strong>P.P.S.</strong> ÔÇö Lembre-se: o valor ├® pequeno. O impacto ├®
                eterno. E voc├¬ tem garantia total de 7 dias. N├úo h├í nada a perder,
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
            Este site n├úo ├® afiliado ao Facebook ou a qualquer entidade do
            Facebook. Depois que voc├¬ sair do Facebook, a responsabilidade n├úo ├®
            deles e sim do nosso site. Fazemos todos os esfor├ºos para indicar
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
                Pol├¡tica de Privacidade
              </Link>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
              ┬® {new Date().getFullYear()} M├úe que Ora ÔÇö Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
