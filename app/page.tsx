import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options';
import Customer from './components/Customer'
import Admin from './components/Admin'

 const Home = async () =>{

 const user = await getServerSession(options);

  return (
  <p>
   {user?.user.role === "CUSTOMER" ? <Customer/> : <Admin/>}
  </p>
  )
}

export default Home;
