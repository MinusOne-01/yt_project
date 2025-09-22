import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req){
   try{
       const session = await getServerSession(authOptions);
       if (!session) {
           return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
       }

       const { linkId, groupId } = await req.json();

       await prisma.group.update({
           where: { id: groupId },
           data: {
               links: { connect: { id: linkId } }
           }
       });

       return NextResponse.json({ message: "Channel added to group successfully" });
   }
   catch(err){
    return NextResponse.json(
          { error: "Failed to edit group folder" },
          { status: 500 }
        );
   }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { linkId, groupId } = await req.json();

    await prisma.group.update({
      where: { id: groupId },
      data: {
        links: {
          disconnect: { id: linkId },
        },
      },
    });

    return NextResponse.json({
      message: "Channel removed from group successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to remove channel from group" },
      { status: 500 }
    );
  }
}