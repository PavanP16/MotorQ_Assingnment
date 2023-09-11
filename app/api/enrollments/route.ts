import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getServerSession(options);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {

    let { make,model,vinPrefix,vinSuffix,year,licensePlate } = await req.json();
    // Process and save the form data (create a document) here
    year = parseInt(year);

    const Vehicle_Id = await db.vehicle.findUnique({
        where: {
           vinPrefix,
        },
    });


    let vn_full = vinPrefix + vinSuffix;

    const EnrollmentRequest = await db.enrollmentRequest.create({
      //@ts-expect-error
      data:{
        vehicleId: Vehicle_Id?.id,
        userId: user.user.sub,
        licensePlate: licensePlate,
        vin: vn_full,
      }
    });

    if (EnrollmentRequest)
      return new Response("Successfully created a document", { status: 200 });
    else return new Response("Failed to create a document", { status: 500 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}



