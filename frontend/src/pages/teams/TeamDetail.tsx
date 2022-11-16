import { Grid, LinearProgress, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { DetailTools } from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { TeamsService } from '../../shared/services/api/teams/TeamsService'
import { VTextField } from '../../shared/forms'
import { Box } from '@mui/system'

interface IFormData {
  name: string;
  abbreviation: string;
  group: string;
}

export const TeamDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate()

  const formRef = useRef<FormHandles>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)

      TeamsService.getById(id)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            navigate('/teams')
          } else {
            setName(result.name)
            console.log(result)
            formRef.current?.setData(result)
          }
        })
    }
  }, [id])


  const handleSave = (data: IFormData) => {
    // setIsLoading(true)

    if (id === 'new') {
      // TeamsService
      //   .create(data)
      //   .then((result) => {
      //     setIsLoading(false)

      //     if (result instanceof Error) {
      //       alert(result.message)
      //     } else {
      //       navigate(`/teams/detail/${result}`)
      //     }
      //   })
      console.log('create', data)
      alert('create')
      const idResult = '37b21df3-a042-40d9-a1a9-1bb09cb5897e'
      navigate(`/teams/detail/${idResult}`)
    } else {
      // TeamsService
      //   .updateById(id, data)
      //   .then((result) => {
      //     setIsLoading(false)

      //     if (result instanceof Error) {
      //       alert(result.message)
      //     }
      //   })
      console.log('update', id, data)
      alert('update')
      navigate(`/teams/detail/${id}`)
    }
  }
  
  const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      TeamsService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso!')
            navigate('/teams')
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

          onSaveButtonClick={() => formRef.current?.submitForm()}
          onSaveAndBackButtonClick={() => formRef.current?.submitForm()}
          onBackButtonClick={() => navigate('/teams')}
          onDeleteButtonClick={() => handleDelete(id)}
          onNewButtonClick={() => navigate('/teams/detail/new')}
        />
      }
    >

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

      <Form ref={formRef} onSubmit={handleSave}>
        <Box sx={{margin: 1}} display='flex' flexDirection='column' component={Paper} >

          <Grid container direction='column' padding={2} spacing={2} >

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={12}>
                <VTextField 
                  fullWidth
                  placeholder='Nome do time' 
                  name='name'
                  label='Nome'
                  disabled={id != 'new'}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6}>
                <VTextField 
                  fullWidth
                  placeholder='Sigla' 
                  name='abbreviation'
                  label='Sigla'
                  disabled={id != 'new'}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <VTextField 
                  fullWidth
                  placeholder='Grupo' 
                  name='group'
                  label='Grupo'
                  disabled={id != 'new'}
                />
              </Grid>
            </Grid>
          </Grid>
          
        </Box>

      </Form>

    </LayoutBasePage>
  )
}