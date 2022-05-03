import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getTours, getToursByTag, searchTours} from "../redux/features/tourSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import CardTour from "../component/CardTour";
import Spinner from "../component/Spinner";
import {useParams} from 'react-router-dom'
import Pagination from "../component/Pagination";
import {setCurrentpage} from "../redux/features/tourSlice";
import {useLocation} from 'react-router-dom'
const useQuery = () =>{
    return new URLSearchParams(useLocation().search)
}
const Home = () => {

    console.log(window.location.href)
    const query = useQuery()
    const searchQuery = query.get('searchQuery')

    const {loading, tours, currentPage, numberOfPages} = useSelector((state) => ({...state.tour}));
    const dispatch = useDispatch();
    const url = window.location.href
    const {id} = useParams()
    console.log(id)
    useEffect(() => {
        //if the user clicked any tag it will link to /:tagId, useParams will catch the is and store it on variable if the tag variable is changed or added, the use effect will be run.
        if (id) {
            dispatch(getToursByTag(id))
        }
        //if there are no any taggable api calls, this will automatically get all the tour data
        if (url == "http://localhost:3000/") {
            dispatch(getTours(currentPage));
        }
        //if someone is refresh after search he will get same data
        if(searchQuery){
            dispatch(searchTours({search:searchQuery, currentPage}))
        }





    }, [id, url, currentPage]);


    return loading ? (
        <Spinner/>
    ) : (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                allignContent: "center",
            }}
        >
            <MDBRow>
                {tours.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Tours Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {tours &&
                            tours.map((item, index) => <CardTour key={index} {...item} />)}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {tours.length > 6&&(
                <Pagination
                    setCurrentPage={setCurrentpage}
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    dispatch={dispatch}
                    tours={tours}
                />
            )}



        </div>
    );
}

export default Home
