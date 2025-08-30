import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req) {
   try{  
     
    // video ID 
    const channelId = "UCsBjURrPoezykLs9EqgamOA";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    // days parameter from url
    const { searchParams } = new URL(req.url);
    let days = parseInt(searchParams.get('days') || '10', 10);

    if (isNaN(days) || days < 1) days = 3; // default to 3 days if invalid
    if (days > 30) days = 30; // max limit to 30 days
    
    // fetching and parsing rss feed
    const res = await fetch(rssUrl);
    const xmlData = await res.text();

    const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: ""
        });
    const jsonData = parser.parse(xmlData);
    
    // extracting video details
    const videos = jsonData.feed.entry.map((entry) => ({
      id: entry["yt:videoId"],
      title: entry.title,
      link: entry.link.href,
      published: entry.published,
      thumbnail: entry["media:group"]["media:thumbnail"].url,
    }));
    
    //filter for videos
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    console.log(days);
    const recentVideos = videos.filter(video => new Date(video.published) >= cutoffDate);

    return NextResponse.json(recentVideos);
   }

   catch(err){
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
      const user = await prisma.user.findUnique({
         where: { email: session.user.email },
      });

      if(!user){
         return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      // store links in db 
      const created = await prisma.link.createMany({
         data: links.map((url) => ({ url, userId: user.id })),
         skipDuplicates: true,
      });

      return NextResponse.json({ created } );

   }
   catch(err){
      return NextResponse.json({ error: err.message }, { status: 500 });
   }
}