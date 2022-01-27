import React,{useState,useEffect} from 'react'
import Footer from './Footer'
import { Container,Carousel,Card,Button,Row,Col } from 'react-bootstrap'
import { getCategoryProducts, getProducts } from '../config/MyService'
import { MAIN_URL } from '../config/Url'
import {getCategory} from '../config/MyService'
export default function DashBoard() {
    const [product,setProduct]=useState([]);
    const [category,setCategory]=useState([])
    useEffect(()=>{
        getCategory()
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }else{
                
                setCategory(res.data.category)
            }
        })
        getProducts()
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }else{
                setProduct(res.data.products)
            }
        })
    },[])

    return (
        <div>
           
            <Container className='mt-5'>
            <Carousel>
                { category.map(cat=> <Carousel.Item key={cat._id}>
                    <img
                    className="d-block w-100"
                    src={`${MAIN_URL}neostore/${cat.product_image}`}
                    height={300}
                    />
                    <Carousel.Caption>
                    <h3 className='text-warning'>{cat.category_name}</h3>
                    </Carousel.Caption>
                </Carousel.Item>)}
 
            </Carousel>
            </Container>
            <Container>
                <h1 className="text-center mt-5">Populated Products</h1>
                <p className="text-center mt-3">View All</p>
                <Row>
                {product.map(pro=>
                    <Col lg={4} md={6} >
                   
                    <Card className='mt-5' style={{height:"40%"}}>
                    <Card.Img variant="top" src={`${MAIN_URL}neostore/${pro.product_image}`} width="200" height="200" />
                    <Card.Body>
                        <Card.Title>{pro.product_name}</Card.Title>
                        <Card.Text>
                        {pro.product_cost}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                   
                    </Col>
                     )}
                    </Row>
            </Container>
            
        </div>
    )
}
