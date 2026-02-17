import Head from 'next/head';
import Image from 'next/image';
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

            <main className="relative min-h-screen flex flex-col items-center justify-center bg-sand text-center px-4 overflow-hidden">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/landingpage/01.jpeg"
                        alt="Mulher orando de perfil com luz dourada"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="opacity-20 grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-transparent to-sand/80" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
                    <div className="flex justify-center mb-8">
                        <span className="inline-block font-[family-name:var(--font-inter)] text-bronze text-xs font-black tracking-[0.3em] uppercase bg-white/60 px-6 py-2.5 rounded-full border border-bronze/20 shadow-sm backdrop-blur-md">
                            Diagnóstico Espiritual
                        </span>
                    </div>

                    <h1 className="font-[family-name:var(--font-playfair)] text-brown text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
                        Existe uma oração capaz de <span className="text-bronze">transformar</span> a vida do seu filho hoje.
                    </h1>

                    <p className="font-[family-name:var(--font-inter)] text-brown/80 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                        Você sente que algo precisa mudar, mas não sabe por onde começar?
                        Faça este diagnóstico gratuito e descubra o caminho.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="group relative inline-flex items-center justify-center gap-4 bg-bronze text-white 
                                     font-[family-name:var(--font-inter)] font-black text-xl sm:text-2xl tracking-tight
                                     py-6 px-12 rounded-2xl shadow-[0_20px_40px_-10px_rgba(163,120,56,0.4)]
                                     hover:bg-[#8e682f] hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(163,120,56,0.5)]
                                     active:scale-95 transition-all duration-300 ease-out transform animate-pulse-gentle cursor-pointer"
                        >
                            <span>COMEÇAR MEU DIAGNÓSTICO</span>
                            <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">
                                &rarr;
                            </span>
                        </button>

                        <p className="text-brown/40 text-[10px] sm:text-xs font-black uppercase tracking-widest mt-4">
                            Leva menos de 2 minutos
                        </p>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-2 text-brown/30 text-xs font-bold">
                        <span className="text-lg">🔒</span>
                        <span>Ambiente 100% seguro e confidencial</span>
                    </div>
                </div>

                {/* Footer simple */}
                <div className="absolute bottom-8 left-0 right-0 text-center z-10 px-4">
                    <p className="font-[family-name:var(--font-inter)] text-brown/20 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black">
                        &copy; {new Date().getFullYear()} Mãe que Ora — Todos os direitos reservados
                    </p>
                </div>
            </main>
        </>
    );
}
