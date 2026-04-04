export default function PrecoAncorado() {
  return (
    <div className="bg-white border-t-4 border-gold rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
      <p className="font-[family-name:var(--font-inter)] text-navy/50 text-sm mb-1">
        Valor original:
      </p>
      <p className="font-[family-name:var(--font-inter)] text-red-500 text-2xl font-bold line-through mb-4">
        R$ 197,00
      </p>

      <p className="font-[family-name:var(--font-inter)] text-navy/70 text-sm mb-1">
        Por apenas
      </p>
      <p className="font-[family-name:var(--font-playfair)] text-green-cta text-4xl font-bold mb-1">
        12x de R$ 10,03
      </p>
      <p className="font-[family-name:var(--font-inter)] text-navy/60 text-sm mb-6">
        (Ou <strong className="text-navy">R$ 97,00</strong> à vista)
      </p>

      <div className="border-t border-ice pt-5 space-y-2">
        <p className="font-[family-name:var(--font-inter)] text-navy/50 text-xs">
          ☕ Menos que um café por dia
        </p>
        <p className="font-[family-name:var(--font-inter)] text-navy/50 text-xs">
          🍔 Menos que um lanche no final de semana
        </p>
        <p className="font-[family-name:var(--font-inter)] text-navy/50 text-xs">
          💆 Menos que uma sessão de terapia
        </p>
      </div>
    </div>
  );
}
