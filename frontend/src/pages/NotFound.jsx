export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#092456] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl">
        <section className="relative rounded-[28px] overflow-hidden shadow-2xl">
          <div className="bg-black">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(1200px 600px at 70% 40%, rgba(22,92,222,0.35), transparent 60%)",
              }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 p-8 md:p-10 lg:p-12">
              <div className="flex flex-col justify-center">
                <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
                  Página não encontrada
                </h1>

                <p className="mt-4 text-[15px] leading-relaxed text-[#CADDFF]">
                  A página que você tentou acessar não existe.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                                 bg-[#165CDE] text-white
                                 shadow-md hover:shadow-lg hover:bg-[#0f4bb7]
                                 active:scale-[0.98]
                                 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#165CDE]
                                 transition"
                  >
                    Voltar para o início
                  </a>
                </div>
              </div>
              <div className="mt-10 md:mt-0 md:pl-10 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="rounded-3xl bg-[#165CDE] p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                    <div className="rounded-2xl bg-white/8 border border-white/10 backdrop-blur-sm p-8 md:p-10 text-center">
                      <div className="mx-auto">
                        <div
                          className="text-[86px] md:text-[110px] font-extrabold leading-none tracking-tight
                                          bg-clip-text text-transparent
                                          bg-gradient-to-b from-[#CADDFF] to-[#165CDE] drop-shadow-[0_6px_18px_rgba(22,92,222,0.35)]"
                        >
                          404
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-4 md:-inset-6 rounded-3xl -z-10 bg-black/0" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
