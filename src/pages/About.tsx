import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Eye, Heart, Award, Factory, Users, Microscope, Sparkles, ArrowRight, MapPin, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { certifications, companyInfo } from '@/data/products';

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
const AnimatedCard = ({ children, className = '', delay = 0 }) => {
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
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
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
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
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
    { number: 50, suffix: '+', label: 'Products', icon: Award },
    { number: 1000, suffix: '+', label: 'Happy Clients', icon: Users },
    { number: 5, suffix: '+', label: 'Years Experience', icon: TrendingUp },
    { number: 10, suffix: 'K+', label: 'Products Delivered', icon: Factory }
  ];

  return (
    <section className="py-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-width section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium text-sm">{stat.label}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Certification Card Component
const CertificationCard = ({ cert, index }) => {
  const certImages = {
    "ISO Certified": "https://i.postimg.cc/Y9Gnzcd2/ISO-22000.png",
    "GMP Certified": "https://i.postimg.cc/0NFQBm0V/GMP.png",
    "FSSAI Certified": "https://i.postimg.cc/Dy428M56/FSSAI.png",
    "FDA Approved": "https://i.postimg.cc/Hx2jjk3c/HACCP-2.png",
    "HACCP Certified": "https://i.postimg.cc/Pf6brVy4/HACCP.png"
  };

  return (
    <AnimatedCard key={cert.name} delay={100 + index * 100}>
      <div className="healthcare-card p-5 text-center group h-full flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg">
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 border-2 border-green-200 overflow-hidden">
          <img 
            src={certImages[cert.name]} 
            alt={cert.name}
            className="w-14 h-14 object-contain rounded-full mix-blend-multiply"
          />
        </div>
        <h3 className="font-heading font-semibold text-base text-foreground">
          {cert.name}
        </h3>
      </div>
    </AnimatedCard>
  );
};

// Manufacturing Facility Section Component
const ManufacturingFacility = () => {
  const features = [
    {
      icon: Microscope,
      title: "Advanced R&D Lab",
      description: "Cutting-edge research and development facilities"
    },
    {
      icon: Shield,
      title: "Quality Control Lab", 
      description: "Comprehensive quality testing and analysis"
    },
    {
      icon: Factory,
      title: "Automated Production Lines",
      description: "State-of-the-art automated manufacturing"
    },
    {
      icon: CheckCircle,
      title: "GMP Certified Facility",
      description: "Good Manufacturing Practices certified"
    }
  ];

  const keyFeatures = [
    "Climate-controlled production environment",
    "Automated packaging and labeling systems", 
    "In-house testing and quality assurance",
    "Scalable production capacity",
    "Sustainable and eco-friendly practices"
  ];

  const facilityCertifications = [
    "FSSAI Certified",
    "ISO 9001:2015", 
    "ISO 22000",
    "HACCP"
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-50/30 to-emerald-50/20">
      <div className="container-width section-padding">
        {/* Header Section */}
        <AnimatedCard delay={0}>
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-5 py-2 rounded-full mb-3 border border-green-200">
              <Factory className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-green-700">Manufacturing Excellence</span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900">
              Our Manufacturing Facility
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Located in the industrial hub of Nashik, Maharashtra, our manufacturing facility spans over 
              <span className="font-semibold text-green-700"> 50,000+ square feet </span> 
              and is equipped with cutting-edge technology and machinery.
            </p>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            <AnimatedCard delay={100}>
              <div className="healthcare-card p-6 rounded-xl border border-green-100/50 bg-white/80 backdrop-blur-sm">
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                  State-of-the-Art Infrastructure
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The facility operates under strict quality control protocols and maintains all necessary 
                  certifications to ensure the highest standards of product quality and safety.
                </p>
                
                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Certifications & Standards:</h4>
                  <div className="flex flex-wrap gap-2">
                    {facilityCertifications.map((cert) => (
                      <span 
                        key={cert}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium border border-green-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features List */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={200 + (index * 100)}>
                <div className="healthcare-card p-5 group hover:shadow-lg transition-all duration-300 hover:border-green-200 border border-green-100/50 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 border border-green-200">
                      <feature.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      <FloatingParticles />
      
      <Link to="/products" className="block">
        <section className="relative overflow-hidden mt-0" style={{ backgroundImage: "url('https://i.postimg.cc/CLLVdNsd/About-Us.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 'calc(100vw * 800 / 2700)' }}>

          <div className="relative w-full z-10 flex justify-center items-center h-full">

          </div>
        </section>
      </Link>

      <StatsSection />

      {/* Company Story */}
      <section className="py-8 ml-8 lg:ml-12">
     
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <AnimatedCard delay={100}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  <h2 className="font-heading font-bold text-2xl text-foreground">
                    Our Legacy of Innovation
                  </h2>
                </div>
                
                <div className="space-y-3 text-muted-foreground">
                  <p className="text-base leading-relaxed">
                    Founded with a vision to make <span className="text-primary font-semibold">healthy living accessible</span> to everyone, 
                    Shree Murlidhar Lifescience has grown to become a trusted name in the nutraceutical industry.
                  </p>
                  <p className="text-base leading-relaxed">
                    Our journey began with a simple yet powerful belief: that quality nutrition should never be compromised. 
                    Today, we operate from our state-of-the-art manufacturing facility in Nashik, Maharashtra, where we 
                    combine traditional wisdom with modern technology.
                  </p>
                  <p className="text-base leading-relaxed">
                    Our commitment to quality, innovation, and customer satisfaction has made us a preferred
                    partner for businesses looking for reliable white-label manufacturing solutions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  {['Quality First', 'Innovation Driven', 'Customer Focused', 'Globally Certified'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <div className="healthcare-card p-6 rounded-xl bg-background/80 border border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Factory className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-foreground">Manufacturing Excellence</h3>
                      <p className="text-muted-foreground text-sm">State-of-the-art facility in Nashik</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Award className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-foreground">Certified Quality</h3>
                      <p className="text-muted-foreground text-sm">International certifications and standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-foreground">Expert Team</h3>
                      <p className="text-muted-foreground text-sm">Experienced professionals across all domains</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        
      </section>

      <ManufacturingFacility />

      {/* Mission, Vision, Values */}
      <section className="bg-muted/30 py-8 sm:py-12">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              {
                icon: Target,
                title: "Our Mission",
                description: "To provide high-quality, innovative nutraceutical products that promote health and wellness, making healthy living accessible and affordable for everyone.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Eye,
                title: "Our Vision", 
                description: "To become a globally recognized leader in nutraceutical manufacturing, known for our commitment to quality, innovation, and customer satisfaction.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Heart,
                title: "Our Values",
                description: "Integrity, Quality, Innovation, and Customer-centricity guide everything we do. We believe in transparent practices and sustainable growth.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <AnimatedCard key={index} delay={index * 150}>
                <div className="healthcare-card p-4 sm:p-6 text-center group h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-4 w-8 sm:w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12">
        <div className="container-width section-padding">
          <AnimatedCard delay={0}>
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full mb-3">
                <Shield className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">Quality Certifications</span>
              </div>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                Our Certificates
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                We maintain the highest standards of quality and safety through globally recognized certifications
              </p>
            </div>
          </AnimatedCard>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "ISO Certified" },
              { name: "GMP Certified" },
              { name: "FSSAI Certified" },
              { name: "FDA Approved" },
              { name: "HACCP Certified" }
            ].map((cert, index) => (
              <CertificationCard key={cert.name} cert={cert} index={index} />
            ))}
          </div>
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
      `}</style>
    </div>
  );
}