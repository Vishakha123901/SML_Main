import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'White Labelling', href: '/white-labelling' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact Us', href: '/contact' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-[1000] w-full border-b border-border shadow-brand-sm">
      <nav className="container-width section-padding" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Shree Murlidhar Lifescience</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-sm">SM</span>
                </div>
                <div className="hidden sm:block">
                  <h2 className="font-heading font-bold text-lg text-foreground">
                    Shree Murlidhar
                  </h2>
                  <p className="text-xs text-muted-foreground -mt-1">Lifescience</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
            </Button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Get Quote</Link>
            </Button>
            <Button size="sm" className="btn-primary" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu (Portal) */}
      {mobileMenuOpen &&
        createPortal(
          (
            <div className="lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed inset-0 z-[1005] bg-black/40" />
              <div className="fixed inset-y-0 right-0 z-[1010] w-80 max-w-[85vw] overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
                <div className="flex items-center justify-between">
                  <Link to="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Shree Murlidhar Lifescience</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-heading font-bold text-sm">SM</span>
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-lg text-foreground">Shree Murlidhar</h2>
                        <p className="text-xs text-muted-foreground -mt-1">Lifescience</p>
                      </div>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6 text-foreground" aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-border">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 transition-colors hover:bg-muted ${
                            isActive(item.href) ? 'text-primary bg-muted' : 'text-foreground'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="py-6 space-y-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                          Get Quote
                        </Link>
                      </Button>
                      <Button className="w-full btn-primary" asChild>
                        <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                          Shop Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
          document.body,
        )}
    </header>
  );
};