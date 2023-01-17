const productReducer = (state, action) => {
  // if(action.type === "SET_API_DATA"){
  //     return {
  //                 ...state,
  //       isLoading: false,
  //       products: action.payload,
        
  //     }
  // };

  // if(action.type === "API_ERROR"){
  //     return {
  //         ...state,
  //         isLoading:false,
  //         isError:true,
  //         error:action.error
  //     }
  // }
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      const featureData = action.payload.filter((curElem) => {
        return curElem.category === true;
      });
      // console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,

      };

  //   case "SET_SINGLE_LOADING":
  //     return {
  //       ...state,
  //       isSingleLoading: true,
  //     };

  //   case "SET_SINGLE_PRODUCT":
  //     return {
  //       ...state,
  //       isSingleLoading: false,
  //       singleProduct: action.payload,
  //     };

  //   case "SET_SINGLE_ERROR":
  //     return {
  //       ...state,
  //       isSingleLoading: false,
  //       isError: true,
  //     };
    default:
      return state;
  }
};

export default productReducer;
