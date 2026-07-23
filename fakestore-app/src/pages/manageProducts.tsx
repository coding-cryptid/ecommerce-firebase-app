import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import { fetchProductsFromFirestore, createProduct, updateProduct, deleteProduct } from '../firebase/productService';
import type { Product } from '../types/Product';

const emptyForm = {
  title: '',
  price: '',
  category: '',
  description: '',
  image: '',
};

const ManageProducts = () => {
  const queryClient = useQueryClient();
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsFromFirestore,
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const productData = {
      title: form.title,
      price: parseFloat(form.price),
      category: form.category,
      description: form.description,
      image: form.image,
    };

    if (editingId) {
      await updateProduct(editingId, productData);
      setMessage('Product updated!');
    } else {
      await createProduct(productData);
      setMessage('Product created!');
    }

    setForm(emptyForm);
    setEditingId(null);

    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category,
      description: product.description,
      image: product.image,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Manage Products</h1>
      {message && <Alert variant="success" onClose={() => setMessage('')} dismissible>{message}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-5">
        <Form.Group className="mb-2">
          <Form.Control name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control as="textarea" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" className="me-2">
          {editingId ? 'Update Product' : 'Add Product'}
        </Button>
        {editingId && (
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
        )}
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>
                <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(product)} className="me-2">
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageProducts;