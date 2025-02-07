import React from 'react';
import { ScrollAnimation } from '@/components/builderkit/scroll-animation';
import { motion } from 'framer-motion';

const contributionAreas = [
  {
    icon: '🎨',
    title: 'Component Development',
    description: 'Help us build new components or improve existing ones with modern features and best practices.',
    link: '/docs/contributing/components'
  },
  {
    icon: '📝',
    title: 'Documentation',
    description: 'Improve our docs with better examples, clearer explanations, and additional use cases.',
    link: '/docs/contributing/documentation'
  },
  {
    icon: '🐛',
    title: 'Bug Fixes',
    description: 'Help identify and fix issues to make our components more reliable and robust.',
    link: '/docs/contributing/bugs'
  }
];

export const Contribute = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#EB4C50]/5 to-black/0" />
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Help us build the future of React components. Your contributions make a difference.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {contributionAreas.map((area, index) => (
            <ScrollAnimation key={area.title}>
              <motion.a
                href={area.link}
                className="group block relative"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#EB4C50]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                
                <div className="relative h-full p-8 rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EB4C50]/10 to-purple-500/10" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-6">{area.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#EB4C50] transition-colors duration-300">
                      {area.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {area.description}
                    </p>
                    <div className="flex items-center text-[#EB4C50] font-medium">
                      Learn more
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.a>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation>
          <div className="mt-20 text-center">
            <a 
              href="https://github.com/yourusername/react-components"
              className="inline-flex items-center gap-2 text-lg font-medium text-[#EB4C50] hover:text-brand-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};