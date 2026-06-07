'use client';

import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

export default function CookiesPage() {
  const { isLight, light, mounted, toggle } = useTheme();

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f5f5f7' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />
      <main id="main" tabIndex={-1} className="px-8 py-16">
        <div className="mx-auto max-w-[860px]">
          {/* Doc header */}
          <div className={`mb-6 rounded-t-lg border-b px-4 py-2 font-mono text-xs ${light ? 'border-black/10 bg-[#ebebed] text-[#6e6f75]' : 'border-cs-line bg-cs-bg-2 text-cs-fg-soft'}`}>
            README.md · /cookies
          </div>

          <article className={`flex flex-col gap-6 ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
            <h1 className="m-0 font-display font-black text-4xl tracking-tight">
              Nuestras cookies{' '}
              <span aria-hidden="true">🍪✨</span>
            </h1>

            <section className="flex flex-col gap-3">
              <h2 className="m-0 font-display font-bold text-2xl tracking-tight">¿CÓMO LAS USAMOS?</h2>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Las cookies son como filamentos que nos ayudan a tejer una experiencia web única para ti. Son &quot;fibras adhesivas digitales&quot; súper inteligentes con las que recordar información sobre tu visita, ¡haciendo que podamos tejer conexiones digitales!
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="m-0 font-display font-bold text-2xl tracking-tight">NUESTRO SURTIDO</h2>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Todas o algunas de las cookies o tecnologías similares descritas a continuación pueden almacenarse en tu navegador, aplicación o dispositivo:
              </p>
              <div className="flex flex-col gap-4">
                <div className={`rounded-lg border p-5 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}>
                  <h3 className={`m-0 mb-2 font-display font-bold text-lg ${light ? 'text-kd-lila-deep' : 'text-kd-lila'}`}>
                    COOKIES ESENCIALES
                  </h3>
                  <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                    Son la base de nuestro tejido digital. Sin ellas, nuestra web sería como un suéter sin mangas. ¡Brr! No pueden desactivarse porque garantizan el funcionamiento básico del sitio.
                  </p>
                </div>
                <div className={`rounded-lg border p-5 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}>
                  <h3 className={`m-0 mb-2 font-display font-bold text-lg ${light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa'}`}>
                    COOKIES DE RENDIMIENTO
                  </h3>
                  <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                    Nos cuentan cómo te mueves por nuestra web. Es como tener un amigo que nos dice qué partes de nuestra web te hacen sonreír más. Con esta información mejoramos continuamente tu experiencia.
                  </p>
                </div>
                <div className={`rounded-lg border p-5 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}>
                  <h3 className={`m-0 mb-2 font-display font-bold text-lg ${light ? 'text-kd-pistacho-deep' : 'text-kd-pistacho'}`}>
                    COOKIES DE FUNCIONALIDAD
                  </h3>
                  <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                    Recuerdan tus preferencias. ¡Como un barista que sabe exactamente cómo te gusta tu café digital! Por ejemplo, recuerdan si prefieres el modo oscuro o claro.
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="m-0 font-display font-bold text-2xl tracking-tight">¿QUIERES SABER MÁS?</h2>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Si tienes preguntas, estamos aquí para ti. Nuestra puerta siempre está abierta para una buena charla sobre cookies (¡o sobre cualquier cosa!). Contáctanos y conversamos.
              </p>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Recuerda, al usar nuestra web, aceptas nuestras cookies. Pero no te preocupes, puedes cambiar de opinión en cualquier momento a través de la configuración de tu navegador.
              </p>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                ¡Gracias por formar parte de la familia KnitsDigital! Estamos creando una web más acogedora con cada clic{' '}
                <span aria-hidden="true">🌟 🖥️ 🧶</span>
              </p>
            </section>
          </article>
        </div>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
