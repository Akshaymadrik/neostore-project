import React ,{useEffect,useState}from 'react'
import {Navbar,Container,Nav,InputGroup,FormControl,NavDropdown,Button,Badge,Modal,Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {getCart,getProducts} from '../config/MyService'
export default function Header() {
    
    const dispatch = useDispatch();
    const cartCount = useSelector(state=>state.cartCount);
    const navigate=useNavigate();
    let [product_data, setProduct_data] = useState([]);
    let [filtered, setFiltered] = useState([]);
    let [product, setProduct] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const titleof=(<i className='fas fa-user'></i>)
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        if(user.email){
        getCart(user.email)
        .then(res=>{
          if(res.data.err){
            console.log(res.data.err);
          }
          else{
            dispatch({type:'cart',payload:res.data.cart.length})
          }
        })
        }
        getProducts()
              .then(res=>{
                  if(res.data.err){
                      alert(res.data.err)
                  }else{
                      setProduct_data(res.data.products);
                  }
                });
      },[])
      const handleInput=(e)=>{
        setShow(true)
        const value = e.target.value;
        setProduct(e.target.value);
        console.log(product_data[0].product_name)
        const filteredData = product_data.filter(element =>
          element.product_name.toLowerCase().includes(value.toLowerCase()));
        console.log(filteredData)
        setFiltered(filteredData);
      }
      const senddata=(id)=>{
       
        navigate('/product',{
            state:{id:id}
        })
        setShow(false);
        window.location.reload();
      }
    const handle=()=>{
        localStorage.clear();
        navigate('/')
        window.location.reload();
    }
    return (
        <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                    <Navbar.Brand href="#home" style={{fontSize:30,marginRight:90}}>Neo<span style={{color:"red",fontWeight:"bold"}}>STORE</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                     <Navbar.Collapse id="navbarScroll">
                    <Nav className="m-auto">
                    <Nav.Link href="/" style={{marginRight:100}} >Home</Nav.Link>
                    <Nav.Link href="/home" style={{marginRight:150}}>Products</Nav.Link>
                    <Nav.Link href="/order" style={{marginRight:100}}>Order</Nav.Link>
                    </Nav>
                 
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className='fa fa-search'></i></InputGroup.Text>
                        <FormControl
                        placeholder="Search" onChange={(e)=>handleInput(e)} 
                        />
                    </InputGroup>
                    <Button variant="outline-dark" className='bg-white mb-3' style={{marginLeft:'10px', width:'100px'}} href="/cart">
                        <i class="fas fa-shopping-cart"></i>{cartCount!=0 && <Badge bg="danger" className='mt-0' pill>{cartCount}</Badge>} 
                    Cart</Button>
                            <NavDropdown variant="outline-dark" title={titleof}  id="basic-nav-dropdown" className='bg-dark text-dark' style={{ height: '40px', marginLeft: '10px' }}>
                            <NavDropdown.Item href="/userprofile">User Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/addaddress">Add address</NavDropdown.Item>
                            <NavDropdown.Item href="/changepassword">Change password</NavDropdown.Item>
                            <NavDropdown.Item href="/editaddress">Editaddress</NavDropdown.Item>
                            <NavDropdown.Item onClick={handle}>Logout</NavDropdown.Item>
                                </NavDropdown>
                   
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Search Products</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1"><span className='fa fa-search'></span></InputGroup.Text>
                            <FormControl placeholder="search" value={product} onChange={(e)=>handleInput(e)} />
                          </InputGroup>
                          {filtered.length > 0 && filtered.map(pd=>
                          <Card key={pd._id} onClick={()=>senddata(pd._id)}>
                          <Card.Body>{pd.product_name}</Card.Body>
                        </Card>)
                          }
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
        </div>
    )
}
