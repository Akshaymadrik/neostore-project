import React,{useState, useEffect} from 'react'
import { Button, Container, Form, Row,Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {getUser} from '../config/MyService'
export default function SelectAddress() {
    let [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    let [addr, setAddr] = useState('');
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        if(user!==null){
        getUser(user.email)
        .then(res=>{
            if(res.data.user){
                setAddresses(res.data.user.address)
            }
        })}
        else{
            alert("Login required")
        }
    },[]);

    const handleAddress = () =>{
       localStorage.setItem('address',JSON.stringify(addr));
       navigate('/checkout');
    }
    return (
        <>
        
            <Container className='mt-5' style={{marginBottom:'160px'}}>
                <h2>Select Address</h2>
                <Form className='m-5'>
                <Row>
                    {addresses.length>0 ? addresses.map((adr,ind)=>{
                    return(
                        <Col lg='4' key={ind}>
                             <Card className='p-3'><Form.Check
                            type='radio'
                            name='address'
                            value={JSON.stringify(adr)}
                            onChange={(e)=>setAddr(JSON.parse(e.target.value))}
                            label={`${adr.address_line}  ${adr.city}-${adr.pincode}  ${adr.state}  ${adr.country}`}
                        /></Card>
                        </Col>)
}):<p>No Addresses found<br/><Button variant='primary' href='/addaddress'>Add address</Button></p>}
                </Row>

                <Button variant='outline-primary' active className='mt-4' onClick={()=>handleAddress()}>Next</Button>
                </Form>
            </Container>
        </>
    )
}
