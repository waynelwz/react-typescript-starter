import { useProject, useProjectLoading } from '@project/hooks/useProject'
import useTranslation from '@/hooks/useTranslation'
import { fetchProject } from '@project/services/project'
import { RiSurveyLine } from 'react-icons/ri'
import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import BaseSidebar, { IComposedSidebarProps, INavItem } from '@/components/BaseSidebar'
import { resourceIconMapping } from '@/consts'
import { FiActivity } from 'react-icons/fi'

export default function ProjectSidebar({ style }: IComposedSidebarProps) {
    const orgInfo = useQuery('fetchOrg', () => fetchProject())
    const { project, setProject } = useProject()
    const { setProjectLoading } = useProjectLoading()
    useEffect(() => {
        setProjectLoading(orgInfo.isLoading)
        if (orgInfo.isSuccess && orgInfo.data.uid !== project?.uid) {
            setProject(orgInfo.data)
        } else if (orgInfo.isLoading) {
            setProject(undefined)
        }
    }, [orgInfo.data, orgInfo.isLoading, orgInfo.isSuccess, project?.uid, setProject, setProjectLoading])

    const [t] = useTranslation()

    const navItems: INavItem[] = useMemo(
        () => [
            {
                title: t('overview'),
                path: '/',
                icon: RiSurveyLine,
            },
            {
                title: t('models'),
                path: '/models',
                // icon: resourceIconMapping.model,
                activePathPattern: /^\/(models|model_repositories)\/?/,
            },
        ],
        [t]
    )
    return <BaseSidebar navItems={navItems} style={style} />
}
