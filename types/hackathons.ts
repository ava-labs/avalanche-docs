export interface HackathonLite {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  total_prizes?: number;
  tags: string[];
  status: string;
}

export interface Hackathon extends HackathonLite {
  agenda: HackathonActivity[];
  registration_deadline: string;
  address?: string;
  total_prizes?: number;
  partners: Partner[];
  tracks: Track[];

}

export interface HackathonActivity {
  stage: string;
  date: string;
  duration: string;
  name: string;
  description: string;
}

export interface Track {
  name: string;
  description: string;
  prizes: TrackPrize[];
  total_reward: number;
  partner?: string;
  resources: Resource[];
}

export interface TrackPrize {
  name: string;
  description: string;
  type: "Pool" | "Ranked";
  criteria: string;
  resources: Resource[];
  rewards: number[];
}

export interface Resource {
  name: string;
  icon: string;
  link: string;
}

export interface Reward {
  position: number;
  description?: string;
  reward_value: number;
}

export interface Partner {
  name: string;
  about: string;
  links: Resource[];
  logo: string;
}


