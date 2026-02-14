import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function StartPage() {
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

            <main className="relative min-h-screen flex flex-col items-center justify-center bg-navy text-center px-4 overflow-hidden">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/mulher-orando.jpg"
                        alt="Mulher orando intercedendo pelo filho"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="opacity-40" // Ajuste de opacidade para legibilidade
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/60 to-navy/90" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
                    <span className="inline-block font-[family-name:var(--font-inter)] text-gold/90 text-sm font-semibold tracking-[0.2em] uppercase mb-6 bg-navy/40 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm">
                        Diagnóstico Espiritual
                    </span>

                    <h1 className="font-[family-name:var(--font-playfair)] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg">
                        Existe uma oração capaz de transformar a vida do seu filho hoje.
                    </h1>

                    <p className="font-[family-name:var(--font-inter)] text-white/90 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
                        Você sente que algo precisa mudar, mas não sabe por onde começar?
                        Faça este diagnóstico gratuito e descubra o caminho.
                    </p>

                    <button
                        onClick={() => router.push('/')}
                        className="group relative inline-flex items-center justify-center gap-3 bg-green-cta text-white 
                       font-[family-name:var(--font-inter)] font-bold text-lg sm:text-xl tracking-wide
                       py-5 px-10 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)]
                       hover:bg-green-cta-hover hover:scale-105 hover:shadow-[0_0_50px_rgba(37,211,102,0.6)]
                       transition-all duration-300 ease-out transform animate-pulse-gentle cursor-pointer"
                    >
                        <span>COMEÇAR MEU DIAGNÓSTICO</span>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">
                            &rarr;
                        </span>
                    </button>

                    <div className="mt-10 flex items-center justify-center gap-2 text-white/50 text-xs sm:text-sm font-[family-name:var(--font-inter)]">
                        <span>🔒</span>
                        <span>Ambiente seguro e confidencial</span>
                    </div>
                </div>

                {/* Footer simple */}
                <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                    <p className="font-[family-name:var(--font-inter)] text-white/30 text-[10px] sm:text-xs uppercase tracking-widest">
                        © {new Date().getFullYear()} Mãe que Ora
                    </p>
                </div>
            </main>
        </>
    );
}
