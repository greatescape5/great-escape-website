'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [cities, setCities] = useState([]);
  const close = () => { setOpen(false); setDrop(false); };

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    supabase.from('cities').select('name,slug').eq('published', true).order('sort_order')
      .then(({ data }) => setCities(data || []));
  }, []);

  const firstCity = cities[0] ? `/website-development/${cities[0].slug}` : '/website-development/sandpoint';

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <Link href="/" className="brand" onClick={close}>
            <img className="mark" src="/logo-mark.png" alt="Great Escape" />
            <div><b>GREAT ESCAPE</b><span>Web &amp; Business Services</span></div>
          </Link>
          <nav className="links">
            <Link href="/" onClick={close}>Home</Link>
            <span
              className={'has-drop' + (drop ? ' open' : '')}
              onMouseEnter={() => setDrop(true)}
              onMouseLeave={() => setDrop(false)}
            >
              <Link href={firstCity} onClick={close}>Web Development <span className="caret">▼</span></Link>
              {drop && cities.length > 0 && (
                <div className="navdrop-menu">
                  <div className="navdrop-head">Towns we serve</div>
                  {cities.map((c) => (
                    <Link key={c.slug} href={`/website-development/${c.slug}`} onClick={close}>{c.name}</Link>
                  ))}
                </div>
              )}
            </span>
            <Link href="/#instore" onClick={close}>In-Store Ads</Link>
            <Link href="/trackd" onClick={close}>Trackd CRM</Link>
            <Link href="/our-clients" onClick={close}>Our Clients</Link>
            <Link href="/#contact" onClick={close}>About</Link>
          </nav>
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
          <Link href="/" onClick={close}>Home</Link>
          <Link href={firstCity} onClick={close}>Web Development</Link>
          {cities.length > 0 && (
            <div className="msub">
              {cities.map((c) => (
                <Link key={c.slug} href={`/website-development/${c.slug}`} onClick={close}>{c.name}</Link>
              ))}
            </div>
          )}
          <Link href="/#instore" onClick={close}>In-Store Ads</Link>
          <Link href="/trackd" onClick={close}>Trackd CRM</Link>
          <Link href="/our-clients" onClick={close}>Our Clients</Link>
          <Link href="/#contact" onClick={close}>About</Link>
          <Link className="btn btn-gold mcta" href="/#contact" onClick={close}>Free Consultation</Link>
        </div>
      </div>
    </>
  );
}
