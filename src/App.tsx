//Components
import Item from './Item/Item'
import Cart from './Cart/Cart'
import {useState} from 'react'
import Drawer from '@material-ui/core/Drawer';
import  LinearProgress  from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from "@material-ui/core/Badge";
import "./App.css";


//Styles
import {Wrapper,StyledButton} from './App.style';
import { useQuery } from 'react-query';
import { Carousel, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

//Types
export type CartItemType = {
  id : number;
  category : string;
  description : string;
  image : string;
  price : number;
  title : string;
  amount : number;
}

const getProducts = async (): Promise<CartItemType[]> => 

  await(await fetch('https://fakestoreapi.com/products?limit=5')).json();




const App = () => {

  
  const[cartOpen,setCartOpen] = useState(false);
  const[cartItems,setCartItems] = useState([] as CartItemType[]);

  const {data, isLoading ,error} = useQuery <CartItemType[]> ('products',getProducts)
    console.log(data);

  const getTotalItems:any = (items:CartItemType[]) => {
    items.reduce((ack: number, item)=> ack + item.amount,0);
  };
  const handleAddToCart = (clickedItem : CartItemType) => {
    setCartItems((prev:any) => {
      const isItemInCart = prev.find(((item: { id: number; }) => item.id === clickedItem.id))
      if (isItemInCart){
        return prev.map(((item: { id: number; amount: number; }) => 
          item.id === clickedItem.id
            ?{...Item,amount:item.amount+1}
            :{item}
            ))
      }
        
        //First Time the item is added
        return[...prev,{...clickedItem,amount:1}]

    })
  }
  const handleRemoveFromCart = (id:number) => {
    setCartItems(prev =>
      prev.reduce((ack,item)=>{
        if (item.id === id){
          if(item.amount === 1)return ack;
          return[...ack,{...item,amount:item.amount -1}]
        }else{
          return[...ack,item];
        }
      },[] as CartItemType[])

    )}

  if(isLoading) return <LinearProgress/>;


  return (

    <><Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">EShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Men's Wear</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Women'clothing</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
      </Container>
    </Navbar>



  

        

    
    <Wrapper>

    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://image.shutterstock.com/image-vector/special-offer-sticker-phone-vector-260nw-1924324535.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://image.shutterstock.com/image-vector/super-sale-phone-banner-mobile-260nw-507110188.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.gadgets360cdn.com/large/amazonfabphonefest_main_1566883974967.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart} />
        </Drawer>
        
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>

          ))}
        </Grid>

        
      </Wrapper>

      
      
      </>

  )
  
  
};

export default App;
