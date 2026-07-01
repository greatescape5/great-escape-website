import { getProjects, getPricing, getTestimonials, getSetting } from '../lib/data';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import Link from 'next/link';

export const revalidate = 60;

const offerings = [
  { t: 'Custom Web Development', d: 'Fast, professional websites tailored to your business — built to convert, not just sit there.' },
  { t: 'Local SEO', d: 'Rank in your service area with optimized profiles, citations, and keyword-targeted local pages.' },
  { t: 'In-Store Digital Displays', d: 'Eye-level screens in high-traffic checkout lanes that turn waits into brand recall.' },
  { t: 'Content & Copywriting', d: 'Words that sound like you and move people to call, book, or buy.' },
  { t: 'Website Maintenance', d: 'Updates, security, and support so your site stays fast, safe, and current.' },
  { t: 'E-commerce', d: 'Clean online stores that make selling — and managing it — painless.' },
];

function ytId(u) {
  if (!u) return '';
  const m = u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : (/^[\w-]{11}$/.test(u.trim()) ? u.trim() : '');
}

export default async function Home() {
  const [projects, pricing, testimonials, video] = await Promise.all([
    getProjects(), getPricing(), getTestimonials(), getSetting('instore_video'),
  ]);
  const vid = ytId(video);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-in">
          <span className="eyebrow">North Idaho · Established Local</span>
          <h1>Rugged digital solutions that get your small business <em>found and save time.</em></h1>
          <p className="sub">Websites, local SEO, and in-store advertising for North Idaho small businesses — built to put you at the top of the map and keep you booked. Small biz helping small biz.</p>
          <div className="hero-cta">
            <Link className="btn btn-gold" href="/#contact">Get a Free Consultation</Link>
            <Link className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.32)' }} href="/our-clients">See Our Work</Link>
          </div>
          <div className="summit">
            <div className="stat"><div className="num">15+</div><div className="lbl">local websites built</div></div>
            <div className="stat"><div className="num">20+</div><div className="lbl">North Idaho towns we rank clients in</div></div>
            <div className="stat"><div className="num">20–30k</div><div className="lbl">local shoppers reached monthly, per display</div></div>
            <div className="stat"><div className="num">Local</div><div className="lbl">based in Athol — we answer the phone</div></div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <div className="clients">
        <div className="wrap clients-row">
          <span className="lab">Trusted by local operators —</span>
          {projects.slice(0, 7).map((p) => <span className="client-chip" key={p.id}>{p.name}</span>)}
        </div>
      </div>

      {/* OFFERINGS */}
      <section className="blk" id="offer">
        <div className="wrap">
          <div className="blk-head">
            <span className="eyebrow">What We Do</span>
            <h2>Everything your digital presence needs, in one place.</h2>
            <p>From the first line of code to the checkout-lane screen, we build and manage the whole stack so you can run your business instead of your website.</p>
          </div>
          <div className="grid off-grid">
            {offerings.map((o, i) => (
              <div className="card" key={i}>
                <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 18 L9 9 L13 14 L18 6 L21 18 Z" /></svg></div>
                <h3>{o.t}</h3><p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELEVATION */}
      <section className="blk elev">
        <div className="wrap">
          <div className="blk-head">
            <span className="eyebrow">Getting Found Locally</span>
            <h2>Be the business neighbors find first.</h2>
            <p>Local SEO is the difference between being the name that comes up first and the one buried on page three. Here's the view from each side.</p>
          </div>
          <div className="elev-cols">
            <div className="elev-col summit-col">
              <h4>With Great Escape</h4>
              <div className="alt">Found, trusted, and booked.</div>
              {['An accurate, professional presence neighbors actually trust', 'Top local rankings on Google in your service area', 'A steady stream of traffic, calls, and booked jobs', 'Every digital asset managed in one place'].map((t, i) => (
                <div className="elev-li" key={i}><span className="dot">✓</span><div>{t}</div></div>
              ))}
            </div>
            <div className="elev-col base-col">
              <h4>Without</h4>
              <div className="alt">Invisible where it counts.</div>
              {['An outdated site that quietly costs you credibility', 'Little or no ranking — invisible in local search', 'A quiet phone while competitors get the call', 'Logins and assets scattered across ten platforms'].map((t, i) => (
                <div className="elev-li" key={i}><span className="dot">×</span><div>{t}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IN-STORE */}
      <section className="blk" id="instore">
        <div className="wrap">
          <div className="blk-head">
            <span className="eyebrow">In-Store Digital Displays</span>
            <h2>Turn a checkout-lane wait into a win.</h2>
            <p>Our screens sit at eye level in high-traffic checkout lanes — motion and color that turn idle minutes into brand recall. See a live ad run in action.</p>
          </div>
          <div className="instore-grid">
            <div>
              <div className="instore-li"><span className="k">1</span><div><b>Unbeatable dwell time.</b> Unlike an online ad that's gone in a second, your message sits exactly where customers wait.</div></div>
              <div className="instore-li"><span className="k">2</span><div><b>High-frequency repetition.</b> Locals hit their grocery store 2–3× a week — so you're who they remember when they need a pro.</div></div>
              <div className="instore-li"><span className="k">3</span><div><b>Verified local traffic.</b> 30k–40k real shoppers a month per location. No bots, no fake clicks — just neighbors.</div></div>
              <div style={{ marginTop: '24px' }}><Link className="btn btn-blue" href="/#contact">Choose Your Plan</Link></div>
            </div>
            <div>
              {vid ? (
                <div className="adscreen"><iframe src={`https://www.youtube.com/embed/${vid}`} title="In-store ad run" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen></iframe></div>
              ) : (
                <div className="adscreen"><div className="ph"><span className="lab">Now showing · Lane 4</span><b>Ad-run video coming soon</b></div></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TRACKD TEASER */}
      <section className="blk trackd-band">
        <div className="wrap trackd-grid">
          <div>
            <span className="eyebrow">Now from Great Escape</span>
            <h2>We build the software that runs your business, too.</h2>
            <p>Meet Trackd — the field-first CRM we built for contractors and small businesses. Add a lead in ten seconds, never miss a follow-up, and send invoices that get paid online — all from your phone.</p>
            <div className="trackd-pts">
              <div><span>▲</span> Quick-add call-backs straight from the job site</div>
              <div><span>▲</span> A morning follow-up list, sorted automatically</div>
              <div><span>▲</span> Invoices that get paid online — Stripe built in</div>
            </div>
            <div className="tcta">
              <Link className="btn btn-gold" href="/trackd">Explore Trackd</Link>
              <a className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.32)' }} href="https://www.trackdcrm.com" target="_blank" rel="noopener noreferrer">Start a free trial ↗</a>
            </div>
          </div>
          <div>
            <iframe className="tk-phoneframe" title="Trackd app" src="/trackd-phone.html" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="blk" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="blk-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '100%', flexWrap: 'wrap', gap: '14px' }}>
            <div><span className="eyebrow">Selected Work</span><h2>Builds we're proud of.</h2></div>
            <Link className="open-link" href="/our-clients">View all projects →</Link>
          </div>
          <div className="grid port-grid">
            {projects.slice(0, 6).map((p) => <ProjectCard p={p} key={p.id} />)}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="blk" id="pricing" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="blk-head">
            <span className="eyebrow">Packages</span>
            <h2>Straightforward pricing, no surprises.</h2>
            <p>Pick the plan that fits. Every package is managed by Tyler directly — small biz helping small biz.</p>
          </div>
          <div className="grid price-grid">
            {pricing.map((p) => (
              <div className={'ptier' + (p.featured ? ' feat' : '')} key={p.id}>
                {p.featured && <span className="flag">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="pdesc">{p.description}</div>
                <div className="amt">{p.price}<span> {p.per}</span></div>
                <ul>{(p.features || []).map((f, i) => <li key={i}>{f}</li>)}</ul>
                <Link className={'btn ' + (p.featured ? 'btn-gold' : 'btn-blue')} style={{ justifyContent: 'center' }} href="/#contact">Get started</Link>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate)', marginTop: '22px', textAlign: 'center', fontStyle: 'italic' }}>Custom builds and enterprise ecosystems quoted individually · ask about in-store display bundles</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="blk">
        <div className="wrap">
          <div className="blk-head"><span className="eyebrow">From the Field</span><h2>What clients say.</h2></div>
          <div className="grid tg">
            {testimonials.map((t) => (
              <div className="quote" key={t.id}>
                <div className="stars">★★★★★</div>
                <p>“{t.quote}”</p>
                <div className="who">{t.author}<span>{t.location}, Idaho</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="blk contact" id="contact">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="blk-head">
            <span className="eyebrow">Reach Out</span>
            <h2>Let's build something lasting.</h2>
            <p>Based in Athol, ID — serving North Idaho, Eastern Washington, and anywhere else you may be. Tell us what you need and Tyler will get back fast.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
