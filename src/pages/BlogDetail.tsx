import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById } from '@/lib/blogFirebase';
import { BlogPost } from '@/data/blog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle } from 'lucide-react'; // Import PlayCircle icon

// Helper function to extract YouTube video ID from various URLs
const getYouTubeVideoId = (url: string) => {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([^\s&\?]*)/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // High quality default thumbnail
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Blog post ID is missing.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const post = await getBlogPostById(id);
        if (post) {
          setBlogPost(post);
        } else {
          setError("Blog post not found.");
        }
      } catch (err: any) {
        console.error("Error fetching blog post:", err);
        setError(`Failed to load blog post: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-width section-padding flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-destructive text-lg mb-4">Error: {error}</p>
        <Button asChild>
          <Link to="/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
        </Button>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="container-width section-padding flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-lg mb-4">Blog post not found.</p>
        <Button asChild>
          <Link to="/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-width section-padding py-16 lg:py-24">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="outline" asChild>
          <Link to="/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
        </Button>

        <img src={blogPost.mainImage} alt={blogPost.title} className="w-full h-80 object-cover rounded-lg shadow-lg mb-6" />
        
        <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight">
          {blogPost.title}
        </h1>
        <p className="text-muted-foreground text-sm">Published on {blogPost.publishDate} by {blogPost.author}</p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {blogPost.sections.map((section, index) => (
            <React.Fragment key={index}>
              {section.type === 'paragraph' && <p>{section.content}</p>}
              {section.type === 'heading' && <h2 className="font-bold text-2xl mt-6 mb-4">{section.content}</h2>}
              {section.type === 'points' && (
                <ul className="list-disc list-inside space-y-1 my-4">
                  {section.content.split('\n').map((point, pointIndex) => (
                    point.trim() !== '' && <li key={pointIndex}>{point.trim()}</li>
                  ))}
                </ul>
              )}
              {section.type === 'image' && (
                <img src={section.content} alt={`Content Image ${index}`} className="my-6 rounded-lg shadow-md" />
              )}
              {section.type === 'video' && getYouTubeVideoId(section.content) && (
                <div className="video-responsive my-6 relative cursor-pointer rounded-lg overflow-hidden shadow-md group">
                  <a href={`https://www.youtube.com/watch?v=${getYouTubeVideoId(section.content)}`} target="_blank" rel="noopener noreferrer" className="block">
                    <img
                      src={getYouTubeThumbnail(getYouTubeVideoId(section.content)!)}
                      alt="YouTube Video Thumbnail"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/60 transition-colors">
                      <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
