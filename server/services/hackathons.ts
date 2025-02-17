import { Hackathon, HackathonActivity, HackathonLite, Partner, Track, TrackPrize } from "@/types/hackathons";
import { hasAtLeastOne, requiredField, validateEntity, Validation } from "./base";


export const hackathonsValidations: Validation[] = [
    { field: "title", message: "Please provide a title for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "title") },
    { field: "description", message: "A description is required.", validation: (hackathon: Hackathon) => requiredField(hackathon, "description") },
    { field: "date", message: "Please enter a valid date for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "date") },
    { field: "location", message: "Please specify the location of the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "location") },
    { field: "tags", message: "Please add at least one category or tag.", validation: (hackathon: Hackathon) => hasAtLeastOne(hackathon, "tags") }
];

export const validateHackathon = (hackathon: Partial<Hackathon>) => validateEntity(hackathonsValidations, hackathon);



export function getHackathonLite(hackathon: Hackathon): HackathonLite {
    const { agenda, registration_deadline, address, total_prizes, partners, tracks, ...hackathonLite } = hackathon;
    return hackathonLite;
}


let randomizer = 1;
const availableTags = ["AI", "Gaming", "Blockchain", "IoT", "Big Data"];
const possibleTracks = ["Healthcare", "Finance", "Education", "Environment", "Smart Cities"];
const possiblePartners = ["TechCorp", "InnovateX", "CodeLabs", "NextGenAI", "GreenFuture"];
const baseDate = new Date("2024-11-01T10:00:00Z");
const now = new Date();

export const HackathonsList: Hackathon[] = Array.from({ length: 50 }, (_, index) => {
    
    let randomTags = availableTags.filter((_, tagIndex) => {
        randomizer += tagIndex;
        return (index + tagIndex + randomizer) % 5 === 0;
    });

    randomTags = randomTags.length === 0 ? [availableTags[index % availableTags.length]] : randomTags;

   
    const hackathonDate = new Date(baseDate);
    hackathonDate.setDate(baseDate.getDate() + index * 5);

   
    const registrationDeadline = new Date(hackathonDate);
    registrationDeadline.setDate(hackathonDate.getDate() - 10); 

    
    const daysDifference = (hackathonDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    let status;
    if (daysDifference > 10) {
        status = "Upcoming";
    } else if (daysDifference >= -10) {
        status = "Ongoing";
    } else {
        status = "Ended";
    }

    
    const agenda: HackathonActivity[] = Array.from({ length: 3 }, (_, activityIndex) => ({
        stage: `Stage ${activityIndex + 1}`,
        date: new Date(hackathonDate.getTime() + activityIndex * 2 * 60 * 60 * 1000).toISOString(), 
        duration: "1 hour",
        name: `Activity ${activityIndex + 1} for Hackathon ${index + 1}`,
        description: `Description for Activity ${activityIndex + 1}`,
    }));

    
    const tracks: Track[] = Array.from({ length: 3 }, (_, trackIndex) => {
        const prizes: TrackPrize[] = Array.from({ length: 3 }, (__, prizeIndex) => ({
            name: `Prize ${prizeIndex + 1}`,
            description: `Description for Prize ${prizeIndex + 1}`,
            type: prizeIndex % 2 === 0 ? "Pool" : "Ranked",
            criteria: `Criteria for Prize ${prizeIndex + 1}`,
            resources: Array.from({ length: 2 }, (___, resourceIndex) => ({
                name: `Resource ${resourceIndex + 1}`,
                icon: `https://example.com/icons/resource-${resourceIndex + 1}.png`,
                link: `https://example.com/resource-${resourceIndex + 1}`,
            })),
            rewards: [100, 200, 300].map(value => value + prizeIndex * 50),
        }));

        return {
            name: `${possibleTracks[trackIndex % possibleTracks.length]} Track`,
            description: `Description for ${possibleTracks[trackIndex % possibleTracks.length]} track`,
            prizes: prizes,
            total_reward: prizes.reduce((sum, prize) => sum + prize.rewards.reduce((a, b) => a + b, 0), 0),
            partner: possiblePartners[trackIndex % possiblePartners.length],
            resources: Array.from({ length: 2 }, (_, resourceIndex) => ({
                name: `Track Resource ${resourceIndex + 1}`,
                icon: `https://example.com/icons/track-resource-${resourceIndex + 1}.png`,
                link: `https://example.com/track-resource-${resourceIndex + 1}`,
            })),
        };
    });

  
    const partners: Partner[] = Array.from({ length: 2 }, (_, partnerIndex) => ({
        name: `${possiblePartners[partnerIndex % possiblePartners.length]}`,
        about: `About ${possiblePartners[partnerIndex % possiblePartners.length]}`,
        links: Array.from({ length: 2 }, (__, linkIndex) => ({
            name: `Partner Link ${linkIndex + 1}`,
            icon: `https://example.com/icons/partner-link-${linkIndex + 1}.png`,
            link: `https://www.${possiblePartners[partnerIndex % possiblePartners.length].toLowerCase()}.com/link-${linkIndex + 1}`,
        })),
        logo: `https://example.com/logos/partner-${partnerIndex + 1}.png`,
    }));

    return {
        id: `${index + 1}`,
        title: `Hackathon ${index + 1}`,
        description: `This is the description for Hackathon ${index + 1}.`,
        date: hackathonDate.toISOString(),
        location: index % 2 === 0 ? "Online" : `San Francisco, CA (On-site)`,
        total_prizes: 5000.0 + index * 100,
        tags: randomTags,
        status: status,
        agenda: agenda,
        registration_deadline: registrationDeadline.toISOString(),
        address: index % 2 !== 0 ? `123 Hackathon Street, City ${(index % 5) + 1}` : undefined, 
        partners: partners,
        tracks: tracks,
    };
});