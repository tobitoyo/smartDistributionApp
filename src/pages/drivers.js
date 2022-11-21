import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Input from "../components/input";
import Button from "../components/button";



const Drivers = () => {

  const [states, setStates] = useState({
    name:"",
    phone:"",
    trackCode: "",
    trackedOrder: [],
    orders: [],
    errors: {
      name: "Enter Your Full Name",
      phone: "Valid Phone is +XXX XXX XXXXX",
      trackCode: "Invalid Tracking Code"
    },
    displayError: false
  })

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then(res =>{
        setStates({...states, orders: res.data })
      })

    
  }, [] )

  let errors = states.errors

  const validateForm = errors => {
    if (Object.values(errors).every(
      error => error === "")){
        return true
      }
    return false;
  };

  
  const handleInputChange = (e) => {
    const {name, value} = e.target;

    const validFullNameRegex =  RegExp(/[a-z]+\s[a-z]+/i)
    const validPhoneRegex = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/)

    switch(name) {
      case "name" :
        errors.name = validFullNameRegex.test(value)
                        ? ""
                        : "Enter your full name";
        break
      case "phone" :
        errors.phone = validPhoneRegex.test(value)
                        ? ""
                        : "Valid Phone is +XXX XXX XXXXX";
        break
      case "trackCode":
        errors.trackCode = trackedOrder
                        ? ""
                        : "Invalid Tracking Code"
        break
      default:
        break
      
    }

    setStates({...states, [name]:value})
  }


    const code =states.trackCode
    const name = states.name
    const phone = states.phone
    const orders = states.orders
    const trackedOrder = orders.find( order => order.id === code)


  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm(states.errors)){
    // adding new driver name to drivers list
      trackedOrder.drivers.unshift(name)
      trackedOrder.driversPhoneList.unshift(phone)
      
      axios
        .patch(`http://localhost:3001/orders/${code}`, {driversPhoneList: trackedOrder.driversPhoneList, drivers: trackedOrder.drivers})
        .then(res => {
          setStates({...states,name:"",
          phone:"",
          trackCode: "", 
          trackedOrder: [],
          orders: [],
          errors: {
            name: "Enter Your Full Name",
            phone: "Valid Phone is +XXX XXX XXXXX",
            trackCode: "Invalid Tracking Code"
          },
          displayError: false})
      })
      alert("The order has been registered in your name!!!")
    }
    else {
      setStates({...states, displayError: true})
    }
      
      
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
      {states.displayError &&  errors.name.length > 0 && 
                  <span className='error'>{errors.name}</span>}
      <Input
        name="phone"
        title="Driver Phone Number"
        inputType="text"
        value={states.phone}
        inputChange={handleInputChange}
        placeholder="Enter your phone number"
        class="input"
        labelClass="input-label"
      />
      {states.displayError &&  errors.phone.length > 0 && 
                  <span className='error'>{errors.phone}</span>}
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
      <p>You can use this tracking code SD23260522LA</p>
      {states.displayError &&  errors.trackCode.length > 0 && 
                  <span className='error'>{errors.trackCode}</span>}

      <Button 
        className="preview-btn"
        title="I Have Collected the Package"
        btnClick={handleSubmit}
      />

      <div>
        
      </div>

    </div>
  )
}


export default Drivers;