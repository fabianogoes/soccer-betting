import { DetailTools } from '../../shared/components/detail-tools/DetailTools'
import { ListingTools } from '../../shared/components/listing-tools/ListingTools'
import { LayoutBasePage } from '../../shared/layouts'

export const Dashboard = () => {

  return (
    <LayoutBasePage 
      title='Dashboard' 
      toolsBar={(
        <DetailTools showSaveAndCloseButton showNewButton />
      )}
    >
      <ListingTools 
        showSearchInput
        textNewButton='Nova'/>
    </LayoutBasePage>
  )
}