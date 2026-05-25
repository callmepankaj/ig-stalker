export type Advertisement = {
  id: string;
  company_name: string;
  description: string;
  company_link: string;
  logo_url: string;
  active: boolean;
  starts_at: string;
  expires_at: string;
  created_at: string;
};

export type AdvertisementInput = {
  companyName: string;
  description: string;
  companyLink: string;
  logoUrl: string;
};

export const fallbackAdvertisements: Advertisement[] = [
  {
    id: 'fallback-replymer',
    company_name: 'Replymer',
    description: 'Human replies that sell your product',
    company_link: 'https://replymer.com',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-zernio',
    company_name: 'Zernio',
    description: 'Social APIs for devs and agents',
    company_link: 'https://zernio.com',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-hugo',
    company_name: 'Hugo AI',
    description: 'Automates support before users wait',
    company_link: 'https://hugo.ai',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-startupsubmit',
    company_name: 'StartupSubmit',
    description: 'Rank on Google and AI search fast',
    company_link: 'https://startupsubmit.co',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-postopus',
    company_name: 'Postopus',
    description: 'Post everywhere from one calm inbox',
    company_link: 'https://postopus.com',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-mediaboost',
    company_name: 'Mediaboost',
    description: 'Boost SEO, GEO, and social proof',
    company_link: 'https://mediaboost.com',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-chargeback',
    company_name: 'Chargeback.io',
    description: 'Prevent chargebacks on autopilot',
    company_link: 'https://chargeback.io',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-proventools',
    company_name: 'ProvenTools',
    description: 'Validated SaaS ideas and tool signals',
    company_link: 'https://proventools.com',
    logo_url: '',
    active: true,
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
];

export function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
