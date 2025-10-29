import { products, certifications } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Building2, Users, Microscope, Instagram, ExternalLink, Star, Sparkles, TrendingUp, Heart, Award, Package, ShoppingCart, Store, Truck, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../lib/productFirebase';
import VRCarousel from '../components/home/VRCarousel';
import heroImage from '../assets/hero-healthcare.jpg';

// Type definitions for components
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  badges?: string[];
  highlights?: string[];
  socialLinks?: {
    flipkart?: string;
    amazon?: string;
    insta?: string;
    blinkit?: string;
  };
}

// Custom hook for intersection observer
const useIsVisible = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};

// Simple Animated Card Component
const AnimatedCard = ({ children, className = '', delay = 0 }: AnimatedCardProps) => {
  const [ref, isVisible] = useIsVisible({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIsVisible({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="font-bold text-foreground">
      {count}{suffix}
    </span>
  );
};

// Stats Section Component
const StatsSection = () => {
  const stats = [
    { number: 50, suffix: '+', label: 'Premium Products', icon: Award },
    { number: 1000, suffix: '+', label: 'Happy Customers', icon: Heart },
    { number: 5, suffix: '+', label: 'Years Excellence', icon: TrendingUp },
    { number: 10, suffix: 'K+', label: 'Products Delivered', icon: Building2 }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Stats Grid */}
      <div className="container-width section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const certifications = [
    { name: "ISO Certified", logo: "https://i.postimg.cc/Y9Gnzcd2/ISO-22000.png" },
    { name: "GMP Certified", logo: "https://i.postimg.cc/0NFQBm0V/GMP.png" },
    { name: "FSSAI Certified", logo: "https://i.postimg.cc/Dy428M56/FSSAI.png" },
    { name: "ISO Approved", logo: "https://i.postimg.cc/RFZ4TL8H/ISO-9001.png" },
     { name: "HACCP Approved", logo: "https://i.postimg.cc/Pf6brVy4/HACCP.png" }
  ];

  // Fetch products dynamically from Firebase
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      return new Promise((resolve, reject) => {
        const unsubscribe = getProducts(
          (products: Product[]) => resolve(products),
          (error: string) => reject(new Error(error))
        );
        // Note: In a real scenario, you might want to handle unsubscribe properly
      });
    },
  });

  // Get first 3 products as featured
  const featuredProducts = products?.slice(0, 3) || [];

  useEffect(() => {
    // Load Elfsight script only once
    if (!document.getElementById('elfsight-platform-script')) {
      const script = document.createElement('script');
      script.id = 'elfsight-platform-script';
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Hide Elfsight watermark
    const interval = setInterval(() => {
      const badge = document.querySelector(
        '.eapps-widget-toolbar, .eapps-link, a[href*="elfsight.com"]'
      );
      if (badge instanceof HTMLElement) {
        badge.style.display = 'none';
        badge.style.opacity = '0';
        badge.style.visibility = 'hidden';
        badge.style.pointerEvents = 'none';
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      <FloatingParticles />
      
      <Link to="/products" className="block">
        <section className="relative overflow-hidden mt-0" style={{ backgroundImage: "url('https://i.postimg.cc/vTsKLyK6/Homepage-1.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 'calc(100vw * 800 / 2700)' }}>
          
          <div className="relative w-full z-10 flex justify-center items-center h-full">
            
          </div>
        </section>
      </Link>

      <StatsSection />

      {/* Certifications Strip - FIXED LOGO DISPLAY */}
      <section className="bg-background border-b border-border relative z-10">
        <div className="container-width section-padding py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {certifications.map((cert, index) => (
              <AnimatedCard key={cert.name} delay={index * 100}>
                <div className="flex flex-col items-center space-y-2 text-muted-foreground group">
                  {/* Fixed logo container - larger and better image display */}
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md border border-gray-200 p-2">
                    <img 
                      src={cert.logo} 
                      alt={cert.name} 
                      className="w-full h-full object-contain rounded-full"
                      onError={(e) => {
                        // Fallback if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/80/ffffff/64748b?text=${cert.name.split(' ')[0]}`;
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300 text-center">
                    {cert.name}
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container-width section-padding">
          <AnimatedCard delay={0}>
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Best Sellers</span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-black">
                Featured{' '}
                <span className="text-black">
                  Products
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our premium range of scientifically-formulated health and nutrition products
              </p>
            </div>
          </AnimatedCard>

          {productsLoading ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="healthcare-card p-6 animate-pulse">
                  <div className="aspect-square bg-muted rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-muted rounded flex-1"></div>
                      <div className="h-8 bg-muted rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : productsError ? (
            // Error state
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">Failed to Load Products</h3>
              <p className="text-muted-foreground mb-4">There was an issue fetching the latest products. Please try again.</p>
              <Button onClick={() => window.location.reload()} className="btn-primary">
                Retry
              </Button>
            </div>
          ) : featuredProducts.length > 0 ? (
            // Render products
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <AnimatedCard key={product.id} delay={100 + index * 150}>
                  <div className="healthcare-card p-6 group hover:shadow-2xl transition-all duration-300 border border-border/50 h-full flex flex-col">
                    {/* Improved Image Container */}
                    <div className="aspect-square rounded-xl bg-muted mb-4 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{ objectFit: 'contain', backgroundColor: '#f8fafc' }}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x400/f8fafc/64748b?text=Product+Image';
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <div className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-grow flex flex-col">
                      <div className="flex-grow">
                        <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2 product-name group-hover:text-primary transition-colors duration-300 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.badges?.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <ul className="space-y-2">
                          {product.highlights?.slice(0, 2).map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Buy Now Button - Fixed at bottom with consistent alignment */}
                      <div className="pt-4 mt-auto">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              size="sm" 
                              className="w-full group relative overflow-hidden bg-green-600 hover:bg-green-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Buy Now
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="transform-gpu animate-in zoom-in-95 border border-green-200 shadow-xl">
                            {product.socialLinks?.flipkart && (
                              <DropdownMenuItem asChild className="transform transition-transform duration-200 hover:scale-105 hover:bg-green-50">
                                <a href={product.socialLinks.flipkart} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                                  <span className="text-gray-700">Flipkart</span>
                                  <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                                </a>
                              </DropdownMenuItem>
                            )}
                            {product.socialLinks?.amazon && (
                              <DropdownMenuItem asChild className="transform transition-transform duration-200 hover:scale-105 hover:bg-orange-50">
                                <a href={product.socialLinks.amazon} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <Store className="w-4 h-4 text-orange-600" />
                                  <span className="text-gray-700">Amazon</span>
                                  <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                                </a>
                              </DropdownMenuItem>
                            )}
                            {product.socialLinks?.insta && (
                              <DropdownMenuItem asChild className="transform transition-transform duration-200 hover:scale-105 hover:bg-pink-50">
                                <a href={product.socialLinks.insta} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <Instagram className="w-4 h-4 text-pink-600" />
                                  <span className="text-gray-700">Instagram</span>
                                  <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                                </a>
                              </DropdownMenuItem>
                            )}
                            {product.socialLinks?.blinkit && (
                              <DropdownMenuItem asChild className="transform transition-transform duration-200 hover:scale-105 hover:bg-yellow-50">
                                <a href={product.socialLinks.blinkit} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <Truck className="w-4 h-4 text-yellow-600" />
                                  <span className="text-gray-700">Blinkit</span>
                                  <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                                </a>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            // No products
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">No Products Available</h3>
              <p className="text-muted-foreground">New products are coming soon. Check back later!</p>
            </div>
          )}

          <AnimatedCard delay={500}>
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                asChild
              >
                <Link to="/products" className="flex items-center">
                  View All Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-0 lg:py-0 bg-muted/30">
        <div className="container-width section-padding">
          <AnimatedCard delay={0}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-black">
                Why We're{' '}
                <span className="text-black">
                  Different
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence and innovation sets us apart in the health industry
              </p>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "International certifications and rigorous quality control processes",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Building2,
                title: "Modern Infrastructure", 
                description: "State-of-the-art manufacturing facility with latest technology",
                color: "from-teal-500 to-blue-500"
              },
              {
                icon: Microscope,
                title: "R&D Excellence",
                description: "Dedicated research team for innovative product development",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Experienced professionals committed to your wellness",
                color: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <AnimatedCard key={index} delay={100 + index * 100}>
                <div className="healthcare-card p-6 text-center group h-full flex flex-col items-center transition-all duration-300 hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-4 w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

{/* Instagram Section */}
      <VRCarousel />


      {/* CTA Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#f7f4ed' }}>
        <div className="container-width section-padding text-center relative z-10">
          <AnimatedCard delay={0}>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-800">
                Ready to{' '}
                <span className="text-gray-800">
                  Transform
                </span>{' '}
                Your Health Journey?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Partner with India's leading nutraceutical manufacturer for premium white labeling solutions
                and scientifically-backed custom product development
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Updated White Labelling Button to Green */}
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-lg hover:shadow-xl transition-all duration-300 group touch-target" asChild>
                  <Link to="/white-labelling">
                    Explore White Labelling
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-black border-green-600 hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white transition-all duration-300 touch-target group" asChild>
                  <Link to="/contact">
                    <span className="group-hover:text-white">Get Custom Quote</span>
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Add custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        /* Ensure images are clear and properly displayed */
        .healthcare-card img {
          object-fit: contain !important;
          background-color: #f8fafc;
        }
/* Reduce container height (padding) for Home page sections */
.container-width.section-padding {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
@media (min-width: 1024px) {
  .container-width.section-padding {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}
      `}</style>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <Button className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-4" asChild>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-6 h-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}