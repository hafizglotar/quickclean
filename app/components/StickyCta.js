'use client';

import { useEffect, useState } from 'react';

export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const showAfter = window.scrollY > 600;
      const quote = document.getElementById('quote');
      let nearForm = false;
      if (quote) {
        const r = quote.getBoundingClientRect();
        nearForm = r.top < window.innerHeight && r.bottom > 0;
      }
      setShow(showAfter && !nearForm);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a href="#quote" className={`sticky-cta${show ? ' show' : ''}`}>
      Get a Free Quote →
    </a>
  );
}
