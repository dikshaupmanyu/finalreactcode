import React, { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import List from "./List/List";
import SearchBar from "./SearchBar/SearchBar";
import axios from "axios";
import "./filterSection.css";

const FilterSection = (products) => {
  const [cdata, setCdata] = useState([]);

  const getCategoryName = async () => {
    const res = await axios.get("/categoryData", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setCdata(res.data.getCat);
    }
  };

  useEffect(() => {
    getCategoryName();
  }, []);

  ////////////////////////

  const updateFilterValue = (e) => {
    // e.preventDefault();
    const { value, name } = e.target;
    // console.log(name);
    console.log(value);
  };

  return (
    <>
      <div className="filterSection">
        <SearchBar />
        <div className="home_panelList-wrap">
          {/* Filter Panel */}
          <div className="home_panel-wrap">
            <Filter />
          </div>
          <div className='home_list-wrap'>
            <List />
        </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
