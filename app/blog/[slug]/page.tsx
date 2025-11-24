import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '../../data/blogs';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
      <Link 
        href="/blog"
        className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Blog
      </Link>

      <article>
        <header className="mb-12 text-center">
          <div className="inline-block bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-zinc-500 dark:text-zinc-400">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <div 
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-a:text-black dark:prose-a:text-white hover:prose-a:text-zinc-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <Link 
                key={related.id} 
                href={`/blog/${related.slug}`}
                className="group block"
              >
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                  <Image
                    src={related.coverImage}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <h4 className="font-bold text-lg group-hover:text-black dark:group-hover:text-white transition-colors">
                  {related.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
