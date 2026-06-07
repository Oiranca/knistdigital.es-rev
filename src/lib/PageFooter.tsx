import Link from 'next/link';
import { nav, footerLegal } from './data';
import { Icon } from './icons';

interface PageFooterProps {
  isLight: boolean;
}

export function PageFooter({ isLight: light }: PageFooterProps) {
  return (
    <footer
      className={`border-t px-8 py-12 ${light ? 'border-black/10' : 'border-cs-line'}`}
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Brand */}
        <div className="mb-10 flex items-start gap-4">
          <img src="/assets/isotype.png" alt="" width={40} height={40} aria-hidden="true" />
          <div>
            <div className={`font-mono text-lg font-bold tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
              knitsdigital
            </div>
            <p className={`m-0 mt-1 max-w-[40ch] text-sm leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Donde la tecnología, la <em>creatividad</em> y las personas <em>se entrelazan</em>.
            </p>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Navega */}
          <div>
            <h3 className={`m-0 mb-4 font-mono text-[11px] font-bold uppercase tracking-widest ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Navega
            </h3>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    className={`font-mono text-sm no-underline transition-colors hover:text-kd-pistacho ${light ? 'text-[#1a1b1e]' : 'text-cs-fg-soft'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`m-0 mb-4 font-mono text-[11px] font-bold uppercase tracking-widest ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Legal
            </h3>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {footerLegal.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    className={`font-mono text-sm no-underline transition-colors hover:text-kd-pistacho ${light ? 'text-[#1a1b1e]' : 'text-cs-fg-soft'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Síguenos */}
          <div>
            <h3 className={`m-0 mb-4 font-mono text-[11px] font-bold uppercase tracking-widest ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/knitsdigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de KnitsDigital"
                className={`transition-colors hover:text-kd-pistacho ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}
              >
                <Icon name="instagram" width={20} height={20} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/knitsdigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de KnitsDigital"
                className={`transition-colors hover:text-kd-pistacho ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}
              >
                <Icon name="linkedin" width={20} height={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`flex flex-col gap-1 border-t pt-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between ${
            light ? 'border-black/10 text-[#6e6f75]' : 'border-cs-line text-cs-fg-soft'
          }`}
        >
          <p className="m-0">© KnitsDigital {new Date().getFullYear()}</p>
          <p className="m-0">Hecho con accesibilidad como hilo conductor.</p>
        </div>
      </div>
    </footer>
  );
}
