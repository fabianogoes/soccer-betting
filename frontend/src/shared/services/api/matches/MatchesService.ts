import { ITeamDetail } from './../teams/TeamsService';
import { Api } from '../axios-config'

export interface IMatchList {
  id: string
  schedule: string
  teamA: ITeamDetail
  teamAResult?: number
  teamB: ITeamDetail
  teamBResult?: number
  finished?: boolean
}

export interface IMatchDetail {
  id: string
  teamAID: string
  teamAAbbreviation: string
  teamBID: string
  teamBAbbreviation: string
  group: string
  schedule: string
}

const getAll = async (): Promise<IMatchList[] | Error> => {
  try {
    const { data } = await Api.get('/matches?_sort=schedule&_order=asc')

    if (data) {
      console.log(data)
      return data
    }

    return new Error('Erro na listagem de jogos.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro na listagem de jogos.')
  }
}

const getById = async (id: string): Promise<IMatchDetail | Error> => {
  try {
    const { data } = await Api.get(`/matches/${id}`)

    if (data) {
      return data
    }

    return new Error(`Erro ao consultar o jogo: ${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao consultar o jogo: ${id}`)
  }
}


export const MatchesService = {
  getAll,
  getById,
}