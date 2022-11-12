import { createTheme } from '@mui/material'
import { cyan, purple, yellow } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#A277FF',
      dark: purple[800],
      light: purple[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#61FFCA',
      default: '#110F18',
    }
  }
})