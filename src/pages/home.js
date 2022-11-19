import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import "../styles/home.css"
import Button from "../components/button";


const Home = () => {

  const navigate = useNavigate();
  const navigateStart =  () => {
    navigate('/Tracker')
  }

  return (
    <div className="home-div">
      <Header />
      <div className="home-text">
        <h1>Real-time cargo tracking</h1>
        <p>Finding & tracking your goods, fast</p>
      </div>

      <Button 
        className="home-btn" 
        title="Get Started"
        btnClick={navigateStart}
        />
    </div>
  )
}

export default Home;