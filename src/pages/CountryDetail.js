/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  VStack,
  Link,
  Image,
  HStack,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Text,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
//import Weather from '../components/Weather'

const CountryDetail = ({ country }) => {
  console.log('country detail', country)
  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')

  //const url = `https://jsonplaceholder.typicode.com/users`
  /* TRY!!!! SHIFT + ESCAPE to abort requests */

  useEffect(() => {
    const url2 = `http://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`

    axios.get(url2).then(response => {
      setWeather(response.data)
      setIsLoading(false)
    }, 1000)
  }, [country, unit])

  const weatherContainer = () => {
    if (isLoading) {
      return 'Loading...'
    } else if (country.latlng.length === 0) {
      return <div>No weather data available </div>
    } else {
      return (
        <div>
          {/*           <Weather
            setUnit={setUnit}
            unit={unit}
            weather={weather}
            isLoading={isLoading}
          />
 */}{' '}
        </div>
      )
    }
  }
  /* 
https://en.wikipedia.org/wiki/Endonym_and_exonym
 */
  return (
    <div>
      <HStack display={{ md: 'flex' }}>
        <Box borderRadius="20px" borderWidth="3px" m={3} p={10} shadow="md">
          {/* RENDER COUNTRY DETAILS */}
          <Container>
            <VStack id="VStack" spacing={4}>
              <Box textAlign="center">
                <Heading>{country.name} </Heading>
              </Box>
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <Link
                        href="https://en.wikipedia.org/wiki/Endonym_and_exonym"
                        isExternal
                      >
                        <Tooltip
                          label={
                            <Text as="i" color="gray.500">
                              An endonym (from Greek: éndon, `&#39;`inner`&#39;`
                              + ónoma, `&#39;`name`&#39;`; also known as
                              autonym) is a common, internal name for a
                              geographical place, group of people, or a
                              language/dialect, that is used only inside that
                              particular place, group, or linguistic community.
                            </Text>
                          }
                          aria-label="An endonym (from Greek: éndon, 'inner' + ónoma, 'name'; also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community."
                        >
                          Endonym
                        </Tooltip>
                        <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Th>
                    <Th>Capital</Th>
                    <Th isNumeric>Population</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{country.nativeName}</Td>
                    <Td>{country.capital}</Td>
                    <Td isNumeric>{country.population.toLocaleString()}</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Table mb={4} size="sm">
                <Thead>
                  <Tr>
                    <Th>Languages</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {country.languages.map(language => (
                    <Tr key={language.name}>
                      <Td>{language.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Image src={country.flag} alt="country flag" />
            </VStack>
          </Container>
        </Box>
        {/*   {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <Box textAlign="left">{weatherContainer()}</Box>
        )} */}
      </HStack>
    </div>
  )
}

export default CountryDetail
