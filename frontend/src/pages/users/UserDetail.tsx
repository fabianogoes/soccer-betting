import { Grid, LinearProgress, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import {v4 as uuidv4} from 'uuid'

import { DetailTools } from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { UsersService } from '../../shared/services/api/users/UsersService'
import { VTextField, VForm, useVForm } from '../../shared/forms'

interface IFormData {
  name: string;
  email: string;
  token: string;
}

export const UserDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate()
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)

      UsersService.getById(id)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            navigate('/users')
          } else {
            setName(result.name)
            console.log(result)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        name: '',
        email: '',
        token: uuidv4(),
      })
    }
  }, [id])


  const handleSave = (data: IFormData) => {
    setIsLoading(true)

    if (id === 'new') {
      UsersService
        .create(data)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            navigate(`/users/detail/${result}`)
            if (isSaveAndClose()) {
              navigate('/users')
            } else {
              navigate(`/users/detail/${result}`)
            }      
          }
        })
    } else {
      // UsersService
      //   .updateById(id, data)
      //   .then((result) => {
      //     setIsLoading(false)
      //     if (result instanceof Error) {
      //       alert(result.message)
      //     }
      //   })
      alert('update')
      console.log('update', id, data)
      if (isSaveAndClose()) {
        navigate('/users')
      }
    }
  }
  
  const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      UsersService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso!')
            navigate('/users')
          }
        })
    }
  }


  return (
    <LayoutBasePage
      title={id === 'nova' ? 'Novo time' : name}
      toolsBar={
        <DetailTools
          newButtonText='Novo'
          showSaveAndCloseButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}

          onSaveButtonClick={save}
          onSaveAndBackButtonClick={saveAndClose}
          onBackButtonClick={() => navigate('/users')}
          onDeleteButtonClick={() => handleDelete(id)}
          onNewButtonClick={() => navigate('/users/detail/new')}
        />
      }
    >

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box sx={{margin: 1}} display='flex' flexDirection='column' component={Paper} >

          <Grid container direction='column' padding={2} spacing={2} >

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={12}>
                <VTextField 
                  fullWidth
                  placeholder='Nome do usuário' 
                  name='name'
                  label='Nome'
                  disabled={id !== 'new'}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={12}>
                <VTextField 
                  fullWidth
                  placeholder='Email de acesso do usuário' 
                  name='email'
                  label='E-mail'
                  disabled={id !== 'new'}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={12}>
                <VTextField 
                  fullWidth
                  placeholder='Token' 
                  name='token'
                  label='Token'
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          
        </Box>

      </VForm>

    </LayoutBasePage>
  )
}