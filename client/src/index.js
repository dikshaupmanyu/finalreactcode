import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { Auth0Provider } from "@auth0/auth0-react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import { AppProvider } from "./context/productContext";
import { FilterContextProvider } from "./context/filter_context";
// import Auth0ProviderWithHistory from "./slice/auth0-provider-with-history";
import Context from "./context/Context";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//         <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>
// );

ReactDOM.render(
  <BrowserRouter>
    <Context>
        {/* <Auth0ProviderWithHistory> */}
      <Provider store={store}>
          <AppProvider>
            <FilterContextProvider>
              <App />
            </FilterContextProvider>
          </AppProvider>
      </Provider>
        {/* </Auth0ProviderWithHistory> */}
    </Context>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
