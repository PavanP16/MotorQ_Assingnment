import { getServerSession } from 'next-auth'
import {options} from '@/app/api/auth/[...nextauth]/options'
import CustomerEnrollments from '../components/CustomerEnrollments'
import AdminRequests from '../components/AdminRequests';
import { db } from '@/lib/db';
const page = async () => {
    
 const user = await getServerSession(options);

 const EnrollmentRequests = await db.enrollmentRequest.findMany({
    include: {
      user: true,
      vehicle: true,
    },

 }) ;


 const CustomerEnrollment = await db.enrollmentRequest.findMany({
    where: {
      userId: user?.user.id,
    },
    include: {
      user: true,
      vehicle: true,
    },
  });



  return (
    <div>
      {user?.user.role === "CUSTOMER" ? <CustomerEnrollments CustomerEnrollement={CustomerEnrollment}/> : <AdminRequests EnrollmentRequests={EnrollmentRequests}/>}
    </div>
  )
}

export default page
