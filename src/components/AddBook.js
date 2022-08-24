import React, { useState, useEffect } from 'react'
import { Form, Alert, InputGroup, Button, ButtonGroup } from 'react-bootstrap'
import AnnouncementService from '../services/bookServices.js'

const AddBook = ({ id, setAnnId }) => {
  const [ann, setAnn] = useState('')
  const [by, setBy] = useState('')
  const [status, setStatus] = useState('Verified')
  const [flag, setFlag] = useState(true)
  const [message, setMessage] = useState({ error: false, message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (ann === '' || by === '') {
      setMessage({ error: true, message: 'All fields are mandatory' })
      return
    }
    const newAnn = {
      AnnouncementText: ann,
      By: by,
      VerifiedBy: status,
    }
    try {
      if (id !== undefined && id !== '') {
        await AnnouncementService.updateAnn(id, newAnn)
        setAnnId('')
        setMessage({
          error: false,
          message: 'Announcement Updated',
        })
      } else {
        await AnnouncementService.addAnn(newAnn)
        setMessage({
          error: false,
          message: 'New Announcement Added',
        })
      }
    } catch (error) {
      setMessage({ error: true, message: error.message })
    }
    setAnn('')
    setBy('')
  }

  const editHandler = async () => {
    setMessage('')
    try {
      const docSnap = await AnnouncementService.getAnn(id)
      setAnn(docSnap.data().AnnouncementText)
      setBy(docSnap.data().By)
      setStatus(docSnap.data().VerifiedBy)
    } catch (error) {
      setMessage({ error: true, message: error.message })
    }
  }

  useEffect(() => {
    if (id !== undefined && id !== '') {
      editHandler()
    }
  }, [id])

  return (
    <>
      <div className='p-4 box'>
        {message?.message && (
          <Alert
            variant={message?.error ? 'danger' : 'success'}
            dismissible
            onClose={() => setMessage('')}
          >
            {message?.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formAnText'>
            <InputGroup>
              <InputGroup.Text id='formAnText'>B</InputGroup.Text>
              <Form.Control
                type='text'
                placeholder='Announcement'
                value={ann}
                onChange={(e) => setAnn(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formAnBy'>
            <InputGroup>
              <InputGroup.Text id='formAnBy'>A</InputGroup.Text>
              <Form.Control
                type='text'
                placeholder='By'
                value={by}
                onChange={(e) => setBy(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label='Basic example' className='mb-3'>
            <Button
              disabled={flag}
              variant='success'
              onClick={(e) => {
                setStatus('Verified')
                setFlag(true)
              }}
            >
              Verified
            </Button>
            <Button
              variant='danger'
              disabled={!flag}
              onClick={(e) => {
                setStatus('Not Verified')
                setFlag(false)
              }}
            >
              Not Verified
            </Button>
          </ButtonGroup>
          <div className='d-grid gap-2'>
            <Button variant='primary' type='Submit'>
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default AddBook
