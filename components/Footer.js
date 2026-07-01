import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div>
            <div className="brand" style={{ marginBottom: '16px' }}>
              <img className="mark" src="/logo-mark.png" alt="Great Escape" />
              <div>
                <b style={{ fontFamily: 'Cinzel', fontSize: '16px', letterSpacing: '.05em' }}>GREAT ESCAPE</b>
                <span style={{ color: '#7FA0BC', fontSize: '9.5px', letterSpacing: '.2em', textTransform: 'uppercase', display: 'block', marginTop: '3px' }}>
                  Web &amp; Business Services LLC
                </span>
              </div>
            </div>
            <p style={{ fontSize: '14px', maxWidth: '38ch', opacity: 0.82 }}>
              Get found online, stay booked, and increase revenue. Based in Athol, ID — serving North Idaho &amp; Eastern Washington.
            </p>
            <p style={{ fontSize: '12.5px', marginTop: '14px', opacity: 0.62 }}>P.O. Box 913, Athol, ID 83801</p>
          </div>
          <div>
            <h5>Directory</h5>
            <Link href="/">Home</Link>
            <Link href="/website-development/sandpoint">Web Development</Link>
            <Link href="/#instore">In-Store Ads</Link>
            <Link href="/trackd">Trackd CRM</Link>
            <Link href="/#pricing">SEO Packages</Link>
            <Link href="/our-clients">Our Clients</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div>
            <h5>Connect</h5>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <Link href="/#contact">Free Consultation</Link>
          </div>
        </div>
        <div className="ticker">
          <span className="ticker-track">
            WEBSITE DESIGNED &amp; BUILT BY <b>GREAT ESCAPE WEB &amp; BUSINESS SERVICES LLC</b> &nbsp;·&nbsp; NORTH IDAHO &nbsp;·&nbsp; WEBSITE DESIGNED &amp; BUILT BY <b>GREAT ESCAPE WEB &amp; BUSINESS SERVICES LLC</b> &nbsp;·&nbsp; NORTH IDAHO &nbsp;·&nbsp;
          </span>
        </div>
        <div className="ft-bottom">
          <span>© 2026 Great Escape Web &amp; Business Services LLC</span>
          <span>
            Powered by Great Escape
            <Link href="/admin" className="admin-dot" aria-label="Admin">.</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
