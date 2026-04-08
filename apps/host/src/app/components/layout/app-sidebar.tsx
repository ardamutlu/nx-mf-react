import {Sidebar, SidebarContent, SidebarHeader, SidebarRail,} from '@ardamtl/common-react-ui'
import {useLayout} from '../../context/layout-provider'
import {sidebarData} from './data/sidebar-data'
import {NavGroup} from './nav-group'

export function AppSidebar() {
  const {collapsible, variant} = useLayout()
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        Logo
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail/>
    </Sidebar>
  )
}
