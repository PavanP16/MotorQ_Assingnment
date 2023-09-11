"use client"

const CustomerEnrollments = ({CustomerEnrollement}:any) => {
  return (
    <div>
       <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Enrolled Vehicles</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-teal-500 text-white">
          <tr>
            <th className="px-4 py-2">Make</th>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">VIN</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
         
        {CustomerEnrollement.map((vehicle:any) => (
            <tr
              key={vehicle.id}
            >
              <td className="px-4 py-2">{vehicle.vehicle.make}</td>
              <td className="px-4 py-2">{vehicle.vehicle.model}</td>
              <td className="px-4 py-2">{vehicle.vehicle.year}</td>
              <td className="px-4 py-2">{vehicle.vin}</td>
              <td className="px-4 py-2">{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default CustomerEnrollments
