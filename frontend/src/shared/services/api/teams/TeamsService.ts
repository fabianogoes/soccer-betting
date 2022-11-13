import { Environment } from '../../../environment'
import { Api } from '../axios-config'

interface ITeamList {
  id: string
  name: string
  group: string
  namePTBR: string
  abbreviation: string
}

interface ITeamDetail {
  id: string
  name: string
  group: string
  namePTBR: string
  abbreviation: string
}

type ITeamWithTotalCount = {
  data: ITeamList[]
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<ITeamWithTotalCount | Error> => {
  try {
    const relativeUrl = `/teams?_page=${page}&_limit=${Environment.MAX_LINES}&name${filter}`
    const { data, headers } = await Api.get(relativeUrl)

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
}