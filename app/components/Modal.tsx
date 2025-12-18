'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import posthog from 'posthog-js';
import { InstagramPost } from '../types';

interface ModalProps {
  post: InstagramPost;
  onClose: () => void;
}

export default function Modal({ post, onClose }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaItems = post.children && post.children.length > 0 
    ? post.children 
    : [{ id: post.id, imageUrl: post.imageUrl, isVideo: post.isVideo, videoUrl: post.videoUrl }];

  const currentMedia = mediaItems[currentIndex];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleDownload = async () => {
    const mediaType = currentMedia.isVideo ? 'video' : 'image';
    try {
      const url = currentMedia.isVideo && currentMedia.videoUrl ? currentMedia.videoUrl : currentMedia.imageUrl;
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `instagram-${post.id}-${currentIndex}.${currentMedia.isVideo ? 'mp4' : 'jpg'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      // Track successful download
      posthog.capture('media_downloaded', {
        post_id: post.id,
        media_type: mediaType,
        carousel_index: currentIndex,
        is_carousel: mediaItems.length > 1,
        file_size_bytes: blob.size,
      });
    } catch (error) {
      console.error('Download failed:', error);

      // Track download failure
      posthog.capture('download_failed', {
        post_id: post.id,
        media_type: mediaType,
        carousel_index: currentIndex,
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });

      alert('Failed to download media');
    }
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % mediaItems.length;
    posthog.capture('carousel_navigated', {
      post_id: post.id,
      direction: 'next',
      from_index: currentIndex,
      to_index: newIndex,
      total_items: mediaItems.length,
    });
    setCurrentIndex(newIndex);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    posthog.capture('carousel_navigated', {
      post_id: post.id,
      direction: 'previous',
      from_index: currentIndex,
      to_index: newIndex,
      total_items: mediaItems.length,
    });
    setCurrentIndex(newIndex);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden max-w-6xl w-full max-h-[95vh] flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Section */}
        <div className="relative w-full md:w-2/3 bg-black flex items-center justify-center min-h-[50vh]">
          {currentMedia.isVideo && currentMedia.videoUrl ? (
            <video 
              key={currentMedia.id}
              src={`/api/proxy?url=${encodeURIComponent(currentMedia.videoUrl)}`} 
              controls 
              autoPlay 
              className="max-h-[80vh] max-w-full"
            />
          ) : (
            <div className="relative w-full h-full min-h-[50vh]">
               <Image
                src={`/api/proxy?url=${encodeURIComponent(currentMedia.imageUrl)}`}
                alt={post.caption}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}

          {/* Carousel Controls */}
          {mediaItems.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {mediaItems.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 p-6 flex flex-col border-l border-zinc-200 dark:border-zinc-800">
          <div className="flex-1 overflow-y-auto">
            <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {post.caption}
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                ❤️ {post.likes.toLocaleString()} likes
              </span>
              <span className="flex items-center gap-2">
                💬 {post.comments.toLocaleString()} comments
              </span>
            </div>
            
            <button 
              onClick={handleDownload}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download {mediaItems.length > 1 ? `(${currentIndex + 1}/${mediaItems.length})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
