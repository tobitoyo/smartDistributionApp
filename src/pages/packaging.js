
import React, { useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Input from "../components/input";
import TextArea from "../components/textarea";
import Button from "../components/button";
import OrderPreview from "../components/previewPackage";

import '../styles/packaging.css'



const Packaging = () => {

  const [states, setStates] = useState({
    packagerName: "",
    customerName: "",
    customerPhone: '',
    customerEmail: "",
    customerAddress: '',
    orderDetails: "",
    trackingCode: "nil",
    showPreview: false,
    showGenerate: true,
    showSubmit: false,
    errors: {
      pName: "Enter Your Full Name",
      cName: "Customer name cannot be empty",
      cPhone: "Valid Phone is +XXX XXX XXXXX",
      cEmail: "Invalid Email",
      cAddress: "Customer address cannot be empty",
      oDetails: "Enter the details"
    },
    displayError: false,
    packagedOrder: []
  })

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

    // Regular Expressions

    const validFullNameRegex =  RegExp(/[a-z]+\s[a-z]+/i)
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
    const validPhoneRegex = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/)

    // FORM VALIDATION

    switch(name) {
      case "packagerName" :
        errors.pName = validFullNameRegex.test(value)
                        ? ""
                        : "Enter your full name";
        break
      case "customerPhone" :
        errors.cPhone = validPhoneRegex.test(value)
                        ? ""
                        : "Valid Phone is +XXX XXX XXXXX";
        break
      case "customerEmail" :
        errors.cEmail = validEmailRegex.test(value)
                        ? ""
                        :"Invalid email";
        break
      case "customerName":
          errors.cName = value.length === 0
                        ? "Customer name cannot be empty"
                        : ""
          break
      case "customerAddress":
          errors.cAddress = value.length === 0
                       ? "Customer address cannot be empty"
                       : ""
          break
      case "orderDetails":
          errors.oDetails = value.length < 10
                       ? "Fill in the details"
                       : ""
          break

        default:
      break
  }

    setStates({...states, [name]:value})
  }


  const trackNum = (pr = "SD232", su = "LA") => {
    for (let i = 0; i < 5; i++){
      pr += ~~(Math.random() * 10)
    }
    return pr + su
  }


  const handlePreviewBtn = (e) => {
    e.preventDefault();

    console.log(states.errors)

    if (validateForm(states.errors)){
      setStates({...states, showPreview: true, displayError: false})
    }
    else {
      setStates({...states, displayError: true})
    }
    
  } 
  
  const handleGenerateCode = (e) => {
    e.preventDefault()
    const code = trackNum()
    setStates({...states, trackingCode: code, showGenerate: false, showSubmit: true})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const order = {
    
      pName:states.packagerName,
      cName: states.customerName,
      cPhone: states.customerPhone,
      cEmail: states.customerEmail,
      cAddress: states.customerAddress,
      oDetails: states.orderDetails,
      id: states.trackingCode,
      dateGenerated: new Date(),
      drivers: ["No driver assigned yet"],
      driver: "No driver assigned yet"
    }

    axios
      .post("http://localhost:3001/orders", order)
      .then(response => {
        console.log( "response is " , response)
      })
      

    // const updatedOrderList = states.packagedOrder.concat(order)

    setStates({
      packagerName: "",
      customerName: "",
      customerPhone: '',
      customerEmail: "",
      customerAddress: '',
      orderDetails: "",
      trackingCode: "nil",
      showPreview: false,
      showGenerate: true,
      showSubmit: false,
      errors: {
        pName: "Enter Your Full Name",
        cName: "Customer name cannot be empty",
        cPhone: "Valid Phone is +XXX XXX XXXXX",
        cEmail: "Invalid Email",
        cAddress: "Customer address cannot be empty",
        oDetails: "Enter the details"
      },
      displayError: false,
      packagedOrder: []
    })
    // setStates({...states, packagedOrder: updatedOrderList})
    // console.log(states)
    // console.log(order)
  }


  return(
    <div>
      <Header />
      <div className="package-body">
        <div className="left">
          
          <Input
            name="packagerName"
            title="Your Name"
            inputType="text"
            value={states.packagerName}
            inputChange={handleInputChange}
            placeholder="Enter Your Full Name"
            class="input"
            labelClass="input-label"
          />
          {states.displayError &&  errors.pName.length > 0 && 
                  <span className='error'>{errors.pName}</span>}

          <br />

          <h1>Customer Details</h1>

          <Input
            name="customerName"
            title="Customer Name"
            inputType="text"
            value={states.customerName}
            inputChange={handleInputChange}
            placeholder="Enter Customer Name"
            class="input"
            labelClass="input-label"
          />
          {states.displayError &&  errors.cName.length > 0 && 
                  <span className='error'>{errors.cName}</span>}

          <Input
            name="customerPhone"
            title="Customer Phone"
            inputType="text"
            value={states.customerPhone}
            inputChange={handleInputChange}
            placeholder="Enter Customer Phone"
            class="input"
            labelClass="input-label"
          />
          {states.displayError &&  errors.cPhone.length > 0 && 
                  <span className='error'>{errors.cPhone}</span>}

          <Input
            name="customerEmail"
            title="Customer Email"
            inputType="email"
            value={states.customerEmail}
            inputChange={handleInputChange}
            placeholder="Enter Customer Email"
            class="input"
            labelClass="input-label"
          />
          {states.displayError &&  errors.cEmail.length > 0 && 
                  <span className='error'>{errors.cEmail}</span>}

          <Input
            name="customerAddress"
            title="Customer Address"
            inputType="email"
            value={states.customerAddress}
            inputChange={handleInputChange}
            placeholder="Enter Customer Address"
            class="input"
            labelClass="input-label"
          />
          {states.displayError &&  errors.cAddress.length > 0 && 
                  <span className='error'>{errors.cAddress}</span>}

          <br />
          <h1>Order Details</h1>

          <TextArea 
          name="orderDetails"
          title="Order Details"
          placeholder="Give details of the order"
          value={states.orderDetails}
          inputChange={handleInputChange}
          class="input"
          labelClass="input-label"
          row={10}
          />
          {states.displayError &&  errors.oDetails.length > 0 && 
                  <span className='error'>{errors.oDetails}</span>}

          <Button 
            title="Preview"
            btnClick={handlePreviewBtn}
            className="preview-btn"
          />

        </div>

        
        <div className="right">
        {states.showPreview && 
        
          <OrderPreview
            preview = {{
              pName: states.packagerName,
              cName: states.customerName,
              cPhone: states.customerPhone,
              cEmail: states.customerEmail,
              cAddress: states.customerAddress,
              oDetails: states.orderDetails,
              trackCode: states.trackingCode
            }}
          />
        }

        {states.showPreview && states.showGenerate &&
          <Button
          className="preview-btn"
          title="Generate Tracking Code"
          btnClick={handleGenerateCode} 
          />
        }

        {states.showSubmit && 
        
          <Button
            className="preview-btn"
            title="Submit" 
            btnClick={handleSubmit} 
          />
        }
        </div>
      </div>
    </div>
  )
}

export default Packaging;