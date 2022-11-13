import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Theme } from '@mui/system'

interface IDetailToolsProps {
  newButtonText?: string

  showNewButton?: boolean
  showBackButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveAndCloseButton?: boolean

  showNewButtonLoading?: boolean,
  showBackButtonLoading?: boolean,
  showDeleteButtonLoading?: boolean,
  showSaveButtonLoading?: boolean,
  showSaveAndCloseButtonLoading?: boolean,

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
  showSaveAndCloseButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndCloseButtonLoading = false,

  onNewButtonClick,
  onBackButtonClick,
  onDeleteButtonClick,
  onSaveButtonClick,
  onSaveAndBackButtonClick,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
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
      {(showSaveButton && !showSaveButtonLoading) && ( 
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onSaveButtonClick}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && (
        <Skeleton width={110} height={60} />
      )}

      {(showSaveAndCloseButton && !showSaveAndCloseButtonLoading && !smDown && !mdDown) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={onSaveAndBackButtonClick}
        startIcon={<Icon>save</Icon>}
      >
        <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
          Salvar e fechar
        </Typography>
      </Button>
      )}

      {showSaveAndCloseButtonLoading && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onDeleteButtonClick}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Deletar
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && (
        <Skeleton width={180} height={60} />
      )}

      {(showNewButton && !showNewButtonLoading && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onNewButtonClick}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {newButtonText}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && !smDown && (
        <Skeleton width={96} height={60} />
      )}


      {
        (
          showBackButton &&
          (showNewButton || showDeleteButton || showSaveButton || showSaveAndCloseButton)
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )
      }

      <Divider variant='middle' orientation='vertical' />

      {(showBackButton && !showBackButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onBackButtonClick}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && (
        <Skeleton width={110} height={60} />
      )}

    </Box>
  )
}