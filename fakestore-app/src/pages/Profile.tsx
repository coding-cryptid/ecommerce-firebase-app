import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice';
import { updateUserProfile, deleteUserAccount } from '../firebase/authService';

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      await updateUserProfile(user.uid, { name, address });
      dispatch(setUser({ ...user, name, address }));
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirmed) return;

    try {
      await deleteUserAccount();
      dispatch(setUser(null));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4">My Profile</h1>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={saving} className="me-2">
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete Account
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;