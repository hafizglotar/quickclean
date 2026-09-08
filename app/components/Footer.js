import Link from 'next/link';
import { business } from '../lib/business';
import { Logo, Stars } from './icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo-link" aria-label="Quick Clean home">
            <Logo light />
          </Link>
          <p>Spotless homes and offices, guaranteed. Vetted pros, flat pricing, zero hassle.</p>
          <div className="footer-rating">
            <Stars size={13} decorative />{' '}
            {business.rating.value}/5 from {business.rating.count.toLocaleString()}+ customers
          </div>
          <address className="footer-address">
            {business.address.street}, {business.address.city}, {business.address.region}{' '}
            {business.address.postalCode}
          </address>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link href="/services/residential-cleaning">Residential</Link>
          <Link href="/services/deep-cleaning">Deep cleaning</Link>
          <Link href="/services/move-in-move-out-cleaning">Move in / out</Link>
          <Link href="/services/office-commercial-cleaning">Office &amp; commercial</Link>
          <Link href="/services">All services</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About us</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#faq">FAQ</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>Get in touch</h4>
          <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <a href="#quote" className="btn btn-primary btn-sm">
            Get a free quote
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} {business.legalName}. All rights reserved.
        </span>
        <div className="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Service areas</a>
        </div>
      </div>
    </footer>
  );
}
