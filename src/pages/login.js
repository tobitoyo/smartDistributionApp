import React, { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../components/header";
import Input from "../components/input";
import Button from "../components/button";
import "../styles/login.css"



const Login = () => {

  const [states, setStates] = useState({
    email: "",
    password: "",
    users: []
  })

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(res =>{
        setStates({...states, users: res.data })
        console.log( "res.data is " ,res.data)
        console.log(typeof(res.data))
      })
      .catch( error => {
        console.log(error)}
      )
    
  }, [] )

  const navigate = useNavigate();
  const navigateAdmin =  () => {
    navigate('/packaging')
  }

  const navigateDriver =  () => {
    navigate('/drivers')
  }

  const navigateTracker =  () => {
    navigate('/tracker')
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setStates({...states, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      console.log(user.type)
      switch(user.type){
        case "admin":
          navigateAdmin()
          break
        case "customer":
          navigateTracker()
          break
        case "driver":
          navigateDriver()
          break
        default:
          break
      }
    }
    else{
      alert("incorrect email or password")
    }

    setStates({...states, email:"", password:""})
  
  }

  console.log(states.users)
  const email = states.email
  const password = states.password
  const users =  states.users
  const user = users.find( user => user.email === email && user.password === password)

  
  return(
  <div>
    <Header />
    <div className="login-div">
      <Input
        name="email"
        title="Email"
        inputType="email"
        value={states.email}
        inputChange={handleInputChange}
        placeholder="Enter your Email"
        class="input"
        labelClass="input-label"
        />

        <Input
          name="password"
          title="Your Password"
          inputType="password"
          value={states.id}
          inputChange={handleInputChange}
          placeholder="Enter Password"
          class="input"
          labelClass="input-label"
        />

        <Button 
          className="preview-btn"
          title="Login"
          btnClick={handleSubmit}
        />
      </div>

      <p>
        To login as an admin, use email:james@dufu.com password:AD!@#MIN
      </p>
      <p>
        To login as a driver, use email:drive@dufu.com password:DRI!@VER
      </p>
      <p>
        To login as an customer, use email:jane@dufu.com password:CUS!@TOMER
      </p>
  </div>)
}

export default Login