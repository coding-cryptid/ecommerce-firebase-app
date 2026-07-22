import { Card, Button } from 'react-bootstrap';
import type { Product } from '../types/Product';
import { useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/cartSlice';

interface ProductCardProps {
  product: Product;
}

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300?text=No+Image';

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER_IMAGE;
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: '1rem' }}>{product.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-capitalize">
          {product.category}
        </Card.Subtitle>
        <Card.Text style={{ fontSize: '0.85rem' }}>
          {product.description.slice(0, 80)}...
        </Card.Text>
        <div className="mb-2">
          ⭐ {product.rating?.rate ?? 'N/A'} ({product.rating?.count ?? 0} reviews)
        </div>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>${product.price.toFixed(2)}</strong>
          <Button variant="primary" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;