import './App.css';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Tvshow from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import Mainlayout from './Layout/Mainlayout/Mainlayout';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Mediaitem from './Components/Mediaitem/Mediaitem';

function App() {
  let routes= createBrowserRouter(
 [{
    path:'', element:<Mainlayout />,children :[
    {index:true ,element : <Home/> },
    {path:'movies' , element: <Movies/>},
    {path:'people' , element: <People/>},
    {path:'tvshow' , element:<Tvshow/> },
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
