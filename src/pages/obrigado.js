import Head from 'next/head';

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold text-lg">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60" />
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <>
      <Head>
        <title>Mãe que Ora — Obrigada!</title>
        <meta name="description" content="Sua compra foi confirmada. Bem-vinda ao devocional Mãe que Ora!" />
      </Head>

      <main className="min-h-screen bg-snow flex flex-col">
        {/* Header */}
        <header className="bg-navy py-4">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que ora, transforma!
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-b from-navy to-navy-light py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <span className="text-5xl mb-4 block">🙏</span>
            <h1 className="font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
              Deus ouviu o seu{' '}
              <span className="text-gold">passo de fé</span>!
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-white/70 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Sua compra foi confirmada com sucesso. Você acabou de tomar a
              decisão mais importante pela vida espiritual do seu filho(a).
            </p>
          </div>
        </section>

        {/* Próximos Passos */}
        <section className="bg-snow py-16 px-4">
          <div className="max-w-xl mx-auto">
            <GoldDivider />

            <h2 className="font-[family-name:var(--font-playfair)] text-navy text-2xl sm:text-3xl font-bold text-center mb-8">
              Próximos passos
            </h2>

            <div className="space-y-6">
              {[
                {
                  num: '1',
                  titulo: 'Verifique seu e-mail',
                  desc: 'Você receberá um e-mail da Kiwify com os dados de acesso ao devocional. Confira também a pasta de spam ou promoções.',
                },
                {
                  num: '2',
                  titulo: 'Acesse o conteúdo',
                  desc: 'Clique no link do e-mail para acessar a área de membros. Todo o material estará disponível imediatamente.',
                },
                {
                  num: '3',
                  titulo: 'Comece no Dia 1',
                  desc: 'Separe um momento de silêncio, abra o Dia 1 do devocional e entregue seu filho(a) nas mãos de Deus.',
                },
                {
                  num: '4',
                  titulo: 'Entre na comunidade',
                  desc: 'Junte-se ao grupo de mães que oram juntas. Você não está sozinha nessa jornada.',
                },
              ].map((passo) => (
                <div
                  key={passo.num}
                  className="flex items-start gap-4 bg-white border border-ice rounded-xl p-5 shadow-sm"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <span className="font-[family-name:var(--font-playfair)] text-gold text-lg font-bold">
                      {passo.num}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-navy text-base font-bold mb-1">
                      {passo.titulo}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-navy/60 text-sm leading-relaxed">
                      {passo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <GoldDivider />

            {/* Mensagem de encorajamento */}
            <div className="bg-navy rounded-2xl p-8 text-center mt-8">
              <p className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold mb-4">
                &ldquo;Quando uma mãe ora, o céu se abre.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-white/60 text-sm leading-relaxed max-w-md mx-auto">
                Nos próximos 14 dias, você vai experimentar o poder da oração
                direcionada. Confie no processo. Deus está agindo — mesmo quando
                você não vê.
              </p>
            </div>

            {/* Suporte */}
            <div className="mt-10 text-center">
              <p className="font-[family-name:var(--font-inter)] text-navy/50 text-xs">
                Alguma dúvida? Entre em contato pelo e-mail de suporte
                disponível na Kiwify.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy py-6 px-4 text-center mt-auto">
          <p className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
            © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </>
  );
}
