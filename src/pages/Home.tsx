import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Building2, Users, Microscope, Instagram, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, certifications, companyInfo } from '@/data/products';
import { useInView } from '@/hooks/useInView';
import heroImage from '@/assets/hero-healthcare.jpg';
import InstagramFeed from '@/components/InstagramFeed';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-pattern bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative container-width section-padding py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight">
                  One-stop destination for{' '}
                  <span className="text-accent">Healthy, Nutraceutical</span> & Protein Products
                </h1>
                <p className="text-lg text-white/90 max-w-xl">
                  Discover premium quality health products manufactured with state-of-the-art technology 
                  and backed by international certifications.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-accent" asChild>
                  <Link to="/products">
                    Explore Products
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-black hover:text-primary" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage}
                alt="Healthcare and nutrition products"
                className="rounded-2xl shadow-brand-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="bg-background border-b border-border">
        <div className="container-width section-padding py-8">
          <div className="flex items-center justify-center space-x-8 lg:space-x-16">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our premium range of health and nutrition products, crafted with excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => {
              const { ref, inView } = useInView();
              return (
              <div
                key={product.id}
                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                className={`healthcare-card border-black p-6 group transform transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: inView ? `${idx * 150}ms` : '0ms' }}
              >
                <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <ul className="space-y-1">
                      {product.highlights.slice(0, 2).map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start space-x-1">
                          <Star className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {product.marketplaceLinks.slice(0, 1).map((link) => (
                      <Button 
                        key={link.label} 
                        size="sm" 
                        className="btn-primary flex-1"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    ))}
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );})}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              Follow Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest products, health tips, and behind-the-scenes content
            </p>
          </div>
          <div className="space-y-8">
            <div className="healthcare-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Instagram className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    Latest from {companyInfo.instagram}
                  </h3>
                  <p className="text-muted-foreground text-sm">Newest 5 posts update automatically</p>
                </div>
              </div>
              <InstagramFeed />
            </div>
            <div className="text-center">
              <Button className="btn-primary" asChild>
                <a
                  href={`https://instagram.com/${companyInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Instagram
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence drives everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "International certifications and rigorous quality control processes"
              },
              {
                icon: Building2,
                title: "Modern Infrastructure", 
                description: "State-of-the-art manufacturing facility in Nashik with latest technology"
              },
              {
                icon: Microscope,
                title: "R&D Excellence",
                description: "Dedicated research team for innovative product development"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Experienced professionals committed to your health and wellness"
              }
            ].map((item, index) => {
              const { ref, inView } = useInView();
              return (
              <div
                key={index}
                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                className={`healthcare-card border-black p-6 text-center group transform transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: inView ? `${index * 150}ms` : '0ms' }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-brand-glow transition-all duration-300">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16 lg:py-24">
        <div className="container-width section-padding text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white">
              Ready to elevate your brand with our manufacturing expertise?
            </h2>
            <p className="text-lg text-white/90">
              Partner with us for premium white labeling solutions and custom product development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-accent" asChild>
                <Link to="/white-labelling">
                  Explore White Labelling
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-black hover:text-primary" asChild>
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}