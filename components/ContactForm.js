'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ContactForm() {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit() {
    if (!f.name.trim() || !f.email.trim()) {
      setMsg('Please add at least your name and email.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.from('leads').insert({
      name: f.name.trim(),
      company: f.company.trim() || null,
      email: f.email.trim(),
      phone: f.phone.trim() || null,
      message: f.message.trim() || null,
    });
    setBusy(false);
    if (error) {
      setMsg('Something went wrong — please email us directly.');
      return;
    }
    setMsg('✓ Sent! Tyler will be in touch shortly.');
    setF({ name: '', company: '', email: '', phone: '', message: '' });
  }

  return (
    <div className="form">
      <div className="two">
        <div className="field"><label>First name *</label><input value={f.name} onChange={on('name')} placeholder="Jordan" /></div>
        <div className="field"><label>Company</label><input value={f.company} onChange={on('company')} placeholder="Your business" /></div>
      </div>
      <div className="two">
        <div className="field"><label>Email *</label><input value={f.email} onChange={on('email')} placeholder="you@email.com" /></div>
        <div className="field"><label>Phone</label><input value={f.phone} onChange={on('phone')} placeholder="(208) 555-0142" /></div>
      </div>
      <div className="field"><label>What are you looking for?</label><textarea rows={3} value={f.message} onChange={on('message')} placeholder="Website rebuild, local SEO, in-store screens…" /></div>
      <button className="btn btn-gold" onClick={submit} disabled={busy}>{busy ? 'Sending…' : 'Send to Great Escape'}</button>
      <div className="form-msg">{msg}</div>
    </div>
  );
}
