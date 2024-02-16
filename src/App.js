import './App.css';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Tvshow from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import Mainlayout from './Layout/Mainlayout/Mainlayout';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import jwtDecode from 'jwt-decode';
import Mediaitem from './Components/Mediaitem/Mediaitem';
// import '@fortawesome/fontawesome-free';
function App() {
  const [UserData, setUserData] = useState(null)
  function setUserDataFun (){
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)

  }
  useEffect(() => {
    if(localStorage.getItem('userToken') !==null){
          setUserDataFun()

    }
    
  }, [])
  
  let routes= createBrowserRouter(
 [{
    path:'', element:<Mainlayout setUserData={setUserData} UserData={UserData} />,children :[
    {index:true ,element : <ProtectedRoutes><Home/></ProtectedRoutes> },
    {path:'register' , element:<Register/>},
    {path:'login' , element:<Login setUserDataFun = {setUserDataFun}/>},
    {path:'movies' , element: <ProtectedRoutes> <Movies/></ProtectedRoutes>},
    {path:'people' , element: <ProtectedRoutes> <People/></ProtectedRoutes>},
    {path:'tvshow' , element:<ProtectedRoutes><Tvshow/></ProtectedRoutes> },
    {path:'*' , element:<Notfound/>},
    {path:'mediaitem' , element:<Mediaitem/>},
  ]
}
  ])
  return (
    <>
    <RouterProvider router={routes} /> 
    </>
  );
}

export default App;
