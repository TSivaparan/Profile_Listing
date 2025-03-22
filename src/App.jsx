
import './App.css'
import Home from "./pages/Home";
import ProfilePage from './pages/ProfileDetailPage';
import {  Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
    </Routes>
</>
  )
}

export default App
