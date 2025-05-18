import { toast } from 'react-toastify'
import { JobContainer,SearchContainer } from '../components'
import customFatch from '../utils/customFatch';
import { useLoaderData } from 'react-router-dom';
import { useContext,createContext } from 'react';

export const loader = async ({ request }) => {
  //console.log(request.url)
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  //console.log(params);

  try{
    const { data } = await customFatch.get('/jobs',{params,});
    return {data,searchValues: {...params}};
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {
  const {data,searchValues} = useLoaderData()
  //console.log(data);
  return (
    <AllJobsContext.Provider value = {{data,searchValues}}>
      <SearchContainer/>
      <JobContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;