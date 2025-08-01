// src/Pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container text-center py-5">
    <h1 className="display-1 text-danger">404</h1>
    <p className="lead">Page not found</p>
    <Link to="/" className="btn btn-primary mt-3">
      Go to Homepage
    </Link>
  </div>
);

export default NotFound;