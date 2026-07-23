import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Image, Spinner } from 'react-bootstrap';
import { fetchOrderById } from '../firebase/orderService';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/80x80?text=No+Image';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (isError || !order) {
    return <p className="text-center mt-5">Order not found.</p>;
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-2">Order #{order.id.slice(0, 8)}</h1>
      <p className="text-muted">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <ListGroup className="mb-4">
        {order.items.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center">
            <Image
              src={item.image}
              alt={item.title}
              width={60}
              height={60}
              className="me-3"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />
            <div className="flex-grow-1">{item.title}</div>
            <div className="me-3">Qty: {item.quantity}</div>
            <div>${(item.price * item.quantity).toFixed(2)}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h4 className="text-end">Total: ${order.totalPrice.toFixed(2)}</h4>
    </Container>
  );
};

export default OrderDetail;