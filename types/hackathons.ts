interface HackathonLite {
    id: string;
    title: string;
    description: string;
    date: string; // ISO timestamp
    type: "Virtual" | "On-site";
    city?: string;
    total_prizes?: number; // decimal
  }

interface Hackathon {
    id: string; // uuid
    title: string;
    description: string;
    agenda: HackathonActivity[];
    date: string; // ISO timestamp
    registration_deadline: string; // ISO timestamp
    type: "Virtual" | "On-site";
    city?: string;
    address?: string;
    total_prizes?: number; // decimal
    partners: Partner[];
    tracks: Track[];
  }
  
  interface HackathonActivity {
    stage: string;
    date: string; // ISO timestamp
    duration: string; // ISO 8601 duration (e.g., PT2H)
    name: string;
    description: string;
  }
  
  interface Track {
    name: string;
    description: string;
    prizes: TrackPrize[];
    total_reward: number; // decimal
    partner?: string; // uuid
    resources: Resource[];
  }
  
  interface TrackPrize {
    name: string;
    description: string;
    type: "Pool" | "Ranked";
    criteria: string;
    resources: Resource[];
    rewards: number[]; // Array of decimal values
  }
  
  interface Resource {
    name: string;
    icon: string;
    link: string;
  }
  
  interface Reward {
    position: number;
    description?: string;
    reward_value: number; // decimal
  }
  
  interface Partner {
    name: string;
    about: string;
    links: Resource[];
    logo: string; // URL to the image
  }
  