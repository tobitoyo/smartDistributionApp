import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Input from "../components/input";
import Button from "../components/button";



const Drivers = () => {

  const [states, setStates] = useState({
    name:"",
    trackCode: "",
    orders: []
  })

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then(res =>{
        setStates({...states, orders: res.data })
        console.log( "res.data is " ,res.data)
        console.log(typeof(res.data))
      })

    
  }, [] )

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setStates({...states, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
  }




  return(
    <div>
      <Header />
      <Input
        name="name"
        title="Driver Name"
        inputType="text"
        value={states.name}
        inputChange={handleInputChange}
        placeholder="Enter Your Name"
        class="input"
        labelClass="input-label"
      />
      <Input
        name="trackCode"
        title="Tracking Code"
        inputType="text"
        value={states.trackCode}
        inputChange={handleInputChange}
        placeholder="Enter Tracking Code"
        class="input"
        labelClass="input-label"
      />

      <Button 
        className="preview-btn"
        title="I Have Collected the Package"
        btnClick={handleSubmit}
      />

      <div>
        <h3>Customer Name</h3>
        {/* <h3>{trackedOrder.cName}</h3> */}
      </div>

    </div>
  )
}


export default Drivers;