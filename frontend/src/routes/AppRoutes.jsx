import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinPage from "../pages/JoinPage";
import RoomPage from "../pages/RoomPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={ <JoinPage /> } />
        <Route path='/room/:roomId' element={ <RoomPage /> } />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes