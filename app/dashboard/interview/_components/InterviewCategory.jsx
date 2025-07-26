import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Trophy, Brain, BookOpen, Target, Zap, History } from 'lucide-react';

const categories = [
  {
    name: 'CAT',
    slug: 'cat',
    description: 'Prepare for top B-Schools with real case-style mock interviews.',
    image: 'https://logo.clearbit.com/hbs.edu',
    avatars: [
       'https://logo.clearbit.com/iima.ac.in',              // IIM Ahmedabad
  'https://logo.clearbit.com/iimb.ac.in',              // IIM Bangalore
  'https://logo.clearbit.com/iimcal.ac.in',            // IIM Calcutta
  'https://logo.clearbit.com/xlri.ac.in',              // XLRI Jamshedpur
  'https://logo.clearbit.com/fms.edu',                 // FMS Delhi
    ],
    icon: Trophy,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    stats: '12K+ prepared'
  },
  {
    name: 'Technical',
    slug: 'technical',
    description: 'Ace coding rounds with system design & DSA mocks.',
    image: 'https://logo.clearbit.com/github.com',
    avatars: [
      'https://logo.clearbit.com/google.com',
      'https://logo.clearbit.com/amazon.com',
      'https://logo.clearbit.com/microsoft.com',
      'https://logo.clearbit.com/apple.com',
      'https://logo.clearbit.com/netflix.com',
    ],
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    stats: '25K+ coders'
  },
  {
    name: 'HR',
    slug: 'hr',
    description: 'Practice behavioral & situational HR questions confidently.',
    image: 'https://logo.clearbit.com/indeed.com',
    avatars: [
      'https://logo.clearbit.com/accenture.com',
      'https://logo.clearbit.com/pwc.com',
      'https://logo.clearbit.com/wipro.com',
      'https://logo.clearbit.com/ey.com',
      'https://logo.clearbit.com/kpmg.com',
    ],
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    stats: '18K+ professionals'
  },
  {
    name: 'GMAT',
    slug: 'gmat',
    description: 'Master GMAT interview prep with adaptive mock formats.',
    image: 'https://logo.clearbit.com/mba.com',
    avatars: [
      'https://logo.clearbit.com/duke.edu',
      'https://logo.clearbit.com/columbia.edu',
      'https://logo.clearbit.com/northeastern.edu',
      'https://logo.clearbit.com/harvard.edu',
      'https://logo.clearbit.com/cornell.edu',
    ],
    icon: Target,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    stats: '15K+ achievers'
  },
  // {
  //   name: 'CSAT',
  //   slug: 'csat',
  //   description: 'Improve your aptitude and interview performance together.',
  //   image: 'https://logo.clearbit.com/testbook.com',
  //   avatars: [
  //     'https://logo.clearbit.com/iitb.ac.in',
  //     'https://logo.clearbit.com/iitg.ac.in',
  //     'https://logo.clearbit.com/iitd.ac.in',
  //   ],
  //   icon: Zap,
  //   color: 'from-teal-500 to-green-500',
  //   bgColor: 'bg-teal-50',
  //   stats: '22K+ aspirants'
  // },
  // {
  //   name: 'SAT',
  //   slug: 'sat',
  //   description: 'Get ready for SAT with verbal & reasoning mock sessions.',
  //   image: 'https://logo.clearbit.com/collegeboard.org',
  //   avatars: [
  //     'https://logo.clearbit.com/harvard.edu',
  //     'https://logo.clearbit.com/mit.edu',
  //     'https://logo.clearbit.com/stanford.edu',
  //   ],
  //   icon: BookOpen,
  //   color: 'from-orange-500 to-red-500',
  //   bgColor: 'bg-orange-50',
  //   stats: '8K+ students'
  // },
];

export default function InterviewCategory() {
  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-10 left-50 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-52 right-50 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-30 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative px-6 pt-10 pb-16 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              AI-Powered Interview Platform
            </div>
            
            <h1 className="text-xl md:text-xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
              Choose Your { }
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Path
              </span>
            </h1>
            
            <p className="text-md text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 font-light">
              Master your next interview with AI-powered practice sessions designed for 
              <span className="text-blue-400 font-medium"> real success</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard/interview/list">
                <button className="group relative px-6 py-3 cursor-pointer bg-white text-slate-900 font-semibold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                    <History className="w-5 h-5" />
                    View Interview List
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
              
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span>10K+ Success Stories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-800 to-transparent"></div>
      </div>

      {/* Categories Grid */}
      <div className="px-6 pb-20 pt-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-8">
          {categories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.slug}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`${cat.bgColor} rounded-xl p-8 border border-gray-100 shadow transition-all duration-500 hover:shadow hover:shadow-blue-500/25`}>
                  {/* Gradient Overlay */}
                  <div className={`bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${cat.color} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{cat.name}</h2>
                        <p className="text-sm text-gray-500 font-medium">{cat.stats}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 relative z-10">
                    {cat.description}
                  </p>
                  
                  {/* Avatars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center -space-x-3">
                      {cat.avatars.map((src, idx) => (
                        <div key={idx} className="relative">
                          <Image
                            src={src}
                            alt={`Partner ${idx + 1}`}
                            width={34}
                            height={34}
                            className="rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className={`px-4 py-2 cursor-pointer hover:shadow-lg rounded-lg bg-gradient-to-r ${cat.color} text-white text-sm font-semibold shadow`}>
                      
                      <Link
                        href={`/dashboard/interview/type/${cat.slug}`}
                      >
                      Start Now</Link>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-xl"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-indigo-600 mx-6 mb-12 rounded-3xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who've aced their interviews with our AI-powered preparation platform.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold">100K+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}