import "./widgetLm.css";
import React from 'react';

export default function WidgetLm({startDate, endDate, order, filterOrder}) {  
  console.log(order)
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          {filterOrder
          ? 
          filterOrder.map((data,i)=> {
            return (
              <>
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">Susan Carol</span>
              </td>
              <td className="widgetLgDate">2 Jun 2021</td>
              <td className="widgetLgAmount">$122.00</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
              </>
            )
          })
           :           order.map((data,i)=> {
            return (
              <>
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">Susan Carol</span>
              </td>
              <td className="widgetLgDate">{data.createdAt.slice(0,10)}</td>
              <td className="widgetLgAmount">{data.total/100}</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
              </>
            )
          })} 
          
        </tr>
        
      </table>
    </div>
  );
}