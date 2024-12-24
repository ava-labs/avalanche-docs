import {getInstructorsByNames} from '@/content/common/intro/instructors'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

function Instructor ({ id } : { id : string }){
    return (
      <div>
        <iframe
          className="aspect-video w-full"
          src={"https://www.youtube.com/embed/" + id}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    );
  };

export default function Instructors ({ names } : { names : string[] }) {
    return (
        <div className="flex flex-col space-y-4">
            {getInstructorsByNames(names).map((instructor) => (
                <Link href={instructor.twitter} target="_blank" key={uuidv4()} className="flex text-muted-foreground hover:text-foreground">
                    <img 
                        src={`/common-images/intro/instructors/${instructor.name.toLowerCase().replaceAll(" ", "-")}.jpeg`} 
                        alt={instructor.name} 
                        className="w-12 h-12 rounded-full" 
                    />
                    <div className="flex flex-col ml-3 my-auto">
                        <div className="font-semibold">
                            {instructor.name}
                        </div>
                        <div className="text-xs">
                            {instructor.title}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}