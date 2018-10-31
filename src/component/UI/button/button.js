import React from 'react';
import './button.css';

const button=(props)=>{
    return(

    <div onClick={props.onSubmit} className="Btn">
    <h3 style={{fontSize:'30px'}} >{props.icon}</h3>
    <h6>{props.btnText}</h6>
   </div>
    )
}
export default button;