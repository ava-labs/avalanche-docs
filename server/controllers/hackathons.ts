import { HackathonsList, getHackathonLite } from '@/server/services/hackathons';
import { Hackathon, HackathonLite } from '@/types/hackathons';

interface GetHackathonsOptions {
  page?: number;
  pageSize?: number;
  location?: string | null;
  date?: string | null;
  status?: string | null;
  search?: string;
}

/**
 * Filtra y pagina la lista de hackathons según los parámetros proporcionados.
 */
export function getFilteredHackathons({
  page = 1,
  pageSize = 10,
  location,
  date,
  status,
  search = '',
}: GetHackathonsOptions) {
  search = search.toLowerCase();

  const filteredHackathons = HackathonsList.filter((hackathon) => {
    let matched = true;

    if (search) {
      matched &&=
        hackathon.title.toLowerCase().includes(search) ||
        hackathon.location.toLowerCase().includes(search);
    }

    if (location) {
      if (location === 'InPerson') {
        matched &&= hackathon.location.toLowerCase() !== 'online'; // Exclude "online"
      } else {
        matched &&= hackathon.location === location; // Regular filtering
      }
    }
    if (date) matched &&= hackathon.date === date;
    if (status) matched &&= hackathon.status == status;

    return matched;
  });

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedHackathons: Hackathon[] = filteredHackathons.slice(
    startIndex,
    endIndex
  );

  const hackathonsLite: HackathonLite[] =
    paginatedHackathons.map(getHackathonLite);

  return {
    hackathons: hackathonsLite,
    total: filteredHackathons.length,
  };
}


export function getHackathons() {
  return HackathonsList;
}



export function getHackathon(id: string) {
  return HackathonsList.find((hackathon) => hackathon.id === id);
}
