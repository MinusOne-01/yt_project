import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";


// Helper to get channelId from a video URL
async function getChannelIdFromVideo(videoUrl) {
  // Normalize video link (in case user only gives videoId)
  if (!/^https?:\/\//i.test(videoUrl)) {
    videoUrl = `https://${videoUrl}`;
  }

  const res = await fetch(videoUrl);
  if (!res.ok) throw new Error("Failed to fetch video page");

  const html = await res.text();

  // Regex to extract channelId
  const match = html.match(/"channelId":"(UC[\w-]{22})"/);
  return match ? match[1] : null;
}


// Helper to get video metadata using oEmbed
async function getChannelMetadata(videoUrl) {
  try {
    // Step 1: Get channel name + author_url from oEmbed
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) return null;

    const data = await res.json();
    const channelName = data.author_name;
    const channelUrl = data.author_url;

    // Step 2: Fetch channel page to extract logo
    const channelRes = await fetch(channelUrl);
    if (!channelRes.ok) return { channelName, channelLogo: null };

    const html = await channelRes.text();
    const logoMatch = html.match(/"avatar":\{"thumbnails":\[\{"url":"(https:\/\/yt3\.googleusercontent\.com\/[^\"]+)"/);

    const channelLogo = logoMatch ? logoMatch[1] : null;

    return { channelName, channelLogo };
  } catch (err) {
    console.error("Error fetching channel metadata:", err);
    return null;
  }
}


export async function POST(req) {
  try {
    // auth check then get url
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: session.user.email },
      });
    }

    let { url } = await req.json();
    
    //get Id from video url
    const channelId = await getChannelIdFromVideo(url);
    if (!channelId) {
      return NextResponse.json({ error: "Invalid YouTube video URL" }, { status: 400 });
    }
    
    // get video metadata
    const channel_data = await getChannelMetadata(url);
    if (!channel_data) {
      return NextResponse.json({ error: "Failed to fetch video metadata" }, { status: 400 });
    }
    
    const link_data = await prisma.link.create({
      data: {
        channelId, 
        user: { connect: { email: session.user.email } },
        meta: {
          create: {
            name: channel_data.channelName,
            logo: channel_data.channelLogo,
          },
        },
      },
      include: { meta: true },
    });

    return NextResponse.json(link_data);
  }
  catch (err) {
      if (err.code === "P2002") {
          return NextResponse.json(
              { error: "This channel is already saved for this user." },
              { status: 409 } // conflict
          );
      }
      throw err;
  }
}  

export async function GET(req) {
  try {
    // auth check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const links = await prisma.link.findMany({
      where: { user: { email: session.user.email } },
      include: { meta: true, group: true },
    });
    return NextResponse.json(links);
  }
  catch (err) {
      return NextResponse.json(
          { error: "Failed to fetch links." },
          { status: 500 }
      );
  }
}

export async function DELETE(req) {
  try {
    // auth check then get id
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    
    // delete the link
    await prisma.link.deleteMany({
      where: { channelId: id
        , user: { email: session.user.email } },
    });

    return NextResponse.json({ message: "Link deleted successfully" });
  }
  catch (err) {
      return NextResponse.json(
          { error: "Failed to delete link." },
          { status: 500 }
      );
  }
}

