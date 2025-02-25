import type { NextPage } from 'next';
import { YouTubeEmbed } from '@next/third-parties/google'

interface YoutubePlayerProps {
  videoId: string;
  params: string;
}

const YoutubePlayer: NextPage<YoutubePlayerProps> = ({ videoId, params = "" }) => {

  return (<YouTubeEmbed videoid={videoId} width={560} height={315} params={params}/>);
};

export default YoutubePlayer;
