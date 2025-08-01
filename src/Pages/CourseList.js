
import { Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  return (
    <Row className="g-4">
      {courses.map(course => (
        <Col key={course.id} lg={4} md={6}>
          <CourseCard course={course} />
        </Col>
      ))}
    </Row>
  );
};

export default CourseList;