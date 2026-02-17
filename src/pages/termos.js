import Head from 'next/head';
import Link from 'next/link';

export default function TermosPage() {
  return (
    <>
      <Head>
        <title>Termos de Uso — Mãe que Ora</title>
        <meta name="description" content="Termos de uso do devocional Mãe que Ora." />
      </Head>

      <main className="min-h-screen bg-snow flex flex-col">
        {/* Header */}
        <header className="bg-navy py-4">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Link href="/" className="font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide">
              Mãe que ora, transforma!
            </Link>
          </div>
        </header>

        <section className="flex-1 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-navy text-3xl font-bold mb-8">
              Termos de Uso
            </h1>

            <div className="font-[family-name:var(--font-inter)] text-navy/70 text-sm leading-relaxed space-y-6">
              <p>
                <strong className="text-navy">Última atualização:</strong> Janeiro de 2026
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site maequeora.com.br e adquirir o
                devocional &ldquo;Mãe que Ora&rdquo;, você concorda com estes
                Termos de Uso. Caso não concorde, por favor, não utilize nossos
                serviços.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                2. Descrição do Produto
              </h2>
              <p>
                O &ldquo;Mãe que Ora&rdquo; é um devocional digital de 14 dias
                composto por orações guiadas, versículos bíblicos, exercícios
                espirituais e bônus exclusivos em formato de áudio e texto
                digital. O acesso é concedido imediatamente após a confirmação do
                pagamento.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                3. Pagamento e Acesso
              </h2>
              <p>
                O pagamento é processado pela plataforma Kiwify. Após a
                confirmação do pagamento, o acesso ao conteúdo será enviado
                automaticamente para o e-mail cadastrado no momento da compra.
                Aceitamos cartão de crédito, PIX e boleto bancário.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                4. Política de Reembolso
              </h2>
              <p>
                Oferecemos garantia incondicional de 7 (sete) dias corridos a
                partir da data da compra, conforme o Código de Defesa do
                Consumidor. Para solicitar o reembolso, basta entrar em contato
                pelo e-mail de suporte ou diretamente pela plataforma Kiwify. O
                valor será devolvido integralmente, sem necessidade de
                justificativa.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                5. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo do devocional — incluindo textos, orações,
                áudios, imagens e materiais de apoio — é protegido por direitos
                autorais. É proibida a reprodução, distribuição, modificação ou
                compartilhamento do conteúdo sem autorização prévia por escrito.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                6. Uso Pessoal
              </h2>
              <p>
                O acesso ao devocional é individual e intransferível. O conteúdo
                é licenciado para uso pessoal e privado. O compartilhamento de
                credenciais de acesso ou do material com terceiros constitui
                violação destes termos.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                7. Isenção de Responsabilidade
              </h2>
              <p>
                O devocional &ldquo;Mãe que Ora&rdquo; é um recurso espiritual e
                devocional. Não substitui aconselhamento profissional
                psicológico, médico ou terapêutico. Os resultados podem variar de
                acordo com a dedicação e as circunstâncias individuais de cada
                usuária.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                8. Modificações
              </h2>
              <p>
                Reservamo-nos o direito de alterar estes Termos de Uso a qualquer
                momento. Alterações significativas serão comunicadas por e-mail ou
                através do site.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                9. Contato
              </h2>
              <p>
                Para dúvidas sobre estes termos, entre em contato através do
                e-mail de suporte disponível na plataforma Kiwify.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy py-6 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center gap-4 mb-3">
              <Link
                href="/privacidade"
                className="font-[family-name:var(--font-inter)] text-white/40 text-xs hover:text-gold transition-colors"
              >
                Política de Privacidade
              </Link>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
              © {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
