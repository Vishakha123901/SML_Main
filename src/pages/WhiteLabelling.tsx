import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Factory, Beaker, Shield, Truck, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WhiteLabelling() {
  const processSteps = [
    {
      step: 1,
      title: "Brief & Requirements",
      description: "Share your product vision, target market, and specifications",
      icon: FileText
    },
    {
      step: 2,
      title: "Formulation Development",
      description: "Our R&D team creates custom formulations to meet your needs",
      icon: Beaker
    },
    {
      step: 3,
      title: "Pilot Production",
      description: "Small batch testing and optimization of the formulation",
      icon: Factory
    },
    {
      step: 4,
      title: "Compliance & Testing",
      description: "Ensure all regulatory requirements and quality standards are met",
      icon: Shield
    },
    {
      step: 5,
      title: "Scale & Dispatch",
      description: "Full-scale production and timely delivery to your specifications",
      icon: Truck
    }
  ];

  const capabilities = [
    {
      title: "Custom Formulation",
      description: "Develop unique formulations tailored to your brand requirements and target audience",
      features: ["Proprietary blend development", "Ingredient sourcing", "Nutritional optimization", "Flavor customization"]
    },
    {
      title: "State-of-the-art Manufacturing",
      description: "GMP-certified facility with advanced equipment and quality control systems",
      features: ["Automated production lines", "Climate-controlled environment", "Real-time quality monitoring", "Scalable capacity"]
    },
    {
      title: "Innovative Solutions",
      description: "Cutting-edge research and development for next-generation health products",
      features: ["Advanced delivery systems", "Novel ingredient combinations", "Bioavailability enhancement", "Stability optimization"]
    },
    {
      title: "Dedicated Support",
      description: "End-to-end support from concept to market with dedicated account management",
      features: ["Project management", "Regulatory guidance", "Marketing support", "Technical assistance"]
    }
  ];

  const caseStudies = [
    {
      title: "Vegan Protein Launch",
      outcome: "60 days from concept to market launch",
      highlight: "GMP-compliant production",
      category: "Protein Supplements"
    },
    {
      title: "Digestive Health Brand",
      outcome: "Custom ayurvedic formulation",
      highlight: "FSSAI approved in 45 days",
      category: "Herbal Supplements"
    },
    {
      title: "Kids Nutrition Series",
      outcome: "Complete product line in 3 months",
      highlight: "Age-specific formulations",
      category: "Children's Health"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-10 sm:py-14 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="relative container-width section-padding">
          <div className="text-center space-y-5 sm:space-y-6 max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white lg:text-5xl ">
              White Label Manufacturing Solutions
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Transform your ideas into market-ready products with our comprehensive white labeling services. 
              From custom formulation to full-scale production, we're your trusted manufacturing partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="btn-accent" asChild>
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-primary">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-12 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">
              Our Manufacturing Capabilities
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for all your white label manufacturing needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="healthcare-card p-5 sm:p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {capability.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {capability.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-muted py-12 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">
              Our 5-Step Process
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to market launch, we guide you through every step of the journey
            </p>
          </div>

          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between mb-8">
                <div className="absolute top-12 left-0 right-0 h-0.5 bg-border"></div>
                {processSteps.map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center max-w-48">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-4 relative z-10">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-accent-foreground">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-4 sm:space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="healthcare-card p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 relative">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-accent-foreground">{step.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we've helped brands bring their vision to life with our manufacturing expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="healthcare-card p-5 sm:p-6 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {study.category}
                    </span>
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {study.outcome}
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-secondary">{study.highlight}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Request Case Study
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-12 lg:py-24">
        <div className="container-width section-padding text-center">
          <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
              Ready to Launch Your Brand?
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              Let's discuss how our white label manufacturing services can help bring your product vision to life. 
              Contact us today for a consultation and custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="btn-accent" asChild>
                <Link to="/contact">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-black hover:text-primary">
                Download Capability Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}