// Fix: Changed 'import React, aistudio from 'react'' to 'import React from 'react'' to correct the import syntax.
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Logo } from './components/Logo';
import { 
  TechIcon, FinanceIcon, HealthcareIcon, ManufacturingIcon, EngineeringIcon, ConsumerIcon,
  IntelligenceIcon, PartnershipIcon, StrategyIcon, ConfidentialityIcon,
  EnvelopeIcon, GlobeIcon,
  DiscoveryIcon, SourcingIcon, AssessmentIcon, IntegrationIcon,
  // Fix: Corrected typo in DiversityAdvocacyIcon import.
  PartnerLedIcon, DataInsightsIcon, TalentAccessIcon, CulturalPrecisionIcon, DiversityAdvocacyIcon,
  ElegantArrowIcon, 
  ChallengeIcon, SolutionIcon, OutcomeIcon, LeftNavArrowIcon, RightNavArrowIcon
} from './components/Icons';
import { ServiceCard } from './components/ServiceCard';

type SlideDef = {
  id: number;
  content: React.ReactNode | ((props: any) => React.ReactNode);
};

const GOLD_ACCENT = 'var(--accent)';

// --- UI Components ---

const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden z-[-1] bg-background">
        <div 
            className="constellation-bg absolute top-0 left-0 w-[4000px] h-[4000px] opacity-40" 
            style={{ 
                backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)',
                animation: 'animated-constellation 200s linear infinite'
            }}
        />
    </div>
);


const Navigation: React.FC<{ current: number, total: number, goTo: (index: number) => void }> = ({ current, total, goTo }) => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 backdrop-blur-md px-4 py-2 rounded-full border" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--nav-border)'}}>
        {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="w-2 h-2 rounded-full transition-colors duration-300" style={{ backgroundColor: current === i ? GOLD_ACCENT : 'var(--nav-dot-inactive)'}} />
        ))}
    </div>
);


// --- Data Definitions ---
const serviceOfferings = [
  { 
    title: 'Executive Search', 
    means: 'Appointing high-impact CXOs & board leaders', 
    value: 'Drives long-term value and strategic alignment.',
    details: 'Our bespoke search process identifies and attracts transformative leaders beyond the obvious candidates, ensuring a perfect fit for your most critical roles.',
    icon: <DiscoveryIcon />
  },
  { 
    title: 'Leadership Consulting', 
    means: 'Building top-tier leadership teams', 
    value: 'Enhances culture, innovation, and growth.',
    details: "We partner to develop high-performing leadership teams through assessment, succession planning, team effectiveness workshops, and executive coaching.",
    icon: <StrategyIcon />
  },
  { 
    title: 'Board Advisory', 
    means: 'Structuring and diversifying boards', 
    value: 'Improves governance and strategic oversight.',
    details: "We provide expert guidance on board composition, governance best practices, and director succession to help boards navigate complex market challenges.",
    icon: <PartnershipIcon />
  },
  { 
    title: 'Talent Intelligence', 
    means: 'Market foresight & pipeline visibility', 
    value: 'Enables proactive, future-ready leadership planning.',
    details: "Gain a strategic advantage by mapping key talent in your industry, providing insights into competitor structures, and building a proactive pipeline of future leaders.",
    icon: <IntelligenceIcon />
  }
];

const methodologySteps = [
  { icon: <DiscoveryIcon />, title: 'Discovery & Strategy', desc: 'Deep dive into client culture, objectives, and role success metrics.'},
  { icon: <SourcingIcon />, title: 'Research & Sourcing', desc: 'Real-time intelligence and discreet candidate engagement.'},
  { icon: <AssessmentIcon />, title: 'Assessment & Selection', desc: 'Competency-based, holistic evaluation beyond the resume.'},
  { icon: <IntegrationIcon />, title: 'Offer & Integration', desc: 'Strategic advisory and seamless onboarding support.'}
];

