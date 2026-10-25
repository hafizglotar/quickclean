/* Renders a JSON-LD <script> block safely.
   JSON.stringify alone is not enough inside a <script>: a "</script>" or
   "<!--" sequence in the data would end the tag early. Escaping the few
   characters that matter keeps the JSON valid for parsers and inert for
   the HTML parser. */

// The Unicode LINE SEPARATOR (U+2028) and PARAGRAPH SEPARATOR (U+2029) are
// line terminators in JavaScript. They are built with fromCharCode on purpose:
// spelled as an escape inside a regex literal, some toolchains emit the raw
// character, which turns the regex into a syntax error.
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

export function safeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replaceAll(LINE_SEPARATOR, '\\u2028')
    .replaceAll(PARAGRAPH_SEPARATOR, '\\u2029');
}

export default function JsonLd({ data, id }) {
  if (!data) return null;
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
