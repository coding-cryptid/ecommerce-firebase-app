import { useState } from 'react';
import type { FormEvent} from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice';
import { registerUser } from '../firebase/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const newUser = await registerUser(email, password, name, address);
      dispatch(setUser(newUser));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong during registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4">Create an Account</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;