import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material'

interface IDetailToolsProps {
  newButtonText?: string

  showNewButton?: boolean
  showBackButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveAndBackButton?: boolean

  onNewButtonClick?: () => void
  onBackButtonClick?: () => void
  onDeleteButtonClick?: () => void
  onSaveButtonClick?: () => void
  onSaveAndBackButtonClick?: () => void
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  newButtonText = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  onNewButtonClick,
  onBackButtonClick,
  onDeleteButtonClick,
  onSaveButtonClick,
  onSaveAndBackButtonClick,
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
      {showSaveButton && ( 
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onSaveButtonClick}
          startIcon={<Icon>save</Icon>}
        >Salvar</Button>
      )}
      {showSaveAndBackButton && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={onSaveAndBackButtonClick}
        startIcon={<Icon>save</Icon>}
      >Salvar e voltar</Button>
      )}
      {showDeleteButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onDeleteButtonClick}
          startIcon={<Icon>delete</Icon>}
        >Deletar</Button>
      )}
      {showNewButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onNewButtonClick}
          startIcon={<Icon>add</Icon>}
        >{newButtonText}</Button>
      )}

      <Divider variant='middle' orientation='vertical' />

      {showBackButton && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onBackButtonClick}
          startIcon={<Icon>arrow_back</Icon>}
        >Voltar</Button>
      )}
    </Box>
  )
}