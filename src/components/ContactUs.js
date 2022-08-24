import { doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import AnnouncementService from '../services/bookServices.js'

const BooksList = ({ getAnnId }) => {
  const [anns, setAnns] = useState([])
  useEffect(() => {
    getAnns()
  })

  const getAnns = async () => {
    const data = await AnnouncementService.getAllCon()
    setAnns(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const deleteHandler = async (id) => {
    await AnnouncementService.deleteCon(id)
    getAnns()
  }

  return (
    <>
      <div className='mb-2'>
        <Button
          variant='dark edit'
          onClick={() => {
            getAnns()
          }}
        >
          Refresh List
        </Button>
      </div>

      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Request</th>
            <th>By</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {anns.map((doc, index) => {
            return (
              <tr key={doc?.id}>
                <td>{index + 1}</td>
                <td>{doc?.AnnouncementText}</td>
                <td>{doc?.By}</td>
                <td>{doc?.VerifiedBy}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default BooksList
