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
    
    const transcript = segments.map(segment => ({
      text: segment.snippet.text,
      start: segment.start_ms / 1000,
      duration: (segment.end_ms - segment.start_ms) / 1000,
    }));

    const fullText = transcript.map(t => t.text).join(' ');

    console.log("Transcript fetched successfully! Segments:", transcript.length);
    
    return Response.json({ 
      success: true,
      transcript,
      fullText 
    });
    
  } catch (err) {
    console.error("Transcript fetch error:", err);
    return Response.json({ 
      error: err.message,
      hint: 'Make sure the video has subtitles enabled'
    }, { status: 500 });
  }
}
