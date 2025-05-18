import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../wrappers/PageBtnContainer';
import { useLocation,Link,useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/allJobs';

const PageBtnContainer = () =>{
    const {data:{numOfPages,currentPage} } = useAllJobsContext() 
    //console.log(numOfPages);//10
    //console.log(currentPage);//1
    const pages = Array.from({length:numOfPages},(_,index)=>{
        return index+1
    }) // This will create a list of length of numOfPages with all item is undefined
    //console.log(pages);

    const {search, pathname} = useLocation();
    const navigate = useNavigate();
    const handlePageChange = (pageNumber)=>{
        // console.log(pageNumber)
        // console.log(search);
        // console.log('ausujdfjkdnfkld');
        // console.log(pathname);
        const searchParams = new URLSearchParams(search);
        searchParams.set('page',pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    const addPageButton = ({pageNumber,activeClass}) =>{
        return (
            <button className={`btn page-btn ${activeClass && 'active'}`} key={pageNumber} onClick={()=> handlePageChange(pageNumber)}>
                {pageNumber}
            </button>
        );
    }

    const renderPageButton = ()=>{
        const pageButtons = [];
        pageButtons.push(addPageButton({pageNumber:1,activeClass:currentPage===1}))
        // current page
        if(currentPage > 2){
            if(currentPage !== 3){
                pageButtons.push(<span className='page-btn dots' key='dots-1'> ... </span>)
            }
            pageButtons.push(addPageButton({pageNumber:currentPage-1,activeClass:false}))
        }
        if(currentPage !== 1 && currentPage !== numOfPages ){
            pageButtons.push(addPageButton({pageNumber:currentPage,activeClass:true}))
        }
        if(currentPage < (numOfPages-1)){
            pageButtons.push(addPageButton({pageNumber:currentPage+1,activeClass:false}))
            if(currentPage !== numOfPages-2){
                pageButtons.push(<span className='page-btn dots' key='dots+1'> ... </span>)
            }
        }
        pageButtons.push(addPageButton({pageNumber:numOfPages,activeClass:currentPage=== numOfPages})) 
        return pageButtons
    }

    return (
        <Wrapper>
            <button className='btn prev-btn' onClick={()=>{
                let prevPage = currentPage-1;
                if(prevPage<1) prevPage = 1;    
                handlePageChange(prevPage);
            }}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className='btn-container'>
                {/* {pages.map((pageNumber)=>{
                    return (
                        <button className={`btn page-btn ${pageNumber === currentPage && 'active'}`} key={pageNumber} onClick={()=> handlePageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    );
                })} */}
                {renderPageButton()}
            </div>
            <button className='btn forw-btn' onClick={()=>{
                let nextPage = currentPage+1;
                if(nextPage>numOfPages ) nextPage = numOfPages;    
                handlePageChange(nextPage);
            }}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
}

export default PageBtnContainer;