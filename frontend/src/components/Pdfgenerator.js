import React,{useState, useEffect} from 'react'
import "react-multiple-select-dropdown-lite/dist/index.css";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Container,Row,Form,Col,Navbar,Nav, Button } from "react-bootstrap";
import { MAIN_URL } from '../config/Url';
import { getOrd } from '../config/MyService';


export default function Pdfgenerator({id}) {
  const styles={
     in:{
      display:"none"
     },
    
   }
  const [postdata, setPostdata] = useState([]);
  const [address, setAddress] = useState([]);
  let [order,setOrder]=useState({});
  let [user, setUser] = useState({});
  const [mainimage, setmainimage] = useState();
  let [subimage,setSubimage]=useState([])
  let [rate,setRate]=useState(0);
  useEffect(() => {
   if(id){
     setUser(JSON.parse(localStorage.getItem('user')));
    getOrd(id)
      .then((res) => {
        console.log(res.data.order)
        setOrder(res.data.order);
      
        setPostdata(res.data.order.product_id);
        setAddress(res.data.order.address);
        setmainimage(res.data.order.product_id.product_image);
        setRate(res.data.order.product_id.product_rating);
        setSubimage(res.data.order.product_id.product_subimages);
        console.log(res.data.order.product_id)
      });
    }
  }, []);

    return (
      <div>
   
         <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/"><h2 className='text-white'><b>Neo<div className='text-danger d-inline'>STORE</div></b></h2></Navbar.Brand>
            <h4 className='text-center text-white'>Invoice Details</h4>
        </Container>
        </Navbar>
      <Container style={{width: '255mm',
      minHeight: '255mm',
      marginLeft: 'auto',
      marginRight: 'auto'}}>
        <Row className="bg-light p-4 ">
              <Col md='6'>
              <img src={`${MAIN_URL}neostore/${mainimage}`} width="400" height="300" alt='image' />
            <Row>
                    {subimage.map(item =>   
                    <Col md={4}>                   
                        <img
                          src={`${MAIN_URL}neostore/${item}`}
                          width="100px"
                          height="100px"
                          className="mt-4"
                        />       
                        </Col>           
                    )}
                    </Row>
            
              </Col>
              <Col md='6' className="pl-4">
                  <h3 className="">{postdata.product_name}</h3>
                  <Rating
              name="text-feedback"
              value={rate}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
                  <hr />
                  <br />
                  <h5>
                    Total Price:
                      <h3 className="text-danger">
                        {" "}
                        $ {order.quantity * postdata.product_cost}
                      </h3>
                 
                   
                  </h5>
                  <h5 className="mt-2">
                    Quantity:{order.quantity}
                  </h5>        
                    <h5 className="mt-4">
                    Ordered By: <p className='d-inline text-primary'>{user.first_name} {user.last_name}<br/>
                {address.address_line}<br/>
                   {address.city} - {address.pincode}<br/>
                    {address.state}, {address.country}</p>
                  </h5>
                  <h5 className="mt-4">
                    Produced By: <p className='text-primary d-inline'>{postdata.product_producer}</p>
                  </h5><br/> 
                </Col>
              </Row>
              
              <hr/>
                <h3>Product Details</h3>
                <hr/>
                <ul className='text-start'>
                  <li>Dimension: {postdata.product_dimension}</li>
                  <li>Material: {postdata.product_material}</li>
                  <li>Producer: {postdata.product_producer}</li>
                  <li>Marketed by: NeoStore</li>
                </ul>
<hr/>
                <h3>Description</h3>
                <hr/>
                  <p className='text-start'>{postdata.product_desc}</p>
          <hr />
      <br />
      <br />
    </Container>
              
</div>
    )
}
