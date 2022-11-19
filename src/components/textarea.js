import React from "react";
import "../styles/input.css";

const TextArea = (props) => {

  return(
    <div>
      <label 
        htmlFor={props.name}
        className={props.labelClass}
        >
        {props.title}
      </label>
      <br />
      <textarea
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.inputChange}
        className={props.class}
        rows={props.row}
        />
    </div>
  )
}

export default TextArea;