const differentiators = [
   {icon: <PartnerLedIcon />, title: 'Partner-Led Engagements', desc: 'Senior experts lead every mandate.'},
   {icon: <DataInsightsIcon />, title: 'Data-Backed Insights', desc: 'Proprietary research and market intelligence.'},
   {icon: <TalentAccessIcon />, title: 'Exclusive Talent Access', desc: 'Network of top-tier passive leaders.'},
   {icon: <CulturalPrecisionIcon />, title: 'Cultural Precision', desc: 'Fit beyond credentials.'},
   // Fix: Corrected typo in DiversityAdvocacyIcon component usage.
   {icon: <DiversityAdvocacyIcon />, title: 'Diversity Advocacy', desc: 'Inclusive, future-forward leadership.'}
];

const industryExpertise = [
  { icon: <TechIcon />, name: 'Technology' },
  { icon: <FinanceIcon />, name: 'Financial Services' },
  { icon: <HealthcareIcon />, name: 'Healthcare & Life Sciences' },
  { icon: <ManufacturingIcon />, name: 'Industrials' },
  { icon: <EngineeringIcon />, name: 'Engineering & R&D' },
  { icon: <ConsumerIcon />, name: 'Consumer & Retail' },
];

const partnershipProps = [
  { icon: <DataInsightsIcon />, title: 'Proprietary Intelligence', desc: 'Leverage our deep market insights and proprietary data.' },
  { icon: <PartnershipIcon />, title: 'Dedicated Partner Leadership', desc: 'A senior partner leads every search, ensuring accountability.' },
  { icon: <StrategyIcon />, title: 'Strategic Partnership', desc: 'We operate as an extension of your team, not a service provider.' },
  { icon: <ConfidentialityIcon />, title: 'Ethical & Discreet Advisory', desc: 'Absolute integrity and discretion in every engagement.' }
];

const caseStudy = {
  challenge: "A global technology firm required a new Chief Product Officer to pivot their entire product strategy in a rapidly evolving AI-driven market. The search was highly confidential and time-sensitive.",
  solution: "Leveraging our proprietary talent intelligence platform, we conducted a discreet global search, identifying a shortlist of transformative leaders from non-obvious sectors. Our partner-led assessment focused on cultural alignment and future-readiness.",
  outcome: "Successfully placed a visionary CPO within 90 days. The new leader has since launched a new product portfolio, resulting in a 25% increase in market share and successful entry into two new international markets."
};


// Fix: Added explicit type annotation 'React.FC' to SlideWrapper to correctly handle React-specific props like 'key'.
const SlideWrapper: React.FC<{ children: React.ReactNode, isContentSlide?: boolean }> = ({ children, isContentSlide=true }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={`absolute inset-0 w-full h-full flex items-center justify-center ${isContentSlide ? 'p-8 md:p-16 lg:p-24' : ''}`}
    >
        {children}
    </motion.div>
);

