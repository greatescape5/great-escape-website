'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const links = (
    <>
      <Link href="/" onClick={close}>Home</Link>
      <Link href="/website-development/sandpoint" onClick={close}>Web Development</Link>
      <Link href="/#instore" onClick={close}>In-Store Ads</Link>
      <Link href="/trackd" onClick={close}>Trackd CRM</Link>
      <Link href="/our-clients" onClick={close}>Our Clients</Link>
      <Link href="/#contact" onClick={close}>About</Link>
    </>
  );

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <Link href="/" className="brand" onClick={close}>
            <img className="mark" src="/logo-mark.png" alt="Great Escape" />
            <div><b>GREAT ESCAPE</b><span>Web &amp; Business Services</span></div>
          </Link>
          <nav className="links">{links}</nav>
          <div className="nav-cta">
            <Link className="btn btn-gold" href="/#contact">Free Consultation</Link>
            <button className="menu-btn" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={'mnav' + (open ? ' open' : '')}>
        <div className="mnav-in">
          {links}
          <Link className="btn btn-gold mcta" href="/#contact" onClick={close}>Free Consultation</Link>
        </div>
      </div>
    </>
  );
}
