import Link from 'next/link';

// Visual breadcrumb trail. JSON-LD BreadcrumbList is emitted separately per page.
export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.href}>
              {last ? (
                <span aria-current="page">{it.name}</span>
              ) : (
                <>
                  <Link href={it.href}>{it.name}</Link>
                  <span className="bc-sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
