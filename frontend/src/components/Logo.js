import React,{useState} from 'react'
import axios from 'axios';
import { MAIN_URL } from '../config/Url';
import { Container,Button,Form,Row,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function Logo() {
    let email=JSON.parse(localStorage.getItem('user')).email;
    let token=localStorage.getItem('_token');
    let [logo,setLogo]=useState('');
    const navigate=useNavigate();
    const falogo=(<i className='fa fa-camera'></i>)
    const styles = {
        container :{ position: "relative", marginTop:'70px', marginBottom:'250px'},
        img1 :{ display:" block",
                marginTop:10,
            marginLeft:50 },
      fa1 : { position: "absolute",
         bottom:20,
         left:230, }
      };
      const upload=()=>{
     let form_data=new FormData();
          console.log(logo);
          form_data.append("myfile",logo);
          axios.post(`${MAIN_URL}neostore/uploadlogo/${email}`,form_data,{
              headers:{"Authorization":`Bearer ${token}`,
              'Content-Type': 'multipart/form-data'}})
              .then(res=>{
                  if(res.data.err){
                      alert(res.data.err)
                  }else{
                      alert(res.data.msg)
                     
                      navigate('/userprofile')
                  }
              })
      }
    return (
        <>
  
              <Container style={styles.container} className="mt-5">
                     <Form method="post"  encType="multipart/form-data">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Logo
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control  type="file" placeholder={falogo} name="myfile" id="myfile" onChange={(e)=>{setLogo(e.target.files[0])}} />
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={upload} >Update</Button>
                    </Form>
                    </Container>
        </>
    )
}
