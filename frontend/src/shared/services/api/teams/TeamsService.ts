import { Api } from '../axios-config'

export interface ITeamList {
  id: string
  name: string
  group: string
  abbreviation: string
}

export interface ITeamDetail {
  id: string
  name: string
  group: string
  abbreviation: string
}

type ITeamWithTotalCount = {
  data: ITeamList[]
  totalCount: number
}

export interface ITeam {
  name: string
  abbreviation: string
}

export type TeamsByGroup = {
  group: string
  teams: ITeam[]
}

const fetchListGroup = async (list: ITeamList[]): Promise<TeamsByGroup[] | Error> => {
  try {
    let currentTeams: Array<ITeam> = []
    let currentGroup = list[0].group
    const finalList: TeamsByGroup[] = []

    list.map((item) => {
      
      if (item.group !== currentGroup) {
        finalList.push({group: currentGroup, teams: currentTeams})
        
        currentGroup = item.group
        currentTeams = []
      } 
      currentTeams.push({name: item.name, abbreviation: item.abbreviation})

    })
    finalList.push({group: currentGroup, teams: currentTeams})

    return finalList
  } catch (error) {
    return new Error((error as {message: string}).message || 'Erro no fetch de times por grupo.')
  }
  
}

const getAll = async (): Promise<ITeamWithTotalCount | Error> => {
  try {
    const { data, headers } = await Api.get('/teams')

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) || 0
      }
    }

    return new Error('Erro na listagem de time.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro na listagem de times.')
  }
}

const getById = async (id: string): Promise<ITeamDetail | Error> => {
  try {
    const { data } = await Api.get(`/teams/${id}`)

    if (data) {
      return data
    }

    return new Error(`Erro ao consultar o time: ${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao consultar o time: ${id}`)
  }
}

export const TeamsService = {
  getAll,
  getById,
  fetchListGroup,
}