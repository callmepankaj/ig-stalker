export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About IG Stalker</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          Welcome to IG Stalker, the premier anonymous Instagram viewer that empowers users to explore public Instagram content without creating an account or compromising their privacy.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          In an era where social media platforms require extensive personal information and track user behavior, we believe that public information should remain accessible to everyone. Our mission is to provide a seamless, secure, and user-friendly platform that allows individuals to view public Instagram profiles, posts, stories, and reels without the need for account registration or login credentials.
        </p>
        <p className="mb-6">
          We understand that many users want to explore Instagram content for various legitimate reasons—from research and journalism to competitive analysis and content inspiration—without the privacy concerns that come with traditional social media engagement.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
        <p className="mb-6">
          IG Stalker provides a comprehensive suite of features designed to enhance your Instagram browsing experience:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li><strong>Anonymous Profile Viewing:</strong> Browse any public Instagram profile without logging in or creating an account. Your identity remains completely hidden from the profile owner.</li>
          <li><strong>High-Quality Media Access:</strong> View photos, videos, and reels in their original high resolution, exactly as they appear on Instagram.</li>
          <li><strong>Complete Post History:</strong> Access the full timeline of posts from any public profile, including carousel posts with multiple images.</li>
          <li><strong>Story Highlights:</strong> Browse story highlights that users have saved to their profiles.</li>
          <li><strong>Download Capabilities:</strong> Save photos and videos directly to your device for offline viewing or archival purposes.</li>
          <li><strong>No Tracking:</strong> We don't track your searches, store your browsing history, or collect personal information.</li>
          <li><strong>Fast and Reliable:</strong> Our optimized infrastructure ensures quick loading times and reliable access to Instagram content.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Privacy and Security</h2>
        <p className="mb-6">
          Privacy is at the core of everything we do. Unlike traditional social media platforms that track your every move, IG Stalker operates with a strict privacy-first approach:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>No account registration required</li>
          <li>No personal data collection</li>
          <li>No search history storage</li>
          <li>No cookies or tracking pixels for user profiling</li>
          <li>Secure SSL encryption for all connections</li>
          <li>Anonymous browsing with no digital footprint</li>
        </ul>
        <p className="mb-6">
          When you use IG Stalker, Instagram has no way of knowing who viewed a profile or post. Your browsing activity is completely anonymous and untraceable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Who Uses IG Stalker?</h2>
        <p className="mb-6">
          Our platform serves a diverse range of users with legitimate needs:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Content Creators and Marketers:</strong> Analyze competitor strategies, track engagement trends, and find inspiration without affecting your own analytics.</li>
          <li><strong>Researchers and Journalists:</strong> Gather public information for articles, studies, or investigations while maintaining professional distance.</li>
          <li><strong>Parents and Guardians:</strong> Monitor children's online activity and ensure their safety without needing to follow them directly.</li>
          <li><strong>Privacy-Conscious Users:</strong> Browse Instagram content without sharing personal data with algorithms or leaving a digital footprint.</li>
          <li><strong>Business Analysts:</strong> Study market trends, competitor content, and audience engagement patterns.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Legal and Ethical Use</h2>
        <p className="mb-6">
          IG Stalker operates entirely within legal boundaries by only accessing and displaying content that users have made publicly available on Instagram. We respect user privacy and Instagram's terms of service:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>We only display content from public profiles</li>
          <li>We do not attempt to access private accounts or bypass security measures</li>
          <li>We do not store or redistribute content without proper attribution</li>
          <li>We comply with copyright laws and respect intellectual property rights</li>
        </ul>
        <p className="mb-6">
          Users are responsible for ensuring their use of IG Stalker complies with applicable laws and Instagram's Terms of Service. We encourage ethical use of our platform and respect for content creators' rights.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Technology and Infrastructure</h2>
        <p className="mb-6">
          Built with modern web technologies, IG Stalker delivers a fast, responsive experience across all devices. Our platform uses secure server-side processing to fetch Instagram content, ensuring your IP address and identity remain protected. We continuously update our infrastructure to maintain compatibility with Instagram's platform changes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact and Support</h2>
        <p className="mb-6">
          If you have questions, concerns, or feedback about IG Stalker, please visit our contact page. We're committed to providing a transparent, user-friendly experience and welcome input from our community.
        </p>
        <p className="mb-6 text-zinc-500 dark:text-zinc-400 text-sm">
          Last updated: January 2025
        </p>
      </div>
    </main>
  );
}
