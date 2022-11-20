import { Box, Card, Grid, ImageList, Paper, Typography, ImageListItem, ImageListItemBar, CardContent, CardHeader } from '@mui/material'

import { TeamFlagBox } from './TeamFlag'

interface ITeamGroupProps {
  group: string
}

export const TeamGroupBox: React.FC<ITeamGroupProps> = ({group}) => {
  return (
    <Box textAlign='center'>
      <Typography variant='h4' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
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
            <TeamGroupBox group={group} />
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
                  {/* <ImageListItemBar position='bottom' title={team.abbreviation} sx={{width: '100%'}} style={{marginLeft: 'auto', marginRight: 'auto'}} />            */}
                  <TeamFlagBox imgSrc={team.abbreviation} imgAlt={team.name}/>
                </CardContent>
              </Card>
            </Box>
          </ImageListItem>  
        ))}
      </ImageList>        

    </Box>
  )
}