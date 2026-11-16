import { useState } from 'react'
import { portfolio } from './data'
import { downloadResume } from './resume'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>
)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label={`${portfolio.name}, home`} onClick={closeMenu}>GS<span>.</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s talk <Arrow diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> {portfolio.availability}</p>
            <h1>Giorgio Schepis<br /><em>Portfolio</em></h1>
            <p className="hero-intro">{portfolio.intro}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my work <Arrow /></a>
              <button className="button button-resume" type="button" onClick={downloadResume}>Download resume <span aria-hidden="true">↓</span></button>
              <a className="text-link" href={`mailto:${portfolio.email}`}>Get in touch <Arrow diagonal /></a>
            </div>
            <div className="hero-meta"><span>BASED IN</span><strong>{portfolio.location}</strong></div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-frame">
              <img src="/Giorgio-Schepis-HeadShot.jpeg" alt="Portrait of Giorgio Schepis" />
              <span className="portrait-corner portrait-corner-top" aria-hidden="true">GS / 01</span>
              <span className="portrait-corner portrait-corner-bottom" aria-hidden="true">COMPUTER SCIENCE</span>
            </div>
            <div className="portrait-note"><span>✳</span><span>21 Years Old <br />Born in Miami, Florida</span></div>
            <div className="float-chip float-chip-top" aria-hidden="true"><span className="chip-pulse" /> OPEN TO OPPORTUNITIES</div>
            <div className="float-chip float-chip-bottom" aria-hidden="true"><span className="chip-bracket">&lt;/&gt;</span> IDEAS → INTERFACES</div>
            <span className="portrait-orbit" aria-hidden="true" />
            <span className="portrait-index">PORTFOLIO&nbsp; / &nbsp;2026</span>
          </div>
          <a className="scroll-cue" href="#about"><span className="scroll-line" /> Scroll to explore</a>
        </section>

        <div className="ticker" aria-label="Build, learn, make, repeat">
          <div className="ticker-track" aria-hidden="true">{Array.from({ length: 4 }, (_, index) => <span key={index}>Full Stack Development<b>✳</b> AI Integration <b>✳</b> Database Systems <b>✳</b></span>)}</div>
        </div>

        <section className="intro-band" id="about">
          <div className="section-wrap intro-grid">
            <p className="eyebrow section-label">01 / A LITTLE ABOUT ME</p>
            <div className="intro-content">
              <h2>Quick Professional <em> Summary</em></h2>
              <p>{portfolio.about}</p>
              <a className="text-link" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">More about me on LinkedIn <Arrow diagonal /></a>
            </div>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">02 / SOFTWARE & AI PROJECTS</p><h2>Things I’ve <em>made.</em></h2></div>
            <p className="heading-aside">A few problems, ideas,<br />and experiments.</p>
          </div>
          <div className="project-list">
            {portfolio.projects.map((project) => (
              <article className={`project-card project-card-${project.number}${project.videoId ? '' : ' is-clickable'}`} key={project.number}>
                <div className={`project-art art-${project.number}${project.videoId ? ' has-video' : ''}`}>
                  {project.videoId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${project.videoId}`}
                      title={`${project.name} demo video`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : project.image ? (
                    <img className="project-art-image" src={project.image} alt={`${project.name} preview`} loading="lazy" />
                  ) : (
                    <div className="project-art-placeholder" aria-hidden="true">
                      <span className="art-stamp">{project.number} / FIELD NOTES</span>
                      <div className="art-window">
                        <div className="art-toolbar"><i /><i /><i /><span>IDEA IN PROGRESS</span></div>
                        <div className="art-canvas"><div className="art-orbit"><span /></div><div className="art-lines"><i /><i /><i /></div><div className="art-chip">EXPLORE</div></div>
                      </div>
                      <span className="art-spark">✳</span>
                    </div>
                  )}
                </div>
                <div className="project-number">{project.number}</div>
                <div className="project-content">
                  <p className="eyebrow">{project.type}</p>
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tag-list" aria-label="Technologies used">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                {project.videoId ? (
                  <a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.label}: ${project.name}`}><Arrow diagonal /></a>
                ) : (
                  <a className="project-card-overlay" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.label}: ${project.name}`}>
                    <span className="project-link project-card-overlay-icon"><Arrow diagonal /></span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="skills-band">
          <div className="section-wrap skills-inner">
            <div><p className="eyebrow">03 / THE TOOLKIT</p><h2>What I bring<br /><em>to the table.</em></h2></div>
            <div className="skills-grid">{portfolio.skills.map((group) => <div className="skill-group" key={group.category}><h3>{group.category}</h3><ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
          </div>
        </section>

        <section className="experience-section section-wrap" id="experience">
          <div className="section-heading experience-heading">
            <div><p className="eyebrow">04 / EXPERIENCE & EDUCATION</p><h2>Learning by <em>doing.</em></h2></div>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item) => <article className="timeline-item" key={`${item.role}-${item.organization}`}><div className="timeline-period">{item.period}</div><div className="timeline-detail"><span className="timeline-dot" /><h3>{item.role}</h3><p className="organization">{item.organization}</p><p>{item.detail}</p></div></article>)}
            <article className="timeline-item education-item"><div className="timeline-period">{portfolio.education.period}</div><div className="timeline-detail"><span className="timeline-dot" /><h3>{portfolio.education.degree}</h3><p className="organization">{portfolio.education.school}</p><p>{portfolio.education.detail}</p></div></article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <p className="eyebrow">05 / NEXT UP</p>
            <h2>Have something<br />good in <em>mind?</em></h2>
            <p className="contact-copy">I’m always glad to meet thoughtful people and talk about interesting work. If you think there could be a fit, I’d love to hear from you.</p>
            <a className="button button-light" href={`mailto:${portfolio.email}`}>Say hello <Arrow diagonal /></a>
            <div className="contact-footer"><span>{portfolio.name} · {portfolio.role}</span><div className="social-links">{portfolio.links.github && <a href={portfolio.links.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>}<a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a><a href={`tel:${portfolio.phone}`}>{portfolio.phone.replace('+1-', '+1 ')}</a></div></div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap"><span>© {new Date().getFullYear()} {portfolio.name}</span><span>Designed with intention, built with curiosity.</span><a href="#home">Back to top ↑</a></footer>
    </>
  )
}

export default App
