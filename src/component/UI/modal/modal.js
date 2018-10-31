import React,{Component} from 'react';
import './modal.css';
import Backdrop from '../modal/backDrop/backDrop';
import Grip from '../../gripPropChild/grip';

class Modal extends Component {
  state={
    modalShow:true
  }
 
    render(){

    const modal=(
<div  style={{color:'black',padding:'5px', borderRadius:'30px',textAlign:'center'}} className="card border-success mb-3" >
  <div className="card-header" style={{backgroundColor:'white',borderRadius:'20px 8px'}} >{this.props.title}</div>
  <div className="card-body"style={{backgroundColor:'white',borderRadius:'10px'}}>
    <p className="card-text">{
        this.props.children
    }
    
    </p>
  </div>
</div>
    )
    return(
        <Grip>
<Backdrop show={this.state.modalShow}/>
<div className="Modal">
{modal}
</div>
       </Grip>
    )
}}


export default Modal;