import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Button,Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {editData} from '../config/MyService'
import MyAccount from './MyAccount';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const GREY = "#9E9E9E";
export default function EditProfile() {
    const navigate=useNavigate()
    let [firstname,setfirstname]=useState('')
    let [lastname,setlastname]=useState('')
    let [email,setemail]=useState('')
    let [gender,setgender]=useState('')
    let [phone_number,setPhone]=useState('')
    
    const [Profile,setProfile]=useState([])
    const styles = {
        well: {
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
      useEffect(()=>{
            let data=JSON.parse(localStorage.getItem("user"))
            console.log(data)
            setProfile(data)
            setfirstname(data.firstname);
            setlastname(data.lastname);
            setemail(data.email)
            setgender(data.gender)
            setPhone(data.phone_number)
      },[])
     const editdata=()=>{
         let data={firstname:firstname,lastname:lastname,email:email,phone_number:phone_number,gender:gender};
         editData(data)
         .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                navigate('/userprofile')
            }
         })
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
                                <Form>
                                    <h1>Profile</h1>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    First Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text"  defaultValue={Profile.firstname} name="firstname" onChange={(e)=>setfirstname(e.target.value)}/>
                                    {firstname!==''&& firstname.length<4 && <span className='text-danger'>Please enter firstname more than 4 chracters</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.lastname}  name="lastname" onChange={(e)=>setlastname(e.target.value)} />
                                    {lastname!==''&& lastname.length<4 && <span className='text-danger'>Please enter lastname more than 4 chracters</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.email}   name="email" onChange={(e)=>setemail(e.target.value)}/>
                                    {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Gender
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.gender}  name="gender" onChange={(e)=>setgender(e.target.value)}/>

                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Phone Number
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control defaultValue={Profile.phone_number}  name="phone_number" onChange={(e)=>setPhone(e.target.value)} />
                                    </Col>        
                                </Form.Group>
                                </Form>
                                <Button variant="outline-secondary" className="mb-3" onClick={editdata} >Edit</Button>
                        </Container>
                    </Col>
                </Row>
                </Container>
        </>
    )
}
