import React,{useState} from 'react'
import {Form,Row,Col,Button,Container} from 'react-bootstrap';
import { updpassword } from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';
const GREY = "#9E9E9E";
export default function ChangePassword() {
    const styles = {
        well: {
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
    const navigate=useNavigate();
    let [old_password,setOPassword]=useState('');
    let [password,setPassword]=useState('');
        let [cpassword,setCpassword]=useState('');
        const change=()=>{
            let data = JSON.parse(sessionStorage.getItem('user'));
            if(password === cpassword){
                let change_data = {old_password:old_password, password:password,email:data.email};
                updpassword(change_data)
                .then(res=>{
                    if(res.data.err === 1)
                {
                    alert(res.data.msg)
                }
                else{
                    alert(res.data.msg)
                    navigate('/userprofile')
                }
                })
            }
        }
    return (
        <>
        
            <Container className="mt-5">
                <h1 style={styles.well}>My Account</h1>
                <Row>
                    <Col md={4}>
                      <MyAccount/>  
                    </Col>
                    <Col md={8}>
                    <Container style={styles.well}>
            <Form className='mt-5'>
                <h1>Change Password</h1>
            <Form.Group as={Row} className="mb-3" >
                <Col sm="10">
                <Form.Control type="password" placeholder=" Enter Old Password" name="old_password" onChange={(e)=>{setOPassword(e.target.value)}}/>
                {old_password!=='' && old_password.length < 8 && old_password!==password &&<span className="text-danger">Enter  old password  correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Col sm="10">
                <Form.Control type="password" placeholder=" New Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {password!=='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Col sm="10">
                <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={(e)=>{setCpassword(e.target.value)}} />
                {cpassword!=='' && cpassword !== password && <span className="text-danger">Passwords doesn't match</span>}
                </Col>
            </Form.Group>
            <Button variant='primary' onClick={change}>ChangePassword</Button>
            </Form>
            </Container>
                    </Col>
        </Row>
    </Container>
              
        </>
    )
}
