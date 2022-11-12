import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'

import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

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
      <Route path="/dashboard" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle drawer</Button>} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}