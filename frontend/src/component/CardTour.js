import React,{useState} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBCardImage, MDBBtn, MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {likeTour} from "../redux/features/tourSlice";


//create like component
const Like = ({likes, userID, handleClick}) =>{
  if(likes.find((like)=> like==userID)){
  return (
     <MDBBtn style={{float:"right"}}  tag="a" color='none' onClick={handleClick}>
       <MDBIcon fas icon='thumbs-up' color='blue' size='1x'/>
     </MDBBtn>
  )}else{
    return (
        <MDBBtn style={{float:"right"}}  tag="a" color='none' onClick={handleClick}>
          <MDBIcon far icon='thumbs-up' color='blue' size='1x'/>
        </MDBBtn>
    )
  }
}


const CardTour = ({ imageFile, description, title, name, tags, _id, likes }) => {
  const {user} = useSelector((state)=> ({...state.auth}))
  const userID = user?.result?._id
  const dispatch = useDispatch()
  const handleClick = () =>{
    dispatch(likeTour(_id))
  }



  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard
        className="h-100 mt-2 d-sm-flex"
        style={{ maxWidth: "20rem", paddingTop: "100px" }}
      >
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        {user&&(
            <Like
            userID={userID}
            likes={likes}
            handleClick={handleClick}
            />
        )
        }
        <b>{`Likes:${likes.length}`}</b>
        <div className="top-left" style={{paddingLeft:"19px"}}>{`Created By:Mr.${name}`}</div>

        <span className="text-start tag-card" style={{paddingLeft:"25px"}}>
          {tags.map((item) => (
              <Link to={`/tag/${item}`}>
                 #{item}
              </Link>
          ))}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start" style={{color:"blue"}}>{title}</MDBCardTitle>
          <MDBCardTitle className="text-start" style={{fontSize:"15px"}}>
            {excerpt(description)}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
