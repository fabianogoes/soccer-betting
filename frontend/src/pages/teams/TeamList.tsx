import { useEffect, useMemo, useState } from 'react'
import { Badge, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ITeamList, TeamsService } from '../../shared/services/api/teams/TeamsService'
import { LayoutBasePage } from '../../shared/layouts'
import { ListingTools } from '../../shared/components'
import { useDebounce } from '../../shared/hooks'
import { Environment } from '../../shared/environment'

export const TeamList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()
  const navigate = useNavigate()

  const [rows, setRows] = useState<ITeamList[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1')
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      TeamsService.getAll(page, search)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            return
          } else {
            console.log(result)
            setTotalCount(result.totalCount)
            setRows(result.data)
          }
  
        })
    })

  }, [search, page])

  const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      TeamsService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id),
            ])
            alert('Registro apagado com sucesso!')
          }
        })
    }
  }

  return (
    <LayoutBasePage 
      title="Listagem de Times"
      toolsBar={
        <ListingTools 
          showSearchInput
          textNewButton='Novo' 
          searchText={search}
          onChangingSearchText={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
        />
      }
    >

      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell align='center'>Ações</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Sigla</TableCell>
              <TableCell align='center'>Grupo</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading && 
            <TableBody>

              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>
                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={() => navigate(`/teams/detail/${row.id}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.abbreviation}</TableCell>
                  <TableCell align='center'>
                    <Badge badgeContent={row.group} color="primary" />
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          }

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}


            {(totalCount > 0 && totalCount > Environment.MAX_LINES) && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.MAX_LINES)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter> 

        </Table>
      </TableContainer>

    </LayoutBasePage>
  )
}