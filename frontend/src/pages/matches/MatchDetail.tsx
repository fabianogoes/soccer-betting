import { Grid, LinearProgress, Paper, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/system'

import { DetailTools } from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { MatchesService } from '../../shared/services/api/matches/MatchesService'
import { VTextField, VForm, useVForm } from '../../shared/forms'
import { VNumberField } from '../../shared/forms/VNumberField'

interface IFormData {
  id: number
  teamA: {
    id: number
    name: string
    group: string
    abbreviation: string
  }
  teamAResult: number
  teamB: {
    id: number
    name: string
    group: string
    abbreviation: string
  }
  teamBResult: number
  schedule: string
  finished: boolean
}

export const MatchDetail: React.FC = () => {
  const { id } = useParams<'id'>()
  const navigate = useNavigate()
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    MatchesService.getById(Number(id))
      .then((result) => {
        setIsLoading(false)

        if (result instanceof Error) {
          alert(result.message)
          navigate('/matches')
        } else {
          formRef.current?.setData(result)
        }
      })
  }, [id])


  const handleSave = (data: IFormData) => {
    setIsLoading(true)

    MatchesService
      .updateById(
        Number(id), 
        {
          teamAResult: Number(data.teamAResult), 
          teamBResult:Number(data.teamBResult), 
          finished: true
        }
      ).then((result) => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert(result.message)
        }
      })
      
    console.log('update', id, data)
    if (isSaveAndClose()) {
      navigate('/matches')
    }
  }
  
  return (
    <LayoutBasePage
      title='Atualização de resultado'
      toolsBar={
        <DetailTools
          showSaveAndCloseButton
          showDeleteButton={false}
          showNewButton={false}

          onSaveButtonClick={save}
          onSaveAndBackButtonClick={saveAndClose}
          onBackButtonClick={() => navigate('/matches')}
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
              <Grid item xs={6} md={6}>
                <VTextField 
                  fullWidth
                  name='teamA.name'
                  label='Nome do time'
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <VNumberField 
                  fullWidth
                  name='teamAResult'
                  label='Resultado'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={6} md={6}>
                <VTextField 
                  fullWidth
                  placeholder='Nome do time' 
                  name='teamB.name'
                  label='Nome do time'
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <VTextField 
                  fullWidth
                  name='teamBResult'
                  label='Resultado'
                />
              </Grid>              
            </Grid>

          </Grid>
          
        </Box>

      </VForm>

    </LayoutBasePage>
  )
}