// --- Main Presentation Component ---
const Presentation: React.FC = () => {
  const { slideId } = useParams<{ slideId: string }>();
  const navigate = useNavigate();

  // Fix: Replaced 'aistudio.useState' with 'React.useState'
  const [isWheeling, setIsWheeling] = React.useState(false);

  // Fix: Replaced 'aistudio.useMemo' with 'React.useMemo'
  const presentationImages = React.useMemo(() => ({
    slide1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    slide2: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto-format&fit=crop',
    slide8: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto-format&fit=crop',
    slide9: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?q=80&w=2070&auto-format&fit=crop',
    slide10: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto-format&fit=crop',
  }), []);
  
  // Fix: Replaced 'aistudio.useMemo' with 'React.useMemo'
  const slideData: SlideDef[] = React.useMemo(() => [
    {
      id: 1,
      content: ({ images }: { images: Record<string, string> }) => {
        const title = "Architects of Leadership".split("");
        const subtitle = "Transforming the Future of Executive Talent".split("");
        return (
            <div className="relative h-full w-full overflow-hidden" onClick={() => navigate('/slide/2')}>
              <div 
                className="absolute inset-0 bg-cover bg-center animate-ken-burns" 
                style={{ 
                  backgroundImage: `url('${images.slide1}')`,
                  filter: 'grayscale(40%) contrast(120%) brightness(80%)'
                }} 
              />
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10, 16, 31, 0.8) 80%, var(--background) 100%)'
              }} />
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'url(https://www.transparenttextures.com/patterns/subtle-noise.png)',
                mixBlendMode: 'overlay'
              }} />

              <div className="relative h-full flex flex-col items-start justify-center text-left p-8 md:p-16 lg:p-24 z-10">
                <div className="max-w-4xl">
                  <Logo className="text-4xl md:text-5xl" />
                  <h2 className="text-5xl md:text-7xl font-bold tracking-wider mt-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)'}}>
                    {title.map((char, index) => (
                      <motion.span key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}>
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </h2>
                   <p className="text-xl md:text-2xl font-normal tracking-wider max-w-3xl mt-4" style={{ 
                       color: 'var(--accent-light)', 
                       textShadow: '0 2px 25px rgba(0,0,0,0.85)' 
                    }}>
                    {subtitle.map((char, index) => (
                      <motion.span key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 + index * 0.02 }}>
                          {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
        );
      }
    },
    {
      id: 2,
      content: ({ images }: { images: Record<string, string> }) => (
          <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-16 w-full max-w-7xl">
            <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">About RexJagers</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide">Defining Tomorrow's Leadership</h3>
              <div className="mt-8 grid grid-cols-1 gap-6">
                 <p className="text-text-secondary text-lg md:text-xl"><strong className="text-text-primary">An elite global collective</strong> of leadership advisors, dedicated to executive search and strategic consulting.</p>
                 <p className="text-text-secondary text-lg md:text-xl"><strong className="text-text-primary">Specialized expertise</strong> in appointing visionary leaders who architect competitive advantage.</p>
                 <p className="text-text-secondary text-lg md:text-xl"><strong className="text-text-primary">The trusted partner</strong> for the world's most discerning organizations navigating leadership transformations.</p>
              </div>
            </motion.div>
            <motion.div className="hidden lg:block lg:w-1/2 h-1/2 lg:h-[70%]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <img src={images.slide2} alt="Leadership strategy session" className="w-full h-full object-cover rounded-lg shadow-2xl" />
            </motion.div>
          </div>
        )
    },
    {
      id: 3,
      content: () => (
         <div className="relative flex flex-col items-center justify-center h-full text-center">
            <div className="relative z-10 max-w-5xl">
              <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">Our Purpose</h2>
              <div className="relative mt-6">
                  <span className="absolute -top-8 -left-8 text-9xl font-serif text-text-primary/10">“</span>
                  <span className="absolute -bottom-8 -right-8 text-9xl font-serif text-text-primary/10">”</span>
                  <blockquote className="border-y-2 py-6 text-3xl md:text-5xl italic text-text-primary font-light tracking-wide" style={{ borderColor: GOLD_ACCENT }}>
                  The right leadership is the most critical catalyst for an organization’s success.
                  </blockquote>
              </div>
              <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl tracking-wider mx-auto">
                We connect ambition with leadership — aligning talent, culture, and vision to drive exponential outcomes.
              </p>
            </div>
        </div>
      ),
    },
    {
      id: 4,
      content: () => (
         <div className="flex flex-col justify-center h-full w-full max-w-7xl">
          <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">Our Core Offerings</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide">An Overview of Our Services</h3>
           <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {serviceOfferings.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} className="h-full">
                    <ServiceCard {...item} />
                </motion.div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: 5,
      content: () => (
         <div className="flex flex-col justify-center h-full w-full max-w-7xl">
          <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">Our Methodology</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide">The RexJagers Process</h3>
          <div className="relative mt-12 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {methodologySteps.map((item, index) => (
                      <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} className="bg-surface-2 backdrop-blur-md p-6 rounded-lg border border-border hover:border-[var(--accent)] transition-all duration-300 z-10 relative shadow-xl text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]">{item.icon}</div>
                        <h4 className="font-bold text-text-primary text-xl mt-1 tracking-wide">{item.title}</h4>
                        <p className="text-text-secondary mt-2 text-sm tracking-wider">{item.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      content: () => (
        <div className="flex flex-col justify-center h-full w-full max-w-7xl">
          <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">Our Difference</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide">What Sets Us Apart</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {differentiators.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} className="bg-surface-2 backdrop-blur-md p-6 rounded-lg border border-border shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]">
                  <div className="w-16 h-16 mb-4 text-[var(--accent)]">{item.icon}</div>
                  <h4 className="font-bold text-text-primary text-xl tracking-wide">{item.title}</h4>
                  <p className="text-text-secondary mt-2 text-base tracking-wider">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
     {
      id: 7,
      content: () => (
         <div className="flex flex-col justify-center h-full w-full max-w-6xl">
          <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase text-center">Industry Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide text-center">Sectors We Serve</h3>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            {industryExpertise.map((item, index) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }} className="group flex flex-col items-center justify-center p-6 bg-surface-2 backdrop-blur-md rounded-lg border border-border hover:border-[var(--accent)] transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
                <div className="mb-3 w-16 h-16 transition-all duration-300 group-hover:scale-110 text-[var(--accent)] group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]">{item.icon}</div>
                <span className="text-text-primary font-semibold text-base tracking-wide">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 8,
      content: ({ images }: { images: Record<string, string> }) => (
          <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-16 w-full max-w-7xl">
              <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">The Partnership Proposition</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide">A Synergy of Expertise and Trust</h3>
                <p className="mt-4 text-lg text-text-secondary">Collaborating with RexJagers is an investment in strategic foresight and unparalleled leadership access.</p>
        
                <div className="mt-8 flex flex-col gap-6">
                    {partnershipProps.map((item, index) => (
                        <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }} className="bg-surface-2 backdrop-blur-md border border-border rounded-lg p-5 flex items-center gap-5 transition-all duration-300 hover:border-[var(--accent)] hover:bg-surface-1 shadow-lg">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-transparent text-[var(--accent)]">{item.icon}</div>
                          <div>
                              <h4 className="font-semibold text-text-primary text-lg tracking-wide">{item.title}</h4>
                              <p className="text-text-secondary text-sm mt-1 tracking-wider">{item.desc}</p>
                          </div>
                        </motion.div>
                    ))}
                </div>
              </motion.div>
              <motion.div className="hidden lg:block lg:w-1/2 h-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={images.slide8} alt="Strategic partnership meeting" className="w-full h-full object-cover" />
                  </div>
              </motion.div>
          </div>
        )
    },
    {
      id: 9,
      content: ({ images }: { images: Record<string, string> }) => (
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-16 w-full max-w-7xl">
            <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 style={{ color: GOLD_ACCENT }} className="text-sm font-bold tracking-widest uppercase">Proven Track Record</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-text-primary mt-2 tracking-wide">Client Success: FTSE 100 Technology Transformation</h3>
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 text-[var(--accent)]"><ChallengeIcon /></div>
                  <div>
                    <h4 className="font-semibold text-accent text-lg tracking-wide">The Challenge</h4>
                    <p className="text-text-secondary mt-1 tracking-wider">{caseStudy.challenge}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 text-[var(--accent)]"><SolutionIcon /></div>
                  <div>
                    <h4 className="font-semibold text-accent text-lg tracking-wide">Our Solution</h4>
                    <p className="text-text-secondary mt-1 tracking-wider">{caseStudy.solution}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 text-[var(--accent)]"><OutcomeIcon /></div>
                  <div>
                    <h4 className="font-semibold text-accent text-lg tracking-wide">The Outcome</h4>
                    <p className="text-text-secondary mt-1 tracking-wider">{caseStudy.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
             <motion.div className="hidden lg:block lg:w-5/12 h-[70%]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <img src={images.slide9} alt="Technology team achieving success" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        )
    },
    {
      id: 10,
      content: ({ images }: { images: Record<string, string> }) => (
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center animate-ken-burns-out" style={{ backgroundImage: `url('${images.slide10}')` }}></div>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
              <div className="flex flex-col items-center gap-6 bg-black/20 backdrop-blur-md p-12 rounded-lg border border-border shadow-2xl max-w-4xl">
                <Logo className="text-3xl" />
                <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-wide text-text-primary">Let’s Architect Your Future Leadership</h2>
                <p className="mt-4 text-lg text-text-secondary tracking-wider max-w-2xl">Partner with RexJagers to build the visionary leadership your organization needs to thrive in the future.</p>
                <div className="mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-lg">
                  <a href="mailto:contact@rexjagers.com" className="flex items-center gap-3 text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors duration-300">
                    <EnvelopeIcon />
                    <span className="tracking-wider">contact@rexjagers.com</span>
                  </a>
                  <span className="hidden md:block text-text-primary/20">|</span>
                  <a href="https://www.rexjagers.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors duration-300">
                    <GlobeIcon />
                    <span className="tracking-wider">www.rexjagers.com</span>
                  </a>
                </div>
                <blockquote className="text-xl italic text-text-secondary font-light mt-12 tracking-wide border-t border-border pt-6">
                  “Leadership is not appointed — it’s architected.”
                </blockquote>
              </div>
            </div>
          </div>
        )
    },
  ], [navigate]);


  const totalSlides = slideData.length;

  // Fix: Replaced 'aistudio.useMemo' with 'React.useMemo'
  const currentSlide = React.useMemo(() => {
    const id = parseInt(slideId || '1', 10);
    if (isNaN(id) || id < 1 || id > totalSlides) {
      return 0;
    }
    return id - 1;
  }, [slideId, totalSlides]);

  // Fix: Replaced 'aistudio.useEffect' with 'React.useEffect'
  React.useEffect(() => {
    const idAsNumber = parseInt(slideId || '1', 10);
    if (isNaN(idAsNumber) || idAsNumber < 1 || idAsNumber > totalSlides) {
      navigate('/slide/1', { replace: true });
    }
  }, [slideId, totalSlides, navigate]);

  // Fix: Replaced 'aistudio.useCallback' with 'React.useCallback'
  const goTo = React.useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      navigate(`/slide/${index + 1}`);
    }
  }, [totalSlides, navigate]);

  // Fix: Replaced 'aistudio.useCallback' with 'React.useCallback'
  const goToNext = React.useCallback(() => {
    goTo(Math.min(currentSlide + 1, totalSlides - 1));
  }, [currentSlide, totalSlides, goTo]);

  // Fix: Replaced 'aistudio.useCallback' with 'React.useCallback'
  const goToPrev = React.useCallback(() => {
    goTo(Math.max(currentSlide - 1, 0));
  }, [currentSlide, goTo]);

  // Fix: Replaced 'aistudio.useEffect' with 'React.useEffect'
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'ArrowDown') {
        goToNext();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Fix: Replaced 'aistudio.useEffect' with 'React.useEffect'
  React.useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isWheeling) return;
      if (Math.abs(event.deltaY) < 10) return;
      if (event.deltaY > 0) goToNext();
      else if (event.deltaY < 0) goToPrev();
      setIsWheeling(true);
      setTimeout(() => setIsWheeling(false), 1000);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goToNext, goToPrev, isWheeling]);
  
  const currentSlideData = slideData[currentSlide];
  if (!currentSlideData) return null;
  
  const arrowButtonClasses = "absolute top-1/2 -translate-y-1/2 z-50 w-11 h-11 flex items-center justify-center text-[var(--accent)] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(var(--accent-rgb),0.3)] hover:drop-shadow-[0_4px_8px_rgba(var(--accent-rgb),0.4)]";

  return (
    <main className="h-screen w-screen font-sans antialiased text-text-primary overflow-hidden">
      <AnimatedBackground />
      <Navigation current={currentSlide} total={totalSlides} goTo={goTo} />
      
      {currentSlide > 0 && (
        <button onClick={goToPrev} className={`${arrowButtonClasses} left-6`} aria-label="Previous slide">
          <LeftNavArrowIcon />
        </button>
      )}
      {currentSlide < totalSlides - 1 && (
        <button onClick={goToNext} className={`${arrowButtonClasses} right-6`} aria-label="Next slide">
          <RightNavArrowIcon />
        </button>
      )}

      <AnimatePresence mode="wait">
        <SlideWrapper key={currentSlide} isContentSlide={currentSlide > 0 && currentSlide < totalSlides - 1}>
            {typeof currentSlideData.content === 'function' ? 
              currentSlideData.content({ images: presentationImages }) : 
              currentSlideData.content
            }
        </SlideWrapper>
      </AnimatePresence>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/slide/1" replace />} />
      <Route path="/slide/:slideId" element={<Presentation />} />
    </Routes>
  );
};

export default App;