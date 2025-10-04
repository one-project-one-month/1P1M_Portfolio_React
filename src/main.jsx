// import React from "react";
//  import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./store";
 import { StrictMode } from "react";
import App from "./App";
import "./index.css"



// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import { createRoot } from "react-dom/client";
import router from "./app/routes/router";
import { RouterProvider } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);


