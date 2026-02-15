import { useState } from 'react';

const FAQ_ITEMS = [
  {
    pergunta: 'O que é o devocional "Mãe que Ora"?',
    resposta:
      'É um cronograma de oração de 14 dias, criado especialmente para mães que desejam interceder pelos seus filhos com direção espiritual, versículos bíblicos e exercícios práticos de fé.',
  },
  {
    pergunta: 'Preciso ter experiência com oração?',
    resposta:
      'Não! O devocional foi feito para todas as mães — desde as que já oram diariamente até as que estão começando agora. Cada dia traz uma orientação clara e simples de seguir.',
  },
  {
    pergunta: 'Como vou receber o material?',
    resposta:
      'Imediatamente após a confirmação do pagamento, você receberá o acesso completo por e-mail. Todo o conteúdo é digital e pode ser acessado pelo celular ou computador.',
  },
  {
    pergunta: 'Funciona para filhos de qualquer idade?',
    resposta:
      'Sim. O devocional contempla orações para filhos na infância, adolescência e fase adulta. Você pode adaptar cada oração à realidade do seu filho.',
  },
  {
    pergunta: 'E se eu não gostar do conteúdo?',
    resposta:
      'Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, basta solicitar o reembolso e devolvemos 100% do seu investimento.',
  },
  {
    pergunta: 'O pagamento é seguro?',
    resposta:
      'Sim! O pagamento é processado pela Kiwify, uma plataforma 100% segura e confiável. Aceitamos cartão de crédito, PIX e boleto bancário.',
  },
];

export default function AcordeaoFAQ() {
  const [aberto, setAberto] = useState(null);

  function toggle(index) {
    setAberto(aberto === index ? null : index);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="border border-ice rounded-xl overflow-hidden bg-white"
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer
                       hover:bg-snow transition-colors duration-200"
          >
            <span className="font-[family-name:var(--font-inter)] text-navy font-semibold text-sm sm:text-base">
              {item.pergunta}
            </span>
            <span
              className={`text-gold text-xl flex-shrink-0 transition-transform duration-300
                          ${aberto === i ? 'rotate-180' : 'rotate-0'}`}
            >
              ▾
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${aberto === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="font-[family-name:var(--font-inter)] text-navy/70 text-sm leading-relaxed px-6 pb-4">
              {item.resposta}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
