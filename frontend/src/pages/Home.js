import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getTours, getToursByTag} from "../redux/features/tourSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import CardTour from "../component/CardTour";
import Spinner from "../component/Spinner";
import {useParams} from 'react-router-dom'
import Pagination from "../component/Pagination";
import {setCurrentpage} from "../redux/features/tourSlice";


const Home = () => {
    console.log(window.location.href)
    const {loading, tours, currentPage, numberOfPages} = useSelector((state) => ({...state.tour}));
    const dispatch = useDispatch();
    const url = window.location.href
    const {id} = useParams()
    console.log(id)
    useEffect(() => {
        if (id) {
            dispatch(getToursByTag(id))
        }
        if (url == "http://localhost:3000/") {
            dispatch(getTours(currentPage));
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
            {url == "http://localhost:3000/"&&(
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
