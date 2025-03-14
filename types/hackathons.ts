export type HackathonStatus = "UPCOMING" | "ONGOING" | "ENDED"
export type HackathonHeader = {
  id: string
  title: string
  description: string
  start_date: Date
  end_date: Date
  location: string
  total_prizes: number
  participants: number
  tags: string[]
  status: HackathonStatus
  small_banner: string
  banner: string
  icon: string
  timezone: string
  content: Hackathon
}

export type HackathonsFilters = {
  location?: string
  status?: HackathonStatus | null
  page?: number
}

export type Hackathon = {
  schedule: ScheduleActivity[]
  registration_deadline: Date
  address: string
  partners: Partner[]
  tracks: Track[]
  speakers: Speaker[]
  become_sponsor_link: string
  submission_deadline: Date 
  mentors_judges_img_url: string
  judging_guidelines: string
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


