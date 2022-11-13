import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'

import { Environment } from '../../environment'

interface IListingToolsProps {
  searchText?: string
  showSearchInput?: boolean
  onChangingSearchText?: (newText: string) => void
  textNewButton?: string
  showNewButton?: boolean
  onNewButtonClick?: () => void
}

export const ListingTools: React.FC<IListingToolsProps> = ({
  searchText = '',
  onChangingSearchText,
  showSearchInput = false,
  onNewButtonClick,
  textNewButton = Environment.BUTTON_NEW_LABEL_DEFAULT,
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
          placeholder={Environment.SEARCH_INPUT}
          onChange={(e) => onChangingSearchText?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onNewButtonClick}
            endIcon={<Icon>add</Icon>}
          >{textNewButton}</Button>
        )}
      </Box>
    </Box>
  )
}
