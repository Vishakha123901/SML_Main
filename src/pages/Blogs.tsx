import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/data/blog';
import { getBlogPosts } from '@/lib/blogFirebase';

const blogCategories = [
  "All",
  "Nutrition",
  "Protein",
  "Digestive Health",
  "White Label Insights"
];

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsubscribe = getBlogPosts(
      (fetchedPosts) => {
        setBlogPosts(fetchedPosts);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredBlogPosts = blogPosts.filter(post => {
    return selectedCategory === 'All' || post.category === selectedCategory;
  });

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]"><p>Loading blog posts...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]"><p className="text-destructive">Error: {error}</p></div>;
  }

  // Using the first fetched blog post as the featured post, or null if none exist
  const featuredPost = filteredBlogPosts.length > 0 ? filteredBlogPosts[0] : null;
  const latestArticles = filteredBlogPosts.slice(1); // All other posts are latest articles

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-pattern bg-muted/30 py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
              Health & Wellness Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay informed with the latest insights on nutrition, health products, and wellness trends. 
              Expert advice from our team of nutritionists and health professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-background border-b border-border">
        <div className="container-width section-padding py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container-width section-padding">
            <div className="healthcare-card p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                    <Badge variant="outline">{featuredPost.category}</Badge> {/* Use explicit category */}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {featuredPost.shortDescription}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="btn-primary" asChild>
                    <Link to={`/blogs/${featuredPost.id}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={featuredPost.mainImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground">
              Latest Articles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of health and wellness articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No articles found. Add new blog posts from the admin panel.</p>
              </div>
            ) : (
              latestArticles.map((post) => (
                <article key={post.id} className="healthcare-card overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.mainImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge> {/* Use explicit category */}
                      {/* <span className="text-xs text-muted-foreground">{post.readTime}</span> */}
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {post.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Removed tags as BlogPost interface does not currently support it directly */}
                    {/* <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center space-x-1 text-xs text-muted-foreground">
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div> */}

                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                      <Link to={`/blogs/${post.id}`}>Read Article</Link>
                    </Button>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Load More */}
          {/* <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div> */}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-primary py-16">
        <div className="container-width section-padding text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-white">
              Stay Updated with Health Insights
            </h2>
            <p className="text-white/90">
              Subscribe to our newsletter for the latest articles, health tips, and product updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="btn-accent px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}