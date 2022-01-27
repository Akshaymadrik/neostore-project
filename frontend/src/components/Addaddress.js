import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Button,Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {addAddressto} from '../config/MyService'
import MyAccount from './MyAccount';
const GREY = "#9E9E9E";
export default function Addaddress() {
    const navigate=useNavigate()
    let [address,setAddress]=useState('');
    let [pincode,setPincode]=useState(0);
    let [city,setCity]=useState('');
    let [state,setState]=useState('');
    let [country,setCountry]=useState('')
    const styles = {
        well: {
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
      const addAddress=()=>{
          let data={address:address,pincode:pincode,city:city,state:state,country:country};
          let email=JSON.parse(localStorage.getItem('user')).email;
          console.log(email)
            addAddressto(data,email)
            .then(res=>{
                if(res.data.err){
                    alert(res.data.err)
                }else{
                    alert(res.data.msg);
                    let user = JSON.parse(localStorage.getItem('user'));
                    user.address.push(data);
                    localStorage.setItem('user',JSON.stringify(user));
                    navigate('/editaddress');
                
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

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter Address" name="address"  value={address} onChange={(e)=>setAddress(e.target.value)} />
                        {address!==''&& address.length<16 && <span className='text-danger'>Please enter adress more than 16 chracters</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control placeholder="Enter Pincode" name="pincode"  value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                            {pincode!==''&& pincode.length<6 && <span className='text-danger'>Please enter pincode more than 6 chracters</span>}
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="Enter City" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                            {city!==''&& city.length<4 && <span className='text-danger'>Please enter city more than 4 chracters</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                                <Form.Control placeholder="Enter State" name="state" value={state} onChange={(e)=>setState(e.target.value)}/>
                                {state!==''&& state.length<4 && <span className='text-danger'>Please enter state more than 4 chracters</span>}
                            </Form.Group>

                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Country</Form.Label>
                            <Form.Control placeholder="Enter Country" name="country" value={country} onChange={(e)=>setCountry(e.target.value)} />
                            {country!==''&& country.length<4 && <span className='text-danger'>Please enter country more than 4 chracters</span>}
                        </Form.Group>
                        <Button variant="outline-secondary" className="mb-3"  onClick={addAddress}>Add Address</Button>
                        </Form>
                        </Container>
                    </Col>
                </Row>
                </Container>
               
                
        </>
    )
}
