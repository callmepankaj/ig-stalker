'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Copy,
  Megaphone,
  MousePointer2,
  Rocket,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { PartnerItem, fallbackPartners } from '../lib/partners';

function Logo({ ad }: { ad: PartnerItem }) {
  if (ad.logo_url) {
    return (
      <img
        src={ad.logo_url}
        alt={`${ad.company_name} logo`}
        className="h-8 w-8 rounded-full object-cover"
        loading="lazy"
      />
    );
  }

  return <Rocket className="h-5 w-5 text-zinc-950" aria-hidden="true" />;
}

function FeatureCard({ ad, index }: { ad: PartnerItem; index: number }) {
  const backText = `Visit ${ad.company_name} before this monthly partner spot ends.`;

  return (
    <motion.a
      href={ad.company_link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit partner ${ad.company_name}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24) }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative block h-[148px] w-[252px] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      style={{ perspective: '1100px' }}
    >
      <span className="feature-hover-border pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -inset-3 rounded-[22px] bg-white/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className="feature-flip-card relative h-full w-full"
        style={{ animationDelay: `${index * 0.38}s` }}
      >
        <div className="feature-card-face feature-reference-face">
          <div className="feature-noise" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-5 text-center">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-sky-400/90 shadow-lg shadow-sky-950/40">
              <Logo ad={ad} />
            </span>
            <h3 className="text-base font-extrabold leading-tight text-white">{ad.company_name}</h3>
            <p className="mt-2 line-clamp-2 min-h-10 max-w-[224px] text-[13px] leading-5 text-zinc-300">{ad.description}</p>
          </div>
        </div>

        <div className="feature-card-face feature-card-back feature-reference-face">
          <div className="feature-noise" />
          <div className="feature-animated-glow" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-5 text-center">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-sky-400/90 shadow-lg shadow-sky-950/40">
              <Logo ad={ad} />
            </span>
            <h3 className="text-base font-extrabold leading-tight text-white">{ad.company_name}</h3>
            <p className="mt-2 line-clamp-2 min-h-10 max-w-[224px] text-[13px] leading-5 text-zinc-300">{backText}</p>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function FeatureSidebar({ side, items }: { side: 'left' | 'right'; items: PartnerItem[] }) {
  return (
    <aside
      aria-label={`${side} featured partners`}
      className={`pointer-events-none fixed top-3 z-[60] hidden h-[calc(100vh-1.5rem)] w-[252px] 2xl:block ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <motion.div
        className="pointer-events-none flex h-full flex-col gap-4"
        initial={{ opacity: 0, x: side === 'left' ? -16 : 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {items.map((ad, index) => (
          <div className="feature-float pointer-events-auto" style={{ animationDelay: `${index * 0.6}s` }} key={ad.id}>
            <FeatureCard ad={ad} index={side === 'left' ? index : index + 5} />
          </div>
        ))}
      </motion.div>
    </aside>
  );
}

function MobileFeatureCarousel({ items }: { items: PartnerItem[] }) {
  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-3 2xl:hidden" aria-label="Featured partners">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/65 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="feature-mobile-track flex w-max gap-3 p-2">
          {[...items, ...items].map((ad, index) => (
            <a
              href={ad.company_link}
              target="_blank"
              rel="noreferrer"
              key={`${ad.id}-${index}`}
              className="flex w-[248px] shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-[#132937] px-3 py-2.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-sky-400/90">
                <Logo ad={ad} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-white">{ad.company_name}</span>
                <span className="block truncate text-xs text-zinc-300">{ad.description}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function StickyPartnerCTA({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      id="partner-with-us"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group fixed bottom-6 right-3 z-[65] hidden h-[118px] w-[252px] cursor-pointer rounded-xl border border-dashed border-white/12 bg-black/35 p-4 text-center shadow-2xl shadow-black/40 outline-none backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.045] focus-visible:ring-2 focus-visible:ring-white/70 sm:block 2xl:bottom-5"
      aria-haspopup="dialog"
      aria-label="Partner with IG Stalker"
    >
      <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-white/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
      <span className="relative mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Megaphone className="h-4 w-4 text-zinc-400" aria-hidden="true" />
      </span>
      <span className="relative block text-sm font-semibold text-white/78">Partner with us</span>
      <span className="relative mt-1 block text-xs text-zinc-500">18 partner spots</span>
    </motion.button>
  );
}

function PartnerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'ashesnegi22@gmail.com';

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
            aria-describedby="partner-modal-subtitle"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#232323] p-6 text-white shadow-2xl shadow-black/50 sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close partner modal"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_70%_0%,rgba(250,204,21,0.10),transparent_30%),radial-gradient(circle_at_0%_20%,rgba(59,130,246,0.08),transparent_28%)]" />

            <div className="relative">
              <h2 id="partner-modal-title" className="pr-10 text-2xl font-bold tracking-tight sm:text-3xl">
                Partner with IG Stalker
              </h2>
              <p id="partner-modal-subtitle" className="mt-4 text-base leading-7 text-zinc-300">
                Reach 30K+ users every month
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.045] p-5 text-center">
                  <Users className="mx-auto mb-3 h-6 w-6 text-zinc-300" aria-hidden="true" />
                  <div className="text-xl font-bold">30K+</div>
                  <div className="mt-1 text-sm text-zinc-400">Monthly visitors</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.045] p-5 text-center">
                  <MousePointer2 className="mx-auto mb-3 h-6 w-6 text-zinc-300" aria-hidden="true" />
                  <div className="text-xl font-bold">High-traffic</div>
                  <div className="mt-1 text-sm text-zinc-400">Buyers, not browsers</div>
                </div>
                <div className="rounded-xl border border-amber-400/35 bg-amber-400/10 p-5 text-center">
                  <Zap className="mx-auto mb-3 h-6 w-6 text-amber-300" aria-hidden="true" />
                  <div className="text-xl font-bold text-amber-300">6/18</div>
                  <div className="mt-1 text-sm text-zinc-300">Spots left</div>
                </div>
              </div>

              <section className="mt-8 rounded-xl border border-white/8 bg-black/45 p-5">
                <h3 className="text-lg font-bold">Pricing</h3>
                <p className="mt-4 text-base text-zinc-300">
                  <span className="font-bold text-white">Monthly rate:</span> $2,000/month
                </p>
                <p className="mt-3 text-base text-zinc-300">
                  <span className="font-bold text-white">6 spots</span> available now. Cancel anytime.
                </p>
              </section>

              <section className="mt-7">
                <h3 className="text-lg font-bold">Procedure</h3>
                <p className="mt-4 text-base leading-8 text-zinc-300">
                  Copy the email below and send your Company Name, Logo, Description, and Link.
                  We will review the placement and share the payment details.
                </p>
              </section>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 text-center font-semibold text-black transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {copied ? 'Email copied' : `Copy email (${contactEmail})`}
                {copied ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Copy className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PartnerSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [partners, setPartners] = useState<PartnerItem[]>(fallbackPartners);
  const visiblePartners = partners.length > 0 ? partners : fallbackPartners;
  const leftPartners = useMemo(() => visiblePartners.slice(0, 5), [visiblePartners]);
  const rightPartners = useMemo(() => visiblePartners.slice(5, 8), [visiblePartners]);

  useEffect(() => {
    let mounted = true;

    async function loadPartners() {
      try {
        const response = await fetch('/api/partners', { cache: 'no-store' });
        if (!response.ok) return;

        const payload = await response.json();
        if (mounted && Array.isArray(payload.items)) {
          setPartners(payload.items);
        }
      } catch {
        // Keep fallback partners available if the CMS cannot be reached.
      }
    }

    loadPartners();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="partner-system-root">
      <FeatureSidebar side="left" items={leftPartners} />
      <FeatureSidebar side="right" items={rightPartners} />
      <MobileFeatureCarousel items={visiblePartners.slice(0, 6)} />
      <StickyPartnerCTA onClick={() => setModalOpen(true)} />
      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
