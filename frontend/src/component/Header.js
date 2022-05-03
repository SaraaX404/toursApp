import React, { useState } from "react";

import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import {searchTours} from "../redux/features/tourSlice";
import {useNavigate} from "react-router-dom";
import decode from 'jwt-decode'
import {toast} from "react-toastify";

const Header = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const {currentPage} = useSelector((state) => ({...state.tour}));
  //check the token is expired and logout if the token is expired
  const token = user?.token
  if(token){
    const decoded = decode(token)

    if(new Date().getTime() > decoded.exp * 1000){
      dispatch(setLogout())
    }



  }

  const logout = () => {
    dispatch(setLogout());
  };
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(search) {
      dispatch(searchTours(search))
      setSearch("")
      navigate(`/tours/search?searchQuery=${search}`)

    }else{
      navigate('/')
    }
  }

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand href="/" style={{ color: "#606080" }}>
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
        />
        <MDBIcon icon="bars" fas />
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="md-2 md-lg-0" />
          {user?.result?._id && (
            <h5
              style={{
                marginRight: "40px",
                marginTop: "22px",
                color: "#606080",
              }}
            >
              logged in as : {user.result.name}
            </h5>
          )}
          <MDBNavbarItem>
            <MDBNavbarLink href="/">
              <p className="header-text">Home</p>
            </MDBNavbarLink>
          </MDBNavbarItem>
          {user?.result?._id && (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink href="/addTour">
                  <p className="header-text">Add Tour</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboard">
                  <p className="header-text">Dashboard</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          )}

          {user?.result?._id ? (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={logout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          ) : (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          )}
          <form onSubmit={handleSubmit} style={{marginTop:"10px"}} className='d-flex input-group w-auto'>
            <input type='text' className='form-control' placeholder='Search Tour' value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <div style={{marginTop:"3px", marginLeft:"3px"}}>
              <MDBIcon fas icon='search'/>
            </div>


          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
