'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Loader2, Plus, ShieldCheck } from 'lucide-react';

type FormState = {
  companyName: string;
  description: string;
  companyLink: string;
  logoUrl: string;
};

const initialForm: FormState = {
  companyName: '',
  description: '',
  companyLink: '',
  logoUrl: '',
};

export default function AdsAdminPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    setError('');

    try {
      const response = await fetch('/api/advertisements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: form.companyName,
          description: form.description,
          companyLink: form.companyLink,
          logoUrl: form.logoUrl,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to create advertisement');
      }

      setStatus('Advertisement added. It will display for 1 month from today.');
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
          Back to site
        </Link>

        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <ShieldCheck className="h-6 w-6 text-sky-300" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Advertisement CMS</h1>
              <p className="mt-2 text-zinc-400">
                Add a sponsor logo, company name, description, and link. Each ad expires automatically after 1 month.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Company name</span>
              <input
                type="text"
                value={form.companyName}
                onChange={(event) => updateField('companyName', event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
                placeholder="Replymer"
                maxLength={60}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Description</span>
              <textarea
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                className="min-h-24 w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
                placeholder="Human replies that sell your product"
                maxLength={120}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Company link</span>
              <input
                type="url"
                value={form.companyLink}
                onChange={(event) => updateField('companyLink', event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
                placeholder="https://replymer.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Logo URL</span>
              <input
                type="url"
                value={form.logoUrl}
                onChange={(event) => updateField('logoUrl', event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
                placeholder="https://example.com/logo.png"
                required
              />
            </label>

            {status && (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                {status}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
              Add 1-month advertisement
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
