'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';

type GalleryCategory =
  | 'exterior'
  | 'engine'
  | 'wheels'
  | 'frunk'
  | 'interior'
  | 'gauges'
  | 'underbody'
  | 'docs'
  | 'fuchs';

const GALLERY: Record<GalleryCategory, { srcs: string[]; caps: string[] }> = {
  exterior: {
    srcs: ['/porsche/img/arb-01.webp','/porsche/img/arb-1c.webp','/porsche/img/arb-02.webp','/porsche/img/arb-03a.webp','/porsche/img/arb-03b.webp','/porsche/img/arb-04a.webp','/porsche/img/arb-04b.webp','/porsche/img/arb-04c.webp','/porsche/img/arb-04d.webp','/porsche/img/arb-05.webp','/porsche/img/arb-07a.webp','/porsche/img/arb-07b.webp','/porsche/img/arb-07c.webp','/porsche/img/arb-07d.webp'],
    caps: ['Side profile','Side profile — alternate','Rear three-quarter','Front three-quarter left','Front three-quarter right','Rear straight','Rear angle left','Rear angle right','Rear detail','Hood & trunk open','Headlight left — Marchal fog','Headlight right','Taillight left','Taillight right'],
  },
  engine: {
    srcs: ['/porsche/img/arb-06a.webp','/porsche/img/arb-06b.webp','/porsche/img/arb-06c.webp','/porsche/img/arb-18a.webp','/porsche/img/arb-18b.webp','/porsche/img/arb-18c.webp'],
    caps: ['Engine bay — angle 1','Engine bay — angle 2','Engine bay — top down','Engine internals — top-end rebuild','Top-end detail','Exhaust system'],
  },
  wheels: {
    srcs: ['/porsche/img/arb-08a.webp','/porsche/img/arb-08b.webp','/porsche/img/arb-08c.webp','/porsche/img/arb-08d.webp'],
    caps: ['Front left — 15" Fuchs','Front right — 15" Fuchs','Rear left — 15" Fuchs','Rear right — 15" Fuchs'],
  },
  frunk: {
    srcs: ['/porsche/img/arb-09a.webp','/porsche/img/arb-09b.webp','/porsche/img/arb-09c.webp','/porsche/img/arb-09d.webp','/porsche/img/arb-10a.webp','/porsche/img/arb-10b.webp','/porsche/img/arb-10c.webp','/porsche/img/arb-10d.webp'],
    caps: ['Front trunk — top view','Front trunk — wide','Spare wheel','Frunk floor detail','Fuel cap','Wiring & mechanics','Chassis plate — door sill','Chassis plate closeup'],
  },
  interior: {
    srcs: ['/porsche/img/arb-11.webp','/porsche/img/arb-12a.webp','/porsche/img/arb-12b.webp','/porsche/img/arb-12c.webp','/porsche/img/arb-12d.webp','/porsche/img/arb-13.webp','/porsche/img/arb-14a.webp','/porsche/img/arb-14b.webp','/porsche/img/arb-14c.webp','/porsche/img/arb-14d.webp','/porsche/img/arb-14e.webp','/porsche/img/arb-17a.webp','/porsche/img/arb-17b.webp'],
    caps: ['Full cabin — Recaro seats & wood wheel','Dashboard','Passenger side','Becker Frankfurt AM/FM radio','Glovebox slot','Rear seats — B-pillar','Door sill','Rear seat — angle 1','Rear seat — angle 2','Rear seat — angle 3','Seat side entry','Headliner','Pedals & Cocomats'],
  },
  gauges: {
    srcs: ['/porsche/img/arb-15a.webp','/porsche/img/arb-15b.webp','/porsche/img/arb-15c.webp','/porsche/img/arb-15d.webp','/porsche/img/arb-16a.webp','/porsche/img/arb-16b.webp','/porsche/img/arb-16c.webp','/porsche/img/arb-16d.webp'],
    caps: ['Speedometer — 30,239 miles shown','Tachometer','Fuel & temperature gauges','Temperature gauge','VDO clock','Ignition & original Porsche key','Glovebox open','4-speed gear shifter'],
  },
  underbody: {
    srcs: ['/porsche/img/arb-19a.webp','/porsche/img/arb-19b.webp','/porsche/img/arb-19c.webp','/porsche/img/arb-19d.webp'],
    caps: ['Coil-over suspension','Undercarriage — floor pan','Rear suspension','Coil-over detail'],
  },
  docs: {
    srcs: ['/porsche/img/arb-20.webp'],
    caps: ['Best in Show trophy · Certificate of Authenticity · Original manuals · Keys'],
  },
  fuchs: {
    srcs: ['/porsche/img/arb-21.webp'],
    caps: ['All 4 original Fuchs wheels — included in sale'],
  },
};

