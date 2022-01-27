import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Card,Button,Dropdown,DropdownButton, Nav} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MAIN_URL } from '../config/Url'
import { getProducts, getAllCategories, getAllColors,getCategoryProducts,getColorProducts } from '../config/MyService'
import ReactPaginate from 'react-paginate';
import Header from './Header'
import {addToCart} from '../config/MyService';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
const GREY = "#9E9E9E";
export default function Dashboard() {
  let [rate,setRate]=useState(0);
    const navigate=useNavigate()
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0);
    const [product,setProduct]=useState([]);
    const [product_data, setProduct_data] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const styles = {
        well: {
          boxShadow: `3px 3px 3px 3px ${GREY}`,
          TextAlign:'center'
        },
        drop:{
            width:300,border:'1px solid black'
        },
      };
     
      useEffect(()=>{
      
          getAllCategories()
          .then(res=>{
              setCategories(res.data.categories);
          });

          getAllColors()
          .then(res=>{
              setColors(res.data.colors);
          });
          getProducts()
          .then(res=>{
              if(res.data.err){
                  alert(res.data.err)
              }else{
                  setProduct_data(res.data.products);
                 
         getData(res.data.products);
              }
            });
      },[offset]);

      const AllData = () =>{
        getProducts()
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }else{
                setProduct_data(res.data.products);
       getData(res.data.products);
            }
          });
      }
      const getData = (data) => {
                  const slice = data.slice(offset, offset + perPage);
                  const postData =<Row>{slice.map(pd => <Col lg={4} md={6}><Card key={pd._id} className="m-3 p-3">
                      <Card.Img variant="top" src={`${MAIN_URL}neostore/${pd.product_image}`} width="200" height="200" onClick={()=>senddata(pd._id)} />
                     <Card.Title>{pd.product_name}</Card.Title>
                      <Card.Text><h6 className='text-weight-bold'>$ {pd.product_cost}</h6></Card.Text>
                      <Button varaint="primary" className="mt-3" onClick={()=>handleCart(pd._id)} >Add Cart</Button>
                      <Rating
                name="text-feedback"
                value={pd.product_rating}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
                  </Card></Col>)}</Row>
                  setProduct(postData)
                  setPageCount(Math.ceil(data.length / perPage))
    }
    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1)
  };
  const handleCart = (id) =>{
    console.log(id)
    let user=JSON.parse(localStorage.getItem('user'))
    if(user){
      let body = {email:user.email, id:id};
     addToCart(body)
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
    else{
       alert("Please Login before buying the products")
       navigate('/login');
    }
   }
  const senddata=(id)=>{
    console.log(id)
    navigate('/product',{
        state:{id:id}
    })
}
const sortAsc = () =>{
  const sortproducts = product_data;
sortproducts.sort((a, b) => a.product_cost - b.product_cost);
  setProduct_data(sortproducts);
  getData(sortproducts);
}
const sortDsc = () =>{
const sortproducts = product_data;
sortproducts.sort((a, b)=>b.product_cost - a.product_cost);
  setProduct_data(sortproducts);
  getData(sortproducts);
}
const sortRating = () =>{
const sortproducts = product_data;
sortproducts.sort((a, b)=> a.product_rating - b.product_rating)
setProduct_data(sortproducts);
getData(sortproducts);
}
  const handleCategorySelect = (id) =>{
      getCategoryProducts(id)
      .then(res=>{
        setProduct_data(res.data.products);
        getData(res.data.products);
      })
  }

  const handleColorSelect = (id) =>{
    getColorProducts(id)
      .then(res=>{
          console.log(res.data.products);
        setProduct_data(res.data.products);
        getData(res.data.products);
      })
}

    return (
        <>
       
                <Container className='mt-5'>
                    <Row>
                        <Col  md={2} style={styles.well}>
                        <Button size='lg' className='mt-5' variant='outline-secondary' onClick={AllData}>All Products</Button>
                        <DropdownButton className='mt-5' size='lg'
                            variant='outline-secondary'
                            title='categories'
                            >
                          
                                {categories.map(category=>
                            <Dropdown.Item key={category._id} onClick={()=>handleCategorySelect(category._id)} >{category.category_name}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                            <DropdownButton 
                            variant="outline-secondary" size='lg'
                            title="Color"
                         className=' mt-5 mb-2'
                            >
                             {colors.map(color=>
                            <Dropdown.Item key={color._id} onClick={()=>handleColorSelect(color._id)}>{color.color_name}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>

                        </Col>
                        <Col sm={10} style={styles.well} className='p-3 '>
                           <Nav className='justify-content-end'>
                           <Nav.Item className='mx-3'>
                              <p className='mt-2'>Sort By:</p>
                               </Nav.Item>
                           <Nav.Item className='mx-3'>
                                <Button variant='primary' onClick={sortRating}><i className="fas fa-star"></i></Button>
                               </Nav.Item>
                               <Nav.Item className='mx-3'>
                                <Button variant='primary' onClick={sortAsc}><i className="fas fa-sort-alpha-up"></i></Button>
                               </Nav.Item>
                               <Nav.Item className='mx-3'>
                                <Button variant='primary' onClick={sortDsc}><i className="fas fa-sort-alpha-down"></i></Button>
                               </Nav.Item>
                           </Nav>
                        {product} 
                        
                    
                    
                    <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </Col>
                    </Row>
            </Container>
           
           
        </>
    )
}

