import React, { useState, useEffect } from 'react'
import {
  IconButton,
  useColorMode,
  Box,
  Flex,
  Spacer,
  VStack,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Skeleton,
  SimpleGrid,
  Container,
  Heading,
  Input,
} from '@chakra-ui/react'
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import Logo from '../Logo'

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      {colorMode === 'light' ? (
        <IconButton
          aria-label="dark mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
          variant="link"
        />
      ) : (
        <IconButton
          aria-label="light mode"
          icon={<SunIcon />}
          onClick={toggleColorMode}
          variant="link"
        />
      )}
    </>
  )
}

const Navbar = ({ input, handleChange, handleSubmit }) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    const header = document.getElementById('header-wrap')

    setScrollPosition(position)
    if (position > scrollPosition + 25 || position < 100) {
      header.style.top = '-8em'
      header.style.transition = 'top 666ms'
    }
    if (position < scrollPosition - 25 || position < 75) {
      header.style.top = '0'
    }
  }
  useEffect(() => {
    const header = document.getElementById('header-wrap')
    header.style.top = '0'
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Flex
        id="header-wrap"
        bg={useColorModeValue('white', 'gray.800')}
        align="center"
        justify="flex-end"
        wrap="wrap"
        w="100%"
        h="10%"
      >
        <Box ml={4}>
          <Heading>Countries</Heading>
        </Box>

        <Box ml={6}>
          <form onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={handleChange}
            />
          </form>
        </Box>

        <Spacer />

        {/* tablet and full size */}

        <Container display={{ base: 'none', md: 'block' }} centerContent>
          <SimpleGrid columns={6} spacing={4}></SimpleGrid>
        </Container>
        <Box w="5%">
          <ThemeToggle />
        </Box>

        <div className="break"></div>
        <Box w="100%">
          <Skeleton startColor="#ff0080" endColor="#7928CA" height="2px" />
        </Box>
      </Flex>
    </>
  )
}
export default Navbar
