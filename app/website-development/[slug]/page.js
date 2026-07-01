import { getCities, getCity } from '../../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const c = await getCity(params.slug);
  if (!c) return { title: 'Web Development in North Idaho' };
  const title = `Website Development & Local SEO in ${c.name}, Idaho`;
  return {
    title,
    description: c.intro,
    alternates: { canonical: `/website-development/${c.slug}` },
    openGraph: { title, description: c.intro },
  };
}

export default async function CityPage({ params }) {
  const c = await getCity(params.slug);
  if (!c) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Great Escape Web & Business Services — ${c.name}`,
    description: c.intro,
    areaServed: { '@type': 'City', name: `${c.name}, Idaho` },
    address: { '@type': 'PostalAddress', addressRegion: 'ID', addressCountry: 'US' },
    url: `https://www.greatescapewebservices.com/website-development/${c.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="city-hero">
        <svg className="hero-art" style={{ opacity: 0.45 }} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M0 400 L0 300 L240 200 L460 300 L680 190 L900 290 L1120 220 L1200 260 L1200 400 Z" fill="#05314f" />
        </svg>
        <div className="wrap city-hero-in">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>{c.region_label || `${c.name}, Idaho`}</span>
          <h1>Website Development &amp; Local SEO in <em>{c.name}</em>, Idaho</h1>
        </div>
      </section>

      <div className="wrap city-body">
        <div>
          <h2>Built for {c.name} businesses</h2>
          <p>{c.intro}</p>
          <p>Whether you're in the trades, hospitality, or a professional office, we make sure {c.name} customers find you on Google before they find anyone else.</p>
          <h2>What we do for local businesses here</h2>
          <p>Custom websites, Google Business Profile optimization, local citations, and keyword-targeted pages that help {c.name} customers find you first — not your competitor three towns over.</p>
          {c.quote && (
            <div className="quote" style={{ marginTop: '20px' }}>
              <div className="stars">★★★★★</div>
              <p>“{c.quote}”</p>
              <div className="who">{c.quote_by}</div>
            </div>
          )}
        </div>
        <aside>
          <div className="local-box">
            <h4>Serving the area</h4>
            {(c.landmarks || []).map((l, i) => (
              <div className="lm" key={i}><span style={{ color: 'var(--gold)' }}>▲</span>{l}</div>
            ))}
            <Link className="btn btn-gold" href="/#contact" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>Free Consultation</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
