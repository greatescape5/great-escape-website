export default function ProjectCard({ p }) {
  return (
    <div className="proj">
      {p.logo_url ? (
        <div className="thumb has-logo"><img src={p.logo_url} alt={`${p.name} logo`} /></div>
      ) : (
        <div className="thumb">
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.45 }} viewBox="0 0 200 120" preserveAspectRatio="xMidYMax slice">
            <path d="M0 120 L0 86 L52 58 L92 84 L132 50 L172 78 L200 64 L200 120 Z" fill="#05314f" />
          </svg>
          <div className="pname">{p.name}</div>
        </div>
      )}
      <div className="body">
        <div className="loc">{p.location}</div>
        <h3>{p.name}</h3>
        <div className="svcs">
          {(p.services || []).map((s, i) => <span className="pill" key={i}>{s}</span>)}
        </div>
      </div>
    </div>
  );
}
