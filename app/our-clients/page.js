import { getProjects } from '../../lib/data';
import ProjectCard from '../../components/ProjectCard';

export const revalidate = 60;
export const metadata = {
  title: 'Our Clients',
  description: 'North Idaho businesses we have built websites for and put on the map.',
};

export default async function OurClients() {
  const projects = await getProjects();
  return (
    <>
      <section className="blk" style={{ background: 'var(--blue-deep)', color: '#fff', paddingBottom: '44px', position: 'relative', overflow: 'hidden' }}>
        <svg className="hero-art" style={{ opacity: 0.5 }} viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M0 360 L0 280 L240 190 L480 280 L720 180 L960 270 L1200 210 L1200 360 Z" fill="#05314f" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Our Clients</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(30px,5vw,48px)', marginTop: '14px', fontWeight: 600 }}>North Idaho businesses we've put on the map.</h2>
          <p style={{ color: '#CFE0EE', maxWidth: '56ch', marginTop: '14px' }}>Every build managed from one place — websites that get found and keep the phone ringing.</p>
        </div>
      </section>
      <section className="blk" style={{ paddingTop: '50px' }}>
        <div className="wrap">
          <div className="grid port-grid">
            {projects.map((p) => <ProjectCard p={p} key={p.id} />)}
          </div>
        </div>
      </section>
    </>
  );
}
