import { ChartsContainer,StatsContainer } from "../components";
import customFatch from "../utils/customFatch";
import { useLoaderData } from "react-router-dom";


export const loader = async() => {
  try{
    const response = await customFatch.get('/jobs/stats')
    return response.data;
  } catch(error) {
    return error;
  }
}

const Stats = () => {
    const data = useLoaderData()
    console.log(data);
    const {defaultStats,monthlyApplication} = data;
    return (
      <>
        <StatsContainer defaultStats={defaultStats} />
        {
          monthlyApplication?.length > 1 && (
            <ChartsContainer data={monthlyApplication} />
          )
        }
      </>
    );
  }
  

export default Stats;