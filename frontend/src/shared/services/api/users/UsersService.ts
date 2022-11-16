import { Environment } from '../../../environment'
import { Api } from '../axios-config'

interface IUserList {
  id: string
  name: string
  email: string
  token: string
}

interface IUserDetail {
  id: string
  name: string
  email: string
  token: string
}

type IUserWithTotalCount = {
  data: IUserList[]
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<IUserWithTotalCount | Error> => {
  try {
    const relativeUrl = `/users?_page=${page}&_limit=${Environment.MAX_LINES}&email_like${filter}`
    const { data, headers } = await Api.get(relativeUrl)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) || 0
      }
    }

    return new Error('Erro na listagem de usuários.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro na listagem de usuários.')
  }
}

const getById = async (id: string): Promise<IUserDetail | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`)

    if (data) {
      return data
    }

    return new Error(`Erro ao consultar o usuários: ${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao consultar o usuários: ${id}`)
  }
}

const create = async (requestData: Omit<IUserDetail, 'id'>): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IUserDetail>('/users', requestData)

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar usuário.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro ao criar usuário.')
  }
}

const updateById = async (id: string, requestData: IUserDetail): Promise<void | Error> => {
  try {
    await Api.put(`/users/${id}`, requestData)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao atualizar o usuário: ${id}.`)
  }
}

const deleteById = async (id: string): Promise<IUserDetail | Error> => {
  try {
    await Api.delete(`/users/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || `Erro ao deletar o usuário: ${id}.`)
  }
}

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}