import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Mãe que Ora — Comece sua Jornada</title>
        <meta
          name="description"
          content="Descubra a oração capaz de transformar a vida do seu filho hoje."
        />
      </Head>

      <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-between py-10 px-6 overflow-hidden">
        {/* Background Image Layer - The core visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landingpage/02.jpeg"
            alt="Mulher orando sob feixe de luz divino"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-80"
          />
          {/* Shadow overlays for better text contrast at top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Top Card Section */}
        <div className="relative z-10 w-full max-w-[380px] bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] animate-fade-in-up border-t border-t-white/80 border-b border-b-white/20 ring-1 ring-white/40">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70"></div>
          <h1 className="font-[family-name:var(--font-playfair)] text-[#3E2C22] text-3xl sm:text-4xl font-black leading-[1.2] mb-6 text-center tracking-tight drop-shadow-sm">
            Existe uma oração capaz de transformar a vida do seu filho hoje.
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[#3E2C22] text-lg sm:text-xl leading-snug text-center font-bold drop-shadow-sm">
            Você sente que algo precisa mudar, mas não sabe por onde começar? Faça este diagnóstico gratuito e descubra o caminho.
          </p>
        </div>

        {/* Spacer to allow the background image (the woman) to be visible in the middle */}
        <div className="flex-grow flex items-center justify-center">
          {/* Middle area left clear to show the praying woman */}
        </div>

        {/* Bottom Action Area */}
        <div className="relative z-10 w-full max-w-[380px] flex flex-col items-center animate-fade-in-up">
          <button
            onClick={() => router.push('/quiz')}
            className="group relative w-full bg-gradient-to-r from-[#A37838] to-[#C89B55] text-white font-[family-name:var(--font-inter)] font-black text-lg py-6 px-4 rounded-full shadow-[0_15px_40px_-5px_rgba(163,120,56,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 border border-white/20 overflow-hidden"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

            <span className="uppercase tracking-tight relative z-10">COMEÇAR MEU DIAGNÓSTICO</span>
            <span className="text-3xl leading-none group-hover:translate-x-2 transition-transform relative z-10">&rarr;</span>
          </button>

          <div className="mt-8 flex items-center gap-2 text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full border border-white/5">
            <span className="text-sm">🔒</span>
            <span>Ambiente seguro e confidencial</span>
          </div>

          <div className="mt-8 opacity-30">
            <p className="font-[family-name:var(--font-inter)] text-white text-[10px] font-black uppercase tracking-[0.4em]">
              &copy; 2026 MÃE QUE ORA
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
