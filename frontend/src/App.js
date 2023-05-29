import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import ImageCard from './components/ImageCard'
import { Container, Row, Col } from 'react-bootstrap'

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

const App = () => {
  const [word, setWord] = useState('') // stores search word
  const [images, setImages] = useState([]) // stores images from API

  // This is called when pressing search button
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log(word)
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]) // adds new image (data) to beginning of array
      })
      .catch((err) => {
        console.log(err)
      })
    setWord('')
  }

  return (
    <div>
      <Header title="kita" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((images, i) => (
            <Col key={i} className="pb-3">
              <ImageCard image={images} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default App
