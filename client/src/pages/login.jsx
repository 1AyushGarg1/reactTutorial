import { Link,Form,redirect,useNavigation, useNavigate, Navigate } from "react-router-dom";
import Wrapper from '../wrappers/RegisterAndLoginPage'
import { Logo, FormRow, SubmitBTN } from '../components'
import  customFatch from '../utils/customFatch'
import { toast } from 'react-toastify'

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try{
    await customFatch.post('/auth/login',data);
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.message)
    //console.log(error);
    return error;
  } 
}

const Login = () => {
  // const Nevigation = useNavigation();
  // console.log(Nevigation);
  // const isSubmitting = Nevigation.state === 'submitting' 
  const Navigate = useNavigate();
  const loginDemoTestUser = async () =>{
    const data = {
      email :'test@test.com',
      password :'secret123',
    }
    try{
      await customFatch.post('/auth/login',data);
      toast.success('Take a test drive');
      Navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } 
  }
  return (
    <Wrapper>
      <Form method='post' className='form' >
        <Logo></Logo>
        <h4>Login</h4>
        
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='Password' name='password' labelText='Password' />

        {/* <button type="submit" className="btn btn-block"  disabled={isSubmitting}>
          {isSubmitting ? 'submitting......':'submit'}
        </button> */}
        <SubmitBTN />
        <button type="submit" className="btn btn-block" onClick={loginDemoTestUser}>
          Explore the App
        </button>
        <p>
          Not a Member?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Login;
