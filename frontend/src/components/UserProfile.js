import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Button,Form} from 'react-bootstrap';
import Header from './Header';
import {useNavigate} from 'react-router-dom'
import Footer from './Footer';
import MyAccount from './MyAccount';
const GREY = "#9E9E9E";
export default function UserProfile() {
    const navigate=useNavigate()
    const [Profile,setProfile]=useState([])
    const styles = {
        well: {
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
        container :{ position: "relative "},
        img1 :{ display:" block",
                marginTop:10,
            marginLeft:50 },
      fa1 : { position: "absolute",
         bottom:20,
         left:230, }
      };
      useEffect(()=>{
            let data=JSON.parse(localStorage.getItem("user"))
            console.log(data)
            if(data.phone_number===null && data.gender===null){
                setProfile(data)
            }else{setProfile(data)}
           
      },[])
     const edit=()=>{
         navigate('/editdata')
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
                        <Container style={styles.well} className='mt-5'>
                                <Form>
                                    <h1>Profile</h1>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    First Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.firstname} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.lastname} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.email} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Gender
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.gender} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    Phone Number
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={Profile.phone_number} />
                                    </Col>
                                </Form.Group>
                                </Form>
                                <Button variant="outline-secondary" className="mb-3" onClick={edit} >Edit</Button>
                        </Container>
                    </Col>
                </Row>
                </Container>
        </>
    )
}
