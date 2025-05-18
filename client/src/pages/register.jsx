import { Link,Form,redirect,useNavigation } from "react-router-dom";
import Wrapper from '../wrappers/RegisterAndLoginPage'
import { Logo,FormRow,SubmitBTN } from '../components'
import  customFatch from '../utils/customFatch'
import { toast } from 'react-toastify'

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try{
    await customFatch.post('/auth/register',data);
    toast.success('Registration Successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.message)
    //console.log(error);
    return error;
  } 
}

const Register = () => {
  // const Nevigation = useNavigation();
  // console.log(Nevigation);
  // const isSubmitting = Nevigation.state === 'submitting' 
  return (
    <Wrapper>
      <Form method = 'post' className='form' >
        <Logo></Logo>
        <h4>Register</h4>
         
        <FormRow type='text' name='name' labelText='Name' />
        <FormRow type='text' name='lastName' labelText='Last Name' />
        <FormRow type='text' name='location' labelText='Location' />
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='Password' name='password' labelText='Password' />


        {/* <button type="submit" className="btn btn-block"  disabled={isSubmitting}>
          {isSubmitting ? 'submitting......':'submit'}
        </button> */}
        <SubmitBTN />
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login 
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;

// This code defines a React functional component named "register".
// The component returns a JSX structure that includes a heading and a paragraph.