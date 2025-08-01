import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) < 100) {
      setError('Please enter a valid amount (minimum 100).');
      return;
    }

    setProcessing(true);

    // In a real app, you would create a PaymentIntent on your server and fetch the clientSecret here.
    // For demo, we'll just simulate a successful payment.
    // Replace this with your backend call.
    setTimeout(async () => {
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name, email }
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Simulate payment success
      setSuccess('Payment successful! Thank you for your donation.');
      setProcessing(false);
    }, 1500);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h3 className="mb-4 text-center">Donate with Card</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Name on Card"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Amount (Ksh)</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          min={100}
          placeholder="Enter amount"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Card Details</Form.Label>
        <div style={{ padding: 10, border: '1px solid #ced4da', borderRadius: 6, background: '#fff' }}>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Message (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={2}
          placeholder="Add a message with your donation"
        />
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="w-100 fw-bold"
        disabled={!stripe || processing}
      >
        {processing ? <Spinner animation="border" size="sm" className="me-2" /> : null}
        {processing ? 'Processing...' : 'Donate Now'}
      </Button>
    </Form>
  );
};

export default CheckoutForm;