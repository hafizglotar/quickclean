import { deepCleanRooms, cleanCompare, getService, currency } from '../lib/business';
import { Check } from './icons';

const domestic = getService('domestic-cleaning');
const deep = getService('deep-cleaning');

function Dash() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="dc-dash">
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Included / not-included cell — icon for sighted users, text for screen readers. */
function Cell({ on }) {
  return (
    <td className={on ? 'is-on' : 'is-off'}>
      {on ? <Check size={18} /> : <Dash />}
      <span className="sr-only">{on ? 'Included' : 'Not included'}</span>
    </td>
  );
}

/**
 * The flagship-service section. Two jobs:
 *   1. Prove what a deep clean actually involves (conversion).
 *   2. Answer "what does a deep clean include?" and "standard vs deep?"
 *      in plain, quotable text for search + AI answer engines (AEO).
 */
export default function DeepClean() {
  return (
    <section className="section deepclean" id="deep-clean">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Our specialty</span>
          <h2>What a Quick Clean deep clean actually covers.</h2>
          <p className="section-lead">
            Deep cleaning is the service we built this company around. Below is the
            room-by-room work included on every deep clean in Dubai — whether it&apos;s a
            Marina apartment, an Arabian Ranches villa, or a Business Bay office.
          </p>
        </div>

        <div className="dc-rooms">
          {deepCleanRooms.map((r) => (
            <article className="dc-room" key={r.room}>
              <div className="dc-room-head">
                <span className="dc-ic" aria-hidden="true">
                  {r.icon}
                </span>
                <h3>{r.room}</h3>
              </div>
              <ul className="dc-tasks">
                {r.tasks.map((t) => (
                  <li key={t}>
                    <Check size={17} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="dc-compare reveal">
          <h3 id="dc-compare-heading">Standard clean vs deep clean</h3>
          <p className="dc-compare-sub">
            The difference is not how hard we scrub — it&apos;s how much of the property
            we actually get to.
          </p>

          <div className="dc-table-wrap">
            <table className="compare-table" aria-labelledby="dc-compare-heading">
              <thead>
                <tr>
                  <th scope="col">What gets cleaned</th>
                  <th scope="col">
                    Standard
                    <small>from {currency.format(domestic.price)}</small>
                  </th>
                  <th scope="col" className="col-deep">
                    Deep clean
                    <small>from {currency.format(deep.price)}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cleanCompare.map((row) => (
                  <tr key={row.task}>
                    <th scope="row">{row.task}</th>
                    <Cell on={row.standard} />
                    <Cell on={row.deep} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dc-cta">
            <a href="#quote" className="btn btn-primary btn-lg">
              Book a deep clean →
            </a>
            <span className="dc-cta-note">
              Not sure which you need? Tell us about the space and we&apos;ll advise.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
