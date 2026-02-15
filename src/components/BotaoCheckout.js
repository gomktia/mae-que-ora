export default function BotaoCheckout({ texto = 'QUERO GARANTIR MINHA VAGA', className = '' }) {
  return (
    <a
      href="https://pay.kiwify.com.br/C10XqRz"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block w-full max-w-md mx-auto bg-green-cta text-white text-center
                  font-[family-name:var(--font-inter)] font-bold text-lg tracking-wide
                  py-4 px-8 rounded-full shadow-lg
                  hover:bg-green-cta-hover hover:scale-105
                  transition-all duration-300 ease-out
                  animate-pulse-gentle cursor-pointer ${className}`}
    >
      {texto}
    </a>
  );
}
