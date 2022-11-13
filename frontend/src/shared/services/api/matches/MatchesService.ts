import { Environment } from '../../../environment'
import { Api } from '../axios-config'

interface IMatchList {
  id: string
  teamAID: string
  teamAAbbreviation: string
  teamBID: string
  teamBAbbreviation: string
  group: string
  schedule: string
}

interface IMatchDetail {
  id: string
  teamAID: string
  teamAAbbreviation: string
  teamBID: string
  teamBAbbreviation: string
  group: string
  schedule: string
}

type IMatchWithTotalCount = {
  data: IMatchList[]
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<IMatchWithTotalCount | Error> => {
  try {
    const relativeUrl = `/matches?_page=${page}&_limit=${Environment.MAX_LINES}&name${filter}`
    const { data, headers } = await Api.get(relativeUrl)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) || 0
      }
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


export const TeamsService = {
  getAll,
  getById,
}