import { createTheme } from '@mui/material'
import { cyan, green, purple } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[700],
      dark: green[800],
      light: green[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#121214',
      default: '#1a191c',
    }
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
})