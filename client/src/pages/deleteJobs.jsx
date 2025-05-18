import { redirect } from "react-router-dom";
import customFatch from "../utils/customFatch";
import { toast } from 'react-toastify'

export const action = async ({params}) => {
  console.log('🔥 DELETE ACTION CALLED!', params); // <--- debug log
  console.log(params);
  const { id } = params; 
  try{
    await customFatch.delete(`/jobs/${id}`);
    toast.success('job deleted Successfully ')
  } catch( error ) {
    toast.error(error?.response?.data?.message)
  }
  return redirect('/dashboard/all-jobs');
}

// At the bottom of deleteJobs.jsx
export default function DeleteJob() {
  return null; // or some basic JSX, if you want
}

