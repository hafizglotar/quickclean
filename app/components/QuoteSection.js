import { business } from '../lib/business';
import { Check } from './icons';
import QuoteForm from './QuoteForm';

export default function QuoteSection() {
  return (
    <section className="section quote" id="quote">
      <div className="container quote-grid">
        <div className="quote-pitch reveal">
          <span className="kicker kicker-light">Your free quote</span>
          <h2>Ready for a proper deep clean?</h2>
          <p>
            Get your flat price in AED in 60 seconds — no obligation, no pushy sales calls.
            Most customers in Dubai book their first clean for as soon as the next day.
          </p>
          <ul className="quote-perks">
            <li>
              <Check size={20} /> 100% satisfaction guarantee
            </li>
            <li>
              <Check size={20} /> Insured, background-checked pros
            </li>
            <li>
              <Check size={20} /> No contracts — cancel anytime
            </li>
          </ul>
          <div className="quote-call">
            Prefer to talk? <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>
            {' · '}
            <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
