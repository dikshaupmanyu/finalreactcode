import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import React, { useState, useEffect } from 'react'
  import { Link } from "react-router-dom";
  import "./user.css";
  import Sidebar from "../../Sidebar/Sidebar";
  import Topbar from "../../topbar/Topbar";
  import { useNavigate , useParams } from "react-router-dom";
  
  export default function User() {

    const params = useParams();
    const [data, setData] = useState({});
    const [user, setUser] = useState({
      username: "",
      fullname: "",
      email: "",
      phone: "",
      address: "",
    });

    const setdata = (e) => {
      const { value, name } = e.target;
      console.log(value);
      setUser(() => {
        return { ...user, [name]: value };
      });
    };

    const getProductDetails = async () => { 
        // console.log(params)
        let result = await fetch(`/user/${params.id}`);
        result = await result.json();
        console.log(result)
        setData(result)
     }

     useEffect(() => {
        getProductDetails()
    },[]);


    return (
        <>
        <Topbar/>
        <div className='container-4'>
        <Sidebar/>

      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              {/* <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              /> */}
              <div className="userShowTopTitle">
                <span className="userShowUsername">{data.username}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{data.fullname}</span>
              </div>

              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{data.phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{data.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{data.address}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    value=""
                    placeholder={data.username}
                    className="userUpdateInput"
                    onChange={setdata}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder={data.fullname}
                    className="userUpdateInput"
                    onChange={setdata}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={data.email}
                    className="userUpdateInput"
                    onChange={setdata}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    value=""
                    placeholder={data.phone}
                    className="userUpdateInput"
                    onChange={setdata}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    value=""
                    placeholder={data.address}
                    className="userUpdateInput"
                    onChange={setdata}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>password</label>
                  <input
                    type="text"
                    value={data.password}
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                {/* <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div> */}
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
        </>
    );
  }