import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '../data/blogs';

export default function BlogListingPage() {
  return (
    <main className="container mx-auto px-4 pt-32 pb-20 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Instagram Tips & Guides
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Master Instagram with our expert guides, privacy tips, and growth strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center text-black dark:text-white font-medium text-sm">
                Read Article 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
