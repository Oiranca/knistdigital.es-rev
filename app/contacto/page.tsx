'use client';

import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

const FORMSPREE = 'https://formspree.io/f/xkgrggqv';

type FormValues = { name: string; email: string; message: string; privacy: boolean };
type Touched = Partial<Record<keyof FormValues, boolean>>;

function validate(v: FormValues) {
  return {
    name: v.name.trim().length === 0 ? 'Por favor, introduce tu nombre' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) ? 'Por favor, introduce un correo válido' : '',
    message: v.message.trim().length === 0 ? 'Por favor, introduce tu mensaje' : '',
    privacy: !v.privacy ? 'Debes aceptar los términos de privacidad' : '',
  };
}

function ContactForm({ light }: { light: boolean }) {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '', privacy: false });
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const errors = validate(values);
  const isValid = !errors.name && !errors.email && !errors.message && !errors.privacy;

  const show = (k: keyof FormValues) => (touched[k] && errors[k]) ? errors[k] : '';

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setValues((v) => ({
      ...v,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true, privacy: true });
    if (!isValid) return;
    setSubmitting(true);
    setServerError('');
    try {
      const fd = new FormData();
      fd.append('name', values.name);
      fd.append('email', values.email);
      fd.append('message', values.message);
      fd.append('privacy_accepted', 'Sí');
      const res = await fetch(FORMSPREE, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError((data as { error?: string }).error || 'No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.');
      }
    } catch {
      setServerError('Error de conexión. Revisa tu red e inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = `w-full rounded-md border px-3 py-2.5 font-body text-base outline-none transition-colors focus:border-kd-pistacho ${
    light
      ? 'border-black/10 bg-[#f5f5f7] text-[#1a1b1e] placeholder:text-[#6e6f75]'
      : 'border-cs-line bg-cs-bg text-cs-fg placeholder:text-cs-fg-soft'
  }`;

  const labelCls = `block font-mono text-sm mb-1 ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`;

  if (submitted) {
    return (
      <div className={`rounded-xl border p-10 text-center ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}>
        <div className="mb-4 text-4xl" aria-hidden="true">✅</div>
        <h2 className={`m-0 mb-2 font-display font-black text-2xl ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
          ¡Mensaje enviado!
        </h2>
        <p className={`m-0 ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Te respondemos en menos de 48h. Hasta entonces, ¡gracias por confiar en KnitsDigital!
        </p>
      </div>
    );
  }

  return (
    <form
      className={`rounded-xl border p-8 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}
      onSubmit={onSubmit}
      noValidate
      aria-label="Formulario de contacto"
    >
      {/* Name */}
      <div className="mb-5">
        <label htmlFor="ct-name" className={labelCls}>
          {'> nombre'} <span className="text-kd-red" aria-label="requerido">*</span>
        </label>
        <input
          id="ct-name"
          name="name"
          type="text"
          placeholder="¿Cómo te llamas?"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          required
          aria-required="true"
          aria-invalid={!!show('name')}
          aria-describedby={show('name') ? 'err-name' : undefined}
          className={inputCls}
        />
        {show('name') && <p id="err-name" role="alert" className="mt-1 text-sm text-kd-red">{show('name')}</p>}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="ct-email" className={labelCls}>
          {'> email'} <span className="text-kd-red" aria-label="requerido">*</span>
        </label>
        <input
          id="ct-email"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          required
          aria-required="true"
          aria-invalid={!!show('email')}
          aria-describedby={show('email') ? 'err-email' : undefined}
          className={inputCls}
        />
        {show('email') && <p id="err-email" role="alert" className="mt-1 text-sm text-kd-red">{show('email')}</p>}
      </div>

      {/* Message */}
      <div className="mb-5">
        <label htmlFor="ct-message" className={labelCls}>
          {'> mensaje'} <span className="text-kd-red" aria-label="requerido">*</span>
        </label>
        <textarea
          id="ct-message"
          name="message"
          maxLength={1000}
          placeholder="Cuéntanos sobre tu proyecto, plazos, presupuesto…"
          rows={5}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          required
          aria-required="true"
          aria-invalid={!!show('message')}
          aria-describedby={show('message') ? 'err-message' : undefined}
          className={`${inputCls} resize-y`}
        />
        {show('message') && <p id="err-message" role="alert" className="mt-1 text-sm text-kd-red">{show('message')}</p>}
      </div>

      {/* Privacy checkbox */}
      <div className="mb-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacy"
            checked={values.privacy}
            onChange={onChange}
            onBlur={onBlur}
            aria-required="true"
            aria-invalid={!!show('privacy')}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-kd-pistacho"
          />
          <span className={`text-sm leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            He leído y acepto los términos y condiciones de{' '}
            <Link href={routes.privacidad} className={`underline underline-offset-2 ${light ? 'text-kd-lila-deep' : 'text-kd-lila'}`}>
              privacidad
            </Link>{' '}
            <span className="text-kd-red" aria-label="requerido">*</span>
          </span>
        </label>
        {show('privacy') && <p role="alert" className="mt-1 text-sm text-kd-red">{show('privacy')}</p>}
      </div>

      {serverError && (
        <div role="alert" className="mb-4 rounded-md border border-kd-red/30 bg-kd-red/10 px-4 py-3 text-sm text-kd-red">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className={`w-full rounded px-6 py-3 font-mono font-semibold text-[15px] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${
          light ? 'bg-kd-lila-deep text-white hover:bg-kd-lila-dark' : 'bg-kd-pistacho text-kd-black hover:bg-[#e5fc7a]'
        }`}
      >
        {submitting ? '$ sending…' : <>$ send --message <span className="animate-cs-blink" aria-hidden="true">_</span></>}
      </button>
    </form>
  );
}

export default function ContactoPage() {
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
      <main id="main" tabIndex={-1}>
        <section className="px-8 py-16" aria-labelledby="contacto-title">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-start gap-16 lg:grid-cols-2">
            {/* Left col */}
            <div className="flex flex-col gap-6">
              <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
                {'/* contacto */'}
              </span>
              <h1
                id="contacto-title"
                className={`m-0 font-display font-black leading-[1.02] tracking-[-0.04em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                ¡Engánchate a{' '}
                <em className="gradient-text not-italic">nuestro hilo</em>!
              </h1>
              <p className={`m-0 max-w-[44ch] text-lg leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Estamos aquí para ayudarte a destacar. ¡Habla con el equipo y descubre cómo podemos hacer realidad tus proyectos!
              </p>
              <div className={`flex flex-col gap-3 font-mono text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                <a
                  href="mailto:hola@knitsdigital.es"
                  className={`inline-flex items-center gap-2 no-underline transition-colors hover:text-kd-pistacho ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
                >
                  <span aria-hidden="true">→</span>
                  hola@knitsdigital.es
                </a>
              </div>
            </div>

            {/* Right col: form */}
            <ContactForm light={light} />
          </div>
        </section>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
