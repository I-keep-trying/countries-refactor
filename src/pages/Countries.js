import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Table, Tbody, Tr, Td } from '@chakra-ui/react'

const Countries = ({ countries }) => {
  console.log('countries component', countries)
  return (
    <Table>
      <Tbody>
        {countries.map(country => {
          const id = useState(nanoid)
          return (
            <Tr key={id[0]}>
              <Td>{country.name}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default Countries
