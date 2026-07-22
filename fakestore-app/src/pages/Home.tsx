import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { fetchProductsFromFirestore } from '../firebase/productService';

const Home = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsFromFirestore,
  });

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (isError) {
    return <p className="text-center mt-5">Something went wrong fetching products.</p>;
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Products</h1>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products?.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;