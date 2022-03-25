import { useModel, useModelLoading } from '@model/hooks/useModel'
import useTranslation from '@/hooks/useTranslation'
import { RiSurveyLine } from 'react-icons/ri'
import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { INavItem } from '@/components/BaseSidebar'
import { fetchModel } from '@model/services/model'
import { resourceIconMapping } from '@/consts'
import { AiOutlineSetting } from 'react-icons/ai'
import BaseSubLayout from '@/pages/BaseSubLayout'
import { useProject } from '@/domain/project/hooks/useProject'

export interface IModelLayoutProps {
    children: React.ReactNode
}

export default function ModelLayout({ children }: IModelLayoutProps) {
    const { modelId } = useParams<{ modelId: string }>()
    const modelInfo = useQuery(`fetchModel:${modelId}`, () => fetchModel(modelId))
    const { model, setModel } = useModel()
    const { project } = useProject()
    const { setModelLoading } = useModelLoading()
    useEffect(() => {
        setModelLoading(modelInfo.isLoading)
        if (modelInfo.isSuccess) {
            if (modelInfo.data.id !== model?.id) {
                setModel(modelInfo.data)
            }
        } else if (modelInfo.isLoading) {
            setModel(undefined)
        }
    }, [model?.id, modelInfo.data, modelInfo.isLoading, modelInfo.isSuccess, setModel, setModelLoading])

    const [t] = useTranslation()
    const modelName = model?.name ?? '-'
    const projectName = project?.name ?? '-'

    const breadcrumbItems: INavItem[] = useMemo(
        () => [
            {
                title: t('projects'),
                path: '/projects',
            },
            {
                title: project?.name ?? '-',
                path: `/projects/${project?.id}`,
            },
            {
                title: t('models'),
                path: `/projects/${project?.id}/models`,
            },
            {
                title: modelName,
                path: `/projects/${project?.id}/models/${modelName}`,
            },
        ],
        [projectName, modelName, t]
    )

    // const navItems: INavItem[] = useMemo(
    //     () => [
    //         // {
    //         //     title: modelName ?? t('overview'),
    //         //     path: `/models/${modelId}`,
    //         //     icon: RiSurveyLine,
    //         // },
    //     ],
    //     [modelName, t]
    // )
    return <BaseSubLayout breadcrumbItems={breadcrumbItems}>{children}</BaseSubLayout>
}
