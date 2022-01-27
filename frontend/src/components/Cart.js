import React,{useState,useEffect} from 'react'
import { Button, Col, Container, Row, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCart,incrementproduct,decrementproduct,deleteOrder } from '../config/MyService';
import { MAIN_URL } from '../config/Url';
export default function Cart() {
    let [products,setProducts] = useState([]);
    let [total, setTotal] = useState(0);
    let [gst, setGst] = useState(0);
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        if(user){
            getCart(user.email)
            .then(res=>{
                if(res.data.err){
                    console.log(res.data.err);
                }
                else{
                    console.log(res.data.cart)
                    setProducts(res.data.cart);
                    const datatotal = res.data.cart.reduce((prev, cur)=>prev + cur.quantity * cur.product_id.product_cost,0);
                    setTotal(datatotal);
                    localStorage.setItem('cart_total',datatotal);
                    setGst(datatotal * 0.05)
                }
            })
        }
        else{
            navigate('/login')
        }
    },[]);
    const increment = (id) =>{
        let data = {email:user.email,product_id:id};
        incrementproduct(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err);
            }
            else{
                alert(res.data.msg);
                window.location.reload();
            }
        })
    }
    const decrement = (id) =>{
        let data = {email:user.email,product_id:id};
        decrementproduct(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err);
            }
            else{
                alert(res.data.msg);
                window.location.reload();
            }
        })
    }

    const buyProducts = ()=>{
        navigate('/selectaddress');
    }

    const deleteCart = (id) =>{
        deleteOrder(id)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err);
            }
            else{
                alert(res.data.msg);
                window.location.reload();
            }
        })
    }
    return (
        <>
       
            <Container>
                <h2 className='m-3'>Your cart</h2>
                {products.length >= 1 ?
                <Row>
                    <Col lg='9' md='6' sm='4'>
                <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                 {products.map(prd=>
                 <tr key={prd._id}>
                    <td style={{textAlign:'left'}}><Row><Col sm='3'><img src={`${MAIN_URL}neostore/${prd.product_id.product_image}`} width='100px' height='100px'/>
                    </Col> <Col lg="5"><p className='d-inline'>{prd.product_id.product_name}<br/>
                    by {prd.product_id.product_producer}<br/>
                    Status: In stock</p></Col></Row></td>
                    <td className='p-3'><Row>
                        <Col lg='5'><Button variant='danger' onClick={()=>increment(prd.product_id)}>+</Button></Col>
                        <Col lg='1' className='d-flex justify-content-center'><p className='mt-2'>{prd.quantity}</p></Col>
                        <Col lg='4'><Button variant='danger' onClick={()=>decrement(prd.product_id)}>-</Button></Col></Row></td>
                    <td className='p-3'>{prd.product_id.product_cost}</td>
                    <td className='p-3'>{prd.quantity * prd.product_id.product_cost}</td>
                    <td><Button variant='outline-danger' className='m-4' onClick={()=>deleteCart(prd._id)}><i className="fas fa-trash-alt"></i></Button></td>
                  </tr>)}
                  </tbody>
                  </Table>
                  </Col>
                  
                  <Col lg='3'>
                  <Card className='ml-3 mb-3'>
                    <Card.Body>
                        <Card.Title>Review Order</Card.Title>
                        <Card.Text className='d-flex justify-content-between mt-4'>
                        <p>Subtotal</p> <p>{total}</p>
                        </Card.Text><hr/>
                        <Card.Text className='d-flex justify-content-between'>
                        <p>GST (5%)</p> <p>{gst}</p>
                        </Card.Text><hr/>
                        <Card.Text className='d-flex justify-content-between'>
                        <p>Grand total</p> <p>{total + gst}</p>
                        </Card.Text>
                        <Button variant='primary' style={{width:'90%'}} className='mt-4' onClick={()=>buyProducts()}>Proceed to Buy</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                </Row>:
                  <h4 className='mt-4' style={{marginBottom:'33'}}>Your Cart is Empty</h4>}
            </Container>
         
        </>
    )
}
