import { Innertube } from 'youtubei.js/web';

export async function POST(req) {
  try {
    console.log("Request hit!");
    const { videoId } = await req.json();
    
    // Initialize YouTube client
    const yt = await Innertube.create({
      lang: 'en',
      location: 'US',
      retrieve_player: false,
    });

    console.log("Fetching info for:", videoId);
    
    // Get video info
    const info = await yt.getInfo(videoId);
    
    // Get transcript
    const transcriptData = await info.getTranscript();
    
    if (!transcriptData) {
      return Response.json(
        { error: 'No transcript available for this video' },
        { status: 404 }
      );
    }

    // Extract segments
    const segments = transcriptData.transcript.content.body.initial_segments;

    const firstMinuteSegments = segments.filter(segment => Number(segment.start_ms) < 60000);

    const transcript = firstMinuteSegments.map(segment => segment.snippet.text).join(' ');
    
    return Response.json({ 
      success: true,
      transcript 
    });
    
  } catch (err) {
    console.error("Transcript fetch error:", err);
    return Response.json({ 
      error: err.message,
      hint: 'Make sure the video has subtitles enabled'
    }, { status: 500 });
  }
}
