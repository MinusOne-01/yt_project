import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    console.log("Feed fetch request");
    // 1️⃣ Auth check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Fetch user + their links from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { links: { select: { channelId: true } } }
    });

    if(links === 0) return;
    const channelIds = user.links.map(link => link.channelId);

    if (!channelIds || channelIds.length === 0) {
      return NextResponse.json({ videos: [] }); // no channels, no videos
    }

    // 3️⃣ Parse "days" query param
    const { searchParams } = new URL(req.url);
    let days = parseInt(searchParams.get("days") || "10", 10);
    console.log(days);
    if (isNaN(days) || days < 1) days = 3;
    if (days > 30) days = 30;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    // 4️⃣ Loop over all user links and fetch videos
    const allVideos = [];

    for (const linkObj of channelIds) {
       const channelId = linkObj;

       if (!channelId) {
          console.log(`Skipping unsupported link: ${url}`);
          continue;
       }


      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const res = await fetch(rssUrl);
      if (!res.ok) continue;

      const xmlData = await res.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });
      const jsonData = parser.parse(xmlData);

      const videos = jsonData.feed.entry?.map((entry) => ({
        id: entry["yt:videoId"],
        channelId: channelId,
        title: entry.title,
        author: entry.author.name,
        link: entry.link.href,
        published: entry.published,
        thumbnail: entry["media:group"]["media:thumbnail"].url,
      })) || [];

      // filter by date
      const recentVideos = videos.filter(
        (video) => new Date(video.published) >= cutoffDate
      );

      allVideos.push(...recentVideos);
    }

    // 5️⃣ Sort all videos by published date descending
    allVideos.sort((a, b) => new Date(b.published) - new Date(a.published));
    
    return NextResponse.json({ videos: allVideos });
  }
  catch(err){
    console.error("GET /youtube error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

