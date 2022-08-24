import { useState } from 'react'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import AddBook from './AddBook'
import BooksList from './BooksList'

function App() {
  const [annId, setAnnId] = useState('')

  const getAnnIdHandler = (id) => {
    console.log('Id of doc to be edited:', id)
    setAnnId(id)
  }

  return (
    <>
      <Container style={{ width: '400px' }}>
        <Row>
          <Col>
            <AddBook id={annId} setAnnId={setAnnId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getAnnId={getAnnIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
