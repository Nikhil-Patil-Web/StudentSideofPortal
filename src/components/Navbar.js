import { Menu, Container, Button, Image } from 'semantic-ui-react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/react-js-icon.svg'
import React from 'react'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Menu
      inverted
      borderless
      style={{ padding: '0.3rem', marginBottom: '20px' }}
      attached
    >
      <Container>
        <Menu.Item name='home'>
          <Link to='/'>
            <Image size='mini' src={logo} alt='logo'></Image>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <h2>React App Image Uploading with Crud</h2>
        </Menu.Item>
        <Menu.Item position='right'>
          <Button size='mini' primary onClick={() => navigate('/add')}>
            Add Photos
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar
