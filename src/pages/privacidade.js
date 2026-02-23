import Head from 'next/head';
import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <>
      <Head>
        <title>Política de Privacidade — Mãe que Ora</title>
        <meta name="description" content="Política de privacidade do devocional Mãe que Ora." />
      </Head>

      <main className="min-h-screen bg-sand flex flex-col text-brown">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md py-6 border-b border-bronze/10 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Link href="/" className="font-[family-name:var(--font-playfair)] text-bronze text-3xl font-black tracking-tighter hover:scale-105 transition-transform inline-block">
              Mãe que ora, transforma!
            </Link>
          </div>
        </header>

        <section className="flex-1 py-20 px-4">
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm p-8 sm:p-12 rounded-[2.5rem] border border-bronze/10 shadow-xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-brown text-4xl font-black mb-10 tracking-tighter">
              Política de Privacidade
            </h1>

            <div className="font-[family-name:var(--font-inter)] text-brown/80 text-base leading-relaxed space-y-8 font-medium">
              <p className="bg-sand/40 p-4 rounded-xl border-l-4 border-bronze italic">
                <strong className="text-brown">Última atualização:</strong> Janeiro de 2026
              </p>

              <p>
                A sua privacidade é importante para nós. Esta Política de
                Privacidade explica como coletamos, usamos e protegemos as
                informações fornecidas por você ao utilizar o site
                maequeora.com.br.
              </p>

              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                  1. Informações que Coletamos
                </h2>
                <p>Podemos coletar as seguintes informações:</p>
                <ul className="grid gap-4 mt-4">
                  <li className="bg-white p-6 rounded-2xl shadow-sm border border-bronze/5">
                    <strong className="text-bronze block mb-1 uppercase text-xs tracking-widest font-black">Dados pessoais</strong>
                    Nome e endereço de e-mail, fornecidos voluntariamente no momento da compra através da plataforma Kiwify.
                  </li>
                  <li className="bg-white p-6 rounded-2xl shadow-sm border border-bronze/5">
                    <strong className="text-bronze block mb-1 uppercase text-xs tracking-widest font-black">Dados de navegação</strong>
                    Informações sobre como você interage com o site, coletadas através de cookies e ferramentas de análise.
                  </li>
                  <li className="bg-white p-6 rounded-2xl shadow-sm border border-bronze/5">
                    <strong className="text-bronze block mb-1 uppercase text-xs tracking-widest font-black">Dados de segmentação</strong>
                    Respostas fornecidas no quiz, utilizadas exclusivamente para personalizar sua experiência.
                  </li>
                </ul>
              </div>

              <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                2. Como Utilizamos suas Informações
              </h2>
              <p>As informações coletadas são utilizadas para:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-bronze">
                <li>Processar sua compra e entregar o acesso ao devocional;</li>
                <li>Personalizar o conteúdo exibido;</li>
                <li>Enviar comunicações relacionadas à sua compra;</li>
                <li>Melhorar a experiência de navegação no site;</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>

              <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                3. Compartilhamento de Dados
              </h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações
                pessoais com terceiros, exceto Kiwify (processamento de pagamentos) e obrigações legais.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                4. Cookies
              </h2>
              <p>
                Utilizamos cookies para melhorar sua experiência. Você pode desativá-los nas configurações do navegador.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                5. Segurança
              </h2>
              <p>
                Adotamos medidas de segurança adequadas. Pagamentos são processados em ambiente seguro pela Kiwify.
              </p>

              <div className="bg-brown p-8 rounded-[2rem] text-white/90 text-sm mt-12">
                <p className="font-bold mb-4 text-bronze uppercase tracking-[0.2em]">Importante</p>
                De acordo com a LGPD, você tem o direito de acessar, corrigir, excluir ou portar seus dados a qualquer momento via e-mail de suporte.
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-14 px-4 text-center border-t border-bronze/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 mb-6 font-black text-xs uppercase tracking-widest text-brown/30">
              <Link href="/termos" className="hover:text-bronze transition-colors">Termos de Uso</Link>
              <Link href="/" className="hover:text-bronze transition-colors">Voltar ao Início</Link>
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
