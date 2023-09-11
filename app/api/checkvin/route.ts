import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";

export async function POST(req: Request) {

    const user = await getServerSession(options);
    console.log("Data");

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const { make , model, year  } = await req.json();
        console.log(make,model,year);

        const data = await db.vehicle.findUnique({
            //@ts-expect-error
            where: {
                make: make,
                model: model,
                year: year,
            },
        });

        if (data)
            return new Response("Successfully updated a document", { status: 200 });
        else return new Response("Failed to update a document", { status: 500 });

    } catch (error) {
        console.log(error);
        
    }

}