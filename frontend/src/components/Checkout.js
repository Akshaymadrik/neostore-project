import React,{useState, useEffect}from 'react'
import { Container,Form,Button,Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { checkout_order } from '../config/MyService';
export default function Checkout() {
    const [cnumber,setCnumber]=useState(0);
    let [total, setTotal] = useState(0);
    const navigate = useNavigate();
         const checkout=()=>{
             if(cnumber.toString().length!==16){
                alert("Enter credit card number correctly")
             }
             else{
                 let email = JSON.parse(localStorage.getItem('user')).email;
                 let address = JSON.parse(localStorage.getItem('address'));
                 let data = {email:email, address:address};
             checkout_order(data)
             .then(res=>{
                 if(res.data.err){
                     alert(res.data.err);
                 }
                 else{
                 alert(res.data.msg);
                 localStorage.removeItem('address');                 
                 navigate('/home');
                 window.location.reload();
                 }
             })
            }
         }
    return (
        <>
        
        <Container className="mt-3" style={{marginBottom:'200px'}}>
            <h2>Check out</h2>
            <Form>
                <Form.Group className="mb-3" as={Row} >
                    <Form.Label column sm={2}>Credit card</Form.Label>
                    <Col sm={7}>
                    <Form.Control type="number" placeholder="Enter credit card number" name="cnumber"onChange={(e)=>{setCnumber(e.target.value)}} required />
                    {cnumber!==0 && cnumber.toString().length!==16 && <span className="text-danger">Enter creidt card number correctly</span>}</Col>
                    <h4 className="mt-4">
                    Order total: ${localStorage.getItem('cart_total')}
                    </h4>
                </Form.Group>
                <Button variant="primary" onClick={()=>checkout()}>
                    Check out
                </Button>
            </Form>
        </Container>
        
    </>
    )
}
