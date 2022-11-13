import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ListingTools } from '../../shared/components'
import { useDebounce } from '../../shared/hooks'
import { LayoutBasePage } from '../../shared/layouts'
import { TeamsService } from '../../shared/services/api/teams/TeamsService'

export const TeamList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(3000, false)

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const currentPage = 1

  useEffect(() => {

    debounce(() => {
      TeamsService.getAll(currentPage, search)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message)
            return
          } else {
            console.log(result)
          }
  
        })
    })

  }, [search])

  return (
    <LayoutBasePage 
      title="Listagem de Times"
      toolsBar={
        <ListingTools 
          showSearchInput
          textNewButton='Novo' 
          searchText={search}
          onChangingSearchText={text => setSearchParams({ search: text }, { replace: true })}
        />
      }
    >
    </LayoutBasePage>
  )
}