import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from '@/components/Header'
import ProjectLayout from '@/pages/Project/ProjectLayout'
import { useCurrentThemeType } from '@/hooks/useCurrentThemeType'
import { IThemedStyleProps } from '@/interfaces/IThemedStyle'
import { useStyletron } from 'baseui'
import { createUseStyles } from 'react-jss'
import Login from '@/pages/Home/Login'
import Home from '@/pages/Home/Home'
import ProjectOverview from './pages/Project/Overview'
import ProjectListCard from './pages/Project/ProjectListCard'
import BaseLayout from './pages/BaseLayout'
import ModelListCard from './pages/Model/ModelListCard'
import ModelLayout from './pages/Model/ModelLayout'
import ModelOverview from './pages/Model/Overview'
import ProjectModels from './pages/Project/Models'
import ProjectDatasets from './pages/Project/Datasets'
import ModelVersionListCard from './pages/Model/ModelVersionListCard'
import ModelVersionLayout from './pages/Model/ModelVersionLayout'
import DatasetVersionListCard from './pages/Dataset/DatasetVersionListCard'
import DatasetVersionLayout from './pages/Dataset/DatasetVersionLayout'
import DatasetLayout from './pages/Dataset/DatasetLayout'
import DatasetOverview from './pages/Dataset/Overview'

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
                    <Route exact path='/projects/:projectId/:path?'>
                        <ProjectLayout>
                            <Switch>
                                <Route exact path='/projects/:projectId' component={ProjectOverview} />
                                <Route exact path='/projects/:projectId/models' component={ProjectModels} />
                                <Route exact path='/projects/:projectId/datasets' component={ProjectDatasets} />
                            </Switch>
                        </ProjectLayout>
                    </Route>
                    <Route exact path='/projects/:projectId/datasets/:datasetId/versions'>
                        <DatasetVersionLayout>
                            <Switch>
                                <Route
                                    exact
                                    path='/projects/:projectId/datasets/:datasetId/versions'
                                    component={DatasetVersionListCard}
                                />
                            </Switch>
                        </DatasetVersionLayout>
                    </Route>
                    <Route exact path='/projects/:projectId/datasets/:datasetId/:path?/:path?'>
                        <DatasetLayout>
                            <Switch>
                                <Route
                                    exact
                                    path='/projects/:projectId/datasets/:datasetId'
                                    component={DatasetOverview}
                                />
                            </Switch>
                        </DatasetLayout>
                    </Route>
                    <Route exact path='/projects/:projectId/models/:modelId/versions'>
                        <ModelVersionLayout>
                            <Switch>
                                <Route
                                    exact
                                    path='/projects/:projectId/models/:modelId/versions'
                                    component={ModelVersionListCard}
                                />
                            </Switch>
                        </ModelVersionLayout>
                    </Route>
                    <Route exact path='/projects/:projectId/models/:modelId/:path?/:path?'>
                        <ModelLayout>
                            <Switch>
                                <Route exact path='/projects/:projectId/models/:modelId' component={ModelOverview} />
                            </Switch>
                        </ModelLayout>
                    </Route>
                    <Route exact path='/login' component={Login} />
                    <Route>
                        <BaseLayout sidebar={undefined}>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/projects' component={ProjectListCard} />
                            </Switch>
                        </BaseLayout>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Routes
