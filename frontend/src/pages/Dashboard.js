import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTours, getToursByUser } from "../redux/features/tourSlice";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };
  const dispatch = useDispatch();
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    dispatch(getToursByUser());
  }, []);



  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("Are your sure you wants to delete this tour?")) {
      dispatch(deleteTours({ toast, id }));
    }
  };

  return loading ? (
    <Spinner />
  ) :userTours.length!==0?(
    <div style={{ paddingTop: "100px" }}>
      <h1>Dashboard: {user?.result?.name}</h1>
      {userTours &&
        userTours.map((item) => (
          <MDBCardGroup
            style={{
              paddingLeft: "385px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            key={item._id}
          >
            <MDBCard
              style={{ maxWidth: "600px" }}
              key={item._id}
              className="mt-2"
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                      {console.log(item.title)}
                    </MDBCardTitle>
                    <MDBCardText>
                      <small>{excerpt(item.description)}</small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <Link to={`/editTour/${item._id}`}>
                        <MDBIcon fas icon="edit" style={{ color: "#55acee" }} />
                      </Link>

                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "red", marginLeft: "10px" }}
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  ):(<>{console.log('working')}
        <MDBCardTitle style={{paddingTop:"100px"}}>
          You haven't any tour to view
        </MDBCardTitle>
  </>

  )
};

export default Dashboard;
