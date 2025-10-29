import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Beaker, Shield, Truck, FileText, Users, Sparkles, Zap, BookOpen, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/blogFirebase';
import { BlogPost } from '@/data/blog';

export default function WhiteLabelling() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState<string | null>(null);

  // useInView hooks
  const capabilitiesTitleRef = useInView<HTMLDivElement>();
  const processTitleRef = useInView<HTMLDivElement>();
  const caseStudiesTitleRef = useInView<HTMLDivElement>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch recent blogs
  useEffect(() => {
    setBlogsLoading(true);
    setBlogsError(null);
    const unsubscribe = getBlogPosts(
      (fetchedBlogs) => {
        // Get the 3 most recent blogs
        const topBlogs = fetchedBlogs.slice(0, 3);
        setRecentBlogs(topBlogs);
        setBlogsLoading(false);
      },
      (errorMessage) => {
        setBlogsError(errorMessage);
        setBlogsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Light pastel gradients for process
  const processSteps = [
    { step: 1, title: "Brief & Requirements", description: "Share your product vision, target market, and specifications", icon: FileText, color: "from-[#E3F2FD] to-[#BBDEFB]" },
    { step: 2, title: "Formulation Development", description: "Our R&D team creates custom formulations to meet your needs", icon: Beaker, color: "from-[#F3E5F5] to-[#E1BEE7]" },
    { step: 3, title: "Pilot Production", description: "Small batch testing and optimization of the formulation", icon: Factory, color: "from-[#E8F5E8] to-[#C8E6C9]" },
    { step: 4, title: "Compliance & Testing", description: "Ensure all regulatory requirements and quality standards are met", icon: Shield, color: "from-[#FFF3E0] to-[#FFE0B2]" },
    { step: 5, title: "Scale & Dispatch", description: "Full-scale production and timely delivery to your specifications", icon: Truck, color: "from-[#E0F2F1] to-[#B2DFDB]" },
  ];

  const capabilities = [
    { title: "Custom Formulation", description: "Develop unique formulations tailored to your brand requirements and target audience", features: ["Proprietary blend development", "Ingredient sourcing", "Nutritional optimization", "Flavor customization"], icon: Beaker, gradient: "hover:from-green-500/10 hover:to-emerald-500/10" },
    { title: "State-of-the-art Manufacturing", description: "GMP-certified facility with advanced equipment and quality control systems", features: ["Automated production lines", "Climate-controlled environment", "Real-time quality monitoring", "Scalable capacity"], icon: Factory, gradient: "hover:from-green-500/10 hover:to-teal-500/10" },
    { title: "Innovative Solutions", description: "Cutting-edge research and development for next-generation health products", features: ["Advanced delivery systems", "Novel ingredient combinations", "Bioavailability enhancement", "Stability optimization"], icon: Zap, gradient: "hover:from-emerald-500/10 hover:to-green-500/10" },
    { title: "Dedicated Support", description: "End-to-end support from concept to market with dedicated account management", features: ["Project management", "Regulatory guidance", "Marketing support", "Technical assistance"], icon: Users, gradient: "hover:from-teal-500/10 hover:to-emerald-500/10" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{ background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120,119,198,0.15), transparent 80%)` }}
      />
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-green-500 rounded-full opacity-20 animate-float"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${Math.random()*5}s`, animationDuration: `${3+Math.random()*4}s` }}
          />
        ))}
      </div>

      <Link to="/products" className="block">
        <section className="relative overflow-hidden mt-0" style={{ backgroundImage: "url('https://i.postimg.cc/zG1RQNVG/White-Labelling.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 'calc(100vw * 800 / 2700)' }}>

          <div className="relative w-full z-10 flex justify-center items-center h-full">

          </div>
        </section>
      </Link>

      {/* Capabilities Section */}
      <section className="py-8 lg:py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
        <div className="relative container-width section-padding z-10">
          <div ref={capabilitiesTitleRef.ref} className={`text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${capabilitiesTitleRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">Our Manufacturing Capabilities</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Comprehensive solutions for all your white label manufacturing needs with cutting-edge technology</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {capabilities.map((capability,index)=>{
              const capabilityRef = useInView<HTMLDivElement>();
              const Icon = capability.icon;
              return (
                <div key={index} ref={capabilityRef.ref} className={`healthcare-card p-6 sm:p-8 group relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 ${capabilityRef.inView ? 'opacity-100 translate-y-0':'opacity-0 translate-y-6'} ${capability.gradient}`} style={{transitionDelay: capabilityRef.inView?`${index*150}ms`:'0ms'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-6 h-6 text-white"/>
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground">{capability.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base">{capability.description}</p>
                    <div className="space-y-3">
                      {capability.features.map((feature, idx)=>(
                        <div key={idx} className="flex items-center space-x-3 group/feature">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover/feature:bg-green-500 transition-colors">
                            <svg className="w-3 h-3 text-green-500 group-hover/feature:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-4 lg:py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-emerald-50/30" />
        <div className="relative container-width section-padding">
          <div ref={processTitleRef.ref} className={`text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 transform transition-all duration-1000 ease-out ${processTitleRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">Our 5-Step Process</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">From concept to market launch, we guide you through every step of the journey</p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting line positioned to align with centers of step circles */}
            <div className="absolute top-10 left-10 right-10 h-3 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 rounded-full shadow-inner" />
            <div className="grid grid-cols-5 gap-8 relative z-10">
              {processSteps.map((step,index)=>{
                const stepRef = useInView<HTMLDivElement>();
                const Icon = step.icon;
                return (
                  <div key={index} ref={stepRef.ref} className={`relative flex flex-col items-center text-center transform transition-all duration-1000 ease-out ${stepRef.inView?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`} style={{transitionDelay: stepRef.inView?`${index*200}ms`:'0ms'}} onMouseEnter={()=>setActiveStep(index)}>
                    {/* Step circle with connecting line overlay */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg border-4 border-white relative z-20`}>
                        <Icon className="w-8 h-8 text-gray-700"/>
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white z-30">
                        {step.step}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="bg-white healthcare-card p-6 rounded-2xl shadow-lg border w-full hover:shadow-xl transition-shadow duration-300 h-48 flex flex-col">
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6 sm:space-y-8">
            {processSteps.map((step,index)=>{
              const stepRef = useInView<HTMLDivElement>();
              const Icon = step.icon;
              return (
                <div key={index} ref={stepRef.ref} className={`healthcare-card p-6 transform transition-all duration-1000 ease-out hover:scale-105 ${stepRef.inView?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`} style={{transitionDelay: stepRef.inView?`${index*150}ms`:'0ms'}}>
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center border-2 border-white shadow-lg`}>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700"/>
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-2 min-h-[120px] flex flex-col">
                      <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Insights Section */}
      <section className="py-16 relative">
        <div className="container-width section-padding">
          <div ref={caseStudiesTitleRef.ref} className={`text-center space-y-3 sm:space-y-4 mb-12 transform transition-all duration-1000 ease-out ${caseStudiesTitleRef.inView?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">Recent Insights</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Stay updated with the latest industry insights and expert knowledge</p>
          </div>

          {/* Blog Grid matching main Blogs page structure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Recent Blogs */}
              {blogsLoading ? (
                // Loading skeleton for blogs
                [...Array(3)].map((_, index) => (
                  <div key={`loading-${index}`} className="healthcare-card p-6">
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))
              ) : blogsError ? (
                // Error state for blogs
                <div className="healthcare-card p-6 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-gray-600 text-sm">{blogsError}</p>
                    <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="text-gray-700 hover:bg-gray-50 border-gray-200 transition-colors duration-200">
                      <span>Try Again</span>
                    </Button>
                  </div>
                </div>
              ) : (
                // Display recent blogs
                recentBlogs.map((blog, index) => (
                  <div key={blog.id} className="healthcare-card p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{blog.category}</span>
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={blog.mainImage}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=No+Image';
                          }}
                        />
                      </div>
                      <h3 className="font-medium text-lg text-gray-900 mb-3 line-clamp-2">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{blog.shortDescription}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500"/>
                          <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">Latest</span>
                      </div>
                      <Button size="sm" className="w-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition-all duration-300" asChild>
                        <Link to={`/blogs/${blog.id}`}>
                          Read Article
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
        </div>
      </section>
    </div>
  );
}