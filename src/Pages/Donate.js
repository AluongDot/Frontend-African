import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // For payment icons

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

// Stripe Form
const StripePaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) return;

    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        alert('Payment successful!');
      }
    } catch (err) {
      setError('Payment failed. Try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 p-2 border rounded bg-light">
        <CardElement />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-100"
      >
        {processing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

// M-Pesa Form
const MpesaPaymentForm = ({ amount }) => {
  const [phone, setPhone] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      // Format phone number (remove + and any non-digit characters)
      const formattedPhone = phone.replace(/\D/g, '').replace(/^0/, '254');
      
      const response = await fetch('/initiate-mpesa-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount / 100, // Convert cents to dollars
          phone: formattedPhone
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // You might want to poll the server to check payment status
      } else {
        setError(data.message || 'Payment initiation failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">M-Pesa Phone Number</label>
        <div className="input-group">
          <span className="input-group-text">+254</span>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="712345678"
            required
          />
        </div>
        <small className="text-muted">Enter your M-Pesa registered phone number without country code</small>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Payment request sent to your phone. Please complete the transaction on your M-Pesa menu.
        </div>
      )}
      
      <button
        type="submit"
        disabled={processing}
        className="btn btn-success w-100"
      >
        {processing ? 'Sending request...' : `Pay KES ${(amount / 100).toFixed(2)}`}
      </button>
      
      <div className="mt-3 text-center">
        <small className="text-muted">
          <i className="bi bi-info-circle"></i> You'll receive an M-Pesa push notification to complete payment
        </small>
      </div>
    </form>
  );
};

// Main Component
const PaymentComponent = () => {
  const [amount, setAmount] = useState(1000);
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const [currency, setCurrency] = useState('USD');

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) setAmount(Math.round(val * 100));
  };

  // Switch to KES when M-Pesa is selected
  useEffect(() => {
    if (selectedMethod === 'mpesa') {
      setCurrency('KES');
      // Convert amount to KES (assuming 1 USD = 150 KES for demo)
      setAmount(Math.round((amount / 100) * 150 * 100));
    } else {
      setCurrency('USD');
    }
  }, [selectedMethod]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Support Our Mission</h2>
        <p className="text-muted">Choose your preferred payment method</p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Donation Amount ({currency})</label>
          <div className="input-group mb-3">
            <span className="input-group-text">{currency === 'USD' ? '$' : 'KES'}</span>
            <input
              type="number"
              className="form-control"
              value={(amount / 100).toFixed(2)}
              onChange={handleAmountChange}
              min="1"
              step="0.01"
            />
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <button
              className={`btn ${selectedMethod === 'stripe' ? 'btn-outline-primary' : 'btn-light'}`}
              onClick={() => setSelectedMethod('stripe')}
            >
              <i className="bi bi-credit-card-2-front me-1"></i> Stripe
            </button>
            <button
              className={`btn ${selectedMethod === 'paypal' ? 'btn-outline-warning' : 'btn-light'}`}
              onClick={() => setSelectedMethod('paypal')}
            >
              <i className="bi bi-paypal me-1"></i> PayPal
            </button>
            <button
              className={`btn ${selectedMethod === 'mpesa' ? 'btn-outline-success' : 'btn-light'}`}
              onClick={() => setSelectedMethod('mpesa')}
            >
              <i className="bi bi-phone me-1"></i> M-Pesa
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {selectedMethod === 'stripe' && (
          <div className="col-md-6">
            <div className="card shadow rounded-4">
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <i className="bi bi-credit-card-2-front me-2"></i>
                Stripe Secure Checkout
              </div>
              <div className="card-body">
                <Elements stripe={stripePromise}>
                  <StripePaymentForm amount={amount} />
                </Elements>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'paypal' && (
          <div className="col-md-6">
            <div className="card shadow rounded-4">
              <div className="card-header bg-warning text-dark d-flex align-items-center">
                <i className="bi bi-paypal me-2"></i>
                PayPal Express Checkout
              </div>
              <div className="card-body">
                <PayPalScriptProvider
                  options={{
                    'client-id': 'YOUR_PAYPAL_CLIENT_ID',
                    currency: 'USD'
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ amount: { value: (amount / 100).toFixed(2) } }]
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        alert('Payment successful!');
                        console.log(details);
                      });
                    }}
                    style={{ layout: 'horizontal' }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'mpesa' && (
          <div className="col-md-6">
            <div className="card shadow rounded-4">
              <div className="card-header bg-success text-white d-flex align-items-center">
                <i className="bi bi-phone me-2"></i>
                M-Pesa Mobile Payment
              </div>
              <div className="card-body">
                <MpesaPaymentForm amount={amount} />
              </div>
              <div className="card-footer bg-light">
                <div className="d-flex align-items-center">
                  <i className="bi bi-info-circle text-success me-2"></i>
                  <small className="text-muted">
                    M-Pesa payments are processed via Lipa Na M-Pesa Online API
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;