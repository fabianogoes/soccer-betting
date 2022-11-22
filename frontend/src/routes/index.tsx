import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts'
import { 
  Dashboard, 
  TeamList, 
  TeamDetail, 
  UserList, 
  UserDetail, 
  MatchList
} from '../pages'  

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/dashboard',
        label: 'Dashboard',
      },
      {
        icon: 'storage',
        path: '/bet',
        label: 'Aposta',
      },
      {
        icon: 'stadium',
        path: '/matches',
        label: 'Jogos',
      },
      {
        icon: 'leaderboard',
        path: '/ranking',
        label: 'Ranking',
      },
      {
        icon: 'groups',
        path: '/teams',
        label: 'Equipes',
      },
      {
        icon: 'account_circle',
        path: '/users',
        label: 'Usuários',
      },
    ])
  }, [])

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/teams" element={<TeamList/>} />
      <Route path="/teams/detail/:id" element={<TeamDetail/>} />

      <Route path="/users" element={<UserList/>} />
      <Route path="/users/detail/:id" element={<UserDetail/>} />

      <Route path="/matches" element={<MatchList/>} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}