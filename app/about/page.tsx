export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          Welcome to IG Stalker, the premier tool for viewing Instagram content anonymously.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          We believe that public information should be easily accessible. Our mission is to provide a seamless, secure, and user-friendly way to view public Instagram profiles without the need for an account or login credentials.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
        <p className="mb-6">
          IG Stalker allows you to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>View public Instagram profiles anonymously.</li>
          <li>Browse posts, reels, and videos in high quality.</li>
          <li>Download content for offline viewing.</li>
          <li>Access content without leaving a trace.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Privacy First</h2>
        <p className="mb-6">
          We prioritize your privacy. We do not track your searches, store your personal data, or require any registration. Your anonymity is guaranteed when using our service.
        </p>
      </div>
    </main>
  );
}
