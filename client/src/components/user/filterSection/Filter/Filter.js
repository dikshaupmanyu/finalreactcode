import React from "react";
import FilterListToggle from "../common/FilterListToggle";
import "./filter.css";
import { useFilterContext } from "../../../../context/filter_context";
import FormatPrice from "../FormatPrice";

const Filter = ({ selectedCategory }) => {
  const {
    filters: { text, category, color, price, maxPrice, minPrice },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  // Category data
  const categoryOnlyData = getUniqueData(all_products, "category");

  return (
    <div>
      {/* <SearchBar/> */}
      <aside>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            text="text"
            name="text"
            className="search-input"
            value={text}
            onChange={updateFilterValue}
            placeholder="Search"
          />
        </form>
        <h3> Category </h3>
        {categoryOnlyData.map((curElem, i) => (
          // <p key={i} >{curElem}</p>
          <button
            key={i}
            type="button"
            name="category"
            value={curElem}
            className={curElem === category ? "active" : ""}
            onClick={updateFilterValue}
          >
            {curElem}
          </button>
        ))}

        <h3>Price</h3>
        <div style={{ display: "flex" }}>
          <p style={{ color: "white" }}>
            Min. <FormatPrice price={minPrice} />
          </p>
          <p style={{ color: "white", marginLeft: "20px" }}>
            Max. <FormatPrice price={price} />
          </p>
        </div>
        {/* <p>
          <FormatPrice price={price} />
        </p> */}
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />

        <button onClick={clearFilters}>Clear Filters</button>
      </aside>
    </div>
  );
};

export default Filter;
