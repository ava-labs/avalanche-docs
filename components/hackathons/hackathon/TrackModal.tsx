import { Track } from "@/types/hackathons";
import { DynamicIcon } from "lucide-react/dynamic";
import defaultMdxComponents from "fumadocs-ui/mdx";
type Props = {
  track: Track;
};
export default function TrackDialogContent({ track }: Props) {
  // const { body: MDX } = track.description.load();
  return (
    <div className="max-w-lg mx-auto text-white rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-4 bg-red-500 rounded-full">
          <DynamicIcon name={track.logo as any} size={20} />
        </div>
        <h2 className="text-xl font-semibold">{track.name}</h2>
      </div>
      <span className="block w-full h-[1px] mt-4 bg-red-500"></span>
      <p>{track.description}</p>
      {/* <MDX components={defaultMdxComponents} /> */}
    </div>
  );
}
