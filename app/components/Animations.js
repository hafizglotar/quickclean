'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Animations() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // Content is visible by default — nothing to do.

    gsap.registerPlugin(ScrollTrigger);

    // gsap.context scopes + auto-cleans every tween & ScrollTrigger (handles
    // React Strict Mode's double-mount in development).
    const ctx = gsap.context(() => {
      /* ---- Hero intro timeline ---- */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.eyebrow', { y: 18, opacity: 0, duration: 0.6 })
        .from('.reveal-hero-line', { y: 40, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.3')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.35')
        .from('.hero-trust li', { y: 14, opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.3')
        .from('.hero-card', { y: 40, opacity: 0, scale: 0.96, duration: 0.8 }, '-=0.7');

      /* ---- Generic scroll reveals ---- */
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          y: 36,
          opacity: 0,
          duration: 0.7,
        });
      });

      /* ---- Staggered card groups ---- */
      const stagger = (containerSel, itemSel) => {
        const container = document.querySelector(containerSel);
        if (!container) return;
        const st = { trigger: container, start: 'top 82%' };
        // Rise the whole grid as ONE unit so side-by-side cards never drift
        // out of alignment with each other while animating...
        gsap.from(container, { scrollTrigger: st, y: 38, duration: 0.6, ease: 'power3.out' });
        // ...and cascade the cards with opacity only (no vertical offset).
        gsap.from(container.querySelectorAll(itemSel), {
          scrollTrigger: st,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.09,
        });
      };
      stagger('.services-grid', '.service-card');
      stagger('.steps', '.step');
      stagger('.pricing-grid', '.plan');
      stagger('.reviews-grid', '.review');

      /* ---- Count-up stats ---- */
      const fmt = (n) => {
        n = Math.round(n);
        return n >= 1000 ? n.toLocaleString('en-US') : String(n);
      };
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = parseFloat(el.getAttribute('data-count')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = fmt(obj.v) + suffix;
              },
              onComplete: () => {
                el.textContent = fmt(target) + suffix;
              },
            });
          },
        });
      });

      /* ---- Hero parallax ---- */
      const bg = document.querySelector('.hero-bg');
      if (bg) {
        gsap.to(bg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      /* ---- Floating badges ---- */
      gsap.utils.toArray('.floater').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 12,
          duration: 2.6 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
      const badge = document.querySelector('.guarantee-badge');
      if (badge) {
        gsap.to(badge, { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
