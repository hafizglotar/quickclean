import Link from 'next/link';

/* Renders a paragraph made of parts: plain strings and
   { t: 'anchor text', href: '/path' } links. Used by the additive
   semantic sections so links sit inside the sentence they belong to. */
export default function RichText({ parts }) {
  return (
    <p>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <Link href={part.href} key={i}>
            {part.t}
          </Link>
        ),
      )}
    </p>
  );
}
