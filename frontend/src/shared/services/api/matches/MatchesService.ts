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

export interface IMatchUpdate {
  teamAResult: number
  teamBResult: number
  finished: boolean
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

const getById = async (id: number): Promise<IMatchDetail | Error> => {
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

const updateById = async (id: number, requestMatch: IMatchUpdate): Promise<IMatchDetail | Error> => {
  try {
    console.log('MatchesService.updateById...')
    console.log(`id = ${id}`)
    console.log(requestMatch)
    const { data } = await Api.put(`/matches/${id}`, requestMatch)

    if (data) {
      return data
    }

    return new Error(`Erro ao atualizar o jogo: ${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao atualizar o jogo: ${id}`)
  }
}


export const MatchesService = {
  getAll,
  getById,
  updateById,
}