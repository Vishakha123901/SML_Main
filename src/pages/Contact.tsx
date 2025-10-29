import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { companyInfo } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useInView } from '@/hooks/useInView';

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
      <section className="bg-muted/30 py-12">
        <div className="container-width px-4">
          {(() => {
            const { ref, inView } = useInView<HTMLDivElement>();
            return (
              <div
                ref={ref}
                className={`text-center space-y-4 max-w-3xl mx-auto transform transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h1 className="font-heading font-bold text-3xl text-foreground">
                  Get In Touch
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  Have questions about our products or interested in white labeling?
                  We're here to help. Reach out to us and let's discuss how we can serve you better.
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container-width px-4">
          {(() => {
            const { ref, inView } = useInView<HTMLDivElement>();
            return (
              <div
                ref={ref}
                className={`max-w-6xl mx-auto transform transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="text-center mb-8">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-3">
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Choose the most convenient way to get in touch with us.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* WhatsApp Contact */}
                  <div className="healthcare-card p-4 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Quick responses
                    </p>
                    <Button asChild variant="outline" className="w-full justify-center hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white text-black group" size="sm">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span className="group-hover:text-white">Start Chat</span>
                      </a>
                    </Button>
                  </div>

                  {/* Direct Call */}
                  <div className="healthcare-card p-4 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Phone Call
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Speak directly
                    </p>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full justify-center hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white text-black group" size="sm">
                        <a href={`tel:${companyInfo.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="group-hover:text-white">Office</span>
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Email Contact */}
                  <div className="healthcare-card p-4 text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Email
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Response within 24 hours
                    </p>
                    <Button asChild variant="outline" className="w-full justify-center hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white text-black group" size="sm">
                      <a href={`mailto:${companyInfo.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="group-hover:text-white">Send Email</span>
                      </a>
                    </Button>
                  </div>

                  {/* Our Address */}
                  <div className="healthcare-card p-4 text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Our Address
                    </h3>
                    <div className="text-muted-foreground text-sm text-center">
                      <p>Plot No. 123, Industrial Area,</p>
                      <p>Nashik, Maharashtra 422001</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-muted/20">
        <div className="container-width px-4">
          <div className="max-w-4xl mx-auto">
            {(() => {
              const { ref, inView } = useInView<HTMLDivElement>();
              return (
                <div
                  ref={ref}
                  className={`healthcare-card p-6 transform transition-all duration-700 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="text-center mb-6">
                    <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground">
                          Company
                        </label>
                        <Input
                          id="company"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="interest" className="text-sm font-medium text-foreground">
                        Area of Interest
                      </label>
                      <Select value={formData.interest} onValueChange={(value) => handleInputChange('interest', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your area of interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                          <SelectItem value="product-info">Product Information</SelectItem>
                          <SelectItem value="white-labeling">White Labeling</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="technical-support">Technical Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your inquiry in detail..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                   <div className="flex items-start space-x-2">
  <Checkbox
    id="consent"
    checked={formData.consent}
    onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
    className="mt-0.5"
  />
  <label
    htmlFor="consent"
    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
  >
    I agree to the{" "}
    <span className="text-primary underline hover:text-primary/80">
      privacy policy
    </span>{" "}
    and{" "}
    <span className="text-primary underline hover:text-primary/80">
      terms of service
    </span>
    . I consent to having this website store my submitted information so they can
    respond to my inquiry.
  </label>
</div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

    </div>
  );
}