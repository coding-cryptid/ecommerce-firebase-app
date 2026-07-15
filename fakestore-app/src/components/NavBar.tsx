import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const NavBar = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FakeStore
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            🛍️    <Badge bg="light" text="dark">{totalCount}</Badge>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;