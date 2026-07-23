import { useQuery } from '@tanstack/react-query';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { fetchUserOrders } from '../firebase/orderService';

const OrderHistory = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.uid],
    queryFn: () => fetchUserOrders(user!.uid),
    enabled: !!user
  });

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Container className="mt-4">
        <h1>Order History</h1>
        <p>You haven't placed any orders yet.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Order History</h1>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item
            key={order.id}
            as={Link}
            to={`/orders/${order.id}`}
            action
          >
            <div className="d-flex justify-content-between">
              <span>Order #{order.id.slice(0, 8)}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default OrderHistory;