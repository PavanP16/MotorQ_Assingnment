import { db } from "@/lib/db"
import AddVehicle from "./EnrollVehicle"

const Customer = async() => {

  const vehicles = await db.vehicle.findMany({});
 
  return (
    <div>
      <AddVehicle vehicles={vehicles} />
    </div>
  )
}

export default Customer
