import React , {useState, useEffect} from "react";
import styled from "styled-components";
import Header1 from "./Header1";
import ProductsList from "./ProductsList";
import FilterSection from "./FilterSection";
import Sort from "./Sort";
import axios from "axios";

const Products = ({cart}) => {
  const [data, setData] = useState([]);
  const [cdata, setCdata] = useState([])
  const [tempData, setTempData] = useState([]);
  const [selectvalue, setSelectValue] = useState("All");
  console.log(tempData)

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
      setCdata(res.data.getCat);
    }
  };

  useEffect(() => {
    getUserData();
    getCategoryName();
  },[])

  ////////////////////////

  const updateFilterValue = (e) => {
    // e.preventDefault();
    const {value,name} = e.target;
    setSelectValue(value)
    // console.log(selectValue)
    const updatedItem = data.filter((curElem) => {
      return curElem.category === value;
    });
    setTempData(updatedItem)
    
  }

  return (

  <>
  <Header1 size={cart}/>
  <Wrapper>
          <div className="container d-flex align-items-baseline">
        <div>
        <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          <button type='button' value="All" name="category"   onClick={updateFilterValue}>All</button>
          {cdata && cdata.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem.fname}
                // className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}
                >
                {curElem.fname}
              </button>
            );
          })}
        </div>
      </div>
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductsList products={data} tempdata={tempData} value={selectvalue}/>
          </div>
        </section>
      </div>
  </Wrapper>;
  </>
  )
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: white;
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color:grey;
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color:black;
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: grey;
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default Products;