const TAB_LABELS: { key: GalleryCategory; label: string }[] = [
  { key: 'exterior', label: 'Exterior' },
  { key: 'engine', label: 'Engine Bay' },
  { key: 'wheels', label: 'Wheels' },
  { key: 'frunk', label: 'Frunk & Storage' },
  { key: 'interior', label: 'Interior' },
  { key: 'gauges', label: 'Gauges & Details' },
  { key: 'underbody', label: 'Mechanical' },
  { key: 'docs', label: 'Documentation' },
  { key: 'fuchs', label: 'Original Fuchs' },
];

const SPECS: { label: string; value: string }[] = [
  { label: 'Chassis', value: '119121289' },
  { label: 'Odometer', value: '30,260 Miles Shown' },
  { label: 'Engine', value: '2.0 L Flat-Six (S Spec Cams)' },
  { label: 'Carburetion', value: 'Dual Weber Carburetors' },
  { label: 'Transmission', value: '4-Speed Manual' },
  { label: 'Brakes', value: 'Four Wheel Disc (New 2005)' },
  { label: 'Suspension', value: 'Coil-Over Springs' },
  { label: 'Ignition', value: 'Perma Tune Kit' },
  { label: 'Exterior', value: 'Indian Red (re-painted 1994)' },
  { label: 'Interior', value: 'Black Vinyl / Recaro Seats' },
  { label: 'Wheels (current)', value: '15" × 6 Fuchs (installed 2016)' },
  { label: 'Wheels (original)', value: '14" Fuchs — included in sale' },
  { label: 'Steering', value: 'Wooden Steering Wheel' },
  { label: 'Audio', value: 'Becker Frankfurt AM/FM (Refurbished)' },
  { label: 'Lighting', value: 'Marchal Fog Lights' },
  { label: 'Service Records', value: 'Full Set Since 1992' },
];

