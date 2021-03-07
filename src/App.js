import React, { useState, useEffect } from 'react'
import { Box, VStack, Grid, Button, Table, Tbody } from '@chakra-ui/react'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import CountryDetail from './pages/CountryDetail'
import countriesList from './countriesList'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')
  console.log('country global', country)
  const filteredCountries = countriesList.filter(country => {
    console.log('filteredCountries country', country)
    return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ? country
      : null
  })
  console.log('filteredCountries in App', filteredCountries)

  useEffect(() => {
    if (filteredCountries.length === 1) {
      console.log('useEffect', country)
      /*  axios
        // .get(`https://restcountries.eu/rest/v2/name/${filteredCountries[0].name}`)
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
          console.log('response.data', response.data)
          setCountry(response.data[0])
        }) */
    }
  }, [])

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
    } else if (filteredCountries.length === 1) {
      console.log('one filtered country', filteredCountries[0])
      console.log('one filtered country searchTerm', searchTerm)
      return (
        <div>
          SETCOUNTRY: {JSON.stringify(filteredCountries[0])}{' '}
          {/*  <CountryDetail key={country.alpha2Code} country={filteredCountries[0]} /> */}
        </div>
      )
    } else {
      return filteredCountries.map(c => {
        console.log('c filtered', c)
        console.log('searchTerm', searchTerm)
        const handleShow = () => {
          console.log('c - selected country', c)
          setSearchTerm(c.name)
          // setCountries(c)
        }

        return (
          <div key={c.name}>
            COUNTRY: {JSON.stringify(c)}
            <Button onClick={handleShow} text="show">
              details
            </Button>
          </div>
        )
      })
    }
  }

  return (
    <div>
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
