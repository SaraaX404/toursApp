import react from 'react'
import {
    MDBCard,
    MDBCol,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBCardImage,
    MDBRow
} from "mdb-react-ui-kit";
import {Link} from 'react-router-dom'
import React from "react";


const RelatedTour = ({relatedTours, tourId}) =>{
    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + " ...";
        }
        return str;
    };

    return (<>
        {relatedTours && relatedTours.length !== 0 && (
                <>
                {relatedTours.length > 1 && <h4>Related Tours</h4>}
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                        {relatedTours.filter((tour)=>tour._id !== tourId).splice(0,3).map((tour)=>(
                        <MDBCardGroup>
                            <MDBCard className="h-100 mt-2 d-sm-flex"
                                     style={{ maxWidth: "20rem", paddingTop: "100px" }}>
                                <Link to={`/tour/${tour._id}`}>
                                    <MDBCardImage  src={tour.imageFile} alt={tour.title} position="top"
                                                   style={{ maxWidth: "100%", height: "180px" }}/>
                                </Link>
                                <span className='text-start tag-card'>
                                {tour.tags.map((tag)=>(
                                    <Link to={`/tag/${tag}`}>
                                        #{tag}
                                    </Link>
                                ))}
                                </span>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>{tour.title}</MDBCardTitle>
                                    <MDBCardText className='text-start'>{excerpt(tour.description)}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardGroup>
                    ))}</MDBRow>

                </>
                    )}


                </>)}

export default RelatedTour
