import { Box, Card, Grid, ImageList, Paper, Typography, ImageListItem, ImageListItemBar, CardContent, CardHeader, Divider, Chip } from '@mui/material'

import { TeamFlagBox } from './TeamFlag'

type VariantSize = 
| 'h3'
| 'h4'
| 'h5'
| 'h6'

interface ITeamGroupProps {
  group: string
  typographyVariant?: VariantSize
}

export const TeamGroupBox: React.FC<ITeamGroupProps> = ({
  group,
  typographyVariant = 'h4'
}) => {
  return (
    <Box textAlign='center'>
      <Typography variant={typographyVariant} whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        {'GRUPO: ' + group}
      </Typography>
    </Box>
  )
}

export interface ITeamProps {
  name: string
  abbreviation: string
}

interface ITeamGroupCardProps {
  group: string
  teams: ITeamProps[]
}

export const TeamGroupCard: React.FC<ITeamGroupCardProps> = ({
  group,
  teams
}) => {

  return (
    <Box sx={{margin: 1, padding: 1}} component={Paper} >
      <Grid container direction='column'>
        <Grid container item direction='row'>
          <Grid item xs={12} md={12}>
            <Divider>
              <Chip sx={{fontSize: 20}} color='primary' label={'GRUPO: ' + group} />  
            </Divider>
          </Grid>
        </Grid>
      </Grid>

      <ImageList cols={4}>
        {teams.map((team) => (              
          <ImageListItem key={team.abbreviation} style={{ textAlign: 'center' }} >   
            <Box>
              <Card variant="outlined">
                <CardHeader title={team.name}/>
                <CardContent>
                  <TeamFlagBox imgWidth='50%' abbreviation={team.abbreviation} toolTipTitle={team.abbreviation} />
                </CardContent>
              </Card>
            </Box>
          </ImageListItem>  
        ))}
      </ImageList>        

    </Box>
  )
}