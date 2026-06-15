'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { business, services, fromLabel } from '../lib/business';
import { Logo, Phone } from './icons';

const NAV = [
  { href: '/#how', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
];

function Caret() {
  return (
    <svg className="nav-caret" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <Link href="/" className="logo-link" aria-label="Quick Clean home">
          <Logo />
        </Link>

        <nav className="nav" aria-label="Primary">
          {/* Services mega-dropdown */}
          <div className="has-dropdown">
            <Link href="/services" className="nav-trigger" aria-haspopup="true">
              Services <Caret />
            </Link>
            <div className="mega" role="menu" aria-label="Services">
              {services.map((s) => (
                <Link href={`/services/${s.slug}`} className="mega-item" role="menuitem" key={s.slug}>
                  <span className="mega-ic" aria-hidden="true">
                    {s.icon}
                  </span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{fromLabel(s)}</small>
                  </span>
                </Link>
              ))}
              <Link href="/services" className="mega-all" role="menuitem">
                View all services →
              </Link>
            </div>
          </div>

          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a href={`tel:${business.telephone}`} className="header-phone" aria-label="Call us">
            <Phone size={18} />
            <span>{business.telephoneDisplay}</span>
          </a>
          <a href="#quote" className="btn btn-primary btn-sm">
            Get a Free Quote
          </a>
          <button
            className={`nav-toggle${open ? ' open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <div className="m-services">
          <button
            className="m-services-toggle"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((v) => !v)}
          >
            Services <span className={`m-chev${servicesOpen ? ' up' : ''}`} aria-hidden="true" />
          </button>
          <div className={`m-sublist${servicesOpen ? ' open' : ''}`}>
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.slug} onClick={closeAll}>
                {s.icon} {s.title}
              </Link>
            ))}
            <Link href="/services" onClick={closeAll}>
              View all services →
            </Link>
          </div>
        </div>

        {NAV.map((n) => (
          <Link key={n.href} href={n.href} onClick={closeAll}>
            {n.label}
          </Link>
        ))}
        <a href="#quote" className="btn btn-primary" onClick={closeAll}>
          Get a Free Quote
        </a>
      </div>
    </header>
  );
}
