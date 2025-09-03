import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    // 1️⃣ Auth check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Fetch user + their links from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { links: true },
    });

    console.log("User links:", user ? user.links : "No user found");

    if (!user || user.links.length === 0) {
      return NextResponse.json({ videos: [] }); // no channels, no videos
    }

    // 3️⃣ Parse "days" query param
    const { searchParams } = new URL(req.url);
    let days = parseInt(searchParams.get("days") || "10", 10);
    if (isNaN(days) || days < 1) days = 3;
    if (days > 30) days = 30;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // 4️⃣ Loop over all user links and fetch videos
    const allVideos = [];

    console.log(`Fetching videos from ${user.links.length} channels...`);

    function extractChannelId(url) {
  // Case 1: Full channel URL
  let match = url.match(/channel\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];

  // Case 2: raw channel ID
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(url)) {
    return url; // it's already a channelId
  }

  return null;
}


    for (const linkObj of user.links) {
       const url = linkObj.url;
       const channelId = extractChannelId(url);

       if (!channelId) {
          console.log(`Skipping unsupported link: ${url}`);
          continue;
       }

       console.log(`Fetching RSS for channel ID: ${channelId}`);

      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const res = await fetch(rssUrl);
      if (!res.ok) continue;

      const xmlData = await res.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });
      const jsonData = parser.parse(xmlData);

      console.log(`Fetched RSS for channel ${channelId}`);

      const videos = jsonData.feed.entry?.map((entry) => ({
        id: entry["yt:videoId"],
        title: entry.title,
        link: entry.link.href,
        published: entry.published,
        thumbnail: entry["media:group"]["media:thumbnail"].url,
      })) || [];

      console.log(`Fetched ${videos.length} videos from channel ${channelId}`);

      // filter by date
      const recentVideos = videos.filter(
        (video) => new Date(video.published) >= cutoffDate
      );

      allVideos.push(...recentVideos);
    }

    // 5️⃣ Sort all videos by published date descending
    allVideos.sort((a, b) => new Date(b.published) - new Date(a.published));

    return NextResponse.json({ videos: allVideos });
  } catch (err) {
    console.error("GET /youtube error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function POST(req) {
   try{
      
      // auth check
      const session = await getServerSession(authOptions);
      if(!session){
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const { links } = await req.json();
      console.log("Links: ", links); 
      
      // fetch user from db
      let user = await prisma.user.findUnique({
         where: { email: session.user.email },
      });
      
      // if user not found, create new user
      if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
        },
      });
    }
      
      const result = await prisma.$transaction(async (tx) => {
         // delete old links
         await tx.link.deleteMany({ where: { userId: user.id } });

         // insert new links
         await tx.link.createMany({
            data: links.map((url) => ({ url, userId: user.id })),
         });

         // fetch the fresh list
         const newLinks = await tx.link.findMany({
            where: { userId: user.id },
         });

         return newLinks;
      });


      return NextResponse.json({ result } );

   }
   catch(err){
      return NextResponse.json({ error: err.message }, { status: 500 });
   }
}