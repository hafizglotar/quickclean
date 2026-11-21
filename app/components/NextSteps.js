import Link from 'next/link';

/* A short closing paragraph with links inside the sentences. It gives the
   pricing, about and contact pages links from page bodies, and it sends
   differently worded anchors to the home page pillar and to the residential
   cleaning page so the two do not compete for the same phrase. */
export default function NextSteps({ areaName }) {
  const where = areaName ? ` in ${areaName}` : '';
  return (
    <section className="section next-steps">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Next steps</span>
          <h2>{areaName ? `Booking a Cleaner in ${areaName}` : 'Booking a Cleaner'}</h2>
        </div>
        <div className="prose reveal">
          <p>
            Quick Clean provides <Link href="/">house cleaning across Dubai</Link> at a flat price by home size, and
            the <Link href="/pricing">full cleaning price list</Link> shows every plan and unit type. Most
            customers{where} choose <Link href="/services/residential-cleaning">weekly or two weekly home cleaning</Link>.
            A home that is new or has been empty for a while does better with a{' '}
            <Link href="/services/deep-cleaning">one time deep clean</Link> first, and tenants who are leaving book a{' '}
            <Link href="/services/move-in-move-out-cleaning">move out clean</Link> before the handover.
          </p>
          <p>
            You can read <Link href="/about">about Quick Clean and how we work</Link>, or{' '}
            <Link href="/contact">contact our team</Link> with any question about access, timing or what is included
            before you book.
          </p>
        </div>
      </div>
    </section>
  );
}
