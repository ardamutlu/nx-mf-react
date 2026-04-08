import {Outlet} from "react-router-dom";
import {cn, getCookie, SidebarInset, SidebarProvider} from '@ardamtl/common-react-ui'
import {LayoutProvider} from '../../context/layout-provider'
import {AppSidebar} from './app-sidebar'
import {Header} from "./header";
import {Main} from "./main";

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({children}: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    <LayoutProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar/>
        <SidebarInset
          className={cn(
            '@container/content',
            'has-data-[layout=fixed]:h-svh',
            'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
          )}
        >
          <Header fixed/>
          <Main>
            {children ?? <Outlet/>}
          </Main>
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  )
}
