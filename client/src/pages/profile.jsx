import { FormRow,SubmitBTN } from '../components'
import Wrapper from '../wrappers/DashboardFormPage'
import { useOutletContext,useNavigation,Form, redirect } from 'react-router-dom';
import customFatch from '../utils/customFatch';
import { toast } from 'react-toastify'


export const action = async( {request }) => {
  const formData = await request.formData()
  const file  = formData.get('avatar');
  if(file && file.size > 500000){
    toast.error('Image size is too big......')
    return null;
  }
  try{
    await customFatch.patch('/users/update-user',formData)
    toast.success('Profile updated successfully ...')
  } catch(error) {
    toast.error(error?.response?.data?.message)
  }
  return null;
}

const Profile = () => {
  const { User } = useOutletContext()
  //console.log(User);
  const { name,lastName,email,location } = User;
  // const Navigation = useNavigation()
  // const isSubmitting = Navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'> 
        <h4 className='form-title'>profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor='avatar' className='form-label'>
              Select an image file(max 0.5Mb)
            </label>
            <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*' />
          </div>
          <FormRow type='text' name='name' defaultValue={name} />
          <FormRow type='text' name='lastName'labelText='last name' defaultValue={lastName} />
          <FormRow type='text' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          {/* <button className='btn btn-block form-btn' type='submit' disabled={isSubmitting} >
            {isSubmitting ? 'submitting.....': 'submit'}
          </button> */}
          <SubmitBTN formData />
        </div>
      </Form>
    </Wrapper>
  );
}

export default Profile;