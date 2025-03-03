export type HackathonStatus = "UPCOMING" | "ONGOING" | "ENDED"
export interface HackathonLite {
  id: string
  title: string
  description: string
  start_date: Date
  end_date: Date
  location: string
  total_prizes: number
  tags: string[]
  status: HackathonStatus
  timezone: string
  content: Hackathon
}

export interface HackathonsFilters {
  location?: string
  status?: string
  page?: number
}

export interface Hackathon extends HackathonLite {
  schedule: ScheduleActivity[]
  registration_deadline: Date
  address: string
  partners: Partner[]
  tracks: Track[]
  participants: number
  speakers: Speaker[]

}

export type ScheduleActivity = {
  stage: string
  date: string
  duration: number //Duration in minutes
  name: string
  description: string
  host_name: string
  host_media: string
  host_icon: string
  location: string
  category: string
  url: string
}

export type Track = {
  name: string
  short_description: string
  icon: string
  logo: string
  description: string //Markdown
  total_reward: number
  partner?: string
  resources: Resource[]
}



export type Resource = {
  name: string
  icon: string
  link: string
}


export type Partner = {
  name: string
  about: string
  links: Resource[]
  logo: string
}

export type Speaker = {
  name: string
  picture: string
  icon: string
  category: string
}


