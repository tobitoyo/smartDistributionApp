import React from 'react';
import "../styles/input.css";

const Input = (props) => {

  return (
    <div>
        <label 
          htmlFor={props.name} 
          className={props.labelClass}
          > 
          {props.title}
        </label >
            
            <input 
                name={props.name} 
                type={props.inputType} 
                value={props.value} 
                onChange={props.inputChange}
                placeholder={props.placeholder} 
                className={props.class}
            />
    </div>
  )
}

export default Input;