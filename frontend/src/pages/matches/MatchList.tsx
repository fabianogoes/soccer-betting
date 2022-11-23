import { useEffect, useState } from 'react'
import { 
  Chip,
  Divider,
  Icon,
  IconButton,
  LinearProgress, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableRow, 
  TextField,
} from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

import { IMatchList, MatchesService } from '../../shared/services/api/matches/MatchesService'
import { LayoutBasePage } from '../../shared/layouts'
import { useDebounce } from '../../shared/hooks'

import { TeamFlagBox } from '../../shared/components/commons/TeamFlag'
import { useNavigate } from 'react-router-dom'

export const MatchList: React.FC = () => {
  const { debounce } = useDebounce()
  const navigate = useNavigate()

  const [rows, setRows] = useState<IMatchList[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      MatchesService.getAll()
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            return
          } else {
            setRows(result)
          }
  
        })
    })

  }, [])


  const formatDateTime = (date: string) => {
    const dtFormatter = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
      timeZone: 'America/Sao_Paulo'
    })

    // return date
    return dtFormatter.format(new Date(date))
  }

  return (
    <LayoutBasePage title="Jogos da fase de grupos">

      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>

          {!isLoading && 
            <TableBody>

              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>
                    
                    <TeamFlagBox 
                      toolTipTitle={row.teamA.name}
                      imgWidth='40%' 
                      abbreviation={row.teamA.abbreviation} 
                    />

                    {row.finished && 
                      <TextField 
                        sx={{m: 1}}
                        inputProps={{readOnly: true, min: 0, style: { textAlign: 'center' }}} 
                        size='small' 
                        value={row.teamAResult}
                        variant={ row.finished ? 'filled' : 'standard'} 
                        color={ row.finished ? 'success' : 'warning' }
                      />
                    }   

                    {!row.finished &&
                      <Icon sx={{m: 1}}>alarm</Icon>
                    }

                  </TableCell>
                  <TableCell align='center'>
                    {/* <Box width="100%" display="flex" alignItems="center" justifyContent="center"> */}
                    {/* <Avatar variant='rounded'>X</Avatar> */}
                    {/* </Box> */}
                    <Divider>
                      {row.finished && 
                        <Chip color='success' label='Jogo finalizado' icon={<Icon>task_alt</Icon>} />                                                  
                      }                      
                      {!row.finished && 
                        <Chip icon={<Icon>alarm</Icon>} label='Aguardando confronto' /> 
                      }                      
                    </Divider>

                    {row.finished && 
                      <Chip 
                        icon={<CalendarMonthOutlinedIcon />} 
                        label={(formatDateTime(row.schedule)) + ' - GRUPO: ' + row.teamA.group} 
                        variant='outlined'
                        color='success'
                        sx={{m: 2, textDecoration: 'line-through'}}
                      />
                    } 
                    {!row.finished && 
                      <Chip 
                        icon={<CalendarMonthOutlinedIcon />} 
                        label={(new Date(row.schedule).toLocaleString()) + ' - GRUPO: ' + row.teamA.group} 
                        variant='outlined'
                        sx={{m: 2}}
                      />
                    } 

                    <br />
                    <IconButton size="small" onClick={() => navigate(`/matches/detail/${row.id}`)}>
                      <Icon color='success'>edit</Icon>
                    </IconButton> 

                  </TableCell>
                  <TableCell align='center'>
                    <TeamFlagBox 
                      toolTipTitle={row.teamB.name}
                      imgWidth='40%' 
                      abbreviation={row.teamB.abbreviation} 
                    />

                    {row.finished && 
                      <TextField 
                        sx={{m: 1}}
                        inputProps={{readOnly: true, min: 0, style: { textAlign: 'center' }}} 
                        size='small' 
                        value={row.teamBResult}
                        variant={ row.finished ? 'filled' : 'standard'} 
                        color={ row.finished ? 'success' : 'warning' }
                      />
                    }

                    {!row.finished &&
                      <Icon sx={{m: 1}}>alarm</Icon>
                    }
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          }

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter> 

        </Table>
      </TableContainer>

    </LayoutBasePage>
  )
}