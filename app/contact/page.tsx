export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Have questions, suggestions, or need support? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-zinc-600 dark:text-zinc-400">omniquanta@proton.me</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
