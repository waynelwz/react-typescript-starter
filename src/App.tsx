// @flow
import React, { useEffect } from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui'
import { ToasterContainer } from 'baseui/toast'
import { SidebarContext } from '@/contexts/SidebarContext'
import { useSidebar } from '@/hooks/useSidebar'
import Routes from '@/routes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useCurrentThemeType } from '@/hooks/useCurrentThemeType'
import themes from '@/theme'
import axios from 'axios'

const engine = new Styletron()
const queryClient = new QueryClient()

// todo refact
axios.interceptors.request.use(function (config) {
    const token = sessionStorage?.token
    config.headers.Authorization = token
    return config
})

export default function Hello() {
    const sidebarData = useSidebar()
    const themeType = useCurrentThemeType()
    const theme = themes[themeType]

    return (
        <QueryClientProvider client={queryClient}>
            <StyletronProvider value={engine}>
                <BaseProvider theme={theme}>
                    <ToasterContainer autoHideDuration={3000}>
                        <SidebarContext.Provider value={sidebarData}>
                            <Routes />
                        </SidebarContext.Provider>
                    </ToasterContainer>
                </BaseProvider>
            </StyletronProvider>
        </QueryClientProvider>
    )
}
