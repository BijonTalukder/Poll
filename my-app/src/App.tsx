import "./App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "./redux/feature/Auth/AuthSlice";
interface User {
  name: string;
  email: string;
  // Add any other properties your user object might have
}
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setLoading(true))
    const token = localStorage.getItem("token")
    const user: User | null = JSON.parse(localStorage.getItem("user") || 'null') as User | null;
    console.log(user,'hhh');
    
    console.log(token);
    if(token){
      dispatch(setUser(user))
      dispatch(setLoading(false))
    }
    else{
      dispatch(setLoading(false))
    }

  },[dispatch])
  return (
   
    <RouterProvider router={router} />
    

   
  );
}

export default App;
