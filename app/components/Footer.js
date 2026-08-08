import Link from 'next/link';
import { business } from '../lib/business';
import { Logo } from './icons';

// See Header — pages without a #quote section pass an absolute "/#quote".
export default function Footer({ quoteHref = '#quote' }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo-link" aria-label="Quick Clean home">
            <Logo light />
          </Link>
          <p>
            Deep cleaning specialists for homes and offices across Dubai. Vetted pros, flat
            pricing in AED, zero hassle.
          </p>
          <div className="footer-rating">
            ★★★★★ {business.rating.value}/5 from {business.rating.count.toLocaleString()}+ customers
          </div>
          <address className="footer-address">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.countryName}
            <br />
            {business.license.authority} trade licence {business.license.number}
          </address>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link href="/services/deep-cleaning">Deep cleaning</Link>
          <Link href="/services/domestic-cleaning">Domestic cleaning</Link>
          <Link href="/services/office-commercial-cleaning">Office &amp; commercial</Link>
          <Link href="/services/move-in-move-out-cleaning">Move in / out</Link>
          <Link href="/services">All services</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/#how">How it works</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#areas">Areas we cover</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#faq">FAQ</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>Get in touch</h4>
          <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <a href={quoteHref} className="btn btn-primary btn-sm">
            Get a free quote
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} {business.legalName}. All rights reserved.
        </span>
        <div className="footer-legal">
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/terms#your-information">Privacy</Link>
          <Link href="/#areas">Service areas</Link>
        </div>
      </div>
    </footer>
  );
}
