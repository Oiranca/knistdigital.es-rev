'use client';

import Link from 'next/link';
import { routes } from '@/lib/data';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

export default function PrivacidadPage() {
  const { isLight, light, mounted, toggle } = useTheme();

  const pistacho = light ? '#a8ba53' : 'var(--color-kd-pistacho)';
  const pistachoSoft = light ? '#6a9955' : 'var(--color-kd-pistacho)';

  const pCls = `m-0 text-[15px] leading-[1.65]`
    + (light ? ' text-[#6e6f75]' : ' text-cs-fg-soft');
  const liCls = `relative pl-5 text-[15px] leading-[1.65] list-none`
    + (light ? ' text-[#6e6f75]' : ' text-cs-fg-soft');
  const linkCls = `underline underline-offset-[3px]`
    + (light ? ' text-kd-lila-deep' : ' text-kd-pistacho');

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f4f1ea' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />
      <main id="main" tabIndex={-1} className="px-8 py-16">
        <div className="mx-auto max-w-[760px]">
          {/* Doc header */}
          <div
            className="mb-8 rounded-t-lg border-b px-4 py-2 font-mono text-xs"
            style={{
              borderColor: light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
              background: light ? '#ebe7dd' : 'var(--color-cs-bg-2)',
              color: light ? '#6e6f75' : 'var(--color-cs-fg-soft)',
            }}
          >
            README.md · /privacidad
          </div>

          <article className="flex flex-col gap-4">
            <h1
              className="m-0 font-display font-black tracking-[-0.025em]"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '16px 0 12px' }}
            >
              <span className="font-mono" style={{ color: pistacho, marginRight: 6 }}>#</span>
              Página de privacidad
            </h1>

            <h2 className="m-0 mt-6 mb-2 font-display font-bold text-2xl">
              <span className="font-mono text-base" style={{ color: pistacho, marginRight: 6 }}>##</span>
              POLÍTICA DE PRIVACIDAD Y AVISO LEGAL
            </h2>

            <h3 className="m-0 mt-6 mb-2 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Información del titular de la web
            </h3>
            <p className={pCls}>
              AUJ2023, S.L. CIF/NIF B19785633 con domicilio en C/ JULIO CORTAZAR, 8, PARLA (MADRID), 28981, y mail de comunicaciones{' '}
              <a href="mailto:info@knitsdigital.com" className={linkCls}>
                info@knitsdigital.com
              </a>.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Responsable de protección de datos
            </h3>
            <p className={pCls}>
              El titular es el responsable de los datos personales que son recabados por la navegación y uso de esta web conforme a los requisitos establecidos por el REGLAMENTO (UE) 2016/679 relativo a la protección de datos de las personas físicas así como conforme a la Ley 34/2002 de 11 de julio de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE).
            </p>
            <p className={pCls}>
              Al utilizar este sitio web entendemos que ha leído y comprendido la información que se expone en relación con el tratamiento de sus datos de carácter personal.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Política de protección de datos
            </h3>
            <p className={pCls}>
              El responsable aplica el principio de responsabilidad activa en el tratamiento de los datos de carácter personal, manteniendo una constante puesta al día y una promoción de la mejora continua del sistema de protección de datos conforme a los requisitos legales exigibles, garantizando en todo caso:
            </p>
            <ul className="m-0 flex flex-col gap-2 p-0" style={{ listStyle: 'none' }}>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                el respeto a las libertades y los derechos fundamentales de las personas físicas
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                que los datos son tratados de manera lícita, leal y transparente
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                que los datos tratados son exactos, adecuados, pertinentes y limitados en relación con los fines para los que son recogidos
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                que los fines para los que son recogidos son explícitos y legítimos y que no son tratados de manera incompatible con dichos fines
              </li>
            </ul>
            <p className={pCls}>
              La finalidad de este documento es informar a los usuarios sobre qué hacemos con sus datos personales, cómo se recaban, para qué se utilizan, los derechos que les asisten así como toda la información legal necesaria establecida por la normativa vigente.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Datos recabados, finalidad y licitud
            </h3>
            <p className={pCls}>
              Los datos de carácter personal tratados son los aportados por los usuarios a través de los formularios disponibles en este sitio web y son los mínimos exigibles para poder:
            </p>
            <ul className="m-0 flex flex-col gap-2 p-0" style={{ listStyle: 'none' }}>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                enviarle información sobre nuestros productos / servicios
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                atender consultas
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: pistacho }}>-</span>
                tramitar pedidos, así como poder elaborar las facturas correspondientes, informar sobre el estado de los pedidos, atender reclamaciones y cualquier otra gestión derivada de la prestación del servicio realizado a través de este sitio web.
              </li>
            </ul>
            <p className={pCls}>
              Dichas finalidades están basadas en principios legales de tratamiento de los datos recogidos por la normativa vigente: para la ejecución de un contrato o la prestación de un servicio a los usuarios, para el cumplimiento de obligaciones legales, por el interés legítimo y con el consentimiento de los usuarios.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Formularios web
            </h3>
            <p className={pCls}>
              Los datos personales recabados a través del formulario web de contacto se usan para poder atender cualquier consulta que el usuario realice a través del mismo.
            </p>
            <p className={pCls}>
              Los datos personales recabados en el formulario de pedidos tienen la finalidad de tratar los datos necesarios para la correcta gestión de sus pedidos.
            </p>
            <p className={pCls}>
              El tratamiento de los datos está legitimado por el consentimiento que usted nos presta al aceptar expresamente las condiciones del tratamiento informadas a través de esta política de privacidad.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Destinatarios de los datos
            </h3>
            <p className={pCls}>
              Los datos de carácter personal obtenidos a través de los formularios web son registrados y conservados en soportes electrónicos controlados y supervisados por el responsable del tratamiento.
            </p>
            <p className={pCls}>
              Sus datos personales no serán comunicados a terceros, con la salvedad de que dicha comunicación de datos esté amparada en una obligación legal o cuando para la correcta prestación del servicio o la ejecución del contrato sea necesario comunicar sus datos a terceros para poder efectuar el pago (pasarelas de pago), así como gestionar las entregas de los productos (transportistas) amparada dicha cesión en las necesidades del servicio.
            </p>
            <p className={pCls}>
              Redsys Servicios de Procesamiento, S.L. cumple íntegramente con la legislación vigente en materia de protección de datos.{' '}
              <a href="https://www.redsys.es/legal/20180223_politica_de_privacidad_web_publica_redsys.pdf" target="_blank" rel="noreferrer" className={linkCls}>
                Política de privacidad
              </a>.
            </p>
            <p className={pCls}>
              PayPal (Europe) S.à.r.l. et Cie, S.C.A. —{' '}
              <a href="https://www.paypal.com/es/webapps/mpp/ua/privacy-full?locale.x=es_ES" target="_blank" rel="noreferrer" className={linkCls}>
                política de privacidad
              </a>.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Medidas técnicas y organizativas de protección de datos
            </h3>
            <p className={pCls}>
              Los soportes cuentan con las medidas técnicas y organizativas necesarias que garantizan la confidencialidad y la conservación de los datos personales obtenidos a través de la web.
            </p>
            <p className={pCls}>
              Los datos personales recabados desde la web son tratados mediante protocolo HTTPS con certificado SSL válido.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Conservación de los datos
            </h3>
            <p className={pCls}>
              Los datos de carácter personal obtenidos a través del formulario de contacto serán conservados el tiempo necesario para atender la solicitud o consulta realizada.
            </p>
            <p className={pCls}>
              Los datos del formulario de pedidos serán conservados mientras exista una relación contractual y/o comercial con usted o mientras usted no ejerza su derecho de supresión, cancelación y/o limitación del tratamiento de sus datos.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              AVISO LEGAL
            </h3>
            <p className={pCls}>
              El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen a AUJ2023, S.L. y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.
            </p>
            <p className={pCls}>
              AUJ2023, S.L. no se hace responsable de la legalidad de otros sitios web de terceros desde los que pueda accederse al portal.
            </p>
            <p className={pCls}>
              En virtud de lo dispuesto en la Ley de Propiedad Intelectual quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública de la totalidad o parte de los contenidos de esta página web, con fines comerciales en cualquier soporte, sin la autorización de AUJ2023, S.L.
            </p>

            <h3 className="m-0 font-display font-bold text-[17px]" style={{ margin: '24px 0 8px' }}>
              <span className="font-mono text-sm" style={{ color: pistachoSoft, marginRight: 6 }}>###</span>
              Ejercicio de los derechos de protección de datos
            </h3>
            <p className={pCls}>
              De acuerdo con los derechos que confiere la normativa vigente, el usuario podrá ejercer los derechos de acceso, rectificación, limitación de tratamiento, supresión, portabilidad y oposición al tratamiento de sus datos dirigiendo su petición al correo{' '}
              <a href="mailto:knitsdigital@gmail.com" className={linkCls}>
                knitsdigital@gmail.com
              </a>. Para el ejercicio de los derechos deberá identificarse mediante la presentación de su DNI.
            </p>
            <p className={pCls}>
              Para cualquier reclamación puede dirigirse al mismo correo. Igualmente podrá dirigirse a la{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={linkCls}>
                Agencia Española de Protección de Datos
              </a>.
            </p>
          </article>
        </div>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
