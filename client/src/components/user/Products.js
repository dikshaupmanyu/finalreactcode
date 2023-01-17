import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header1 from "./Header1";
import ProductsList from "./ProductsList";
import FilterSection from "./filterSection/FilterSection";
import Filter from "./filterSection/Filter/Filter";
import SearchBar from "./filterSection/SearchBar/SearchBar";
import axios from "axios";
import "./product.css";
import "./filterSection/filterSection.css";
import ProductsListCopy from "./productListCopy";
import { useFilterContext } from "../../context/filter_context";

const Products = ({ cart , bag}) => {
  const { all_products, filter_products } = useFilterContext();
  const [data, setData] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  console.log(selectedCategory)
  const [tempData, setTempData] = useState([]);
  // const [selectvalue, setSelectValue] = useState("All");

  const [cuisines, setCuisines] = useState([]);

  // const [list, setList] = useState(data);
  // console.log(list);


  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 201 || !res.data) {
      setData(res.data.getUser);
    } else {
      console.log("errror");
    }
  };

  ////////////////////////

  // console.log(cdata)

  const getCategoryName = async () => {
    const res = await axios.get("/categoryData", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setSelectedCategory(res.data.getCat);
    }
  };

  useEffect(() => {
    getUserData();
    getCategoryName();
  }, []);

  ////////////////////////

  // const updateFilterValue = (e) => {
  //   const { value, name } = e.target;
  //   setSelectValue(value);
  //   const updatedItem = data.filter((curElem) => {
  //     return curElem.category === value;
  //   });
  //   setTempData(updatedItem);
  // };

  return (
    <>
      <Header1 cart={cart} bag={bag}/>
      <div className="filterSection">
        <div className="home_panelList-wrap">
          <div className="home_panel-wrap">
            {/* <SearchBar /> */}
            <Filter
              selectedCategory={selectedCategory}
            />
          </div>
          <div className="home_list-wrap">
            <div className="row d-flex justify-content-between align-iteams-center mt-5">
              <ProductsListCopy filter_products={filter_products} all_products={all_products}/>
              {/* <ProductsList
                products={data}
                tempdata={tempData}
                value={selectvalue}
                list={list}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
