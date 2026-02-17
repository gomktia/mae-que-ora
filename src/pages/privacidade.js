import Head from 'next/head';
import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <>
      <Head>
        <title>Política de Privacidade — Mãe que Ora</title>
        <meta name="description" content="Política de privacidade do devocional Mãe que Ora." />
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
              Política de Privacidade
            </h1>

            <div className="font-[family-name:var(--font-inter)] text-navy/70 text-sm leading-relaxed space-y-6">
              <p>
                <strong className="text-navy">Última atualização:</strong> Janeiro de 2026
              </p>

              <p>
                A sua privacidade é importante para nós. Esta Política de
                Privacidade explica como coletamos, usamos e protegemos as
                informações fornecidas por você ao utilizar o site
                maequeora.com.br.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                1. Informações que Coletamos
              </h2>
              <p>Podemos coletar as seguintes informações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dados pessoais:</strong> Nome e endereço de e-mail,
                  fornecidos voluntariamente no momento da compra através da
                  plataforma Kiwify.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> Informações sobre como
                  você interage com o site, incluindo páginas visitadas, tempo de
                  permanência e dispositivo utilizado, coletadas através de
                  cookies e ferramentas de análise.
                </li>
                <li>
                  <strong>Dados de segmentação:</strong> Respostas fornecidas no
                  quiz de segmentação (tipo de dor selecionada), utilizadas
                  exclusivamente para personalizar a experiência no site.
                </li>
              </ul>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                2. Como Utilizamos suas Informações
              </h2>
              <p>As informações coletadas são utilizadas para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar sua compra e entregar o acesso ao devocional;</li>
                <li>Personalizar o conteúdo exibido com base na segmentação;</li>
                <li>Enviar comunicações relacionadas à sua compra;</li>
                <li>Melhorar a experiência de navegação no site;</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                3. Compartilhamento de Dados
              </h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações
                pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Kiwify:</strong> Plataforma de pagamento que processa
                  sua compra e gerencia o acesso ao conteúdo digital.
                </li>
                <li>
                  <strong>Ferramentas de análise:</strong> Como Google Analytics,
                  para compreender o comportamento dos visitantes e otimizar o
                  site.
                </li>
                <li>
                  <strong>Obrigações legais:</strong> Quando exigido por lei ou
                  autoridade competente.
                </li>
              </ul>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                4. Cookies
              </h2>
              <p>
                Utilizamos cookies para melhorar sua experiência de navegação,
                lembrar suas preferências e analisar o tráfego do site. Você pode
                desativar os cookies nas configurações do seu navegador, mas isso
                pode afetar a funcionalidade do site.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                5. Segurança dos Dados
              </h2>
              <p>
                Adotamos medidas de segurança adequadas para proteger suas
                informações contra acesso não autorizado, alteração, divulgação
                ou destruição. Os pagamentos são processados em ambiente seguro
                pela Kiwify, que utiliza criptografia SSL.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                6. Seus Direitos (LGPD)
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (Lei nº
                13.709/2018), você tem o direito de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar os dados pessoais que mantemos sobre você;</li>
                <li>Solicitar a correção de dados incompletos ou desatualizados;</li>
                <li>Solicitar a exclusão dos seus dados pessoais;</li>
                <li>Revogar o consentimento para o tratamento de dados;</li>
                <li>Solicitar a portabilidade dos seus dados.</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, entre em contato
                através do e-mail de suporte.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                7. Retenção de Dados
              </h2>
              <p>
                Mantemos suas informações pessoais pelo tempo necessário para
                cumprir as finalidades descritas nesta política, salvo quando um
                período de retenção mais longo for exigido por lei.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                8. Alterações nesta Política
              </h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente.
                Alterações significativas serão comunicadas por e-mail ou através
                de aviso no site.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-navy text-xl font-bold mt-8">
                9. Contato
              </h2>
              <p>
                Para dúvidas sobre esta política ou sobre o tratamento dos seus
                dados pessoais, entre em contato através do e-mail de suporte
                disponível na plataforma Kiwify.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy py-6 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center gap-4 mb-3">
              <Link
                href="/termos"
                className="font-[family-name:var(--font-inter)] text-white/40 text-xs hover:text-gold transition-colors"
              >
                Termos de Uso
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
