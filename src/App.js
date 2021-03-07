import React, { useState, useEffect } from 'react'
import { Box, VStack, Grid, Button, Table, Tbody } from '@chakra-ui/react'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import CountryDetail from './pages/CountryDetail'
import countriesList from './countriesList'
import './App.css'

function App() {
  const [country, setCountry] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')

  const filteredCountries = countriesList.filter(country => {
    return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ? country
      : null
  })

  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(
          `https://restcountries.eu/rest/v2/name/${filteredCountries[0].name}`
        )
        .then(response => {
          setCountry(response.data)
        })
    }
  }, [filteredCountries.length])

  const handleChange = event => {
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSearchTerm(input)
    setInput('')
  }

  const content = () => {
    if (filteredCountries.length > 10 && !searchTerm) {
      return (
        <div>
          {countriesList.map(c => {
            return <div key={c.name}>{c.name} </div>
          })}{' '}
        </div>
      )
    } else if (filteredCountries.length === 0) {
      return <div>No matches, try again</div>
    } else if (filteredCountries.length > 10 && searchTerm) {
      return <div>More than 10 results, please adjust criteria</div>
    } else if (country.length === 1) {
      return (
        <div>
          <CountryDetail key={country.alpha2Code} country={country[0]} />
        </div>
      )
    } else {
      return filteredCountries.map(c => {
        const handleShow = () => {
          setSearchTerm(c.name)
        }

        return (
          <div key={c.name}>
            {c.name}
            <Button onClick={handleShow} text="show">
              details
            </Button>
          </div>
        )
      })
    }
  }

  return (
    <div id="page">
      <Header
        input={input}
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Box>input: {JSON.stringify(input)}</Box>
            <Box>searchTerm: {JSON.stringify(searchTerm)}</Box>
            <Box>{JSON.stringify(filteredCountries)} </Box>
            {/* <Box>{JSON.stringify(filteredCountries)} </Box> */}
            <Box>one country: {JSON.stringify(country)} </Box>
            content: {content()}
            <Table>
              <Tbody></Tbody>
            </Table>
          </VStack>
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default App
