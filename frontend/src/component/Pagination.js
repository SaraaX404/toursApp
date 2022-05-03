import react from 'react'
import {MDBPagination, MDBPaginationItem, MDBBtn} from 'mdb-react-ui-kit'
const Pagination = ({setCurrentPage, numberOfPages, currentPage, dispatch, tours}) =>{
    const renderPagination = () =>{
        if((numberOfPages === currentPage && currentPage === 1) ){
            return null
        }

        if(currentPage === 1){
            return(
                <MDBPagination center className='mb-0'>
                    <MDBPaginationItem>
                        <p className='fw-bold mt-1 '>
                            1
                        </p>

                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage+1))}>
                            next
                        </MDBBtn>

                    </MDBPaginationItem>
                </MDBPagination>
            )
        }else if(currentPage !== numberOfPages){
            return(
                <MDBPagination center className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage-1))}>
                            prev
                        </MDBBtn>

                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <p className='fw-bold mt-1 '>
                            {currentPage}
                        </p>

                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage+1))}>
                            next
                        </MDBBtn>

                    </MDBPaginationItem>
                </MDBPagination>
            )
        }else{
            return(
                <MDBPagination center className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage-1))}>
                            prev
                        </MDBBtn>

                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <p className='fw-bold mt-1 '>
                            {currentPage}
                        </p>

                    </MDBPaginationItem>

                </MDBPagination>
            )
        }
    }
    return(
        <div className='mt-2'>
            {renderPagination()}
        </div>
    )
}

export default Pagination