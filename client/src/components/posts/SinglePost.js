import { Card, Row, Col, Badge } from 'react-bootstrap';

import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card
      className='shadow'
      border={
        status === 'Learned'
          ? 'success'
          : status === 'Learning'
          ? 'warning'
          : 'danger'
      }
    >
      <Card.Body>
        {/* Post title and badge */}
        <Card.Title>
          <Row>
            <Col>
              <p className='post-title'>{title}</p>
              <Badge
                pill
                bg={
                  status === 'Learned'
                    ? 'success'
                    : status === 'Learning'
                    ? 'warning'
                    : 'danger'
                }
              >
                {status}
              </Badge>
            </Col>
            
            {/* Action buttons */}
            <Col className='text-right'>
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>

        {/* Post description */}
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
