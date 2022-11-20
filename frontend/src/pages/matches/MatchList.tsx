import { useEffect, useMemo, useState } from 'react'
import { 
  Chip,
  LinearProgress, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TableRow 
} from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

import { IMatchList, MatchesService } from '../../shared/services/api/matches/MatchesService'
import { LayoutBasePage } from '../../shared/layouts'
import { useDebounce } from '../../shared/hooks'

import { TeamFlagBox } from '../../shared/components/commons/TeamFlag'
import { TeamGroupBox } from '../../shared/components/commons/TeamGroup'

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

  return (
    <LayoutBasePage title="Listagem de Jogos">

      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell align='center'>Grupo</TableCell>
              <TableCell align='center'>Data</TableCell>
              <TableCell align='center'>Team A</TableCell>
              <TableCell align='center'>Team B</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading && 
            <TableBody>

              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>
                    <TeamGroupBox group={row.teamA.group} />
                  </TableCell>
                  <TableCell align='center'>                    
                    <Chip 
                      icon={<CalendarMonthOutlinedIcon />} 
                      label={new Date(row.schedule).toLocaleString()} 
                      variant='outlined'
                      color='primary'
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <TeamFlagBox imgSrc={row.teamA.abbreviation} teamName={row.teamA.namePTBR} imgAlt={row.teamA.abbreviation} />
                  </TableCell>
                  <TableCell align='center'>
                    <TeamFlagBox imgSrc={row.teamB.abbreviation} teamName={row.teamB.namePTBR} imgAlt={row.teamB.abbreviation} />
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