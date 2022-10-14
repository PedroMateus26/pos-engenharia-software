import { getAccessTokenDecoded, logout } from "core/utils/auth";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./styles.scss";

const Navbar = () => {

  const [currentUser, setCurrentUser]=useState('');
  const location=useLocation();
  useEffect(()=>{
    const currentUserData=getAccessTokenDecoded();
    setCurrentUser(currentUserData.user_name)
      },[location]);
  const handleOnClick=(event:React.MouseEvent<HTMLAnchorElement,MouseEvent>)=>{
    event.preventDefault();
    logout();
  }

  return (
    <nav className="row bg-success main-nav">
      <div className="col-3">
        <Link to="/" className="nav-logo-text">
          <h4>Trade Target</h4>
        </Link>
      </div>
      <div className="col-6">
        <ul className="main-menu">
          {/* <li>
            <NavLink to="/" className="nav-link" activeClassName="active" exact>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="nav-link"
              activeClassName="active"
            >
              CATALOG
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/admin" className="nav-link" activeClassName="active">
              ADMIN
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className="col-3 text-right">
        {currentUser?(
            <>
            {currentUser}
            <a href="#Logout" className="nav-link active d-inline" onClick={handleOnClick}>
              Logout
            </a>
            </>
        ):(
            <Link to="/auth/login" className="nav-link active" >
                LOGIN
            </Link>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
