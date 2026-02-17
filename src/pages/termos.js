import Head from 'next/head';
import Link from 'next/link';

export default function TermosPage() {
  return (
    <>
      <Head>
        <title>Termos de Uso — Mãe que Ora</title>
        <meta name="description" content="Termos de uso do devocional Mãe que Ora." />
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
              Termos de Uso
            </h1>

            <div className="font-[family-name:var(--font-inter)] text-brown/80 text-base leading-relaxed space-y-8 font-medium">
              <p className="bg-sand/40 p-4 rounded-xl border-l-4 border-bronze italic">
                <strong className="text-brown">Última atualização:</strong> Janeiro de 2026
              </p>

              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e utilizar o site maequeora.com.br e adquirir o
                  devocional &ldquo;Mãe que Ora&rdquo;, você concorda com estes
                  Termos de Uso. Caso não concorde, por favor, não utilize nossos
                  serviços.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                  2. Descrição do Produto
                </h2>
                <p>
                  O &ldquo;Mãe que Ora&rdquo; é um devocional digital de 14 dias
                  composto por orações guiadas, versículos bíblicos, exercícios
                  espirituais e bônus exclusivos. O acesso é concedido imediatamente após a confirmação do
                  pagamento.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                  3. Pagamento e Acesso
                </h2>
                <p>
                  O pagamento é processado pela plataforma Kiwify. O acesso será enviado
                  automaticamente para o e-mail cadastrado.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                  4. Política de Reembolso
                </h2>
                <p>
                  Oferecemos garantia incondicional de 7 dias. O valor será devolvido integralmente caso solicitado dentro deste prazo.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-brown text-2xl font-black mt-12 mb-4">
                  5. Direitos Autorais
                </h2>
                <p>
                  Todo o conteúdo é protegido por direitos autorais. É proibida a reprodução ou compartilhamento sem autorização prévia por escrito.
                </p>
              </div>

              <div className="bg-brown p-8 rounded-[2rem] text-white/90 text-sm mt-12">
                <p className="font-bold mb-4 text-bronze uppercase tracking-[0.2em]">Isenção de Responsabilidade</p>
                O devocional é um recurso espiritual e não substitui aconselhamento médico ou psicológico profissional. Os resultados variam de acordo com as circunstâncias individuais.
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-14 px-4 text-center border-t border-bronze/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 mb-6 font-black text-xs uppercase tracking-widest text-brown/30">
              <Link href="/privacidade" className="hover:text-bronze transition-colors">Privacidade</Link>
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
