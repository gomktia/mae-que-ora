import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/vsl?video=s10&dor=diagnostico');
  };

  return (
    <>
      <Head>
        <title>Mãe que Ora — A Revelação</title>
      </Head>

      <main className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landingpage/01.jpeg"
            alt="Fundo Devocional"
            layout="fill"
            objectFit="cover"
            className="opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <section className="relative z-10 w-full max-w-[92vw] sm:max-w-[380px] md:max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-xl animate-fade-in-up border border-white/60 ring-1 ring-white/70">
            <button
              onClick={handleClick}
              className="group w-full bg-[#1a9d55] hover:bg-[#158247] text-white font-[family-name:var(--font-inter)] font-black text-lg sm:text-xl py-5 sm:py-6 px-6 rounded-full shadow-[0_15px_40px_-5px_rgba(26,157,85,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-white/10 cursor-pointer animate-pulse-gentle"
            >
              Quero uma nova história para o meu filho(a).
              <span className="text-2xl leading-none group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </section>

        <footer className="absolute bottom-4 left-0 right-0 z-10 text-center pointer-events-none">
          <p className="font-[family-name:var(--font-inter)] text-white/20 text-[9px] font-black tracking-[0.3em] uppercase">
            &copy; 2026 Mãe que Ora
          </p>
        </footer>
      </main>
    </>
  );
}

