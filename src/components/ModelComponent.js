import React from 'react'
import { Modal, Header, Image, Button } from 'semantic-ui-react'

const ModelComponent = ({
  open,
  setOpen,
  img,
  name,
  description,
  id,
  handleDelete,
}) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Image Details</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={img} wrapped></Image>
        <Modal.Description>
          <Header>{name}</Header>
          <p>{description}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='black'
          onClick={() => {
            setOpen(false)
          }}
        >
          Cancel
        </Button>
        <Button
          color='red'
          content='Delete'
          icon='checkmark'
          labelPosition='right'
          onClick={() => handleDelete(id)}
        ></Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModelComponent
