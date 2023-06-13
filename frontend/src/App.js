import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from './components/Header'
import ImageCard from './components/ImageCard'
import Search from './components/Search'
import Spinner from './components/Spinner'
import Welcome from './components/Welcome'

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
  const [word, setWord] = useState('') // stores search word
  const [images, setImages] = useState([]) // stores images from API
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSavedImages = async () => {
      try {
        const res = await axios.get(`${API_URL}/images`)
        setImages(res.data || [])
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getSavedImages()
  }, [])

  // This is called when pressing search button
  const handleSearchSubmit = async (e) => {
    e.preventDefault() // prevents default browser behavior

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`)
      // Add new image (data) to beginning of array
      setImages([{ ...res.data, title: word }, ...images])
    } catch (error) {
      console.log(error)
    }

    setWord('')
  }

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`)
      if (res.data?.deleted_id)
        setImages(images.filter((image) => image.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id)
    imageToBeSaved.saved = true

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved)
      if (res.data?.inserted_id)
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header title="kita" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
    </div>
  )
}

export default App
