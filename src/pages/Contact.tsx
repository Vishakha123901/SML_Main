import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { companyInfo } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  consent: boolean;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: '',
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Please accept our terms",
        description: "You must accept our privacy policy to submit the form.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        interest: '',
        message: '',
        consent: false
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const whatsappNumber = companyInfo.phone.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your products and would like to know more.");

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-pattern bg-muted/30 py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our products or interested in white labeling? 
              We're here to help. Reach out to us and let's discuss how we can serve you better.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ready to take the next step? Get in touch with our team for personalized assistance and expert guidance.
                </p>
              </div>

              <div className="space-y-6">
                <div className="healthcare-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Our Location
                      </h3>
                      <p className="text-muted-foreground">
                        {companyInfo.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="healthcare-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Phone Numbers
                      </h3>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">
                          Office: <a href={`tel:${companyInfo.phone}`} className="text-primary hover:underline">{companyInfo.phone}</a>
                        </p>
                        <p className="text-muted-foreground">
                          Customer Care: <a href={`tel:${companyInfo.customerCare}`} className="text-primary hover:underline">{companyInfo.customerCare}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="healthcare-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Email Address
                      </h3>
                      <p className="text-muted-foreground">
                        <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">
                          {companyInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="healthcare-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Business Hours
                      </h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="healthcare-card p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                      Area of Interest *
                    </label>
                    <Select value={formData.interest} onValueChange={(value) => handleInputChange('interest', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your area of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="products">Products</SelectItem>
                        <SelectItem value="white-labelling">White Labelling</SelectItem>
                        <SelectItem value="distribution">Distribution</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your requirements..."
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and 
                      consent to being contacted regarding my inquiry.
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted py-16">
        <div className="container-width section-padding">
          <div className="healthcare-card p-8">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
              Find Us on Map
            </h2>
            <div className="aspect-video bg-muted-foreground/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Interactive map will be embedded here
                </p>
                <p className="text-sm text-muted-foreground">
                  {companyInfo.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-brand-lg"
          asChild
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}