const TIMELINE: { year: string; desc: React.ReactNode }[] = [
  { year: '1969', desc: 'Built Zuffenhausen. Delivered Burgundy Red, Brown interior, 14×5½ wheels.' },
  { year: '1992', desc: 'Upgraded to S spec cams & distributor. Service records begin.' },
  { year: '1994', desc: 'Extensive bodywork; re-painted Indian Red. New Black Leatherette interior.' },
  { year: '2005', desc: 'New front brakes & wheel bearings at 124,925 mi.' },
  { year: '2015', desc: 'Current owner acquires. Full interior restoration, engine service, fuel system.' },
  { year: '2016', desc: 'Optima battery, Cocomats, refurbished Frankfurt radio, 15" Fuchs wheels.' },
  { year: '2019', desc: <><strong style={{ color: 'var(--gold)' }}>Best in Show</strong> — Miami Art Deco Classic Car Show.</> },
  { year: 'Recent', desc: 'Coil-over springs, engine-out top-end rebuild, Perma Tune ignition, pre-sale full service.' },
];

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Home() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>('exterior');
  const [historySlide, setHistorySlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const HISTORY_IMGS = [
    { src: '/porsche/img/arb-02.webp', alt: '1969 Porsche 911 T — rear three-quarter' },
    { src: '/porsche/img/arb-03a.webp', alt: '1969 Porsche 911 T — front three-quarter' },
  ];
  const [lb, setLb] = useState<{ cat: GalleryCategory; idx: number } | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openLb = (cat: GalleryCategory, idx: number) => setLb({ cat, idx });
  const closeLb = () => setLb(null);
  const lbNav = (dir: number) => {
    if (!lb) return;
    const len = GALLERY[lb.cat].srcs.length;
    setLb({ cat: lb.cat, idx: (lb.idx + dir + len) % len });
  };

  useEffect(() => {
    if (lb) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => {
      if (!lb) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') lbNav(1);
      if (e.key === 'ArrowLeft') lbNav(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lb]);

  useEffect(() => {
    if (carouselPaused) return;
    const id = setInterval(() => {
      setHistorySlide((s) => (s + 1) % HISTORY_IMGS.length);
    }, 4000);
    return () => clearInterval(id);
  }, [carouselPaused]);

  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            el.target.classList.add('visible');
            observer.unobserve(el.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const els = rootRef.current?.querySelectorAll('.reveal') ?? [];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem('fname') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lname') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      country: (form.elements.namedItem('country') as HTMLSelectElement).value,
      interest: (form.elements.namedItem('interest') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    };

    setSubmitStatus('sending');
    setSubmitError('');
    try {
      const res = await fetch('/api/porsche-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? 'Submission failed');
      }
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <Image fill src="/porsche/img/arb-01.webp" alt="" priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Rare Collector Opportunity — Chassis 119121289</p>
          <h1 className="hero-title">
            1969<br />
            <em>Porsche 911 T</em>
          </h1>
          <div className="hero-price-row">
            <div className="hero-price">
              <span>USD</span>$72,000
            </div>
            <div className="hero-badge">Best in Show — Miami 2019</div>
          </div>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary">Inquire Now</a>
            <a href="#gallery" className="btn-outline">View Gallery</a>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
      <nav>
        <div className="nav-brand">
          Porsche <em>911 T</em> · 1969
        </div>
        <ul className="nav-links">
          <li><a href="#specs">Specs</a></li>
          <li><a href="#history">History</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Inquire</a></li>
        </ul>
        <div className="nav-price">$72,000</div>
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          <span /><span /><span />
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#specs" onClick={() => setMobileMenuOpen(false)}>Specs</a>
          <a href="#history" onClick={() => setMobileMenuOpen(false)}>History</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Inquire</a>
        </div>
      )}

      {/* SPECS */}
      <section id="specs">
        <p className="section-label reveal">Technical Specifications</p>
        <h2 className="reveal">
          Built in Zuffenhausen,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--warm-gray)' }}>January 1969.</em>
        </h2>
        <div className="specs-grid reveal">
          {SPECS.map((s) => (
            <div key={s.label} className="spec-item">
              <div className="spec-label">{s.label}</div>
              <div className="spec-value">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORY */}
      <section id="history">
        <p className="section-label reveal">Provenance &amp; History</p>
        <h2 className="reveal">A Documented Life</h2>
        <div className="history-layout">
          <div className="history-text reveal">
            <p>
              This <strong>911 T Karman Coupe</strong> was built in Zuffenhausen in January 1969 as one of the first long-wheelbase 911s and the last of the 2.0 L flat-six engines. Originally delivered in <strong>Burgundy Red</strong> with Brown Interior, Recaro seats and 14×5½ Light Metal Wheels.
            </p>
            <p>
              In 1992, an upgrade to <strong>S spec cams and distributor</strong> was performed. Extensive bodywork followed, with the car re-painted to its current <strong>Indian Red with Black Leatherette</strong> interior in 1994.
            </p>
            <p>
              Since the current owner acquired the car in 2015, it has received comprehensive restoration: full interior renewal including headliner, visors and carpets, new fuel tank and pump, master cylinder replacement, complete engine service, Optima battery, Cocomats, refurbished Frankfurt radio and 15" Fuchs wheels. <strong>The original wheels are included in the sale.</strong>
            </p>
            <p>
              Following rear torsion bar failure, coil-over springs were installed and a full <strong>engine-out top-end rebuild</strong> was performed. DC Carburetors tuned the Webers and a Perma Tune ignition kit was fitted. Pre-sale service confirmed normal findings on all electrics, belts, hoses, brake and fuel lines.
            </p>
            <div className="award-banner">
              <div className="award-icon">🏆</div>
              <div className="award-text">
                <h3>Best in Show</h3>
                <p>Antique Automobile Club of America — South Florida Region, February 2019</p>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--warm-gray)' }}>
              The car presents as a solid driver with age-appropriate patina and minor paint flaws. A <strong style={{ color: 'var(--off-white)' }}>Certificate of Authenticity</strong>, original 911 T manual, and complete service records from 1992 are included.
            </p>
          </div>
          <div className="history-img reveal">
            <div
              className="h-carousel"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              <div
                className="h-carousel-track"
                style={{ transform: `translateX(-${historySlide * 100}%)` }}
              >
                {HISTORY_IMGS.map((img) => (
                  <div key={img.src} className="h-carousel-slide">
                    <Image
                      fill
                      src={img.src}
                      alt={img.alt}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="h-carousel-btn h-carousel-prev"
                onClick={() => { setCarouselPaused(false); setHistorySlide((s) => (s - 1 + HISTORY_IMGS.length) % HISTORY_IMGS.length); }}
                aria-label="Previous image"
                type="button"
              >‹</button>
              <button
                className="h-carousel-btn h-carousel-next"
                onClick={() => { setCarouselPaused(false); setHistorySlide((s) => (s + 1) % HISTORY_IMGS.length); }}
                aria-label="Next image"
                type="button"
              >›</button>
              <div className="h-carousel-dots">
                {HISTORY_IMGS.map((_, i) => (
                  <button
                    key={i}
                    className={`h-carousel-dot${historySlide === i ? ' active' : ''}`}
                    onClick={() => { setCarouselPaused(false); setHistorySlide(i); }}
                    aria-label={`Go to image ${i + 1}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
            <div className="timeline">
              {TIMELINE.map((t) => (
                <div key={t.year} className="tl-item">
                  <div className="tl-year">{t.year}</div>
                  <div className="tl-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <p className="section-label reveal">Complete Photo Gallery</p>
        <h2 className="reveal">Every Angle, Every Detail</h2>

        <div className="gallery-tabs reveal">
          {TAB_LABELS.map((t) => (
            <button
              key={t.key}
              className={`tab-btn${activeTab === t.key ? ' active' : ''}`}
              onClick={() => setActiveTab(t.key)}
              type="button"
            >
              {t.label} <span className="tab-count">({GALLERY[t.key].srcs.length})</span>
            </button>
          ))}
        </div>

        <div className="gallery-panel active">
          <div className="photo-grid">
            {GALLERY[activeTab].srcs.map((src, idx) => (
              <div
                key={src}
                className="photo-grid-item"
                onClick={() => openLb(activeTab, idx)}
              >
                <Image
                  src={src}
                  alt={GALLERY[activeTab].caps[idx] ?? ''}
                  width={1920}
                  height={1280}
                  sizes="(max-width: 420px) 100vw, (max-width: 700px) 50vw, 33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <div
        className={`lightbox${lb ? ' active' : ''}`}
        id="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLb();
        }}
      >
        <button className="lb-close" onClick={closeLb} type="button" aria-label="Close">×</button>
        <div className="lb-image-wrap">
          <button className="lb-nav lb-prev" onClick={() => lbNav(-1)} type="button" aria-label="Previous">‹</button>
          {lb && (
            <Image
              fill
              src={GALLERY[lb.cat].srcs[lb.idx]}
              alt={GALLERY[lb.cat].caps[lb.idx] ?? ''}
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          )}
          <button className="lb-nav lb-next" onClick={() => lbNav(1)} type="button" aria-label="Next">›</button>
        </div>
        <div className="lb-meta">
          <div className="lb-caption">{lb ? GALLERY[lb.cat].caps[lb.idx] ?? '' : ''}</div>
          <div className="lb-counter">{lb ? `${lb.idx + 1} / ${GALLERY[lb.cat].srcs.length}` : ''}</div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-layout">
          <div className="contact-info reveal">
            <p className="section-label">Serious Inquiries Only</p>
            <h2>
              Interested in This <em style={{ fontStyle: 'italic', color: 'var(--warm-gray)' }}>Porsche?</em>
            </h2>
            <p>
              Private sale of an award-winning, fully documented 1969 Porsche 911 T. The car presents as a solid driver with age-appropriate patina. A Certificate of Authenticity, original manuals, and full service records from 1992 are included.
            </p>
            <div className="contact-detail">
              <span className="contact-detail-label">Price</span>
              <span className="contact-detail-value"><strong>$72,000 USD</strong></span>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Location</span>
              <span className="contact-detail-value">Miami, Florida, USA</span>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Transport</span>
              <span className="contact-detail-value">Enclosed shipping available on buyer&apos;s account</span>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Included</span>
              <span className="contact-detail-value">Set of original Fuchs wheels, Best in Show trophy, manual, Certificate of Authenticity, service records since 1992</span>
            </div>
            <div className="contact-img-wrap">
              <Image fill src="/porsche/img/arb-20.webp" alt="Documentation, trophy and manuals" sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="reveal">
            {submitStatus !== 'success' ? (
              <form id="lead-form" onSubmit={submitForm}>
                <input type="text" name="website" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="fname">First Name *</label>
                    <input type="text" id="fname" name="fname" placeholder="James" required />
                  </div>
                  <div className="field">
                    <label htmlFor="lname">Last Name *</label>
                    <input type="text" id="lname" name="lname" placeholder="Morrison" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" placeholder="james@example.com" required />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input type="tel" id="phone" name="phone" placeholder="+1 305 000 0000" />
                  </div>
                  <div className="field">
                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" defaultValue="">
                      <option value="">Select country...</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Switzerland</option>
                      <option>Austria</option>
                      <option>Australia</option>
                      <option>Japan</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="interest">Level of Interest</label>
                  <select id="interest" name="interest" defaultValue="">
                    <option value="">Select...</option>
                    <option>Ready to purchase — need logistics only</option>
                    <option>Seriously considering — need more information</option>
                    <option>Would like to arrange an in-person viewing</option>
                    <option>Exploring options — longer timeline</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">Message / Questions</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about yourself and any specific questions about the car..."
                  />
                </div>
                <p className="form-disclaimer">
                  Your information will only be used to respond to your inquiry. We respect your privacy and will not share your data with third parties.
                </p>
                {submitStatus === 'error' && (
                  <p style={{ color: 'var(--red-light)', fontSize: 13 }}>
                    {submitError || 'Something went wrong. Please try again.'}
                  </p>
                )}
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitStatus === 'sending'}
                  style={submitStatus === 'sending' ? { opacity: 0.6, cursor: 'wait' } : undefined}
                >
                  {submitStatus === 'sending' ? 'Sending…' : 'Send Inquiry →'}
                </button>
              </form>
            ) : (
              <div className="form-success show">
                <h3>Thank you for your interest.</h3>
                <p>We&apos;ll be in touch within 24 hours to discuss next steps.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div>
          1969 Porsche 911 T · Chassis 119121289 · Indian Red · <strong>$72,000 USD</strong>
        </div>
        <div>Miami, Florida · Private Sale · All inquiries confidential</div>
      </footer>
    </div>
  );
}
