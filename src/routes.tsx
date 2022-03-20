import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from '@/components/Header/index'
import OrganizationLayout from '@/components/OrganizationLayout'
import ClusterOverview from '@/pages/Cluster/Overview'
import { useCurrentThemeType } from '@/hooks/useCurrentThemeType'
import { IThemedStyleProps } from '@/interfaces/IThemedStyle'
import { useStyletron } from 'baseui'
import { createUseStyles } from 'react-jss'
import Login from '@/pages/Dashboard/Login'
import OrganizationApiTokens from '@/pages/Organization/ApiTokens'
import OrganizationClusters from '@/pages/Organization/Clusters'
import OrganizationMembers from '@/pages/Organization/Members'
import OrganizationSettings from '@/pages/Organization/Settings'
import ClusterYataiComponents from '@/pages/Cluster/YataiComponents'
import ClusterYataiComponentDetail from '@/pages/Cluster/YataiComponentDetail'
import ClusterDeployments from '@/pages/Cluster/Deployments'
import ClusterMembers from '@/pages/Cluster/Members'
import ClusterSettings from '@/pages/Cluster/Settings'
import ClusterLayout from '@/components/Cluster/ClusterLayout'
import OrganizationBentoRepositories from '@/pages/Organization/BentoRepositories'
import OrganizationBentos from '@/pages/Organization/Bentos'
import OrganizationModels from '@/pages/Organization/Models'
import OrganizationEvents from '@/pages/Organization/Events'
import ModelRepositoryLayout from '@/components/ModelRepositoryLayout'
import ModelRepositoryOverview from '@/pages/ModelRepository/Overview'
import ModelRepositoryModels from '@/pages/ModelRepository/Models'
import OrganizationModelRepositories from '@/pages/Organization/ModelRepositories'
import { ChatWidget } from '@papercups-io/chat-widget'
import ModelLayout from '@/components/ModelLayout'
import ModelOverview from '@/pages/Model/Overview'
import Home from '@/pages/Dashboard/Home'

const useStyles = createUseStyles({
    'root': ({ theme }: IThemedStyleProps) => ({
        '& path': {
            stroke: theme.colors.contentPrimary,
        },
        ...Object.entries(theme.colors).reduce((p: Record<string, string>, [k, v]) => {
            return {
                ...p,
                [`--color-${k}`]: v,
            }
        }, {} as Record<string, string>),
    }),
    '@global': {
        '.react-lazylog': {
            background: 'var(--color-backgroundPrimary)',
        },
        '.react-lazylog-searchbar': {
            background: 'var(--color-backgroundPrimary)',
        },
        '.react-lazylog-searchbar-input': {
            background: 'var(--color-backgroundPrimary)',
        },
    },
})

const Routes = () => {
    const themeType = useCurrentThemeType()
    const [, theme] = useStyletron()
    const styles = useStyles({ theme, themeType })

    return (
        <BrowserRouter>
            <div
                className={styles.root}
                style={{
                    minHeight: '100vh',
                    background: themeType === 'light' ? '#fdfdfd' : theme.colors.backgroundSecondary,
                    color: theme.colors.contentPrimary,
                }}
            >
                <Header />
                <Switch>
                    <Route exact path='/clusters/:clusterName/:path?/:path?'>
                        <ClusterLayout>
                            <Switch>
                                <Route exact path='/clusters/:clusterName' component={ClusterOverview} />
                                <Route
                                    exact
                                    path='/clusters/:clusterName/yatai_components'
                                    component={ClusterYataiComponents}
                                />
                                <Route
                                    exact
                                    path='/clusters/:clusterName/yatai_components/:componentType'
                                    component={ClusterYataiComponentDetail}
                                />
                                <Route exact path='/clusters/:clusterName/deployments' component={ClusterDeployments} />
                                <Route exact path='/clusters/:clusterName/members' component={ClusterMembers} />
                                <Route exact path='/clusters/:clusterName/settings' component={ClusterSettings} />
                            </Switch>
                        </ClusterLayout>
                    </Route>
                    <Route exact path='/model_repositories/:modelRepositoryName/models/:modelVersion/:path?/:path?'>
                        <ModelLayout>
                            <Switch>
                                <Route
                                    exact
                                    path='/model_repositories/:modelRepositoryName/models/:modelVersion'
                                    component={ModelOverview}
                                />
                            </Switch>
                        </ModelLayout>
                    </Route>
                    <Route exact path='/model_repositories/:modelRepositoryName/:path?/:path?'>
                        <ModelRepositoryLayout>
                            <Switch>
                                <Route
                                    exact
                                    path='/model_repositories/:modelRepositoryName'
                                    component={ModelRepositoryOverview}
                                />
                                <Route
                                    exact
                                    path='/model_repositories/:modelRepositoryName/models'
                                    component={ModelRepositoryModels}
                                />
                            </Switch>
                        </ModelRepositoryLayout>
                    </Route>
                    <Route exact path='/login' component={Login} />
                    <Route>
                        <OrganizationLayout>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/bentos' component={OrganizationBentos} />
                                <Route exact path='/models' component={OrganizationModels} />
                                <Route exact path='/events' component={OrganizationEvents} />
                                <Route exact path='/api_tokens' component={OrganizationApiTokens} />
                                <Route exact path='/clusters' component={OrganizationClusters} />
                                <Route exact path='/members' component={OrganizationMembers} />
                                <Route exact path='/bento_repositories' component={OrganizationBentoRepositories} />
                                <Route exact path='/model_repositories' component={OrganizationModelRepositories} />
                                <Route exact path='/settings' component={OrganizationSettings} />
                            </Switch>
                        </OrganizationLayout>
                    </Route>
                </Switch>
                {/* <ChatWidget
                    token='25ad5fd9-293b-4e0f-9601-5b0cd7846b48'
                    inbox='ac3ebd50-fc10-4299-9a1c-496841b49a6f'
                    title='Welcome to Yatai👋 👋 👋'
                    subtitle='Ask us questions or give us feedback - we will reply ASAP!😊'
                    primaryColor='#47AFD1'
                    newMessagePlaceholder='Start typing...'
                    showAgentAvailability={false}
                    agentAvailableText='We are online right now!'
                    agentUnavailableText='We are away at the moment.'
                    requireEmailUpfront={false}
                    iconVariant='outlined'
                    baseUrl='https://yatai-community-papercups.herokuapp.com'
                    // Optionally include data about your customer here to identify them
                    // customer={{
                    //   name: __CUSTOMER__.name,
                    //   email: __CUSTOMER__.email,
                    //   external_id: __CUSTOMER__.id,
                    //   metadata: {
                    //     plan: "premium"
                    //   }
                    // }}
                /> */}
            </div>
        </BrowserRouter>
    )
}

export default Routes
