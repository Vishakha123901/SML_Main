import { Shield, Target, Eye, Heart, Award, Factory, Users, Microscope } from 'lucide-react';
import { certifications, companyInfo } from '@/data/products';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-pattern bg-muted/30 py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
              About Shree Murlidhar Lifescience
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Pioneering excellence in nutraceutical and health product manufacturing since our inception. 
              We are committed to delivering premium quality products that enhance health and wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-3xl text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to make healthy living accessible to everyone, Shree Murlidhar Lifescience 
                  has grown to become a trusted name in the nutraceutical industry. Our journey began with a simple 
                  yet powerful belief: that quality nutrition should never be compromised.
                </p>
                <p>
                  Today, we operate from our state-of-the-art manufacturing facility in Nashik, Maharashtra, 
                  where we combine traditional wisdom with modern technology to create products that meet the 
                  highest international standards.
                </p>
                <p>
                  Our commitment to quality, innovation, and customer satisfaction has made us a preferred 
                  partner for businesses looking for reliable white-label manufacturing solutions.
                </p>
              </div>
            </div>
            <div className="healthcare-card p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Factory className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">Manufacturing Excellence</h3>
                    <p className="text-muted-foreground">State-of-the-art facility in Nashik</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">Certified Quality</h3>
                    <p className="text-muted-foreground">International certifications and standards</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">Expert Team</h3>
                    <p className="text-muted-foreground">Experienced professionals across all domains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="healthcare-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide high-quality, innovative nutraceutical products that promote health and wellness, 
                making healthy living accessible and affordable for everyone.
              </p>
            </div>
            <div className="healthcare-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become a globally recognized leader in nutraceutical manufacturing, known for our 
                commitment to quality, innovation, and customer satisfaction.
              </p>
            </div>
            <div className="healthcare-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrity, Quality, Innovation, and Customer-centricity guide everything we do. 
                We believe in transparent practices and sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              Our Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of quality and safety through internationally recognized certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="healthcare-card p-6 text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-brand-glow transition-all duration-300">
                  <Shield className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {cert.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Highlight */}
      <section className="bg-gradient-primary py-16 lg:py-24">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-3xl text-white">
                Our Manufacturing Facility
              </h2>
              <div className="space-y-4 text-white/90">
                <p>
                  Located in the industrial hub of Nashik, Maharashtra, our manufacturing facility 
                  spans over [facility size] and is equipped with cutting-edge technology and machinery.
                </p>
                <p>
                  The facility operates under strict quality control protocols and maintains all 
                  necessary certifications including FSSAI, ISO 9001:2015, ISO 22000, and HACCP.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-3">
                    <Microscope className="w-6 h-6 text-accent" />
                    <span>Advanced R&D Lab</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Factory className="w-6 h-6 text-accent" />
                    <span>Automated Production Lines</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-accent" />
                    <span>Quality Control Lab</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-accent" />
                    <span>GMP Certified Facility</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="healthcare-card bg-white/10 backdrop-blur p-8">
              <div className="space-y-6">
                <h3 className="font-heading font-semibold text-xl text-black mb-4">Key Features</h3>
                <ul className="space-y-3 text-black/90">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Climate-controlled production environment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automated packaging and labeling systems</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>In-house testing and quality assurance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Scalable production capacity</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sustainable and eco-friendly practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}