import { business, formatAddress, isPlaceholder, mapsSearchUrl } from '../lib/business';

/* Google Map for the contact page.
   Renders the real embed once business.map.embedUrl is filled in; until then
   it shows a neutral panel with a link to the address on Google Maps, so the
   page never ships an empty or broken iframe. */
export default function MapEmbed() {
  const src = business.map?.embedUrl;
  const ready = src && !isPlaceholder(src);

  return (
    <div className="contact-map">
      {ready ? (
        <iframe
          src={src}
          title={`Map showing ${business.legalName}, ${formatAddress()}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="contact-map-placeholder">
          <p>
            Map coming soon.{' '}
            <a href={mapsSearchUrl()} target="_blank" rel="noopener noreferrer">
              Open our location in Google Maps
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
