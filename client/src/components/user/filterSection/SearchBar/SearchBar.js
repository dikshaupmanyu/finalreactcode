import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import "./searchBar.css";
import { useFilterContext } from '../../../../context/filter_context';

const SearchBar = ({ value, changeInput }) => {

  const {
    filters: { text, category, color },
    updateFilterValue,
    all_products,
  } = useFilterContext();

  // get the unique values of each property
  // const getUniqueData = (data, attr) => {
  //   let newVal = data.map((curElem) => {
  //     return curElem[attr];
  //   });

  //   if (attr === "colors") {
  //     // return (newVal = ["All", ...new Set([].concat(...newVal))]);
  //     newVal = newVal.flat();
  //   }

  //   return (newVal = ["all", ...new Set(newVal)]);
  // };

  // we need to have the individual data of each in an array format
  // const categoryData = getUniqueData(all_products, "category");
  // const companyData = getUniqueData(all_products, "company");
  // const colorsData = getUniqueData(all_products, "colors");
  // console.log(
  //   "🚀 ~ file: FilterSection.js ~ line 23 ~ FilterSection ~ companyData",
  //   colorsData
  // );


  return (
    <div className='searchBar-wrap'>
      {/* <SearchIcon className='searchBar-icon' /> */}
         <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>
  </div>
  )
}

export default SearchBar
