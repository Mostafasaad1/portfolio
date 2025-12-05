import { useEffect, useState } from 'react'
import { Github, MapPin, ExternalLink, Star, GitFork, Circle } from 'lucide-react'
import './index.css'
import { getReposUrl, getGitHubHeaders, GITHUB_CONFIG } from './config/github'
import Certificates from './components/Certificates'

// Type definitions
interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

// Fallback data in case API is rate-limited
const fallbackRepos: Repository[] = [
  {
    id: 1,
    name: 'Robotics-Projects',
    description: 'Collection of robotics and automation projects built with ROS/ROS2',
    html_url: 'https://github.com/Mostafasaad1',
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    updated_at: '2024-01-01'
  },
  {
    id: 2,
    name: 'Industrial-Automation',
    description: 'Industrial automation solutions and PLC programming examples',
    html_url: 'https://github.com/Mostafasaad1',
    stargazers_count: 0,
    forks_count: 0,
    language: 'C++',
    updated_at: '2024-01-01'
  },
  {
    id: 3,
    name: 'ML-Computer-Vision',
    description: 'Machine learning and computer vision projects for robotics applications',
    html_url: 'https://github.com/Mostafasaad1',
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    updated_at: '2024-01-01'
  }
]

function App() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)

  // Fetch GitHub repositories with caching and fallback
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem('github_repos_cache')
        const cacheTimestamp = localStorage.getItem('github_repos_timestamp')
        const now = Date.now()
        const oneHour = 60 * 60 * 1000

        // Use cache if less than 1 hour old
        if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < oneHour) {
          setRepos(JSON.parse(cachedData))
          setLoading(false)
          return
        }

        // Fetch from API with authentication if token is provided
        const response = await fetch(getReposUrl(), {
          headers: getGitHubHeaders(),
        })
        
        if (!response.ok) {
          // If rate limited or error, use cached data if available or fallback
          if (cachedData) {
            setRepos(JSON.parse(cachedData))
          } else {
            setRepos(fallbackRepos)
            setUsingFallback(true)
          }
          throw new Error('GitHub API rate limit reached. Showing cached data.')
        }

        const data = await response.json()
        setRepos(data)
        
        // Cache the successful response
        localStorage.setItem('github_repos_cache', JSON.stringify(data))
        localStorage.setItem('github_repos_timestamp', now.toString())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load repositories')
        // Ensure we have some repos to display
        if (repos.length === 0) {
          setRepos(fallbackRepos)
          setUsingFallback(true)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  // Handle scroll for navigation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Insert clamp to enforce configured per-page limit
  const visibleRepos = Array.isArray(repos)
    ? repos.slice(0, GITHUB_CONFIG.reposPerPage)
    : []

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/95 backdrop-blur-[20px] transition-all duration-base ${
          scrolled ? 'shadow-card-hover border-b border-neutral-200' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-8">
          <div className="text-subtitle font-bold text-neutral-900">MSB</div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-body font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-fast">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-body font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-fast">Skills</button>
            <button onClick={() => scrollToSection('certificates')} className="text-body font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-fast">Certificates</button>
            <button onClick={() => scrollToSection('projects')} className="text-body font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-fast">Projects</button>
            <button onClick={() => scrollToSection('github')} className="text-body font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-fast">GitHub</button>
            <button onClick={() => scrollToSection('contact')} className="text-body font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-fast">Contact</button>
          </div>
          <a 
            href="https://github.com/Mostafasaad1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-fast"
          >
            <Github size={20} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[600px] flex items-center justify-center px-4 sm:px-6 md:px-8 py-24">
        <div className="container max-w-[800px] text-center">
          <h1 className="text-4xl sm:text-5xl md:text-hero font-bold text-neutral-900 mb-6">
            Mostafa Saad Beshr
          </h1>
          <p className="text-lg sm:text-body-large text-neutral-700 mb-4">
            Mechatronics & Robotics Engineer / Robotic Software Engineer
          </p>
          <div className="flex items-center justify-center gap-2 text-small text-neutral-500 mb-12">
            <MapPin size={20} />
            <span>Cairo, Egypt</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-6 h-[56px] bg-primary-500 text-white text-body font-semibold rounded-md hover:bg-primary-600 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-fast"
            >
              View Projects
            </button>
            <a 
              href="https://github.com/Mostafasaad1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 h-[56px] flex items-center justify-center border-2 border-neutral-200 text-neutral-700 text-body font-semibold rounded-md hover:bg-neutral-100 transition-all duration-fast"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl sm:text-title font-bold text-neutral-900 mb-12">About</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200">
              <h3 className="text-xl sm:text-subtitle font-semibold text-neutral-900 mb-4">Education</h3>
              <p className="text-body text-neutral-700 mb-2 font-semibold">
                Egypt Japan University of Science and Technology
              </p>
              <p className="text-body text-neutral-700 mb-2">
                B.Eng. Mechatronics & Robotics Engineering
              </p>
              <p className="text-body text-neutral-700 mb-2">
                CGPA: 3.44/4.0
              </p>
              <p className="text-small text-neutral-500">
                Graduated: February 2024
              </p>
              <p className="text-body text-neutral-700 mt-4">
                Specialization: Robotics & Autonomous Systems
              </p>
            </div>
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200">
              <h3 className="text-xl sm:text-subtitle font-semibold text-neutral-900 mb-4">Current Role</h3>
              <p className="text-body text-neutral-700 mb-4 font-semibold">
                Robotic Software Engineer at Elaraby R&D
              </p>
              <p className="text-body text-neutral-700 leading-relaxed">
                Mechatronics engineer specializing in robotics and autonomous systems with focus on ROS2 development and industrial automation. Experienced in developing motion control software, implementing safety-critical systems, and optimizing embedded systems for real-time performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl sm:text-title font-bold text-neutral-900 mb-12">Technical Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['C/C++', 'Python', 'Java', 'MATLAB', 'JavaScript', 'LaTeX'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full hover:bg-neutral-300 transition-colors duration-fast">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {['ROS/ROS2', 'Node.js', 'Django', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'pandas', 'Matplotlib', 'MoveIt', 'Qt'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full hover:bg-neutral-300 transition-colors duration-fast">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'Linux Shell', 'VS Code', 'SolidWorks', 'Proteus', 'Gazebo', 'CoppeliaSim', 'AVR Studio', 'Arduino', 'PlatformIO'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full hover:bg-neutral-300 transition-colors duration-fast">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Standards & Protocols</h3>
              <div className="flex flex-wrap gap-2">
                {['REST APIs', 'UART/SPI/I2C', 'Agile', 'CI/CD', 'EtherCAT', 'OPC UA'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full hover:bg-neutral-300 transition-colors duration-fast">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <Certificates />

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl sm:text-title font-bold text-neutral-900 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3">Industrial 6 DOF Robot Arm Development</h3>
              <p className="text-small text-neutral-500 mb-4">Nov 2023 - Oct 2024</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Codesys', 'ROS', 'C++', 'Rust', 'EtherCAT'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-body text-neutral-700 space-y-2">
                <li>• Achieved ±0.1mm repeatability with 15kg payload capacity</li>
                <li>• Qt-based GUI reduced operator setup time by 40%</li>
                <li>• Integrated OPC UA communication between ROS and Beckhoff PLC</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3">Compact 6 DOF Collaborative Robot Arm</h3>
              <p className="text-small text-neutral-500 mb-4">Jan 2024 - Aug 2024</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['ROS2', 'Machinekit', 'EtherCAT'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-body text-neutral-700 space-y-2">
                <li>• 900mm reach with lightweight carbon fiber structure</li>
                <li>• ROS2 control stack with MoveIt2 integration</li>
                <li>• Achieved PLd certification per ISO 13849-1</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3">High-Speed Industrial FDM 3D Printer</h3>
              <p className="text-small text-neutral-500 mb-4">Nov 2024 - Present</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Klipper', 'Servo Motors', 'Safety PLC'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-body text-neutral-700 space-y-2">
                <li>• 800×800×1000mm printer with 500mm/s print speed</li>
                <li>• Modified Klipper firmware for Yaskawa servo drives</li>
                <li>• Category 3 safety per IEC 62061 standards</li>
              </ul>
            </div>

            {/* Project 4 */}
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3">Autonomous Robotic Arm System</h3>
              <p className="text-small text-neutral-500 mb-4">Graduation Project</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['ROS2', 'Python', 'C++', 'MoveIt 2'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-body text-neutral-700 space-y-2">
                <li>• Architecture enabling communication between 7+ subsystems</li>
                <li>• Motion planning achieving ±0.5mm positioning accuracy</li>
                <li>• Custom Ubuntu 22 LTS image for NVIDIA Jetson Nano</li>
              </ul>
            </div>

            {/* Project 5 */}
            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3">ML-Based Object Identification Robot "Detecto"</h3>
              <p className="text-small text-neutral-500 mb-4">April 2023</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['TensorFlow', 'ROS', 'Arduino', 'Python'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-neutral-200 text-neutral-700 text-small font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-body text-neutral-700 space-y-2">
                <li>• Feed Forward Neural Network and CNN for object identification</li>
                <li>• Integrated camera and servo motors for dynamic detection</li>
                <li>• Implemented success rate evaluation formula</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Repositories Section */}
      <section id="github" className="py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl sm:text-title font-bold text-neutral-900 mb-12">Open Source & GitHub</h2>
          
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-4 w-2/3"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-neutral-200 rounded w-16"></div>
                    <div className="h-4 bg-neutral-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && repos.length > 0 && (
            <>
              {(error || usingFallback) && (
                <div className="bg-primary-50 border border-primary-100 text-neutral-700 p-4 rounded-lg mb-6 text-center">
                  <p className="text-small">
                    {usingFallback 
                      ? 'Showing sample projects. Visit GitHub profile for complete repository list.' 
                      : 'Showing cached repositories. Visit GitHub profile for latest updates.'}
                  </p>
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleRepos.map(repo => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-base group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-500 transition-colors">
                        {repo.name}
                      </h3>
                      <ExternalLink size={20} className="text-neutral-500 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-body text-neutral-700 mb-4 line-clamp-2">
                      {repo.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 text-small text-neutral-500">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <Circle size={12} className="fill-primary-500 text-primary-500" />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={14} />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          <div className="text-center mt-12">
            <a
              href="https://github.com/Mostafasaad1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 h-[56px] bg-primary-500 text-white text-body font-semibold rounded-md hover:bg-primary-600 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-fast"
            >
              <Github size={20} />
              View Full GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl sm:text-title font-bold text-neutral-900 mb-12 text-center">Let's Connect</h2>
          <div className="max-w-[600px] mx-auto text-center">
            <p className="text-body-large text-neutral-700 mb-8">
              I'm always open to discussing robotics projects, software engineering opportunities, or collaborations in industrial automation.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <a
                href="https://github.com/Mostafasaad1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-md hover:bg-neutral-200 hover:scale-105 transition-all duration-fast"
                aria-label="GitHub Profile"
              >
                <Github size={24} className="text-neutral-700" />
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-small text-neutral-500">
              <MapPin size={20} />
              <span>Cairo, Egypt</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-8 border-t border-neutral-200">
        <div className="container mx-auto max-w-[1200px]">
          <p className="text-caption text-neutral-500 text-center">
            © 2025 Mostafa Saad Beshr.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
