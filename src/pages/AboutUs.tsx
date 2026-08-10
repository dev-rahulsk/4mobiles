import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { MobileHero, GlassBadge, CtaButton } from '../components/global'
import aboutMobileHeroImg from '../assets/ChatGPT_Image_10_jul_2026_11_20_55.png'

export function AboutUs() {
  const { t } = useTranslation()
  const teamMembers = t('aboutUs.team.members', { returnObjects: true }) as { name: string; role: string }[]
  const moreProps = t('aboutUs.more.props', { returnObjects: true }) as string[]
  const PROP_ICONS = [Icon.User, Icon.Phone, Icon.Cart, Icon.Scale]

  return (
    <Layout>
      <div className="aou-page-redesign">

        {/* ─── SECTION 01: HERO ───────────────────────────────────────────── */}
        <div className="g-desktop-only">
          <section className="aou-hero-v2">
            <div className="container aou-hero-v2-container">
              <div className="aou-hero-v2-content">
                <span className="aou-tag-badge">{t('aboutUs.hero.eyebrow')}</span>
                <h1 className="aou-hero-v2-title">
                  {t('aboutUs.hero.titleLine1')}<br />
                  {t('aboutUs.hero.titleLine2Pre')}{t('aboutUs.hero.titleAccent')}{t('aboutUs.hero.titleLine2Post')}
                </h1>
                <p className="aou-hero-v2-sub">
                  {t('aboutUs.hero.sub')}
                </p>

                {/* 3 Glassmorphism Badges */}
                <div className="aou-hero-v2-badges">
                  <div className="aou-glass-badge">
                    <div className="aou-glass-icon"><Icon.Shield width={20} height={20} /></div>
                    <div className="aou-glass-text">
                      <strong>{t('aboutUs.hero.badge1Value')}</strong>
                      <span>{t('aboutUs.hero.badge1Label')}</span>
                    </div>
                  </div>

                  <div className="aou-glass-badge">
                    <div className="aou-glass-icon"><Icon.Star width={20} height={20} /></div>
                    <div className="aou-glass-text">
                      <strong>{t('aboutUs.hero.badge2Value')}</strong>
                      <span>{t('aboutUs.hero.badge2Label')}</span>
                    </div>
                  </div>

                  <div className="aou-glass-badge">
                    <div className="aou-glass-icon"><Icon.Wrench width={20} height={20} /></div>
                    <div className="aou-glass-text">
                      <strong>{t('aboutUs.hero.badge3Value')}</strong>
                      <span>{t('aboutUs.hero.badge3Label')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="g-mobile-only">
          <MobileHero
            className="au-mobile-hero"
            tone="dark"
            readabilityLayer
            image={{ src: aboutMobileHeroImg, alt: t('aboutUs.hero.imageAlt') }}
            imagePositionY="10%"
            eyebrow={t('aboutUs.hero.eyebrow')}
            title={
              <>
                {t('aboutUs.hero.titleLine1')}<br />
                {t('aboutUs.hero.titleLine2Pre')}
                <span style={{ color: 'var(--green-hero)' }}>{t('aboutUs.hero.titleAccent')}</span>
                {t('aboutUs.hero.titleLine2Post')}
              </>
            }
            subtext={t('aboutUs.hero.subMobile')}
            cta={
              <CtaButton variant="light" href="/contact">
                <Icon.Phone width="18" height="18" />
                <span>{t('aboutUs.hero.cta')}</span>
                <Icon.ArrowRight width="16" height="16" />
              </CtaButton>
            }
            badges={[
              <GlassBadge
                key="years"
                icon={Icon.Shield}
                value={t('aboutUs.hero.badge1Value')}
                title={t('aboutUs.hero.badge1Label')}
              />,
              <GlassBadge
                key="google"
                icon={Icon.Star}
                value={t('aboutUs.hero.badge2Value')}
                title={t('aboutUs.hero.badge2Label')}
                text="★★★★★"
              />,
              <GlassBadge
                key="repairs"
                icon={Icon.Wrench}
                value={t('aboutUs.hero.badge3Value')}
                title={t('aboutUs.hero.badge3Label')}
              />,
              <GlassBadge
                key="warranty"
                icon={Icon.ShieldCheck}
                value={t('aboutUs.hero.badge4Value')}
                title={t('aboutUs.hero.badge4Label')}
              />,
            ]}
          />
        </div>

        {/* ─── SECTION 02: ONZE MANIER VAN WERKEN ──────────────────────────── */}
        <section className="aou-way">
          <div className="container aou-way-container">
            <div className="aou-way-watermark">{t('aboutUs.way.watermark')}</div>
            <div className="aou-way-content">
              <span className="aou-tag-badge aou-tag-badge--green">{t('aboutUs.way.tag')}</span>
              <h2 className="aou-way-title">
                {t('aboutUs.way.title1')}<br />
                {t('aboutUs.way.title2')}
              </h2>
              <p className="aou-way-highlight">
                {t('aboutUs.way.highlight')}
              </p>
              <p className="aou-way-body">
                {t('aboutUs.way.body')}
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
                  <span>{t('aboutUs.story.imgPlaceholder')}</span>
                </div>
              </div>

              <div className="aou-story-v2-content">
                <span className="aou-tag-badge aou-tag-badge--green">{t('aboutUs.story.tag')}</span>
                <h2 className="aou-story-v2-title">
                  {t('aboutUs.story.title')}
                </h2>
                <p className="aou-story-v2-text">
                  {t('aboutUs.story.text1')}
                </p>
                <p className="aou-story-v2-text">
                  {t('aboutUs.story.text2')}
                </p>

                <div className="aou-quote-box">
                  <span className="aou-quote-mark">“</span>
                  <p className="aou-quote-text">{t('aboutUs.story.quote')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 04: ONS TEAM ───────────────────────────────────────── */}
        <section className="aou-team">
          <div className="container">
            <div className="aou-team-header">
              <span className="aou-tag-badge aou-tag-badge--green">{t('aboutUs.team.tag')}</span>
              <h2 className="aou-team-title">{t('aboutUs.team.title')}</h2>
            </div>

            <div className="aou-team-collage">
              {/* Card 1: Left Large */}
              <div className="aou-team-card aou-team-card--large">
                <div className="aou-team-avatar-placeholder">
                  <Icon.User width={54} height={54} />
                </div>
                <div className="aou-team-info">
                  <h3 className="aou-team-name">{teamMembers[0]?.name}</h3>
                  <p className="aou-team-role">{teamMembers[0]?.role}</p>
                </div>
              </div>

              {/* Center Stack */}
              <div className="aou-team-center-stack">
                <div className="aou-team-card aou-team-card--small">
                  <div className="aou-team-avatar-placeholder">
                    <Icon.User width={40} height={40} />
                  </div>
                  <div className="aou-team-info">
                    <h3 className="aou-team-name">{teamMembers[1]?.name}</h3>
                    <p className="aou-team-role">{teamMembers[1]?.role}</p>
                  </div>
                </div>

                <div className="aou-team-card aou-team-card--small">
                  <div className="aou-team-avatar-placeholder">
                    <Icon.User width={40} height={40} />
                  </div>
                  <div className="aou-team-info">
                    <h3 className="aou-team-name">{teamMembers[2]?.name}</h3>
                    <p className="aou-team-role">{teamMembers[2]?.role}</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Right Large */}
              <div className="aou-team-card aou-team-card--large">
                <div className="aou-team-avatar-placeholder">
                  <Icon.User width={54} height={54} />
                </div>
                <div className="aou-team-info">
                  <h3 className="aou-team-name">{teamMembers[3]?.name}</h3>
                  <p className="aou-team-role">{teamMembers[3]?.role}</p>
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
                <span className="aou-tag-badge aou-tag-badge--green">{t('aboutUs.more.tag')}</span>
                <h2 className="aou-more-title">
                  {t('aboutUs.more.title1')}<br />
                  {t('aboutUs.more.title2')}
                </h2>
                <p className="aou-more-sub">
                  {t('aboutUs.more.sub')}
                </p>

                {/* 4 Value Props Grid */}
                <div className="aou-props-grid">
                  {moreProps.map((prop, i) => {
                    const PropIcon = PROP_ICONS[i] ?? Icon.User
                    return (
                      <div className="aou-prop-card" key={prop}>
                        <div className="aou-prop-icon"><PropIcon width={20} height={20} /></div>
                        <span className="aou-prop-title">{prop}</span>
                      </div>
                    )
                  })}
                </div>

                {/* 2 Bottom Trust Items */}
                <div className="aou-more-trust-bar">
                  <div className="aou-more-trust-item">
                    <Icon.Users width={18} height={18} />
                    <span>{t('aboutUs.more.trust1')}</span>
                  </div>

                  <div className="aou-more-trust-item">
                    <Icon.ShieldCheck width={18} height={18} />
                    <span>{t('aboutUs.more.trust2')}</span>
                  </div>
                </div>
              </div>

              <div className="aou-more-img-wrap">
                <div className="aou-img-placeholder aou-img-placeholder--dark">
                  <Icon.Camera width={48} height={48} />
                  <span>{t('aboutUs.more.imgPlaceholder')}</span>
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
                <span className="aou-tag-badge aou-tag-badge--green">{t('aboutUs.visit.tag')}</span>
                <h2 className="aou-visit-title">{t('aboutUs.visit.title')}</h2>

                <div className="aou-visit-info-list">
                  <div className="aou-visit-info-item">
                    <div className="aou-visit-icon"><Icon.Pin width={20} height={20} /></div>
                    <div>
                      <strong>{t('aboutUs.visit.addrName')}</strong>
                      <p>{t('aboutUs.visit.addrLine')}</p>
                    </div>
                  </div>

                  <div className="aou-visit-info-item">
                    <div className="aou-visit-icon"><Icon.Clock width={20} height={20} /></div>
                    <div>
                      <strong>{t('aboutUs.visit.hoursLabel')}</strong>
                      <p>{t('aboutUs.visit.hoursLine')}</p>
                    </div>
                  </div>

                  <div className="aou-visit-info-item">
                    <div className="aou-visit-icon"><Icon.Phone width={20} height={20} /></div>
                    <div>
                      <strong>{t('aboutUs.visit.contactLabel')}</strong>
                      <p>{t('aboutUs.visit.contactLine')}</p>
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
                    <Icon.MapLink width={16} height={16} /> {t('aboutUs.visit.routeBtn')}
                  </a>
                  <a
                    href="https://wa.me/31612345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <Icon.WhatsApp width={16} height={16} /> {t('aboutUs.visit.whatsappBtn')}
                  </a>
                </div>
              </div>

              <div className="aou-visit-img-wrap">
                <div className="aou-img-placeholder">
                  <Icon.Camera width={48} height={48} />
                  <span>{t('aboutUs.visit.imgPlaceholder')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}
