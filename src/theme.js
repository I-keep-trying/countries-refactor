import { extendTheme } from '@chakra-ui/react'

const overrides = {
  styles: {
    global: {
      h6: {
        _hover: {
          bgGradient: 'linear(to-l, #7928CA,#FF0080)',
          bgClip: 'text',
        },
      },
      a: {
        textDecoration: 'none',
        _hover: {
          bgGradient: 'linear(to-l, #7928CA,#FF0080)',
          bgClip: 'text',
          textDecoration: 'none',
          _active: {
            bgGradient: 'linear(to-l, #7928CA,#FF0080)',
            bgClip: 'text',
            textDecoration: 'none',
          },
        },
        _active: { textDecoration: 'none' },
      },
    },
  },
  initialColorMode: 'dark',
  components: {
    Heading: {
      variants: {
        'with-gradient-light': {
          bgGradient: 'linear(#000000,  #718096, #000000)',
          bgClip: 'text',
        },
        'with-gradient-dark': {
          bgGradient: 'linear(#A0AEC0,  #000000, #A0AEC0)',
          bgClip: 'text',
        },
      },
    },
    Link: {
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
      },
      _active: { textDecoration: 'none' },
    },
  },
}
export default extendTheme(overrides)
