import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts'
import { Dashboard } from '../pages'  

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
        label: 'Minha Aposta',
      },
      {
        icon: 'stadium',
        path: '/mathes',
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
        label: 'Times e Grupos',
      },
    ])
  }, [])

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}