import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'

interface IListingToolsProps {
  searchText?: string
  showSearchInput?: boolean
  whenChangingSearchText?: (newText: string) => void
  textNewButton?: string
  showNewButton?: boolean
  whenClickNew?: () => void
}

export const ListingTools: React.FC<IListingToolsProps> = ({
  searchText = '',
  whenChangingSearchText,
  showSearchInput = false,
  whenClickNew,
  textNewButton = 'Novo',
  showNewButton = true,
}) => {
  const theme = useTheme()

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          size="small"
          value={searchText}
          placeholder='Pesquisar...'
          onChange={(e) => whenChangingSearchText?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={whenClickNew}
            endIcon={<Icon>add</Icon>}
          >{textNewButton}</Button>
        )}
      </Box>
    </Box>
  )
}
