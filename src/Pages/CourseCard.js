// src/components/courses/CourseCard.js
import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ maxWidth: '320px', margin: '0 auto' }}
    >
      {/* Course Image */}
      <Card.Img
        variant="top"
        src={course.image || '/default-course.jpg'}
        alt={course.title}
        className="rounded-0"
        style={{ height: '200px', objectFit: 'cover' }}
      />

      {/* Hover Overlay */}
      {isHovered && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 0,
            transition: 'all 0.3s ease',
            opacity: 0.95,
            zIndex: 2
          }}
        >
          <Button
            as={Link}
            to={`/courses/${course.id}`}
            variant="primary"
            size="lg"
            className="rounded-pill px-4 py-2 fw-bold"
          >
            View Details
          </Button>
        </div>
      )}

      {/* Course Info */}
      <Card.Body className="p-3 border">
        {course.updated && (
          <Badge bg="warning" text="dark" className="mb-2">
            Updated {course.updated}
          </Badge>
        )}

        <Card.Title className="fw-bold mb-3">
          {course.title}
        </Card.Title>

        <Card.Text className="text-muted small mb-3">
          {course.description || 'No description available.'}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-primary fw-bold fs-5">{course.price || 'Ksh 0'}</span>
            {course.oldPrice && (
              <span className="text-muted text-decoration-line-through ms-2">{course.oldPrice}</span>
            )}
          </div>
          <Badge bg="light" text="dark" className="border py-2">
            {course.level || 'Standard'}
          </Badge>
        </div>

        {course.rating && (
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              ★★★★★ <span className="text-muted">{course.rating}</span>
            </div>
            <span className="text-muted small">({course.reviews || 0})</span>
          </div>
        )}

        <div className="text-muted small">
          <div>{course.instructors || 'Instructor Name'}</div>
          <div className="mt-1">{course.topics || ''}</div>
        </div>
      </Card.Body>
    </div>
  );
};

export default CourseCard;