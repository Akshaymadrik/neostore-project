import React,{useState} from 'react'
import { Container,Button,Form,Row,Col } from 'react-bootstrap';    
import { forgotEmail } from '../config/MyService';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function ForgotEmail() {
    let [email,setEmail]=useState('');

    const handleSubmit = () =>{
        if(regForEmail.test(email)){
            localStorage.setItem('forgot_email',email);
            forgotEmail(email)
            .then(res=>{
                if(res.data.err){
                    alert(res.data.err);
                }
                else{
                    alert(res.data.msg);
                }
            })
        }
        else{
            alert("Enter Email correctly")
        }
    }
    return (
        <Container className='mt-5'style={{marginBottom:'267px'}}>
            <h2 className='m-3'>Enter Email to set the password</h2>
            <Form>
             <Form.Group as={Row} className="mb-3 d-flex justify-content-center">
                <Form.Control type='email' name="email" placeholder="Enter Email Id" name="email" onChange={(e)=>{setEmail(e.target.value)}}
                style={{width:"350px"}}/>
                    {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
             </Form.Group>
            </Form>
            <Button variant='info' size='lg' className='m-3' onClick={handleSubmit} >Submit</Button>
        </Container>
    )
}
