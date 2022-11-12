import { createContext, useCallback, useContext, useState } from 'react'

type Props = {
    children: React.ReactNode
}

interface IDrawerOption {
  icon: string
  path: string
  label: string
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void
  drawerOptions: IDrawerOption[]
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider: React.FC<Props> = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
  }, [])

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions)
  }, [])

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  )
}