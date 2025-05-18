import Job from "./Job";
import Wrapper from "../wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/allJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = () => {
    const { data } = useAllJobsContext()
    //console.log( data );
    const { allJobs,totalJobs,numOfPages } = data;
    //console.log(allJobs) 
    if(allJobs.length === 0){
        return( 
            <Wrapper>
                <h2>No Jobs to display.............</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>{totalJobs} job{totalJobs>1 && 's' } found </h5>
            <div className="jobs">
                {allJobs.map((job)=>{
                    return <Job key={job._id} {...job} />;
                })}
            </div>
            {numOfPages>1 && <PageBtnContainer />}
        </Wrapper>
    );
}

export default JobContainer