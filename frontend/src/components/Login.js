import React,{useState} from 'react'
import { Container,Form,Row,Col,Button } from 'react-bootstrap'
import {loginUser,registerUser1} from '../config/MyService';
import { useNavigate } from 'react-router';
import SocialButton from './SocialButton'
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login= ()=>{
        let data = {email:email, password:password};
        loginUser(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
               
            }
           else{
                alert(res.data.msg)
                localStorage.setItem("_token",res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/');
                window.location.reload();
            }
        })
            
    }
    const handleSocialLogin = (user) => {
        let email=user._profile.email;
        let firstname=user._profile.firstName;
        let lastname=user._profile.lastName;
        let data={email:email,firstname:firstname,lastname:lastname};
          console.log(data)
          registerUser1(data)
          .then(res=>{
              if(res.data.err){
                  alert(res.data.err)
              }
              else{
                  alert(res.data.msg)
                  localStorage.setItem("user", JSON.stringify(data));
                  localStorage.setItem("_token",res.data.token);
                  navigate('/')
                  window.location.reload();
              }
          });
      };
      
      const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
    return (
        <>
          
            <Container  className="mt-5" style={{marginBottom:"14%"}}>
                <Row>
                <Col md={6}>
                <SocialButton
                    provider="facebook"
                    appId="1050755129046065"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    variant="danger"
                    style={{ marginTop:"3%",marginLeft:"5%",fontSize:"20px",width:"50%"}}
                    
                    ><i className='fab fa-facebook-square m-4'></i>
                    Login with Facebook
                    </SocialButton><br/>
                    <SocialButton
                    provider="google"
                    appId="1061401315399-d3jlfpd3c4phv7so9a5aqabcen8qp2ge.apps.googleusercontent.com"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    variant="primary"
                    style={{marginTop:"3%",marginLeft:"5%",fontSize:"20px",width:"50%"}}
                    
                    ><i className="fas fa-envelope-open m-4"></i>
                    Login with Gmail
                    </SocialButton>
                </Col>
            <Col md={6}>
           
            <h2>Login to neostore </h2>
            <Form >
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control  type="text" placeholder="Enter Email Id" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {password!=='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={login}>Login</Button>< a href='/forgot' className='ml-5'>Forgot password</a>
                </Form>
            </Col>
            </Row>
            </Container>
        </>
    )
}

