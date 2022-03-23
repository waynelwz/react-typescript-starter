import React from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import Table from '@/components/Table'
import useTranslation from '@/hooks/useTranslation'
import { useProject, useProjectLoading } from '@project/hooks/useProject'
import Card from '@/components/Card'
import { formatDateTime } from '@/utils/datetime'
import User from '@/components/User'

export default function ProjectOverview() {
    const { project } = useProject()
    const { projectLoading } = useProjectLoading()

    const [t] = useTranslation()

    return (
        <Card title={t('overview')} titleIcon={RiSurveyLine}>
            <Table
                isLoading={projectLoading}
                columns={[t('name'), t('description'), t('creator'), t('created_at')]}
                data={[
                    [
                        project?.name,
                        // project?.description,
                        // project?.creator && <User user={project?.creator} />,
                        // project && formatDateTime(project.created_at),
                    ],
                ]}
            />
        </Card>
    )
}
