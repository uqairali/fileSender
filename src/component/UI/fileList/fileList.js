import axios from 'axios';
import { URL } from '../../../serverURL';

export var accessAllFiles=()=>{

axios.get(`${URL}/allFiles`).then(res=>{
    AllList=res.data
}).catch(err=>{
    console.log(err)
})
}

export var AllList;
