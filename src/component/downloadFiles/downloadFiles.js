import React, { Component } from 'react';
import * as Icons from 'react-icons/lib/fa';
import Modal from '../UI/modal/modal';
import Button from '../UI/button/button';
import { URL } from '../../serverURL';
import { accessAllFiles,AllList } from '../UI/fileList/fileList';
import Axios from 'axios';
class FileDownload extends Component {
  state={
    modal:false,
    inputValue:'',
    data:[],
    ShowFilesList:false,
    inputValidat:true,
    fileDelete:false,
  }
 

 
  
onDeleteFile=(file)=>{
 Axios.delete(`${URL}/delete/${file}`).then(res=>{
 accessAllFiles()
 this.setState({ShowFilesList:false})
 }).catch(err=>{
   console.log(err)
 })
}
  onClickList=(list)=>{
 this.setState({inputValue:list})
  }
  onFileListButtonClick=()=>{
   if(AllList!==undefined){
   this.setState({ShowFilesList:!this.state.ShowFilesList})
   }
  }

  onInputChange=(event)=>{
    this.setState({inputValue:event.target.value})
  }

  onCloseModal=()=>{
   this.setState({modal:false})
 }
 onShowModal=()=>{
   accessAllFiles();
   this.setState({modal:true,inputValue:'',ShowFilesList:false})
 }

download=()=>{
   var dwonload =false;
  for(var i=0;i<=AllList.length-1;i++){
    if(AllList[i]===this.state.inputValue){
     dwonload=true;
    }
  }

  if(dwonload===true){
  const file=this.state.inputValue
 window.open(`${URL}/dwonload/${file}`);
 this.setState({inputValidat:true,inputValue:''}) 
  }else{
    this.setState({inputValidat:false})  }
}
  
  render() 
  { 

    return <div>
<div>
<Button icon={<Icons.FaDownload/>} btnText='Download' onSubmit={this.onShowModal}/>
 
 {
 this.state.modal?
 <Modal title='Enter File Name or Select from List.' >
<input style={{borderColor:!this.state.inputValidat?"orange":'whitesmoke'}} onChange={this.onInputChange} value={this.state.inputValue} type="text" className="form-control" placeholder="Enter your file name....."/>
<button  style={{marginTop:"15px",float:"left"}} className="btn btn-danger" onClick ={this.onCloseModal}><Icons.FaArrowCircleLeft/> Cancel</button>
<button  style={{marginTop:"15px",float:"center"}} className="btn btn-primary" onClick={this.onFileListButtonClick} ><Icons.FaList/> {this.state.ShowFilesList ? 'Hide FilesList': 'Show FilesList'}</button>
<button disabled={this.state.inputValue===""} style={{marginTop:"15px",float:"right"}} className="btn btn-success" onClick={this.download} ><Icons.FaDownload/> Dwonload</button>
{
this.state.ShowFilesList?
AllList.map(file=>(
<li style={{float:'left',padding:'5px',fontSize:'15px',fontWeight:'bold'}} 
key={file} >{file}
<a onClick={this.onDeleteFile.bind(this,file)} style={{color:'red',fontSize:"18px",padding:'5px'}} ><Icons.FaTrash/></a>  
<a onClick={this.onClickList.bind(this,file)} style={{color:'blue',fontSize:"18px",padding:'5px'}} ><Icons.FaArrowUp/></a></li>
))
:null
}
 
  </Modal>
 :null
 }
  </div>
    </div>
  }
}

export default FileDownload;