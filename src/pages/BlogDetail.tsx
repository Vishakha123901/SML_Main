import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById } from '@/lib/blogFirebase';
import { BlogPost } from '@/data/blog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Calendar, User, Share2, Bookmark, Eye, Clock, Sparkles, MessageSquare } from 'lucide-react';

// Simple Card Component
const SimpleCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Simple Divider Component
const SimpleDivider = () => {
  return (
    <div className="h-px bg-border w-full my-8" />
  );
};

// YouTube Video Component
const EnhancedVideoPlayer = ({ url }: { url: string }) => {
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([^\s&\?]*)/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  return (
    <div className="my-6">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    </div>
  );
};

// Enhanced Blog Detail Component
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
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-width section-padding flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-destructive text-lg mb-4">Error: {error}</p>
          <Button asChild>
            <Link to="/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="container-width section-padding flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-lg mb-4">Blog post not found.</p>
          <Button asChild>
            <Link to="/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 space-y-2 sm:space-y-3">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur-sm border-border shadow-lg"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur-sm border-border shadow-lg"
        >
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary shadow-lg"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>
      <SimpleDivider />

      <div className="container-width px-4 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
          {/* Back Button */}
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/blogs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="w-full -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
            <img 
              src={blogPost.mainImage} 
              alt={blogPost.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {blogPost.category}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{blogPost.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>2.4K views</span>
                </div>
              </div>
            </div>

            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              {blogPost.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {blogPost.shortDescription}
            </p>
          </div>

          {/* Article Content */}
          <div className="space-y-6 sm:space-y-8">
            {blogPost.sections.map((section, index) => (
              <div key={index}>
                <div className="p-4 sm:p-6 border rounded-lg bg-background">
                  {section.type === 'paragraph' && (
                    <p className="text-base sm:text-lg leading-relaxed text-foreground/90">{section.content}</p>
                  )}
                  
                  {section.type === 'heading' && (
                    <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-3 sm:mb-4">
                      {section.content}
                    </h2>
                  )}
                  
                  {section.type === 'points' && (
                    <ul className="space-y-2 sm:space-y-3 my-3 sm:my-4">
                      {section.content.split('\n').map((point, pointIndex) => (
                        point.trim() !== '' && (
                          <li key={pointIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-foreground/90 leading-relaxed text-sm sm:text-base">{point.trim()}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                  
                  {section.type === 'image' && (
                    <div className="my-4 sm:my-6 -mx-4 sm:mx-0 rounded-lg sm:rounded-xl overflow-hidden shadow-lg group">
                      <img 
                        src={section.content} 
                        alt={`Content Image ${index}`} 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  {section.type === 'video' && (
                    <EnhancedVideoPlayer url={section.content} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="p-4 sm:p-6 border rounded-lg text-center bg-background my-6 sm:my-8">
            <h3 className="font-heading font-bold text-xl sm:text-2xl mb-3 sm:mb-4">Enjoyed this article?</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Share it with others who might find it helpful, or explore more articles on similar topics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button>
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
              <Button variant="outline" asChild>
                <Link to="/blogs">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}