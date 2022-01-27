import React,{useState} from 'react'
import { Container,Form,Button,Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { forgotChange } from '../config/MyService';
export default function ForgotPass() {
    let [password,setPassword]=useState('');
    let [cpassword,setCpassword]=useState('');
    const navigate = useNavigate();
    const handleSubmit = () =>{
        let email = localStorage.getItem('forgot_email');
        
        if(password.length >=8 && password === cpassword){
            let forgot_data = {password:password};
            console.log(email);
            forgotChange(email, forgot_data)
            .then(res=>{
                if(res.data.err){
                    alert(res.data.err);
                }
                else{
                    alert(res.data.msg);
                    navigate("/")
                }
            })
        }
        else{
            alert("Password doesn't match");
        }
    }
    return (
        <Container className='mt-5'style={{marginBottom:'160px'}}>
        <h2 className='m-3'>Enter Email to set the password</h2>
        <Form>
            <Form.Group as={Row} className="mb-3 d-flex justify-content-center">
            <Form.Label column sm="2">Enter Password </Form.Label>
                <Col sm="7">
                    <Form.Control type="password" placeholder="Password" name='password' onChange={(e)=>{setPassword(e.target.value)}} />
                    {password!=='' && password.length < 8 && <span className="text-danger">Enter password  atleast of 8 characters</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 d-flex justify-content-center">
            <Form.Label column sm="2">Re-enter Password </Form.Label>
                <Col sm="7">
                    <Form.Control type="password" placeholder="Confirm Password" name='conpassword' onChange={(e)=>{setCpassword(e.target.value)}} />
                    {cpassword!=='' && cpassword !== password && <span className="text-danger">Passwords doesn't match</span>}
                </Col>
            </Form.Group>
            <Button variant='info' className='m-3' onClick={handleSubmit} >Submit</Button>
        </Form>            
    </Container>
    )
}
