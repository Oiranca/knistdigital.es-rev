import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders logo with text', () => {
    render(<Header />);
    expect(screen.getByLabelText(/KnitsDigital.*Inicio/i)).toBeInTheDocument();
  });

  it('renders navigation menu with main routes', () => {
    render(<Header />);
    expect(screen.getAllByText('Servicios').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Equipo').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Precios').length).toBeGreaterThan(0);
  });

  it('renders contact button', () => {
    render(<Header />);
    const contactButtons = screen.getAllByText(/Contactar/);
    expect(contactButtons.length).toBeGreaterThan(0);
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    const themeBtn = screen.getByRole('button', { name: /Modo/i });
    expect(themeBtn).toBeInTheDocument();
  });

  it('has skip to content link', () => {
    render(<Header />);
    const skipLink = screen.getByText('Saltar al contenido');
    expect(skipLink).toBeInTheDocument();
  });

  it('renders burger menu button on mobile', () => {
    render(<Header />);
    const burgerBtn = screen.getByRole('button', { name: /menú/i });
    expect(burgerBtn).toBeInTheDocument();
  });
});
