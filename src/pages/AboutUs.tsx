import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

export function AboutUs() {
  return (
    <Layout>
      <div className="aou-page-redesign">

        {/* ─── SECTION 01: HERO ───────────────────────────────────────────── */}
        <section className="aou-hero-v2">
          <div className="container aou-hero-v2-container">
            <div className="aou-hero-v2-content">
              <span className="aou-tag-badge">OVER ONS</span>
              <h1 className="aou-hero-v2-title">
                Begonnen als jeugdvrienden.<br />
                Gegroeid door vertrouwen.
              </h1>
              <p className="aou-hero-v2-sub">
                Al meer dan 12 jaar een vertrouwd adres in Naaldwijk en het Westland. Voor reparaties, accessoires en eerlijk advies waar u echt verder mee komt.
              </p>

              {/* 3 Glassmorphism Badges */}
              <div className="aou-hero-v2-badges">
                <div className="aou-glass-badge">
                  <div className="aou-glass-icon"><Icon.Shield width={20} height={20} /></div>
                  <div className="aou-glass-text">
                    <strong>12+ jaar</strong>
                    <span>ervaring</span>
                  </div>
                </div>

                <div className="aou-glass-badge">
                  <div className="aou-glass-icon"><Icon.Star width={20} height={20} /></div>
                  <div className="aou-glass-text">
                    <strong>4,8/5</strong>
                    <span>op Google</span>
                  </div>
                </div>

                <div className="aou-glass-badge">
                  <div className="aou-glass-icon"><Icon.Wrench width={20} height={20} /></div>
                  <div className="aou-glass-text">
                    <strong>10.000+</strong>
                    <span>reparaties</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 02: ONZE MANIER VAN WERKEN ──────────────────────────── */}
        <section className="aou-way">
          <div className="container aou-way-container">
            <div className="aou-way-watermark">SINDS 2012</div>
            <div className="aou-way-content">
              <span className="aou-tag-badge aou-tag-badge--green">ONZE MANIER VAN WERKEN</span>
              <h2 className="aou-way-title">
                Binnenlopen met een probleem.<br />
                Weggaan met duidelijkheid.
              </h2>
              <p className="aou-way-highlight">
                Eerst begrijpen. Dan adviseren. En pas repareren als het zin heeft.
              </p>
              <p className="aou-way-body">
                Wij luisteren naar uw verhaal, stellen de juiste vragen en leggen alles duidelijk uit. Zo weet u altijd waar u aan toe bent — zonder verrassingen. Eerlijk advies staat bij ons altijd op nummer één.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 03: ONS VERHAAL ────────────────────────────────────── */}
        <section className="aou-story-v2">
          <div className="container">
            <div className="aou-story-v2-grid">
              <div className="aou-story-v2-img-wrap">
                <div className="aou-img-placeholder">
                  <Icon.Camera width={44} height={44} />
                  <span>FOTO WINKEL / TEAM OMGEVING</span>
                </div>
              </div>

              <div className="aou-story-v2-content">
                <span className="aou-tag-badge aou-tag-badge--green">ONS VERHAAL</span>
                <h2 className="aou-story-v2-title">
                  Van telecom collega's tot een vertrouwd adres in het hart van het Westland.
                </h2>
                <p className="aou-story-v2-text">
                  We leerden elkaar kennen in de telecomwereld en ontdekten onze gedeelde passie voor techniek en service. Wat begon met helpen in onze vrije tijd, gegroeid uit tot 4Mobiles: een winkel waar kwaliteit, eerlijkheid en persoonlijk contact centraal staan.
                </p>
                <p className="aou-story-v2-text">
                  Door de jaren heen bouwden we aan sterke relaties met onze klanten. Velen van bezoekers zijn vaste gezichten geworden.
                </p>

                <div className="aou-quote-box">
                  <span className="aou-quote-mark">“</span>
                  <p className="aou-quote-text">Van bezoekers vaste gezichten maken.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 04: ONS TEAM ───────────────────────────────────────── */}
        <section className="aou-team">
          <div className="container">
            <div className="aou-team-header">
              <span className="aou-tag-badge aou-tag-badge--green">ONS TEAM</span>
              <h2 className="aou-team-title">De gezichten achter 4Mobiles.</h2>
            </div>

            <div className="aou-team-collage">
              {/* Card 1: Left Large */}
              <div className="aou-team-card aou-team-card--large">
                <div className="aou-team-avatar-placeholder">
                  <Icon.User width={54} height={54} />
                </div>
                <div className="aou-team-info">
                  <h3 className="aou-team-name">Kevin</h3>
                  <p className="aou-team-role">Eigenaar / Techniek</p>
                </div>
              </div>

              {/* Center Stack */}
              <div className="aou-team-center-stack">
                <div className="aou-team-card aou-team-card--small">
                  <div className="aou-team-avatar-placeholder">
                    <Icon.User width={40} height={40} />
                  </div>
                  <div className="aou-team-info">
                    <h3 className="aou-team-name">Dylan</h3>
                    <p className="aou-team-role">Technicus</p>
                  </div>
                </div>

                <div className="aou-team-card aou-team-card--small">
                  <div className="aou-team-avatar-placeholder">
                    <Icon.User width={40} height={40} />
                  </div>
                  <div className="aou-team-info">
                    <h3 className="aou-team-name">Milan</h3>
                    <p className="aou-team-role">Technicus</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Right Large */}
              <div className="aou-team-card aou-team-card--large">
                <div className="aou-team-avatar-placeholder">
                  <Icon.User width={54} height={54} />
                </div>
                <div className="aou-team-info">
                  <h3 className="aou-team-name">Ruben</h3>
                  <p className="aou-team-role">Eigenaar / Advies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 05: MEER DAN REPARATIES ────────────────────────────── */}
        <section className="aou-more">
          <div className="container">
            <div className="aou-more-grid">
              <div className="aou-more-content">
                <span className="aou-tag-badge aou-tag-badge--green">MEER DAN REPARATIES</span>
                <h2 className="aou-more-title">
                  Niet alleen herstellen.<br />
                  Ook helpen voorkomen.
                </h2>
                <p className="aou-more-sub">
                  Met persoonlijk advies, passende accessoires en service helpen wij u om langer en zorgeloos gebruik te maken van uw toestel.
                </p>

                {/* 4 Value Props Grid */}
                <div className="aou-props-grid">
                  <div className="aou-prop-card">
                    <div className="aou-prop-icon"><Icon.User width={20} height={20} /></div>
                    <span className="aou-prop-title">Persoonlijk advies</span>
                  </div>

                  <div className="aou-prop-card">
                    <div className="aou-prop-icon"><Icon.Phone width={20} height={20} /></div>
                    <span className="aou-prop-title">Passende accessoires</span>
                  </div>

                  <div className="aou-prop-card">
                    <div className="aou-prop-icon"><Icon.Cart width={20} height={20} /></div>
                    <span className="aou-prop-title">Service na aankoop</span>
                  </div>

                  <div className="aou-prop-card">
                    <div className="aou-prop-icon"><Icon.Scale width={20} height={20} /></div>
                    <span className="aou-prop-title">Eerlijk & transparant</span>
                  </div>
                </div>

                {/* 2 Bottom Trust Items */}
                <div className="aou-more-trust-bar">
                  <div className="aou-more-trust-item">
                    <Icon.Users width={18} height={18} />
                    <span>Vertrouwen van duizenden klanten.</span>
                  </div>

                  <div className="aou-more-trust-item">
                    <Icon.ShieldCheck width={18} height={18} />
                    <span>90 dagen garantie op uw reparatie.</span>
                  </div>
                </div>
              </div>

              <div className="aou-more-img-wrap">
                <div className="aou-img-placeholder aou-img-placeholder--dark">
                  <Icon.Camera width={48} height={48} />
                  <span>FOTO WINKEL & OMGEVING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 06: BEZOEK ONS ─────────────────────────────────────── */}
        <section className="aou-visit">
          <div className="container">
            <div className="aou-visit-grid">
              <div className="aou-visit-content">
                <span className="aou-tag-badge aou-tag-badge--green">BEZOEK ONS</span>
                <h2 className="aou-visit-title">Loop gerust binnen.</h2>

                <div className="aou-visit-info-list">
                  <div className="aou-visit-info-item">
                    <div className="aou-visit-icon"><Icon.Pin width={20} height={20} /></div>
                    <div>
                      <strong>4Mobiles Naaldwijk</strong>
                      <p>Kerkstraat 54, 2671 CG Naaldwijk</p>
                    </div>
                  </div>

                  <div className="aou-visit-info-item">
                    <div className="aou-visit-icon"><Icon.Clock width={20} height={20} /></div>
                    <div>
                      <strong>Openingstijden</strong>
                      <p>Maandag t/m Zaterdag: 09:30 - 18:00</p>
                    </div>
                  </div>

                  <div className="aou-visit-info-item">
                    <div className="aou-visit-icon"><Icon.Phone width={20} height={20} /></div>
                    <div>
                      <strong>Contact</strong>
                      <p>0174 - 62 42 42 | WhatsApp: 06 - 12 34 56 78</p>
                    </div>
                  </div>
                </div>

                <div className="aou-visit-ctas">
                  <a
                    href="https://maps.google.com/?q=Kerkstraat+54+Naaldwijk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <Icon.MapLink width={16} height={16} /> Route bekijken
                  </a>
                  <a
                    href="https://wa.me/31612345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <Icon.WhatsApp width={16} height={16} /> WhatsApp ons
                  </a>
                </div>
              </div>

              <div className="aou-visit-img-wrap">
                <div className="aou-img-placeholder">
                  <Icon.Camera width={48} height={48} />
                  <span>FOTO TEAM IN DE WINKEL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}
