'use client';

import Link from 'next/link';
import { routes } from '@/lib/data';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

export default function PrivacidadPage() {
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
            README.md · /privacidad
          </div>

          <article className={`flex flex-col gap-6 ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
            <h1 className="m-0 font-display font-black text-4xl tracking-tight">
              Página de privacidad
            </h1>

            <h2 className="m-0 mt-4 font-display font-bold text-2xl tracking-tight">
              POLÍTICA DE PRIVACIDAD Y AVISO LEGAL
            </h2>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Información del titular de la web</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                AUJ2023, S.L. CIF/NIF B19785633 con domicilio en C/ JULIO CORTAZAR, 8, PARLA (MADRID), 28981, y mail de comunicaciones{' '}
                <a href="mailto:info@knitsdigital.com" className={`underline underline-offset-2 ${light ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`}>
                  info@knitsdigital.com
                </a>.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Responsable de protección de datos</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                El titular es el responsable de los datos personales que son recabados por la navegación y uso de esta web conforme a los requisitos establecidos por el REGLAMENTO (UE) 2016/679 relativo a la protección de datos de las personas físicas así como conforme a la Ley 34/2002 de 11 de julio de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE).
              </p>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Al utilizar este sitio web entendemos que ha leído y comprendido la información que se expone en relación con el tratamiento de sus datos de carácter personal.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Política de protección de datos</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                El responsable aplica el principio de responsabilidad activa en el tratamiento de los datos de carácter personal, garantizando en todo caso:
              </p>
              <ul className={`m-0 flex list-disc flex-col gap-2 pl-6 ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                <li>El respeto a las libertades y los derechos fundamentales de las personas físicas</li>
                <li>Que los datos son tratados de manera lícita, leal y transparente</li>
                <li>Que los datos tratados son exactos, adecuados, pertinentes y limitados en relación con los fines para los que son recogidos</li>
                <li>Que los fines para los que son recogidos son explícitos y legítimos y que no son tratados de manera incompatible con dichos fines</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Datos recabados, finalidad y licitud</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Los datos de carácter personal tratados son los aportados por los usuarios a través de los formularios disponibles en este sitio web y son los mínimos exigibles para poder:
              </p>
              <ul className={`m-0 flex list-disc flex-col gap-2 pl-6 ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                <li>Enviarle información sobre nuestros productos / servicios</li>
                <li>Atender consultas</li>
                <li>Tramitar pedidos, elaborar facturas correspondientes, informar sobre el estado de los pedidos, atender reclamaciones y cualquier otra gestión derivada de la prestación del servicio</li>
              </ul>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Dichas finalidades están basadas en principios legales de tratamiento de los datos: para la ejecución de un contrato o la prestación de un servicio a los usuarios, para el cumplimiento de obligaciones legales, por el interés legítimo y con el consentimiento de los usuarios.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Formularios web</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Los datos personales recabados a través del formulario web de contacto se usan para poder atender cualquier consulta que el usuario realice a través del mismo. El tratamiento de los datos está legitimado por el consentimiento que usted nos presta al aceptar expresamente las condiciones del tratamiento informadas a través de esta política de privacidad.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Destinatarios de los datos</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Los datos de carácter personal obtenidos a través de los formularios web son registrados y conservados en soportes electrónicos controlados y supervisados por el responsable del tratamiento. Sus datos personales no serán comunicados a terceros, salvo que dicha comunicación esté amparada en una obligación legal o sea necesaria para la correcta prestación del servicio.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Medidas técnicas y organizativas de protección de datos</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Los soportes cuentan con las medidas técnicas y organizativas necesarias que garantizan la confidencialidad y la conservación de los datos personales obtenidos a través de la web. Los datos personales recabados desde la web son tratados mediante protocolo HTTPS con certificado SSL válido.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Conservación de los datos</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Los datos de carácter personal obtenidos a través del formulario de contacto serán conservados el tiempo necesario para atender la solicitud o consulta realizada.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">AVISO LEGAL</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen a AUJ2023, S.L. y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.
              </p>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                En virtud de lo dispuesto en la Ley de Propiedad Intelectual quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública de la totalidad o parte de los contenidos de esta página web, con fines comerciales en cualquier soporte, sin la autorización de AUJ2023, S.L.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="m-0 font-display font-bold text-xl">Ejercicio de los derechos de protección de datos</h3>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                De acuerdo con los derechos que confiere la normativa vigente, el usuario podrá ejercer los derechos de acceso, rectificación, limitación de tratamiento, supresión, portabilidad y oposición al tratamiento de sus datos dirigiendo su petición al correo{' '}
                <a
                  href="mailto:knitsdigital@gmail.com"
                  className={`underline underline-offset-2 ${light ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`}
                >
                  knitsdigital@gmail.com
                </a>. Para el ejercicio de los derechos deberá identificarse mediante la presentación de su DNI.
              </p>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Para cualquier reclamación puede dirigirse al mismo correo. Igualmente podrá dirigirse a la{' '}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline underline-offset-2 ${light ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`}
                >
                  Agencia Española de Protección de Datos
                </a>.
              </p>
            </section>
          </article>
        </div>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
