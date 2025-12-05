export interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  url?: string
  /** Optional image or badge URL. Can be an external link or a path under `public/` */
  image?: string
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'ROS2: Robotics Software Development',
    issuer: 'ITI',
    date: 'Sept 2022',
    url: '',
    image: '/images/certs/ros.jpg'
  },
  {
    id: 2,
    title: 'Java for Android Development',
    issuer: 'ITI',
    date: 'Aug 2022',
    url: '',
    image: '/images/certs/android.jpg'
  },
  {
    id: 3,
    title: 'Specialized Course in Satellite Software and Telemetry Systems Design',
    issuer: 'Egsa',
    date: 'Aug-Oct 2021',
    url: '',
    image: '/images/certs/egsa.jpg'
  },
//   {
//     id: 4,
//     title: 'Advanced C/C++ for Embedded Systems',
//     issuer: 'Udemy',
//     date: 'May 2023',
//     url: '',
//     image: 'https://via.placeholder.com/96?text=C%2B%2B'
//   }
]

export default certificates
