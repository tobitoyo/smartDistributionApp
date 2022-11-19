import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Input from "../components/input";
import Button from "../components/button";



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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let code = states.trackCode

    let orders = states.orders
    console.log( "from submit", orders)
    const trackedOrder = orders.find( order => order.id === code)

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

    // const trackedOrder = states.orders.filter(order => order.id === states.trackCode)
  // let copyTrackedOrder = trackedOrder['0']

  console.log(states.orders)
  console.log("trackCode is" , states.trackCode)
  console.log("tracked order is ", states.trackedOrder)
  // console.log("tracked order name is ",trackedOrder["0"].cName)
  // console.log(typeof(trackedOrder["0"]))
  // console.log(trackedOrder.length)
  // console.log(Object.values(trackedOrder["0"]))
  // console.log("copy is " , copyTrackedOrder)
  // console.log(copyTrackedOrder)


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

      {states.showOrder && 
      <div>
        <h3>Customer Name</h3>
        <h4>{states.trackedOrder.cName}</h4>

        <h3>Customer Phone</h3>
        <h4>{states.trackedOrder.cPhone}</h4>

        <h3>Customer Email</h3>
        <h4>{states.trackedOrder.cEmail}</h4>

        <h3>Customer Address</h3>
        <h4>{states.trackedOrder.cAddress}</h4>

        <h3>Order Details</h3>
        <h4>{states.trackedOrder.oDetails}</h4>

        <h3>Driver Name</h3>
        <h4>{states.trackedOrder.driver}</h4>
      </div>
      }

      {states.showOrderError && 
        <div>
          <h3>No Order has this tracking code</h3>
          <p>Enter Another tracking Code</p>
        </div>
      }

      {states.showCodeError && 
        <div>
          <p>Enter a tracking Code</p>
        </div>
      }

    </div>
  )
}


export default Tracker;