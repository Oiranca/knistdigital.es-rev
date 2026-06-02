import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders hero section with proper title', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /Tejemos código/i })).toBeInTheDocument();
  });

  it('renders main subtitle with WCAG mention', () => {
    render(<Hero />);
    expect(screen.getByText(/WCAG 2.2/i)).toBeInTheDocument();
  });

  it('renders contact and services buttons', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Contactar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver servicios/i })).toBeInTheDocument();
  });

  it('renders code editor mockup', async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(screen.getByText('knitsdigital.ts')).toBeInTheDocument();
    });
  });

  it('has accessible code example with aria-label', () => {
    render(<Hero />);
    const codeExample = screen.getByRole('img', { name: /Ejemplo de código/i });
    expect(codeExample).toBeInTheDocument();
  });

  it('renders badge with terminal appearance', () => {
    render(<Hero />);
    expect(screen.getByText('~/knitsdigital')).toBeInTheDocument();
  });
});
