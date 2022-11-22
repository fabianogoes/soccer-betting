import { Box, Tooltip } from '@mui/material'
import { grey } from '@mui/material/colors'

import SEN from './../../../assets/flags/SEN.png'
import HOL from './../../../assets/flags/HOL.png'
import EQU from './../../../assets/flags/EQU.png'
import CAT from './../../../assets/flags/CAT.png'

import ING from './../../../assets/flags/ING.png'
import IRA from './../../../assets/flags/IRA.png'
import EUA from './../../../assets/flags/EUA.png'
import GAL from './../../../assets/flags/GAL.png'

import ARG from './../../../assets/flags/ARG.png'
import ARA from './../../../assets/flags/ARA.png'
import MEX from './../../../assets/flags/MEX.png'
import POL from './../../../assets/flags/POL.png'

import DIN from './../../../assets/flags/DIN.png'
import TUN from './../../../assets/flags/TUN.png'
import FRA from './../../../assets/flags/FRA.png'
import AUS from './../../../assets/flags/AUS.png'

import ALE from './../../../assets/flags/ALE.png'
import JAP from './../../../assets/flags/JAP.png'
import ESP from './../../../assets/flags/ESP.png'
import CRC from './../../../assets/flags/CRC.png'

import MAR from './../../../assets/flags/MAR.png'
import CRO from './../../../assets/flags/CRO.png'
import BEL from './../../../assets/flags/BEL.png'
import CAN from './../../../assets/flags/CAN.png'

import SUI from './../../../assets/flags/SUI.png'
import BRA from './../../../assets/flags/BRA.png'
import CAM from './../../../assets/flags/CAM.png'
import SRV from './../../../assets/flags/SRV.png'

import URU from './../../../assets/flags/URU.png'
import COR from './../../../assets/flags/COR.png'
import POR from './../../../assets/flags/POR.png'
import GAN from './../../../assets/flags/GAN.png'

const flagMap: {[key: string]: string} = {
  'SEN': SEN,
  'HOL': HOL,
  'EQU': EQU,
  'CAT': CAT,
  
  'ING': ING,
  'IRA': IRA,
  'EUA': EUA,
  'GAL': GAL,
  
  'ARG': ARG,
  'ARA': ARA,
  'MEX': MEX,
  'POL': POL,
  
  'DIN': DIN,
  'TUN': TUN,
  'FRA': FRA,
  'AUS': AUS,
  
  'ALE': ALE,
  'JAP': JAP,
  'ESP': ESP,
  'CRC': CRC,
  
  'MAR': MAR,
  'BEL': BEL,
  'CRO': CRO,
  'CAN': CAN,
  
  'SUI': SUI,
  'BRA': BRA,
  'CAM': CAM,
  'SRV': SRV,
  
  'URU': URU,
  'COR': COR,
  'POR': POR,
  'GAN': GAN,
}

interface ITeamFlagProps {
  toolTipTitle: string
  abbreviation: string
  imgWidth: string
}

export const TeamFlagBox: React.FC<ITeamFlagProps> = ({
  toolTipTitle,
  abbreviation,
  imgWidth = '100%',
}) => {
  return (
    <Box style={{ marginLeft: 'auto', marginRight: 'auto' }} width='50%'>

      <Tooltip title={toolTipTitle}>
        <img 
          src={flagMap[abbreviation]} 
          alt={abbreviation} 
          width={imgWidth} 
          style={{ 
            border: `1px ${grey[300]} solid`, 
            borderRadius: '50%' 
          }}
        /> 
      </Tooltip>
     
    </Box>
  )
}