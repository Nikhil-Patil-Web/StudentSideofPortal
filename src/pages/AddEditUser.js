import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Loader } from 'semantic-ui-react'
import { db, storage } from '../firebaseConfig'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

const initialState = {
  name: '',
  description: '',
}

const AddEditUser = () => {
  const [data, setData] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const { name, description } = data
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    id && getSingleUser()
  }, [id])

  const getSingleUser = async () => {
    const docRef = doc(db, 'Images', id)
    const snapshot = await getDoc(docRef)

    if (snapshot.exists()) {
      setData({ ...snapshot.data() })
    }
  }

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is Paused')
              break
            case 'running':
              console.log('Upload is Running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  const validate = () => {
    let errors = {}
    if (!name) {
      errors.name = 'Name is required'
    }
    if (!description) {
      errors.description = 'Description is required'
    }
    return errors
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    let errors = validate()
    if (Object.keys(errors).length) {
      return setErrors(errors)
    }
    setIsSubmit(true)
    if (!id) {
      try {
        await addDoc(collection(db, 'Images'), {
          ...data,
          timestamps: serverTimestamp(),
        })
      } catch (error) {
        console.log(error.message)
      }
    } else {
      try {
        await updateDoc(doc(db, 'Images', id), {
          ...data,
          timestamps: serverTimestamp(),
        })
      } catch (error) {
        console.log(error.message)
      }
    }

    navigate('/')
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <Grid
        centered
        verticalAlign='middle'
        columns={3}
        style={{ height: '80vh' }}
      >
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <div>
              {isSubmit ? (
                <Loader active inline='centered' size='huge'></Loader>
              ) : (
                <>
                  <h2>{id ? 'Update Photo' : 'Add Photo'}</h2>
                  <Form onSubmit={submitHandler}>
                    <Form.Input
                      label='Name'
                      error={errors.name ? { content: errors.name } : null}
                      placeholder='Enter Name of Image'
                      name='name'
                      onChange={handleChange}
                      value={name}
                      autoFocus
                    ></Form.Input>
                    <Form.Input
                      label='Description'
                      error={
                        errors.description
                          ? { content: errors.description }
                          : null
                      }
                      placeholder='Enter Description of Image'
                      name='description'
                      onChange={handleChange}
                      value={description}
                    ></Form.Input>
                    <Form.Input
                      label='Upload'
                      type='file'
                      onChange={(e) => setFile(e.target.files[0])}
                    ></Form.Input>
                    <Button
                      type='submit'
                      primary
                      disabled={progress != null && progress < 100}
                    >
                      Submit
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default AddEditUser
