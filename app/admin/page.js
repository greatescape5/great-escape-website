'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

/* ---------- helpers ---------- */
const slugify = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function uploadImage(file) {
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `logos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
  if (error) throw error;
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
}

/* ---------- table configs ---------- */
const CONFIGS = {
  cities: {
    title: 'Cities (SEO Engine)', order: 'sort_order',
    columns: ['name', 'county', 'slug'],
    fields: [
      { k: 'name', label: 'City name', type: 'text' },
      { k: 'slug', label: 'URL slug (auto if blank)', type: 'text' },
      { k: 'county', label: 'County', type: 'text' },
      { k: 'region_label', label: 'Region label (eyebrow)', type: 'text' },
      { k: 'intro', label: 'Unique local intro (keep it real)', type: 'textarea' },
      { k: 'landmarks', label: 'Landmarks (comma separated)', type: 'array' },
      { k: 'quote', label: 'Local testimonial quote', type: 'textarea' },
      { k: 'quote_by', label: 'Testimonial attribution', type: 'text' },
      { k: 'sort_order', label: 'Sort order', type: 'number' },
      { k: 'published', label: 'Published (live)', type: 'bool' },
    ],
    beforeSave: (v) => ({ ...v, slug: v.slug || slugify(v.name) }),
  },
  projects: {
    title: 'Portfolio', order: 'sort_order',
    columns: ['logo_url', 'name', 'location', 'services'],
    fields: [
      { k: 'name', label: 'Client / project', type: 'text' },
      { k: 'location', label: 'Location', type: 'text' },
      { k: 'services', label: 'Services (comma separated)', type: 'array' },
      { k: 'logo_url', label: 'Logo', type: 'image' },
      { k: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  pricing: {
    title: 'Pricing', order: 'sort_order',
    columns: ['name', 'price', 'per', 'featured'],
    fields: [
      { k: 'name', label: 'Package name', type: 'text' },
      { k: 'price', label: 'Price (e.g. $495)', type: 'text' },
      { k: 'per', label: 'Billing label (e.g. /mo)', type: 'text' },
      { k: 'description', label: 'Short description', type: 'text' },
      { k: 'features', label: 'Features (comma separated)', type: 'array' },
      { k: 'featured', label: 'Highlight as most popular', type: 'bool' },
      { k: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  instore_clients: {
    title: 'In-Store Ads', order: 'created_at',
    columns: ['client', 'store', 'plan', 'rate', 'status'],
    fields: [
      { k: 'client', label: 'Client', type: 'text' },
      { k: 'store', label: 'Store / location', type: 'text' },
      { k: 'plan', label: 'Plan', type: 'text' },
      { k: 'rate', label: 'Monthly rate (e.g. $150)', type: 'text' },
      { k: 'status', label: 'Status', type: 'text' },
    ],
  },
  testimonials: {
    title: 'Testimonials', order: 'sort_order',
    columns: ['author', 'location'],
    fields: [
      { k: 'quote', label: 'Quote', type: 'textarea' },
      { k: 'author', label: 'Author', type: 'text' },
      { k: 'location', label: 'Location', type: 'text' },
      { k: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  posts: {
    title: 'Blog', order: 'published_at',
    columns: ['title', 'status', 'published_at'],
    fields: [
      { k: 'title', label: 'Title', type: 'text' },
      { k: 'slug', label: 'URL slug (auto if blank)', type: 'text' },
      { k: 'body', label: 'Body', type: 'textarea' },
      { k: 'status', label: 'Status', type: 'text' },
      { k: 'published_at', label: 'Publish date', type: 'text' },
    ],
    beforeSave: (v) => ({ ...v, slug: v.slug || slugify(v.title) }),
  },
  leads: {
    title: 'Leads', order: 'created_at', readOnly: true,
    columns: ['name', 'company', 'email', 'phone', 'message', 'created_at'],
    fields: [],
  },
};

/* ---------- generic table manager ---------- */
function Manager({ table }) {
  const cfg = CONFIGS[table];
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const asc = cfg.order === 'sort_order';
    const { data } = await supabase.from(table).select('*').order(cfg.order, { ascending: asc });
    setRows(data || []);
  }, [table, cfg.order]);

  useEffect(() => { load(); setForm({}); setEditing(null); }, [load]);

  const setF = (k, val) => setForm((f) => ({ ...f, [k]: val }));

  function startEdit(row) {
    const f = {};
    cfg.fields.forEach((fl) => {
      f[fl.k] = fl.type === 'array' ? (row[fl.k] || []).join(', ') : (row[fl.k] ?? '');
    });
    setForm(f);
    setEditing(row.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() { setForm({}); setEditing(null); }

  async function save() {
    setBusy(true);
    let v = {};
    cfg.fields.forEach((fl) => {
      let val = form[fl.k];
      if (fl.type === 'array') val = (val || '').split(',').map((s) => s.trim()).filter(Boolean);
      else if (fl.type === 'bool') val = !!val;
      else if (fl.type === 'number') val = val === '' || val == null ? 0 : Number(val);
      else val = val ?? '';
      v[fl.k] = val;
    });
    if (cfg.beforeSave) v = cfg.beforeSave(v);
    const res = editing ? await supabase.from(table).update(v).eq('id', editing) : await supabase.from(table).insert(v);
    setBusy(false);
    if (res.error) { alert('Error: ' + res.error.message); return; }
    reset(); load();
  }

  async function del(id) {
    if (!confirm('Delete this item?')) return;
    await supabase.from(table).delete().eq('id', id);
    load();
  }

  async function onImage(e, fl) {
    const file = e.target.files[0];
    if (!file) return;
    try { const url = await uploadImage(file); setF(fl.k, url); }
    catch (err) { alert('Upload failed: ' + err.message); }
  }

  const cell = (row, key) => {
    const val = row[key];
    if (key === 'logo_url') return val ? <img src={val} alt="" style={{ height: 30, maxWidth: 84, objectFit: 'contain', background: '#fff', border: '1px solid var(--line)', borderRadius: 5, padding: 3 }} /> : '—';
    if (Array.isArray(val)) return val.join(', ');
    if (val === true) return 'Yes';
    if (val === false) return '—';
    if (key === 'created_at' && val) return new Date(val).toLocaleString();
    return val ?? '';
  };

  return (
    <div>
      {!cfg.readOnly && (
        <div className="a-form">
          <h3>{editing ? 'Edit item' : 'Add new'}</h3>
          {cfg.fields.map((fl) => (
            <div key={fl.k} style={{ marginBottom: 12 }}>
              <label>{fl.label}</label>
              {fl.type === 'textarea' ? (
                <textarea rows={2} value={form[fl.k] || ''} onChange={(e) => setF(fl.k, e.target.value)} />
              ) : fl.type === 'bool' ? (
                <label style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                  <input type="checkbox" checked={!!form[fl.k]} onChange={(e) => setF(fl.k, e.target.checked)} style={{ width: 'auto', marginRight: 8 }} /> Yes
                </label>
              ) : fl.type === 'image' ? (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {form[fl.k] && <img src={form[fl.k]} alt="" style={{ height: 40, maxWidth: 100, objectFit: 'contain', background: '#fff', border: '1px solid var(--line)', borderRadius: 6, padding: 4 }} />}
                  <input type="file" accept="image/*" onChange={(e) => onImage(e, fl)} style={{ fontSize: 13 }} />
                </div>
              ) : (
                <input value={form[fl.k] || ''} onChange={(e) => setF(fl.k, e.target.value)} />
              )}
            </div>
          ))}
          <button className="btn btn-gold" onClick={save} disabled={busy}>{busy ? 'Saving…' : editing ? 'Save changes' : 'Add'}</button>
          {editing && <button className="btn btn-ghost" style={{ marginLeft: 8 }} onClick={reset}>Cancel</button>}
        </div>
      )}

      <table className="atable">
        <thead><tr>{cfg.columns.map((c) => <th key={c}>{c.replace(/_/g, ' ')}</th>)}{!cfg.readOnly && <th></th>}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {cfg.columns.map((c) => <td key={c}>{cell(row, c)}</td>)}
              {!cfg.readOnly && (
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button className="rowbtn edit" onClick={() => startEdit(row)} title="Edit">✎</button>
                  <button className="rowbtn del" onClick={() => del(row.id)} title="Delete">🗑</button>
                </td>
              )}
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={cfg.columns.length + 1} style={{ color: 'var(--slate)', padding: 20 }}>Nothing here yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- in-store video setting ---------- */
function VideoSetting() {
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'instore_video').single()
      .then(({ data }) => setUrl(data?.value || ''));
  }, []);
  async function save() {
    const { error } = await supabase.from('settings').upsert({ key: 'instore_video', value: url.trim() });
    setMsg(error ? 'Error: ' + error.message : '✓ Saved — live on the site.');
  }
  return (
    <div className="a-form">
      <h3>Featured ad-run video</h3>
      <p style={{ fontSize: 14, color: 'var(--slate)', marginBottom: 12 }}>Paste the YouTube link for the In-Store section.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input style={{ flex: 1, minWidth: 240, padding: '10px 12px', border: '1.5px solid var(--line)', borderRadius: 8, fontFamily: 'inherit', fontSize: 14 }} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtu.be/..." />
        <button className="btn btn-gold" onClick={save}>Save video</button>
      </div>
      <div style={{ color: '#1c7a4a', fontWeight: 700, marginTop: 8 }}>{msg}</div>
    </div>
  );
}

/* ---------- login ---------- */
function Login({ onIn }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  async function go() {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
    if (error) setErr(error.message); else onIn();
  }
  return (
    <div style={{ minHeight: '100vh', background: 'var(--blue-deep)', display: 'grid', placeItems: 'center', padding: 20 }}>
      <div className="login-card">
        <img src="/logo-full.png" alt="Great Escape" style={{ width: 96, height: 96, borderRadius: 16, margin: '0 auto 16px', objectFit: 'cover' }} />
        <h2>Site Control</h2>
        <p>Great Escape admin</p>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && go()} />
        <button className="btn btn-blue" style={{ width: '100%', justifyContent: 'center' }} onClick={go}>Enter dashboard</button>
        <div className="login-err">{err}</div>
      </div>
    </div>
  );
}

/* ---------- admin shell ---------- */
const TABS = [
  ['cities', 'Cities'], ['projects', 'Portfolio'], ['pricing', 'Pricing'],
  ['instore', 'In-Store Ads'], ['posts', 'Blog'], ['leads', 'Leads'], ['testimonials', 'Testimonials'],
];

export default function Admin() {
  const [session, setSession] = useState(undefined);
  const [tab, setTab] = useState('cities');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <div style={{ padding: 40 }}>Loading…</div>;
  if (!session) return <Login onIn={() => {}} />;

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div className="admin-top">
        <div className="admin-top-in">
          <div className="brand">
            <img className="mark" src="/logo-mark.png" alt="" />
            <div><b style={{ fontFamily: 'Cinzel', letterSpacing: '.05em' }}>SITE CONTROL</b><span>greatescapewebservices.com</span></div>
            <span className="admin-badge" style={{ marginLeft: 8 }}>Admin</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a className="open-link" href="/" target="_blank" rel="noreferrer">View live site ↗</a>
            <button className="btn btn-ghost" style={{ padding: '8px 14px' }} onClick={() => supabase.auth.signOut()}>Log out</button>
          </div>
        </div>
      </div>
      <div className="admin-shell">
        <div className="admin-tabs">
          {TABS.map(([k, label]) => (
            <button key={k} className={'atab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>{label}</button>
          ))}
        </div>
        {tab === 'instore' ? (
          <><VideoSetting /><Manager table="instore_clients" /></>
        ) : (
          <Manager table={tab} />
        )}
      </div>
    </div>
  );
}
