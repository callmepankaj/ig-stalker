'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { InstagramData, InstagramPost } from './types';
import Modal from './components/Modal';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<InstagramData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [selectedProfilePic, setSelectedProfilePic] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`/api/instagram?username=${username}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to fetch profile');
      }

      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = useCallback(async () => {
    if (!data?.page_info.has_next_page || !data.page_info.end_cursor || !data.user.id || loadingMore) return;

    setLoadingMore(true);
    try {
      const res = await fetch(`/api/instagram?cursor=${data.page_info.end_cursor}&userId=${data.user.id}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.details || 'Failed to load more posts');
      }

      setData(prev => prev ? ({
        ...prev,
        posts: [...prev.posts, ...result.posts],
        page_info: result.page_info
      }) : null);
    } catch (err: any) {
      console.error(err);
      // Optional: Show a toast or small error indicator instead of alert for auto-scroll
    } finally {
      setLoadingMore(false);
    }
  }, [data, loadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && data?.page_info.has_next_page) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMorePosts, data?.page_info.has_next_page]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Anonymous Instagram Viewer
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            View Instagram profiles, posts, and stories anonymously without logging in.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16 relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-700 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <input
              type="text"
              placeholder="Enter Instagram Username (e.g. instagram)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="relative w-full pl-6 pr-14 py-4 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white shadow-xl text-lg placeholder:text-zinc-400 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50"
              aria-label="Search"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-zinc-300 border-t-black dark:border-zinc-600 dark:border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {data && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div 
                className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 cursor-pointer group"
                onClick={() => setSelectedProfilePic(data.user.profilePicUrl)}
              >
                <Image
                  src={`/api/proxy?url=${encodeURIComponent(data.user.profilePicUrl)}`}
                  alt={data.user.username}
                  fill
                  className="rounded-full object-cover border-4 border-zinc-100 dark:border-zinc-800 group-hover:opacity-90 transition-opacity"
                  unoptimized 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold">{data.user.username}</h2>
                  {data.user.fullName && (
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                      {data.user.fullName}
                    </span>
                  )}
                </div>

                <div className="flex justify-center md:justify-start gap-8 mb-6">
                  <div className="text-center md:text-left">
                    <div className="font-bold text-xl">{data.user.posts}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Posts</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="font-bold text-xl">{data.user.followers}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Followers</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="font-bold text-xl">{data.user.following}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Following</div>
                  </div>
                </div>

                <div className="max-w-lg">
                  {data.user.biography && (
                    <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                      {data.user.biography}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Highlights */}
            {data.highlights.length > 0 && (
              <div className="flex gap-6 overflow-x-auto pb-6 mb-8 scrollbar-hide">
                {data.highlights.map((highlight) => (
                  <div key={highlight.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                    <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                      <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden relative">
                        <Image
                          src={`/api/proxy?url=${encodeURIComponent(highlight.coverUrl)}`}
                          alt={highlight.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium truncate max-w-[80px] text-center">
                      {highlight.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {data.posts.length > 0 ? (
                data.posts.map((post) => (
                  <div 
                    key={post.id} 
                    className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-lg relative overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <Image
                      src={`/api/proxy?url=${encodeURIComponent(post.imageUrl)}`}
                      alt={post.caption || 'Instagram post'}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                    {post.isVideo && (
                       <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                       </div>
                    )}
                    {post.children && post.children.length > 0 && (
                       <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                       </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-zinc-500 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                  <p>No posts found or private profile.</p>
                </div>
              )}
            </div>

            {/* Infinite Scroll Trigger */}
            {data.page_info?.has_next_page && (
              <div ref={observerTarget} className="h-20 flex items-center justify-center">
                {loadingMore && (
                  <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 rounded-full animate-spin"></div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedPost && (
          <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}

        {selectedProfilePic && (
          <Modal 
            post={{
              id: 'profile-pic',
              imageUrl: selectedProfilePic,
              caption: `${data?.user.username}'s Profile Picture`,
              likes: 0,
              comments: 0,
              isVideo: false,
            }} 
            onClose={() => setSelectedProfilePic(null)} 
          />
        )}

        {/* Landing Page Content - Only show when no data is loaded */}
        {!data && !loading && (
          <div className="mt-24 space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Features Section */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-12">Why Use IG Stalker?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">100% Anonymous</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    View profiles and stories without anyone knowing. Your identity is completely hidden.
                  </p>
                </div>
                <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">No Login Required</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    You don't need an Instagram account to view public profiles. Just enter the username.
                  </p>
                </div>
                <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Free Downloads</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Download photos, videos, and reels in high quality directly to your device.
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-zinc-100 dark:bg-zinc-900/50 -mx-4 px-4 py-20 rounded-3xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm flex-shrink-0">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Enter Username</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">Type the Instagram username of the public profile you want to view in the search bar above.</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm flex-shrink-0">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Browse Content</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">Instantly see their profile picture, bio, posts, reels, and highlights in a clean grid layout.</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm flex-shrink-0">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">View & Download</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">Click on any post to view it in full size. Use the download button to save media to your device.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-2">Is it really anonymous?</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Yes, absolutely. We don't require you to log in, so Instagram has no way of knowing who is viewing the profile.</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-2">Can I view private profiles?</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">No. Due to Instagram's privacy policies, we can only display content from public profiles.</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-2">Does it cost anything?</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">No, IG Stalker is completely free to use for everyone.</p>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-2">Can I download stories?</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Currently, we support viewing highlight covers. Full story viewing and downloading is coming in a future update.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
