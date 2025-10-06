import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, ExternalLink } from 'lucide-react';
import { companyInfo, certifications } from '@/data/products';

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container-width section-padding">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">SM</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Shree Murlidhar
                </h3>
                <p className="text-xs text-muted-foreground -mt-1">Lifescience</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {companyInfo.tagline}
            </p>
            <div className="flex space-x-4">
              <a
                href={`https://instagram.com/${companyInfo.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/products"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                to="/white-labelling"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                White Labelling
              </Link>
              <Link
                to="/blogs"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blogs
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {companyInfo.address}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Customer Care:</p>
              <a 
                href={`tel:${companyInfo.customerCare}`}
                className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                {companyInfo.customerCare}
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Certifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div 
                  key={cert.name}
                  className="healthcare-card p-3 text-center group hover:shadow-brand-md transition-all duration-200"
                >
                  <div className="w-12 h-8 bg-gradient-primary rounded-md mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {cert.name.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted-foreground mt-1" title={cert.description}>
                    {cert.description.split(' ').slice(0, 3).join(' ')}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};