import { useEffect, useState } from 'react'

import { LayoutBasePage } from '../../shared/layouts'
import { useDebounce } from '../../shared/hooks'
import { TeamGroupCard } from '../../shared/components/commons/TeamGroup'
import { TeamsByGroup, TeamsService } from '../../shared/services/api/teams/TeamsService'
import { LinearProgress } from '@mui/material'

export const TeamList: React.FC = () => {
  const { debounce } = useDebounce()

  const [teamsByGroup, setTeamsByGroup] = useState<TeamsByGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      TeamsService.getAll()
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            return
          } else {
            TeamsService.fetchListGroup(result.data)
              .then((teamsByGroup) => {
                if (teamsByGroup instanceof Error) {
                  alert(teamsByGroup.message)
                  return
                } else {
                  setTeamsByGroup(teamsByGroup)
                }
              })
          }
        })
    })

  }, [])

  return (
    <LayoutBasePage title="Lista de Times">

      {teamsByGroup.map((currentGroup) => (
        (!isLoading && 
          <TeamGroupCard key={currentGroup.group} group={currentGroup.group} teams={currentGroup.teams} />
        )
      ))}

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

    </LayoutBasePage>
  )
}