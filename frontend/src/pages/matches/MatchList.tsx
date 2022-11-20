import { useEffect, useState } from 'react'
import { 
  Avatar,
  Chip,
  Divider,
  LinearProgress, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TextField
} from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

import { IMatchList, MatchesService } from '../../shared/services/api/matches/MatchesService'
import { LayoutBasePage } from '../../shared/layouts'
import { useDebounce } from '../../shared/hooks'

import { TeamFlagBox } from '../../shared/components/commons/TeamFlag'
import { TeamGroupBox } from '../../shared/components/commons/TeamGroup'
import { Box } from '@mui/system'
import { useTheme } from '@emotion/react'

export const MatchList: React.FC = () => {
  const { debounce } = useDebounce()

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
            console.log(result)
            setRows(result.data)
          }
  
        })
    })

  }, [])

  const theme = useTheme()
  return (
    <LayoutBasePage title="Listagem de Jogos">

      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>

          {!isLoading && 
            <TableBody>

              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>
                    <TeamFlagBox 
                      imgWidth='40%' 
                      imgSrc={row.teamA.abbreviation} 
                      imgAlt={row.teamA.abbreviation} 
                    />
                    <TextField 
                      id="standard-basic" 
                      inputProps={{min: 0, style: { textAlign: 'center' }}} 
                      variant="outlined" 
                      size='small' 
                      disabled={true}
                      defaultValue={0} 
                    />
                  </TableCell>
                  <TableCell align='center'>
                    {/* <Box width="100%" display="flex" alignItems="center" justifyContent="center"> */}
                    {/* <Avatar variant='rounded'>X</Avatar> */}
                    {/* </Box> */}
                    <Divider>
                      <Chip label='X' />  
                    </Divider>
                    <Chip 
                      icon={<CalendarMonthOutlinedIcon />} 
                      label={(new Date(row.schedule).toLocaleString()) + ' - GRUPO: ' + row.teamA.group} 
                      variant='outlined'
                      color='primary'
                      sx={{m: 2}}
                    /> 
                  </TableCell>
                  <TableCell align='center'>
                    <TeamFlagBox 
                      imgWidth='40%' 
                      imgSrc={row.teamB.abbreviation} 
                      imgAlt={row.teamB.abbreviation} 
                    />
                    <TextField 
                      id="standard-basic" 
                      inputProps={{min: 0, style: { textAlign: 'center' }}} 
                      variant="outlined" 
                      disabled={true}
                      size='small' 
                      defaultValue={0} 
                    />
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