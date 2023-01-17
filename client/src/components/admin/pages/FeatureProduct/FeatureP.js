import React, {useState} from 'react';
import axios from 'axios';
import Sidebar from '../../Sidebar/Sidebar';
import Topbar from '../../topbar/Topbar';
// import { useNavigation } from 'react-router-dom';

const FeatureP = () => {

  // const history = useNavigation();

    const [fproduct, setFproduct] = useState({fname: "",price: "" });
    const [file, setFile] = useState([]);
    console.log(file)

    const setimgfile = (e) => {
        setFile(e.target.files[0])
      };

    const setdata = (e) => {
        const { value, name } = e.target;
        console.log(value);
        setFproduct(() => {
          return { ...fproduct, [name]: value, };
        });
      };

    const addUserData = async (e) => {
        e.preventDefault();
    
        var formData = new FormData();
          formData.append("imgpath", file);
        formData.append("fname", fproduct.fname);
        formData.append("price", fproduct.price);
    
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
    
        const res = await axios.post("/FeatureProduct", formData, config);
        console.log(res);
    
        if (res.data.status === 201) {
          // history("/admin");
        } else {
          console.log("errror");
        }
      };


    return (
        <>
        <Topbar />
       <div className='container-4'>
       <Sidebar/>
        <div className="newProduct">
          <h1 className="addProductTitle">New Product</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input type="file" id="file" name="imgpath" onChange={setimgfile}/>
            </div>
            <div className="addProductItem">
              <label>Name</label>
              <input type="text" placeholder="Apple Airpods" name="fname" onChange={setdata}/>
            </div>

            <div className="addProductItem">
              <label>Price</label>
              <input type="number" placeholder="add amount" name="price" onChange={setdata}/>
            </div>
            <button className="addProductButton" type="submit" onClick={addUserData}>Create</button>
          </form>
        </div>
       </div>
       </>
      );
}

export default FeatureP
