import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Sparkles, BookOpen, Clock, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/data/blog';
import { getBlogPosts } from '@/lib/blogFirebase';

// Category list
const blogCategories = [
  "All",
  "Nutrition",
  "Protein",
  "Digestive Health",
  "White Label Insights"
];

// Intersection Observer Hook
const useIsVisible = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
};

// Floating Particles Background Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

// 3D Blog Card Component
const BlogCard3D = ({ post, index, variant = 'default' }: { post: BlogPost; index: number; variant?: 'default' | 'featured' | 'recent' }) => {
  const [ref, isVisible] = useIsVisible({ threshold: 0.1 });
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const calcTransform = () => {
    return 'none';
  };

  const isNew = () => {
    const postDate = new Date(post.publishDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // New if published within last 7 days
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative overflow-hidden bg-white dark:bg-muted rounded-2xl shadow-md transition-all duration-500 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${
        variant === 'featured' ? 'border-2 border-primary/20' : 
        variant === 'recent' ? 'border border-primary/10' : ''
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: calcTransform(),
      }}
    >
      {/* New Badge */}
      {isNew() && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 animate-pulse">
            <Star className="w-3 h-3 mr-1 fill-current" />
            New
          </Badge>
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl relative">
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Featured Badge */}
        {variant === 'featured' && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-medium tracking-wide">
            {post.category}
          </Badge>
          {variant === 'recent' && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              <span>Recent</span>
            </div>
          )}
        </div>

        <h3 className={`font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 ${
          variant === 'featured' ? 'text-xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.shortDescription}
        </p>

        <div className="flex items-center text-xs text-muted-foreground gap-4 mt-3">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 relative overflow-hidden group border-green-200 text-black hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white transition-all duration-300"
          asChild
        >
          <Link to={`/blogs/${post.id}`}>
            <span className="relative z-10 flex items-center justify-center group-hover:text-white">
              Read Article
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Button>
      </div>
    </article>
  );
};

// Featured Blog Section Component
const FeaturedBlogSection = ({ posts }: { posts: BlogPost[] }) => {
  const featuredPost = posts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .find(post => post.featured) || posts[0]; // Get featured post or latest post

  if (!featuredPost) return null;

  return (
    <section className="py-16 relative">
      <div className="container-width section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Article</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't miss our highlighted piece of the week
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BlogCard3D 
            post={featuredPost} 
            index={0} 
            variant="featured"
          />
        </div>
      </div>
    </section>
  );
};

// Category Filter
const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-6">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(cat)}
          className={`rounded-full transition-all duration-300 transform hover:scale-105 group ${
            selectedCategory === cat
              ? 'shadow-lg bg-[#c9a65e] hover:bg-[#b8954f] text-white border-0'
              : 'border-green-200 text-black hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white hover:shadow-md'
          }`}
        >
          <span className={`relative z-10 ${selectedCategory === cat ? 'text-white' : 'group-hover:text-white'}`}>
            {cat}
          </span>
        </Button>
      ))}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value > 0) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCount(Math.min(Math.floor(stepValue * currentStep), value));
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
        {count}+
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const unsubscribe = getBlogPosts(
      (fetched) => {
        setBlogPosts(fetched);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filtered = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  // Stats for the counter
  const totalPosts = blogPosts.length;
  const categoriesCount = new Set(blogPosts.map(post => post.category)).size;
  const recentPostsCount = blogPosts.filter(post => {
    const postDate = new Date(post.publishDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Posts from last 30 days
  }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center space-y-4">
          <div className="text-destructive text-lg">⚠️ {error}</div>
          <Button onClick={() => window.location.reload()} className="hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white text-black group">
            <span className="group-hover:text-white">Retry</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Link to="/products" className="block">
        <section className="relative overflow-hidden mt-0" style={{ backgroundImage: "url('https://i.postimg.cc/xCjpp5Rh/Blog.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 'calc(100vw * 800 / 2700)' }}>

          <div className="relative w-full z-10 flex justify-center items-center h-full">

          </div>
        </section>
      </Link>

      {/* Featured Blog Section */}
      <FeaturedBlogSection posts={blogPosts} />

      {/* Categories */}
      <section className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <CategoryFilter
          categories={blogCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container-width section-padding">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                No blogs found for this category.
              </p>
              <Button 
                onClick={() => setSelectedCategory('All')}
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                View All Blogs
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedCategory === 'All' ? 'All Blog Posts' : `${selectedCategory} Posts`}
                </h3>
                <p className="text-muted-foreground">
                  Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((post, i) => (
                  <BlogCard3D key={post.id} post={post} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 text-center relative overflow-hidden" style={{ backgroundColor: '#f7f4ed' }}>
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold">
            Stay Updated with{' '}
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Health Insights
            </span>
          </h2>
          <p className="text-muted-foreground">
            Get our latest blogs and expert tips directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <Button className="btn-primary px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Sparkles className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            We respect your privacy. No spam.
          </p>
        </div>
      </section>
    </div>
  );
}