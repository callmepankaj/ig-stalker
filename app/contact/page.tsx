export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          We value your feedback, questions, and suggestions. Whether you need technical support, have feature requests, want to report an issue, or simply want to share your thoughts about IG Stalker, we're here to help.
        </p>
        
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 mb-8 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Email Support</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                For general inquiries, technical support, or business matters, please contact us at:
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                omniquanta@proton.me
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Response Time</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                We aim to respond to all inquiries within 24-48 hours during business days. For urgent technical issues, please include "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">What We Can Help With</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li><strong>Technical Support:</strong> Issues with viewing profiles, downloading content, or using features</li>
          <li><strong>Feature Requests:</strong> Suggestions for new functionality or improvements</li>
          <li><strong>Bug Reports:</strong> Reporting errors, broken features, or unexpected behavior</li>
          <li><strong>Privacy Concerns:</strong> Questions about how we handle your data and maintain anonymity</li>
          <li><strong>Legal Inquiries:</strong> Questions about terms of service, copyright, or compliance</li>
          <li><strong>Partnership Opportunities:</strong> Business inquiries and collaboration proposals</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Before Contacting Us</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          To help us assist you more effectively, please consider the following:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>Check our <a href="/blog" className="text-blue-500 hover:underline">blog</a> and <a href="/about" className="text-blue-500 hover:underline">FAQ section</a> for common questions</li>
          <li>Review our <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a> and <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a></li>
          <li>For technical issues, include details about your browser, device, and the steps to reproduce the problem</li>
          <li>Be specific about your request or concern to help us provide a more accurate response</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Community & Updates</h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Stay informed about new features, updates, and important announcements by visiting our blog regularly. We're committed to transparency and keeping our users informed about any changes to our service.
        </p>

        <div className="bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 rounded-xl p-6 mt-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong>Note:</strong> We respect your privacy. All communications are handled with confidentiality, and we do not share your contact information with third parties. For more information, please review our <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
