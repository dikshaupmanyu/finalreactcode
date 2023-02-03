import React from 'react';
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className="sidebarListItem ">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/orders" className="link">
            <li className="sidebarListItem ">
              <LineStyle className="sidebarIcon" />
              Orders
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/productList" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/featureProductList" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Feature Products
              </li>
            </Link>
            <Link to="/categoryList" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Category
              </li>
            </Link>
            <Link to="/subcategoryList" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                SubCategory
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
          <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add User
              </li>
            </Link>
          <Link to="/newproduct" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add Product
              </li>
            </Link>
            <Link to="/addCategory" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Add Category
              </li>
            </Link>
            <Link to="/addSubcategory" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Add SubCategory
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}