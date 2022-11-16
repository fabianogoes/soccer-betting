import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface ITeamList {
  id: string
  name: string
  group: string
  namePTBR: string
  abbreviation: string
}

export interface ITeamDetail {
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

const create = async (data: any): Promise<string | Error> => {
  console.log(data)
  return '123'
}

const updateById = async (id: string, data: any): Promise<string | Error> => {
  console.log(data)
  return id
}

const getAll = async (page = 1, filter = ''): Promise<ITeamWithTotalCount | Error> => {
  console.log(`TeamsService:getAll(page=${page}, filter=${filter})`)
  try {
    const relativeUrl = `/teams?_page=${page}&_limit=${Environment.MAX_LINES}&name_like=${filter}`
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

const deleteById = async (id: string): Promise<ITeamDetail | Error> => {
  try {
    await Api.delete(`/teams/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao deletar o time: ${id}.`)
  }
}


export const TeamsService = {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
}