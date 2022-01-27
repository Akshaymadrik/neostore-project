import React,{useState} from 'react'
import { Container,Form,Button,Row,Col} from 'react-bootstrap'
import { registerUser,registerUser1 } from '../config/MyService';
import { useNavigate } from 'react-router';
import SocialButton from './SocialButton';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export  default function Registration(){
        let [email,setEmail]=useState('');
        let [password,setPassword]=useState('');
        let [cpassword,setCpassword]=useState('');
        let [firstname,setFirstname]=useState('');
        let [lastname,setLastname]=useState('');
        let [phone_number,setPhone]=useState(0)
        let [gender,setGender]=useState('');
        const navigate=useNavigate();
        const handleSocialLogin = (user) => {
          console.log(user);
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
                  navigate('/home')
              }
          });
           
        };
        
        const handleSocialLoginFailure = (err) => {
          console.error(err);
         
        };
        const register=()=>{
            
            let data={email:email,password:password,firstname:firstname,lastname:lastname,gender:gender,phone_number:phone_number};
            console.log(data)
            registerUser(data)
            .then(res=>{
                if(res.data.err){
                    alert(res.data.err)
                }
                else{
                    alert(res.data.msg)
                    navigate('/login')
                }
            });
        }
    return (
        <>
          
            <Container className="mt-5">
                <SocialButton
      provider="facebook"
      appId="1050755129046065"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      variant="danger"
      style={{marginTop:"3%",marginLeft:"10%",fontSize:"20px",width:"50%"}}
      
    ><i className='fab fa-facebook-square m-4'></i>
      Login with Facebook
    </SocialButton>
    <SocialButton
      provider="google"
      appId="313793921139-gap4o5v1nc8jg4quijcae5p5j0qv13b5.apps.googleusercontent.com"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      variant="primary"
      style={{marginTop:"3%",marginLeft:"10%",fontSize:"20px",width:"50%"}}
    ><i className="fas fa-envelope-open m-4"></i>
      Login with Gmail
    </SocialButton>
            
        <Container className="mt-3" >
        <Form style={{textAlign:'justify',marginLeft:"10%",marginRight:"20%"}}>
        <h2>Registration</h2>
        <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                FirstName
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter First Name" name="firstname" onChange={(e)=>{setFirstname(e.target.value)}}/>
                {firstname!=='' && firstname.length < 4 && <span className="text-danger">Enter first name correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                LastName
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter Last Name" name="mobile" onChange={(e)=>{setLastname(e.target.value)}}/>
                {lastname!=='' && lastname.length < 2 && <span className="text-danger">Enter last name correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter Emailid" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                </Col>
            
            
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">
                Phone number
                </Form.Label>
                <Col sm="7">
                <Form.Control type="number" placeholder="Enter Phone number" name="phone_number" onChange={(e)=>{setPhone(e.target.value)}}/>
                {phone_number!=='' && phone_number.length < 11 && <span className="text-danger">Enter phone number  correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="7">
                <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {password!=='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">
                Confirm Password
                </Form.Label>
                <Col sm="7">
                <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={(e)=>{setCpassword(e.target.value)}} />
                {cpassword!=='' && cpassword !== password && <span className="text-danger">Passwords doesn't match</span>}
                </Col>
            </Form.Group>
            <fieldset>
    <Form.Group as={Row} className="mb-3">
      <Form.Label as="legend" column sm={2}>
        Gender
      </Form.Label>
      <Col sm={5}>
        <Form.Check
          type="radio"
          label="Male"
          name="gender"
          id="Male"
          value="Male"
          onChange={(e)=>setGender(e.target.value)}
        />
        </Col>
        <Col sm={5}>
        <Form.Check
          type="radio"
          label="Female"
          name="gender"
          id="Female"
          value="Female"
          onChange={(e)=>setGender(e.target.value)}
        />
      </Col>
    </Form.Group>
  </fieldset>
            <Button variant="primary" onClick={register} >Register</Button>
            
            </Form>
        </Container>
        
        </Container>
        </>
    )
}