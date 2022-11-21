import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Input from "../components/input";
import Button from "../components/button";
import "../styles/tracking.css"



const Tracker = () => {

  const [states, setStates] = useState({
    orders:[],
    trackCode: "",
    trackedOrder: [],
    showOrder: false,
    showOrderError: false,
    showCodeError: false
  })



  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then(res =>{
        setStates({...states, orders: res.data })
        console.log( "res.data is " ,res.data)
        console.log(typeof(res.data))
      })
      .catch( error => {
        console.log(error)}
      )
    
  }, [] )

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setStates({...states, [name]:value})
  }


  const code = states.trackCode
  const orders = states.orders
  const trackedOrder = orders.find( order => order.id === code)
  const driversList = states.trackedOrder.drivers
  const driversPhoneList = states.trackedOrder.driversPhoneList

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Checking if the code exists
    if (trackedOrder){
      axios
      .get(`http://localhost:3001/orders/${code}`)
      .then(res => {
        setStates({...states, trackedOrder: res.data, showOrder: true, showOrderError: false, showCodeError: false})
      })
    }
    else if (code === ""){
      setStates({...states, showCodeError: true})
    }
    else {
      setStates({...states, showOrderError:true, showOrder: false, showCodeError: false})
    }
    

    

  }

    


  return(
    <div>
      <Header />
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
        title="View"
        btnClick={handleSubmit}
      />

      <p>You can use this tracking code SD23260522LA</p>

      {states.showOrder && 
      <div className="preview-div">
        <h3 className="input-label-preview">Customer Name</h3>
        <h4 className="output">{states.trackedOrder.cName}</h4>

        <h3 className="input-label-preview">Customer Phone</h3>
        <h4 className="output">{states.trackedOrder.cPhone}</h4>

        <h3 className="input-label-preview">Customer Email</h3>
        <h4 className="output">{states.trackedOrder.cEmail}</h4>

        <h3 className="input-label-preview">Customer Address</h3>
        <h4 className="output">{states.trackedOrder.cAddress}</h4>

        <h3 className="input-label-preview">Order Details</h3>
        <h4 className="output">{states.trackedOrder.oDetails}</h4>

        <h3 className="input-label-preview">Driver Name</h3>
        <h4 className="output">{driversList[0]}</h4>

        <h3 className="input-label-preview">Driver Phone Number</h3>
        <h4 className="output">{driversPhoneList[0]}</h4>
      </div>
      }

      {states.showOrderError && 
        <div className="error-two">
          <h3 >No Order has this tracking code</h3>
          <p >Enter another tracking Code</p>
        </div>
      }

      {states.showCodeError && 
        <div className="error-two">
          <p >Enter a tracking Code</p>
        </div>
      }

    </div>
  )
}


export default Tracker;