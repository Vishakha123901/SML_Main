import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Star, ShoppingCart, Store, Instagram, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product, categories as predefinedCategories } from '@/data/products';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getProducts } from '@/lib/productFirebase';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]"><p>Loading products...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]"><p className="text-destructive">Error: {error}</p></div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-pattern bg-muted/30 py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our comprehensive range of premium health and nutrition products, 
              crafted with excellence and backed by science.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-background border-b border-border sticky top-16 z-40">
        <div className="container-width section-padding py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {predefinedCategories.map((category) => (
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
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="healthcare-card p-6 group">
                <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
                        {product.name}
                      </h3>
                      <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                        {product.category}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.badges.slice(0, 3).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                      {product.badges.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.badges.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <ul className="space-y-1">
                      {product.highlights.slice(0, 2).map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start space-x-1">
                          <Star className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          size="sm" 
                          className="btn-primary w-full"
                        >
                          Buy Now
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {product.socialLinks?.flipkart && (
                          <DropdownMenuItem asChild>
                            <a href={product.socialLinks.flipkart} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ShoppingCart className="w-4 h-4" />
                              Flipkart
                            </a>
                          </DropdownMenuItem>
                        )}
                        {product.socialLinks?.amazon && (
                          <DropdownMenuItem asChild>
                            <a href={product.socialLinks.amazon} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Store className="w-4 h-4" />
                              Amazon
                            </a>
                          </DropdownMenuItem>
                        )}
                        {product.socialLinks?.insta && (
                          <DropdownMenuItem asChild>
                            <a href={product.socialLinks.insta} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Instagram className="w-4 h-4" />
                              Insta
                            </a>
                          </DropdownMenuItem>
                        )}
                        {product.socialLinks?.blinkit && (
                          <DropdownMenuItem asChild>
                            <a href={product.socialLinks.blinkit} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Truck className="w-4 h-4" />
                              Blinkit
                            </a>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link to={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="healthcare-card p-12 max-w-md mx-auto">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container-width section-padding text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground">
              Looking for white-label manufacturing or custom formulations? 
              We can help you create the perfect product for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" asChild>
                <Link to="/white-labelling">White Label Services</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}