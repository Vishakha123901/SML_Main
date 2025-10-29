import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Star, ShoppingCart, Store, Instagram, Truck, Sparkles, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product, categories as predefinedCategories } from '@/data/products';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getProducts } from '@/lib/productFirebase';

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

// 3D Interactive Card Component
const ProductCard3D = ({ product, index }: { product: Product; index: number }) => {
  const [ref, isVisible] = useIsVisible({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const calculate3DEffect = () => {
    if (!isHovered) return '';
    
    const centerX = 150;
    const centerY = 150;
    const rotateY = ((mousePosition.x - centerX) / centerX) * 3;
    const rotateX = ((centerY - mousePosition.y) / centerY) * 3;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-all duration-500 h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transform: calculate3DEffect(),
        transition: 'transform 0.3s ease-out, opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 100}ms`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="healthcare-card p-6 group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-green-100/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* 3D Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        {/* Product Image */}
        <div className="aspect-square rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 mb-4 overflow-hidden relative flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Floating Badges */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-accent text-white shadow-lg animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>
          
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>

        </div>
        
        {/* Product Content */}
        <div className="space-y-4 relative z-10 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-heading font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors duration-300 min-h-[3.5rem]">
                {product.name}
              </h3>
            </div>
            
            {/* Features Badges */}
            <div className="flex flex-wrap gap-1 mb-3 min-h-[2rem]">
              {product.badges.slice(0, 2).map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200 transform transition-all duration-300 hover:scale-105">
                  {badge}
                </Badge>
              ))}
              {product.badges.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  +{product.badges.length - 2} more
                </Badge>
              )}
            </div>
            
            {/* Highlights */}
            <ul className="space-y-2 min-h-[3.5rem]">
              {product.highlights.slice(0, 2).map((highlight, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2 group-hover:text-gray-800 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  className="w-full group relative overflow-hidden bg-green-600 hover:bg-green-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
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
    </div>
  );
};

// Animated Category Filter
const AnimatedCategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`relative overflow-hidden transform transition-all duration-300 hover:scale-105 font-medium group ${
            selectedCategory === category
              ? "bg-[#c9a65e] hover:bg-[#b8954f] text-white shadow-lg border-0"
              : "border-green-200 text-black hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white hover:shadow-md"
          }`}
        >
          {selectedCategory === category && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a65e] to-[#b8954f] rounded-md transition-all duration-300" />
          )}
          <span className={`relative z-10 ${selectedCategory === category ? 'text-white' : 'group-hover:text-white'}`}>
            {category}
          </span>
        </Button>
      ))}
    </div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-300/30 rounded-full animate-float"
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

// Loading Skeleton Component
const ProductCardSkeleton = () => {
  return (
    <div className="healthcare-card p-6 bg-white/80 backdrop-blur-sm border border-green-100/50 rounded-2xl shadow-lg animate-pulse h-full flex flex-col">
      <div className="aspect-square rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 mb-4 overflow-hidden relative flex-shrink-0">
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      </div>
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      setBackgroundPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsubscribe = getProducts(
      (fetchedProducts) => {
        setProducts(fetchedProducts);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50/30 to-emerald-50/20">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Sparkles className="w-6 h-6 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="space-y-2">
            <p className="text-green-800 font-semibold">Loading Premium Products</p>
            <p className="text-green-600 text-sm">Curating the best health solutions for you...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50/30 to-emerald-50/20">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">⚠️</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">Connection Issue</h3>
            <p className="text-red-600">{error}</p>
            <p className="text-gray-600 text-sm">Please check your connection and try again</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" className="border-green-200 text-black hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white group">
              <span className="group-hover:text-white">Contact Support</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-emerald-50/10 to-green-50/20 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl transition-transform duration-100 ease-linear"
          style={{
            transform: `translate(${backgroundPosition.x}px, ${backgroundPosition.y}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl transition-transform duration-100 ease-linear"
          style={{
            transform: `translate(${-backgroundPosition.x}px, ${-backgroundPosition.y}px)`
          }}
        />
      </div>

      <Link to="/products" className="block">
        <section className="relative overflow-hidden mt-0" style={{ backgroundImage: "url('https://i.postimg.cc/YC3fFYRD/Products.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 'calc(100vw * 800 / 2700)' }}>

          <div className="relative w-full z-10 flex justify-center items-center h-full">

          </div>
        </section>
      </Link>

      {/* Filters Section */}
      <section className="bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 backdrop-blur-lg border-b border-blue-200/50 sticky z-40">
        <div className="container-width section-padding py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-lg group w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5 transition-colors duration-300 group-focus-within:text-blue-700" />
              <Input
                type="text"
                placeholder="Search Ayurvedic products, benefits, ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-10 h-12 text-base border-2 border-blue-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200/50 transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm w-full"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-xl font-bold touch-target"
                >
                  ×
                </button>
              )}
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex items-center space-x-3 w-full lg:w-auto justify-center lg:justify-start">
              <div className="max-w-full overflow-x-auto pb-2">
                <AnimatedCategoryFilter
                  categories={predefinedCategories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="container-width section-padding">
          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard3D key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="healthcare-card p-12 max-w-2xl mx-auto backdrop-blur-sm bg-white/80 border border-green-200/50 rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="font-heading font-semibold text-3xl text-gray-900 mb-4">
                  No Products Found
                </h3>
                <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your search or explore different categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    Show All Products
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-300 text-black hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white px-8 py-3 text-lg rounded-2xl transition-all duration-300 group"
                    asChild
                  >
                    <Link to="/contact">
                      <Award className="w-5 h-5 mr-3" />
                      <span className="group-hover:text-white">Custom Solution</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 lg:py-16 relative overflow-hidden" style={{ backgroundColor: '#f7f4ed' }}>
        <div className="container-width section-padding text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-4 border border-gray-200 shadow-sm">
              <Sparkles className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Custom Ayurvedic Solutions</span>
            </div>

            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-800 leading-tight">
              Need a{' '}
              <span className="text-gray-800">
                Personalized Formulation?
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our Ayurvedic experts can create custom formulations tailored to your unique health needs
              and wellness goals. Experience the power of personalized Ayurveda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-6">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group touch-target"
                size="lg" 
                asChild
              >
                <Link to="/white-labelling">
                  White Label Services
                  <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white px-8 sm:px-10 py-4 text-base sm:text-lg rounded-2xl transition-all duration-300 group touch-target"
                asChild
              >
                <Link to="/contact">
                  <span className="group-hover:text-white">Get Custom Quote</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .healthcare-card {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          border: none;
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #15803d 0%, #0d9488 100%);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}