import { useState } from 'react';
import { Container, Row, Col, Button, ListGroup, Image, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { createOrder } from '../firebase/orderService';

const PLACEHOLDER_IMAGE = 'https://placehold.co/300x300?text=No+Image';

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    if (!user) {
      return;
    }

    setCheckingOut(true);
    try {
      await createOrder(user.uid, cartItems, totalPrice);
      dispatch(clearCart());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Checkout failed', err);
    } finally {
      setCheckingOut(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Shopping Cart</h1>

      {showSuccess && (
        <Alert variant="success">
          🎉 Checkout successful!
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go add something nice!</p>
      ) : (
        <>
          <ListGroup className="mb-4">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col xs={2} md={1}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fluid
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </Col>
                  <Col xs={10} md={5}>
                    {item.title}
                  </Col>
                  <Col xs={4} md={2}>
                    Qty: {item.quantity}
                  </Col>
                  <Col xs={4} md={2}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Col>
                  <Col xs={4} md={2} className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Row className="justify-content-end">
            <Col md={4} className="text-end">
              <p className="mb-1">
                <strong>Total Items:</strong> {totalItems}
              </p>
              <p className="mb-3">
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </p>
              <Button variant="success" size="lg" onClick={handleCheckout} disabled={checkingOut}>
                {checkingOut ? 'Placing order...' : 'Checkout'}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;