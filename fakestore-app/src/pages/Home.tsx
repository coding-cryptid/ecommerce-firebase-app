import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Something went wrong fetching products.</p>;

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