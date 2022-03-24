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
    const [t] = useTranslation()
    const { project, setProject } = useProject()

    const navItems: INavItem[] = useMemo(
        () => [
            {
                title: project?.name ?? t('overview'),
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
        [project, t]
    )
    return <BaseSidebar navItems={navItems} style={style} />
}
