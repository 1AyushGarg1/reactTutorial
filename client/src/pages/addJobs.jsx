import { FormRow,FormRowSelect,SubmitBTN } from '../components'
import Wrapper from '../wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom';// to get the user  value provided by the dashboardlayout page
import { JOB_STATUS,JOB_TYPE } from '../../../utils/constants.js';
import { Form,useNavigation,redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFatch from '../utils/customFatch'; 


export const action = async ({ request }) =>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try{
    await customFatch.post('/jobs/',data);
    toast.success('Job added Successful');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.message)
    //console.log(error);
    return error;
  } 
}

const addJobs = () => {
  const { User }  = useOutletContext();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'> add job </h4>
        <div className='form-center'>
          <FormRow  type = 'text' name= 'position' />
          <FormRow  type = 'text' name= 'company' />
          <FormRow  type = 'text' labelText ='job location' name= 'jobLocation' defaultValue={User.location} />

          <FormRowSelect labelText='job status' name='jobStatus' defaultValue={JOB_STATUS.PENDING} list ={Object.values(JOB_STATUS)} />
          <FormRowSelect labelText='job type' name='jobType' defaultValue={JOB_TYPE.FULL_TIME} list ={Object.values(JOB_TYPE)} />

          {/* <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? 'submitting........' : 'submit'}
          </button> */}
          <SubmitBTN formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}
export default addJobs;