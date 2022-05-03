import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBCardImage,
  MDBIcon,
    MDBBtn
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {getRelatedTours, getTour} from "../redux/features/tourSlice";
import RelatedTour from "../component/RelatedTour";
import DisqusThread from "../component/DisqusThread";

const SingleTour = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => state.tour);
  const { id } = useParams();
  //dispatch get single tour action and pass the id value to it
  useEffect(() => {

    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);
  const tags = tour?.tags
  //dispatch get related tours action and pass the tags to it
  useEffect(()=>{
    console.log(tags)
    tags && dispatch(getRelatedTours(tags))
  }, [tags])

  return (
    <>
      < MDBContainer style={{ paddingTop: "100px" }}>

        <MDBCard className="mb-3 mt-2">

          <MDBCardImage
            position="top"
            style={{ width: "500px" }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <MDBBtn tag={'a'} onClick={()=> navigate('/') } color='none' style={{position:"absolute", left:"0%", color:"#000"}}>
              <MDBIcon fas size='lg' icon='long-arrow-alt-left' style={{float:"left"}}/>
            </MDBBtn>
            <h3>{tour?.title}</h3>
            <span>
              <p className="text-start"> Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((tag) => `#${tag}`)}
              </span>
            </div>
            <MDBCardText>
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calender-alt"
                size="lg"
              />
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
            <small className="text-muted">
              {moment(tour.createAt).fromNow()}
            </small>
          </MDBCardBody>



        </MDBCard>
        <RelatedTour relatedTours={relatedTours} tourId={id} />
      <DisqusThread title={tour.title} id={id} path={`/tour/${id}`}/>
      </MDBContainer>
    </>
  );
};

export default SingleTour;
