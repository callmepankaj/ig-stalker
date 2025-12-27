export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <p className="mb-6">
          At IG Stalker, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by IG Stalker and how we use it.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Log Files</h2>
        <p className="mb-6">
          IG Stalker follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Web Beacons</h2>
        <p className="mb-6">
          Like any other website, IG Stalker uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
        <p className="mb-6">
          <strong>Google DoubleClick DART Cookie:</strong> Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Third Party Privacy Policies</h2>
        <p className="mb-6">
          IG Stalker's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Consent</h2>
        <p className="mb-6">
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </main>
  );
}
