import { toast } from "react-toastify"
import { StatsItem } from "../components"
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import { redirect } from "react-router-dom"
import customFatch from "../utils/customFatch"
import { useLoaderData } from "react-router-dom"
import Wrapper from '../wrappers/StatsContainer'

export const loader = async() => {
  try{
    //console.log('loader MdCallEnd................')
    const response = await customFatch.get('/users/admin/app-stats')
    console.log(response);
    const {data} = response;
    return data
  } catch(error) {
    toast.error('You are not authorized to view this page...')
    return redirect('/dashboard');
  }
}

const Admin = () => {
  const data = useLoaderData();
  console.log(data);
  const {users,jobs} = data;
  return (
    <Wrapper>
      <StatsItem title='current-user' count = {users} color='#9b949' bcg='#fcefct' icon={<FaSuitcaseRolling />} /> 
      <StatsItem title='total jobs' count = {jobs} color='#647acb' bcg='#e0e8f9' icon={<FaCalendarCheck />} /> 
    </Wrapper>
  );
}
export default Admin;