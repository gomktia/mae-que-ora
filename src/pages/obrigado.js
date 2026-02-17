import Head from 'next/head';
import Image from 'next/image';

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-12">
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-bronze opacity-30" />
      <span className="text-bronze text-3xl filter drop-shadow-[0_0_10px_rgba(163,120,56,0.3)]">✦</span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-bronze opacity-30" />
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

      <main className="min-h-screen bg-sand flex flex-col items-center">
        {/* Header */}
        <header className="w-full bg-white/80 backdrop-blur-md py-6 border-b border-bronze/10 text-center">
          <span className="font-[family-name:var(--font-playfair)] text-bronze text-3xl font-black tracking-tighter">
            Mãe que ora, transforma!
          </span>
        </header>

        {/* Hero */}
        <section className="relative w-full py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 grayscale-[20%]">
            <Image src="/assets/landingpage/01.jpeg" alt="Background" layout="fill" objectFit="cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
            <span className="text-7xl mb-8 block animate-bounce-slow">🙏</span>
            <h1 className="font-[family-name:var(--font-playfair)] text-brown text-4xl sm:text-6xl font-black leading-tight mb-6 tracking-tighter">
              Deus ouviu o seu{' '}
              <span className="text-bronze italic">passo de fé</span>!
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-brown/70 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
              Sua compra foi confirmada com sucesso. Você acabou de tomar a
              decisão mais importante pela vida espiritual do seu filho(a).
            </p>
          </div>
        </section>

        {/* Próximos Passos */}
        <section className="w-full bg-white py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <GoldDivider />

            <h2 className="font-[family-name:var(--font-playfair)] text-brown text-3xl sm:text-4xl font-black text-center mb-12 tracking-tighter">
              Próximos Passos
            </h2>

            <div className="grid gap-6">
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
                  className="group flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-sand/20 border border-bronze/10 rounded-[2rem] p-8 transition-all hover:bg-sand/30 hover:border-bronze/30 hover:-translate-y-1"
                >
                  <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-bronze flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                    <span className="font-[family-name:var(--font-playfair)] text-white text-2xl font-black">
                      {passo.num}
                    </span>
                  </span>
                  <div className="text-center sm:text-left">
                    <h3 className="font-[family-name:var(--font-playfair)] text-brown text-xl sm:text-2xl font-black mb-2 transition-colors group-hover:text-bronze">
                      {passo.titulo}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-brown/60 text-base leading-relaxed font-medium">
                      {passo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <GoldDivider />

            {/* Mensagem de encorajamento */}
            <div className="bg-brown rounded-[2.5rem] p-10 sm:p-16 text-center mt-12 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-bronze/20 rounded-full blur-3xl"></div>
              <p className="font-[family-name:var(--font-playfair)] text-bronze text-2xl sm:text-3xl font-black mb-6 italic">
                &ldquo;Quando uma mãe ora, o céu se abre.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-white/60 text-lg leading-relaxed max-w-xl mx-auto font-medium">
                Nos próximos 14 dias, você vai experimentar o poder da oração
                direcionada. Confie no processo. Deus está agindo — mesmo quando
                você não vê.
              </p>
            </div>

            {/* Suporte */}
            <div className="mt-16 text-center">
              <p className="font-[family-name:var(--font-inter)] text-brown/40 text-xs font-black uppercase tracking-widest">
                Alguma dúvida? Entre em contato pelo e-mail de suporte
                disponível na Kiwify.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-white py-14 px-4 text-center border-t border-bronze/10 mt-auto">
          <p className="font-[family-name:var(--font-inter)] text-brown/20 text-xs font-black tracking-widest">
            © {new Date().getFullYear()} MÃE QUE ORA — TODOS OS DIREITOS RESERVADOS.
          </p>
        </footer>
      </main>
    </>
  );
}
