export interface HackathonLite {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  total_prizes: number;
  tags: string[];
  status: string;
}

export interface HackathonsFilters {
  location?: string;
  status?: string;
  page?: number;
}

export interface Hackathon extends HackathonLite {
  agenda: HackathonActivity[];
  registration_deadline: Date;
  address: string;
  partners: Partner[];
  tracks: Track[];

}

export type HackathonActivity = {
  stage: string;
  date: string;
  duration: string;
  name: string;
  description: string;
}

export type Track = {
  name: string;
  description: string;
  prizes: TrackPrize[];
  total_reward: number;
  partner?: string;
  resources: Resource[];
}

export type TrackPrize = {
  name: string;
  description: string;
  type: "Pool" | "Ranked";
  criteria: string;
  resources: Resource[];
  rewards: number[];
}

export type Resource = {
  name: string;
  icon: string;
  link: string;
}

export type Reward = {
  position: number;
  description?: string;
  reward_value: number;
}

export type Partner = {
  name: string;
  about: string;
  links: Resource[];
  logo: string;
}


