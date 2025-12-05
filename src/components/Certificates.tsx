import React from 'react'
import { ExternalLink } from 'lucide-react'
import certificates from '../lib/certificates'

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="container mx-auto max-w-[1200px]">
        <h2 className="text-3xl sm:text-title font-bold text-neutral-900 mb-6">Certificates</h2>
        <p className="text-body text-neutral-700 mb-8">Selected certifications and courses relevant to robotics and software development.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(c => (
            <a
              key={c.id}
              href={c.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-neutral-50 p-4 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base group"
            >
              {/* Floating preview panel (visible on hover) */}
              <div
                className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full w-[340px] sm:w-[480px] bg-white border border-neutral-200 rounded-lg shadow-2xl p-4 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200"
                role="presentation"
                aria-hidden="true"
              >
                {c.image && (
                  <div className="w-full h-[220px] sm:h-[260px] mb-3 flex items-center justify-center overflow-hidden rounded-md">
                    <img
                      src={c.image}
                      alt={`${c.title} large`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-semibold text-neutral-900 mb-1">{c.title}</h4>
                  <p className="text-small text-neutral-500">{c.issuer} • {c.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-neutral-100 rounded-md overflow-hidden flex items-center justify-center">
                  {c.image ? (
                    <img src={c.image} alt={`${c.title} badge`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-small text-neutral-400">Badge</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary-500 transition-colors">{c.title}</h3>
                  <p className="text-small text-neutral-500">{c.issuer} • {c.date}</p>
                </div>
                <div className="ml-2">
                  <ExternalLink size={18} className="text-neutral-400 group-hover:text-primary-500" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
