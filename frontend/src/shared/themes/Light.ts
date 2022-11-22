import { createTheme } from '@mui/material'
import { cyan, green, red } from '@mui/material/colors'

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: red[700],
      dark: red[800],
      light: red[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: green[700],
      dark: green[800],
      light: green[500],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    }
  }
})