import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Card, Button,Form } from 'react-bootstrap';
import {updaddress, deleteddress,getUser} from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';
const GREY = "#9E9E9E";
export default function Editaddress() {
    const navigate=useNavigate();
    let [address,setAddress]=useState('');
    let [address_line, setAddress_line] = useState('');
    let [city,setCity]=useState('');
    let [state,setState]=useState('');
    let [country,setCountry]=useState('');
   let [address_data,setAdd]=useState([])
   let [ischange,setChange]=useState(false);
   let email = JSON.parse(localStorage.getItem('user')).email;
    const styles = {
        well: {
          boxShadow: `1px 3px 1px ${GREY}`,
          TextAlign:'center'
        },
      };
    useEffect(()=>{
            let data=JSON.parse(localStorage.getItem('user'))
            getUser(data.email)
            .then(res=>{
                if(res.data.user){
                    setAdd(res.data.user.address)
                }
            })
    },[])
    const update=()=>{
        let data={address_line:address_line,pincode:address.pincode,city:city,state:state,country:country};
        updaddress(data,email)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
                localStorage.setItem('user',JSON.stringify(res.data.userdata));
                window.location.reload();
            }
         })
        setChange(true)
    }
    const editaddress=(data)=>{
            setChange(!ischange);
            setAddress(data);
            setAddress_line(data.address_line);
            setCity(data.city);
            setState(data.state);
            setCountry(data.country);
    }
    const deleteAddress=(data)=>{
        console.log(data)
        let data1 = {pincode:data.pincode};
        deleteddress(data1,email)
            .then(res=>{
                if(res.data.err){
                    alert(res.data.err)
                }else{
                    alert(res.data.msg);
                    localStorage.setItem('user',JSON.stringify(res.data.userdata));
                    window.location.reload();
                 
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
                        <Button varaint="primary" href="/addaddress" className='m-3'> Add Address</Button>
                        {address_data &&
                        address_data.map(data=>
                         <Card style={{ width: '18rem' }} key={data.pincode}>
                            <Card.Body>
                                <Card.Title>Address</Card.Title>
                                
                                <Card.Text>
                               <p>{data.address_line},
                              &nbsp;{data.city}-
                              {data.pincode},
                              &nbsp;{data.state},
                              &nbsp;{data.country}
                              </p>
                                </Card.Text>
                           
                            <Button variant='info' onClick={()=>editaddress(data)} className='m-3'>Edit</Button>
                            <Button variant='danger' onClick={()=>deleteAddress(data)} className='m-3'>Delete</Button>
                            </Card.Body>
                            </Card>)}
                          {ischange && <Form className='m-3'>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Address</Form.Label>
                              <Form.Control placeholder="Enter Address" name="address"  defaultValue={address.address_line} onChange={(e)=>setAddress_line(e.target.value)} />
                              {address!==''&& address.length<16 && <span className='text-danger'>Please enter address more than 16 chracters</span>}
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Pincode</Form.Label>
                              <Form.Control placeholder="Enter Pincode" name="pincode" plaintext readOnly defaultValue={address.pincode} />
                              
                          </Form.Group>
  
                          <Row className="mb-3">
                              <Form.Group as={Col} controlId="formGridCity">
                              <Form.Label>City</Form.Label>
                              <Form.Control placeholder="Enter City" name="city" defaultValue={address.city} onChange={(e)=>setCity(e.target.value)}/>
                              {city!==''&& city.length<4 && <span className='text-danger'>Please enter city more than 4 chracters</span>}
                              </Form.Group>
  
                              <Form.Group as={Col} controlId="formGridState">
                              <Form.Label>State</Form.Label>
                             
                                  <Form.Control placeholder="Enter State" name="state"  defaultValue={address.state} onChange={(e)=>setState(e.target.value)}/>
                                  {state!==''&& state.length<4 && <span className='text-danger'>Please enter state more than 4 chracters</span>}
                              </Form.Group>
  
                          </Row>
                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Country</Form.Label>
                              <Form.Control placeholder="Enter Country" name="country"  defaultValue={address.country} onChange={(e)=>setCountry(e.target.value)} />
                              {country!==''&& country.length<4 && <span className='text-danger'>Please enter country more than 4 chracters</span>}
                          </Form.Group>
                          <Button variant="outline-secondary" className="mb-3" onClick={update} >update Address</Button>
                          </Form>}
                        </Container>
                    </Col>
                </Row>
                </Container>
               
        </>
    )
}
