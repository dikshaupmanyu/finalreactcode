import React,{   createContext,  useContext, useDebugValue,  useEffect,  useReducer,} from "react";
import axios from "axios";
import reducer from "../reducer/productReducer"

const AppContext = createContext();
const API = "/getdata";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state)

    const getProducts = async (url) => {
        dispatch({type:"SET_LOADING"})
        try {
          const res = await axios.get(url)
          const products = await res.data.getUser;
        //   console.log(products);
          dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({type:"API_ERROR"})
        }
      };

    useEffect(() => {
        getProducts(API);
    },[]);

    return <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
};

// hook
const useProductContext = () => {
    return useContext(AppContext)
}

export { AppProvider , AppContext, useProductContext};