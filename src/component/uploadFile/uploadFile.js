import React,{Component} from 'react';
import * as Icons from 'react-icons/lib/fa';
import './uploadFile.css';
import axios from 'axios';
import Button from '../UI/button/button';
import Download from '../downloadFiles/downloadFiles';
import { URL } from '../../serverURL';
class UpladFile extends Component{
    constructor() {
        super();
        this.state = {
          description: '',
          selectedFile:'',
          errorMess:null,
          encodeFile:'',
          token:''
        }
        
      }
login=()=>{
  axios.get('http://localhost:8080/jwt/login').then(res=>{
    console.log(res.data.token);
    this.setState({token:res.data.token})
  })
}

post=()=>{
  axios.defaults.headers.common['Authorization'] =`Bearer ${this.state.token}`;
  axios.post('http://localhost:8080/jwt/posts')
  
  .then(res=>{
    console.log(res.data)
  })
}
     hideErrorMess=()=>{
       this.setState({errorMess:null})
     }
   
     showErrorMess=(mess)=>{
       this.setState({errorMess:mess})
     }

    onChange = (e) => {
        switch (e.target.name) {
          case 'selectedFile':
            this.setState({ selectedFile: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      onUploadButton = (e) => {
        if(this.state.description===""&&this.state.selectedFile===""){
         this.showErrorMess("Choose any file!")
          return;
        }
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        axios.post(`${URL}/upload`, formData)
          .then((res) => {
            console.log(res.data);
            this.setState({encodeFile:res.data,description:"",selectedFile:""})
          }).catch(err=>{
            console.log(err);
          })
        }

    render(){
      if(this.state.errorMess!==null){
        setTimeout(this.hideErrorMess,3000);
      }
      
        return(

        <div className="container">

         <div className="Border">
{
  this.state.errorMess!==null?
<div style={{textAlign:'center'}} className="alert alert-dismissible alert-danger">
{this.state.errorMess}
</div>:null
}

          <h1 style={{
              textAlign:'center',
              fontSize:'150px',
              color:'rgb(199, 199, 199)',
           
          }} ><div className="MouseHover"><Icons.FaCloudUpload/></div>
          <p style={{color:'black',fontWeight:'bold',fontSize:'25px'}} >Choose File for upload</p>
          <p style={{color:'black',fontSize:'20px'}} >or Download uploaded File</p>
          </h1>
        
   <Button icon={<Icons.FaImage/>} btnText='Upload' onSubmit={this.onUploadButton} />
  
   <Download/>
   <input style={{marginLeft:"120px",marginTop:"20px"}}

              type="file"
              name="selectedFile"
              onChange={this.onChange}
            />

    <div style={{textAlign:'center',fontSize:'15px',marginTop:'30px',fontWeight:'bold'}} className="alert alert-dismissible alert-success">
    {this.state.encodeFile}
    </div>
         </div>
       
        <button onClick={this.login}>login</button>

        <button onClick={this.post}>post</button>
        </div>
        )
}}

export default  UpladFile;