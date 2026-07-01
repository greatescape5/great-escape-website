import Link from 'next/link';

export const metadata = {
  title: 'Trackd CRM',
  description: 'The field-first CRM for contractors and small businesses. Track jobs, follow up on leads, and get paid online.',
};

const features = [
  { t: 'Quick-Add Call-Back', d: 'Got a call on a job site? Add the lead in ten seconds — name, number, remind me today or tomorrow. Done.' },
  { t: 'Follow-Up Reminders', d: 'Every morning you see exactly who to call. Overdue, due today, upcoming — sorted automatically.' },
  { t: 'Invoice & Get Paid Online', d: 'Build an invoice, share a PDF with a Pay Online button, and money lands in your bank via Stripe.' },
  { t: 'Pipeline at a Glance', d: 'Total pipeline value, active jobs, and open bids on one screen. Know your numbers without the math.' },
  { t: 'Lives on Your Phone', d: 'Install it like an app — no app store needed. Works offline, opens fast, looks the part.' },
  { t: 'Your Data, Private', d: 'Your jobs are yours. No one else sees your leads, bids, or clients. Built secure from day one.' },
];

export default function Trackd() {
  return (
    <>
      <section className="city-hero">
        <svg className="hero-art" style={{ opacity: 0.45 }} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M0 400 L0 300 L240 200 L460 300 L680 190 L900 290 L1120 220 L1200 260 L1200 400 Z" fill="#05314f" />
        </svg>
        <div className="wrap city-hero-in">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Trackd CRM · Built for the Trades</span>
          <h1>The job tracker for people who pour concrete, <em>not spreadsheets.</em></h1>
          <p style={{ color: '#CFE0EE', maxWidth: '54ch', marginTop: '16px', fontSize: '18px' }}>A field-first CRM for contractors. Trackd keeps every lead, bid, follow-up, and invoice in one place that lives on your phone — so you save time, never miss a callback, and get paid online.</p>
          <div className="tcta" style={{ marginTop: '26px' }}>
            <a className="btn btn-gold" href="https://www.trackdcrm.com" target="_blank" rel="noopener noreferrer">Start a free 7-day trial ↗</a>
            <a className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.32)' }} href="https://www.trackdcrm.com/demo" target="_blank" rel="noopener noreferrer">Watch the demo</a>
          </div>
        </div>
      </section>

      <section className="blk" style={{ background: '#141312', padding: '64px 0' }}>
        <div className="wrap" style={{ textAlign: 'center', marginBottom: '12px' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)', justifyContent: 'center' }}>See the app</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(26px,4vw,40px)', marginTop: '12px', fontWeight: 600 }}>Looks like an app. Lives on your phone. Works like a pro.</h2>
        </div>
        <div className="wrap" style={{ maxWidth: '1120px' }}>
          <iframe className="tk-appframe" title="Trackd app preview" src="/trackd-preview.html" loading="lazy"></iframe>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="blk-head"><span className="eyebrow">Why Trackd</span><h2>Everything you need. Nothing you don't.</h2><p>Built for people who work with their hands, not their spreadsheets — simple, fast, and on your phone.</p></div>
          <div className="grid off-grid">
            {features.map((o, i) => (
              <div className="card" key={i}>
                <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12 l4 4 L19 6" /></svg></div>
                <h3>{o.t}</h3><p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk contact">
        <svg className="hero-art" style={{ opacity: 0.5 }} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M0 400 L0 320 L200 240 L420 320 L640 220 L860 310 L1080 250 L1200 290 L1200 400 Z" fill="#05314f" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Ready when you are</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,42px)', marginTop: '14px' }}>Stop losing jobs. Start tracking them.</h2>
          <p style={{ color: '#CFE0EE', maxWidth: '48ch', margin: '14px auto 0' }}>Built and supported by Great Escape, right here in North Idaho.</p>
          <div style={{ marginTop: '26px' }}><a className="btn btn-gold" href="https://www.trackdcrm.com" target="_blank" rel="noopener noreferrer">Try Trackd free ↗</a></div>
        </div>
      </section>
    </>
  );
}
