import { FormRow,FormRowSelect,SubmitBTN } from '../components'
import Wrapper from '../wrappers/DashboardFormPage'
import { useLoaderData, useParams  } from 'react-router-dom';
import { JOB_STATUS,JOB_TYPE } from '../../../utils/constants';
import { Form,useNavigation,redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFatch from '../utils/customFatch';
import Job from '../components/Job';

export const loader = async ({params}) => {
  const { id } = params;
  //console.log(id);
  // now make a get request on the route to get the data of this job
   try{
    const { data } = await customFatch.get(`/jobs/${id}`);
    //console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return redirect('/dashboard/all-jobs');
  } 
}
export const action = async ({request,params}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { id } = params;
  try{
    await customFatch.patch(`/jobs/${id}`,data);
    toast.success('job edited successfully.......')
    return redirect('/dashboard/all-jobs');
  } catch(error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const EditJobs = () => {
  const params = useParams()
  const { singleJob } = useLoaderData();
  // const navigation  = useNavigation();
  // const isSubbmitting = navigation.state === 'submitting'
  //console.log(params);
    return (
      <Wrapper>
        <Form method='post' className='form'>
          <h4 className='form-title'>edit job</h4>
          <div className="form-center">
            <FormRow type='text' name='position' defaultValue={singleJob.position} />
            <FormRow type='text' name='company' defaultValue={singleJob.company} />
            <FormRow type='text' name='jobLocation' labelText='job location' defaultValue={singleJob.jobLocation} />
            <FormRowSelect name='jobStatus' labelText='job status' defaultValue={singleJob.jobStatus} list={Object.values(JOB_STATUS)} />
            <FormRowSelect name='jobType' labelText='job type' defaultValue={singleJob.jobType} list={Object.values(JOB_TYPE)} />
            {/* <button type='submit' className='btn btn-block form-btn' disabled={isSubbmitting}>
              {isSubbmitting ? 'submitting......':'submit'}
            </button> */}
            <SubmitBTN formData/>
          </div>
        </Form>
      </Wrapper>
    );
}
export default EditJobs;