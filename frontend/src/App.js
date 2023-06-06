import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import ImageCard from './components/ImageCard'
import Welcome from './components/Welcome'
import { Container, Row, Col } from 'react-bootstrap'

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
  const [word, setWord] = useState('') // stores search word
  const [images, setImages] = useState([]) // stores images from API

  // This is called when pressing search button
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log(word)
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]) // adds new image (data) to beginning of array
      })
      .catch((err) => {
        console.log(err)
      })
    setWord('')
  }

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id))
  }

  return (
    <div>
      <Header title="kita" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} delteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  )
}

export default App
