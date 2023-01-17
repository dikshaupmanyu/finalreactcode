import React  from 'react';
import Chart from "../../chart/Chart.js";
import FeaturedInfo from '../../featuredInfo/featureInfo';
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../widgetSm/WidgetSm";
import WidgetLm from "../../widgetLm/WidgetLm";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";

export default function Homes() {
  return (
    <div className="home">
            {/* <Topbar /> */}
      <FeaturedInfo />
    {/* <Sidebar/> */}
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLm/>
      </div>
    </div>
  );
}