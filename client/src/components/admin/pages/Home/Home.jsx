import React, { useState, useEffect } from "react";
import Chart from "../../chart/Chart.js";
import FeaturedInfo from "../../featuredInfo/featureInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../widgetSm/WidgetSm";
import WidgetLm from "../../widgetLm/WidgetLm";
import axios from "axios";

export default function Homes() {
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [order, setOrder] = useState([]);
  const [Date, setDate] = useState({});
  const [filterOrder, setFilterOrder] = useState([]);
  console.log(order);
  console.log(Date);
  console.log(filterOrder);
  console.log(startDate + "startDate");

  const getOrderData = async () => {
    const res = await axios.get("/orderList", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setOrder(res.data.getCat);
      setDate(res.data.getCat.map((data) => data.createdAt.slice(0, 10)));
    }
  };

  const getOrderList = () => {
    function filterById(dates) {
      console.log(dates);
      if (dates.createdAt >= startDate && dates.createdAt <= endDate) 
      {
        return true
      } 
      return false;
    }
      
    let filteredDate = order.filter(filterById);
    setFilterOrder(filteredDate);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div className="home">
      {/* <Topbar /> */}
      <FeaturedInfo />
      {/* <Sidebar/> */}

      <div className="homeWidgets">
        <div className="widgetSm">
          <div className="card-body">
            <form className="form" role="form">
              <div className="form-row">
                <label className="col-lg-2 col-form-label form-control-label">
                  Start Date
                </label>
                <div className="col-lg-3">
                  <input
                    className="form-control"
                    type="date"
                    id="start_date"
                    min="1997-01-01"
                    max="2030-12-31"
                    placeholder="yyyy-mm-dd"
                    onChange={(e) => {
                      setstartDate(e.target.value);
                    }}
                  />
                </div>

                <div className="col-lg-2"></div>

                <label className="col-lg-2 col-form-label form-control-label">
                  End Date
                </label>
                <div className="col-lg-3">
                  <input
                    className="form-control"
                    type="date"
                    id="end_date"
                    min="1997-01-01"
                    max="2030-12-31"
                    placeholder="yyyy-mm-dd"
                    onChange={(e) => {
                      setendDate(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label"></label>
                <div className="col-lg-9">
                  <input
                    className="btn btn-secondary"
                    type="reset"
                    value="Cancel"
                  />
                  <input
                    className="btn btn-primary"
                    type="button"
                    value="Search Stock"
                    id="MentorBtnData"
                    onClick={() => {
                      getOrderList();
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="widgetLg">
          <h3 className="widgetLgTitle">Latest transactions</h3>
          <table className="widgetLgTable">
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Customer</th>
              <th className="widgetLgTh">Date</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Status</th>
            </tr>
            {
              filterOrder == ""
                ? order.map((data, i) => {
                    // {data.products.map((curElem,i) => {

                    return (
                      <>
                        <tr className="widgetLgTr">
                          <td className="widgetLgUser">
                            <img
                              src={`/uploads/${data.products[0].imgpath}`}
                              alt=""
                              className="widgetLgImg"
                            />
                            <span className="widgetLgName">
                              {data.products[0].name}
                            </span>
                          </td>
                          <td className="widgetLgDate">
                            {data.createdAt.slice(0, 10)}
                          </td>
                          <td className="widgetLgAmount">{data.total / 100}</td>
                          <td className="widgetLgAmount">
                            {data.payment_status}
                          </td>
                        </tr>
                      </>
                    );
                    // })}
                  })
                : filterOrder.map((data, i) => (
                                <tr className="widgetLgTr">
                                  <td className="widgetLgUser">
                                    <img
                                      src={`/uploads/${data.products[0].imgpath}`}
                                      alt=""
                                      className="widgetLgImg"
                                    />
                                    <span className="widgetLgName">
                                      {data.products[0].name}
                                    </span>
                                  </td>
                                  <td className="widgetLgDate">
                                    {data.createdAt.slice(0, 10)}
                                  </td>
                                  <td className="widgetLgAmount">
                                    {data.total / 100}
                                  </td>
                                  <td className="widgetLgAmount">
                                    {data.payment_status}
                                  </td>
                                </tr>
                  ))
            };
          </table>
        </div>
      </div>
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
    </div>
  );
}
