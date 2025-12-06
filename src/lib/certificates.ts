export interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  url?: string
  /** Optional image or badge URL. Can be an external link or a path under `public/` */
  image?: string
}

// raw list (keep source order if needed)
const certificatesRaw: Certificate[] = [
  {
    id: 1,
    title: 'ROS2: Robotics Software Development',
    issuer: 'ITI',
    date: 'Sept 2022',
    url: '',
    image: `${import.meta.env.BASE_URL}images/certs/ros.jpg`
  },
  {
    id: 2,
    title: 'Java for Android Development',
    issuer: 'ITI',
    date: 'Aug 2022',
    url: '',
    image: `${import.meta.env.BASE_URL}images/certs/android.jpg`
  },
  {
    id: 3,
    title: 'Specialized Course in Satellite Software and Telemetry Systems Design',
    issuer: 'Egsa',
    date: 'Aug-Oct 2021',
    url: '',
    image: `${import.meta.env.BASE_URL}images/certs/egsa.jpg`
  },
  {
    id: 4,
    title: 'AI Bootcamp computer vison',
    issuer: 'DevisionX',
    date: 'Aug 2023',
    url: '',
    image: `${import.meta.env.BASE_URL}images/certs/DevisionX.jpg`
  },
  {
    id: 5,
    title: 'Open Control Solution Overview, High Level Advanced Solutions P1 & P2.',
    issuer: 'Yokogawa',
    date: 'Jul 2023',
    url: '',
    image: `${import.meta.env.BASE_URL}images/certs/yokogawa.jpg`
  },
  {
    id: 6,
    title: 'Project Mangment',
    issuer: 'Innovegypt',
    date: 'Aug-Sept 2023',
    url: '',
    image: `${import.meta.env.BASE_URL}images/certs/innovegypt.jpg`
  },
]

// helper: parse human-friendly date strings like "Aug 2023" or "Aug-Oct 2021" -> Date
const parseCertDate = (d: string): number => {
  const yearMatch = d.match(/(\d{4})/)
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 0

  const monthMatch = d.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)/i)
  const monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
  let month = 0
  if (monthMatch) {
    const token = monthMatch[1].toLowerCase().slice(0,3) // e.g., "sept" -> "sep"
    const idx = monthNames.indexOf(token)
    if (idx >= 0) month = idx
  }
  return new Date(year, month, 1).getTime()
}

// export sorted by date (newest first) without mutating the original array
export const certificates: Certificate[] = certificatesRaw
  .slice()
  .sort((a, b) => parseCertDate(b.date) - parseCertDate(a.date))

export default certificates
