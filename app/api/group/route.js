import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(res){
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const groups = await prisma.group.findMany({
            where: { user: { email: session.user.email }},
        })

        return NextResponse.json(groups);
    }
    catch(err){
        return NextResponse.json(
          { error: "Failed to fetch groups." },
          { status: 500 }
      );
    }
}

export async function POST(res){
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { gname } = await res.json();

        const group_data = await prisma.group.create({
            data: {
                name: gname,
                user: { connect: { email: session.user.email } }
            }
        });

        return NextResponse.json(group_data);
    }
    catch(err){
        if (err.code === "P2002") {
          return NextResponse.json(
              { error: "Same group name already exists!" },
              { status: 409 } // conflict
          );
      }
      throw err;
    }
}