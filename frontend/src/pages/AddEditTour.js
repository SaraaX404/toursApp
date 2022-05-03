import React from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBValidation,
  MDBSpinner,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { createTour, updateTour } from "../redux/features/tourSlice";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

const initialState = {
  title: "",
  description: "",
  tags: [],
  imageFile: "",
};

const AddEditTour = () => {
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
  }, [id]);
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      if (id) {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      } else {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      }
    }
    handleClear();
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setTourData({ title: "", description: "", tags: "" });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        {id ? <h1>Update Tour</h1> : <h1>Add tour</h1>}
        <MDBCardBody>
          <MDBValidation>
            <div className="col-md-12" style={{ padding: "5px" }}>
              <input
                placeholder="title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12" style={{ padding: "5px" }}>
              <textarea
                placeholder="description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide description"
                style={{ height: "100px" }}
              />
            </div>

            <div className="col-md-12" style={{ padding: "5px" }}>
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                defaultValue={[]}
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>

            <div
              className="d-flex justify-content-start"
              style={{ padding: "5px" }}
            >
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12" style={{ padding: "5px" }}>
              <MDBBtn style={{ width: "100%" }} onClick={handleSubmit}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
