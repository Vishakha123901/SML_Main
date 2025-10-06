import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const blogCategories = [
  "All",
  "Nutrition",
  "Protein",
  "Digestive Health",
  "White Label Insights"
];

const blogPosts = [
  {
    id: "protein-importance-daily-diet",
    title: "The Importance of Protein in Your Daily Diet",
    excerpt: "Discover why protein is essential for your body and how to incorporate quality protein sources into your daily meals for optimal health and wellness.",
    date: "2024-01-15",
    author: "Dr. Rajesh Sharma",
    category: "Protein",
    tags: ["Protein", "Nutrition", "Health"],
    image: "/api/placeholder/400/200",
    readTime: "5 min read"
  },
  {
    id: "digestive-health-gut-wellness",
    title: "Understanding Digestive Health: A Complete Guide to Gut Wellness",
    excerpt: "Learn about the importance of digestive health and practical tips to maintain a healthy gut microbiome for better overall wellness.",
    date: "2024-01-10",
    author: "Nutritionist Priya Patel",
    category: "Digestive Health",
    tags: ["Digestive Health", "Gut Health", "Wellness"],
    image: "/api/placeholder/400/200",
    readTime: "8 min read"
  },
  {
    id: "ragi-superfood-benefits",
    title: "Ragi: The Ancient Superfood Making a Modern Comeback",
    excerpt: "Explore the nutritional benefits of ragi (finger millet) and why this ancient grain is becoming popular among health-conscious consumers.",
    date: "2024-01-05",
    author: "Food Scientist Dr. Meera Singh",
    category: "Nutrition",
    tags: ["Ragi", "Superfoods", "Ancient Grains"],
    image: "/api/placeholder/400/200",
    readTime: "6 min read"
  },
  {
    id: "white-label-success-strategies",
    title: "Building a Successful Health Product Brand: White Label Manufacturing Insights",
    excerpt: "Key strategies for entrepreneurs looking to launch their own health product brand using white label manufacturing services.",
    date: "2023-12-28",
    author: "Industry Expert Amit Kumar",
    category: "White Label Insights",
    tags: ["Business", "Entrepreneurship", "Manufacturing"],
    image: "/api/placeholder/400/200",
    readTime: "10 min read"
  },
  {
    id: "protein-supplements-guide",
    title: "Choosing the Right Protein Supplement: A Comprehensive Guide",
    excerpt: "Navigate the world of protein supplements with our detailed guide covering different types, benefits, and how to choose the right one for your goals.",
    date: "2023-12-20",
    author: "Sports Nutritionist Dr. Vikram Joshi",
    category: "Protein",
    tags: ["Protein Supplements", "Fitness", "Nutrition"],
    image: "/api/placeholder/400/200",
    readTime: "7 min read"
  },
  {
    id: "natural-vs-synthetic-vitamins",
    title: "Natural vs Synthetic Vitamins: What You Need to Know",
    excerpt: "Understand the differences between natural and synthetic vitamins, their bioavailability, and which option might be better for your health needs.",
    date: "2023-12-15",
    author: "Research Scientist Dr. Anjali Verma",
    category: "Nutrition",
    tags: ["Vitamins", "Natural Health", "Research"],
    image: "/api/placeholder/400/200",
    readTime: "9 min read"
  }
];

export default function Blogs() {
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
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "btn-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container-width section-padding">
          <div className="healthcare-card p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  <Badge variant="outline">{blogPosts[0].category}</Badge>
                </div>
                <div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <Button className="btn-primary" asChild>
                  <Link to={`/blogs/${blogPosts[0].id}`}>
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="healthcare-card overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center space-x-1 text-xs text-muted-foreground">
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link to={`/blogs/${post.id}`}>Read Article</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
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