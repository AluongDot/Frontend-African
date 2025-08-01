// src/components/search/SearchForm.js
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    duration: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-white rounded-4 shadow-sm border"
      style={{
        background: 'linear-gradient(135deg, #f8fbff 0%, #e6f0ff 100%)',
        border: '1px solid #e3eafc'
      }}
    >
      <Row className="align-items-end g-3">
        <Col md={4}>
          <Form.Group controlId="searchTitle">
            <Form.Label className="fw-semibold text-primary">Course Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Search by title"
              value={searchParams.title}
              onChange={handleChange}
              className="rounded-pill px-4 py-2 border-0 shadow-sm"
              style={{ backgroundColor: '#f4f8fc' }}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="searchDuration">
            <Form.Label className="fw-semibold text-primary">Duration</Form.Label>
            <Form.Select
              name="duration"
              value={searchParams.duration}
              onChange={handleChange}
              className="rounded-pill px-4 py-2 border-0 shadow-sm"
              style={{ backgroundColor: '#f4f8fc' }}
            >
              <option value="">All Durations</option>
              <option value="0-1">0-1 Month</option>
              <option value="1-3">1-3 Months</option>
              <option value="3-6">3-6 Months</option>
              <option value="6+">6+ Months</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="searchCategory">
            <Form.Label className="fw-semibold text-primary">Category</Form.Label>
            <Form.Select
              name="category"
              value={searchParams.category}
              onChange={handleChange}
              className="rounded-pill px-4 py-2 border-0 shadow-sm"
              style={{ backgroundColor: '#f4f8fc' }}
            >
              <option value="">All Categories</option>
              <option value="development">FullStack Development</option>
              <option value="security">Cybersecurity</option>
              <option value="marketing">Digital Marketing & E-commerce</option>
              <option value="analytics">Data Analytics</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill fw-bold py-2 shadow"
            style={{
              background: 'linear-gradient(90deg, #0d6efd 0%, #00c6ff 100%)',
              border: 'none',
              fontSize: '1.1rem'
            }}
          >
            <i className="fas fa-search me-2"></i>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;