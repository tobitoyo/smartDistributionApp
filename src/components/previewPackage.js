import React from "react";

const OrderPreview = (props) => {
  return (
    <div>
      <h1  className="heading">Order Preview</h1>
      
      <h5 className="input-label-preview">Customer Name</h5>
      <p className="output">{props.preview.cName}</p>

      <h5 className="input-label-preview">Customer Phone</h5>
      <p className="output">{props.preview.cPhone}</p>

      <h5 className="input-label-preview">Customer Email</h5>
      <p className="output">{props.preview.cEmail}</p>

      <h5 className="input-label-preview">Customer Address</h5>
      <p className="output">{props.preview.cAddress}</p>

      <h5 className="input-label-preview">Order Details</h5>
      <p className="output">{props.preview.oDetails}</p>

      <h5 className="input-label-preview">Tracking Code</h5>
      <p className="output">{props.preview.trackCode}</p>

      <h5 className="input-label-preview">Person who Packaged It</h5>
      <p className="output">{props.preview.pName}</p>

      <div className="preview-btns-div">
        <div>
          
        </div>

        <div>
          
        </div>
      </div>
    </div>
  )
}

export default OrderPreview;