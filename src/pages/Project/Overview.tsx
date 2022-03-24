import React, { useCallback, useState } from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import Table from '@/components/Table'
import useTranslation from '@/hooks/useTranslation'
import { useProject, useProjectLoading } from '@project/hooks/useProject'
import Card from '@/components/Card'
import { formatDateTime } from '@/utils/datetime'
import User from '@/components/User'
import { Button } from 'baseui/button'
import { ICreateProjectSchema } from '@project/schemas/project'
import { createProject } from '@project/services/project'
import { Modal, ModalBody, ModalHeader } from 'baseui/modal'
import ProjectForm from '@project/components/ProjectForm'
import { useFetchProjects } from '@project/hooks/useFetchProjects'
import { usePage } from '@/hooks/usePage'

export default function ProjectOverview() {
    const { project } = useProject()
    const { projectLoading } = useProjectLoading()
    const [page] = usePage()
    console.log(project)
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
    const handleCreateProject = useCallback(async (data: ICreateProjectSchema) => {
        await createProject(data)
        setIsCreateProjectModalOpen(false)
    }, [])

    const [t] = useTranslation()

    return (
        <Card title={t('overview')} titleIcon={RiSurveyLine}>
            <Button size='mini' onClick={() => setIsCreateProjectModalOpen(true)}>
                {t('create sth', [t('Project')])}
            </Button>
            <Table
                isLoading={projectLoading}
                columns={[t('Project Name'), t('Created'), t('Owner')]}
                data={[
                    [
                        project?.name,
                        project?.owner && <User user={project?.owner} />,
                        project?.createTime && formatDateTime(project.createTime),
                    ],
                ]}
            />
            <Modal
                isOpen={isCreateProjectModalOpen}
                onClose={() => setIsCreateProjectModalOpen(false)}
                closeable
                animate
                autoFocus
                unstable_ModalBackdropScroll
            >
                <ModalHeader>{t('Project')}</ModalHeader>
                <ModalBody>
                    <ProjectForm onSubmit={handleCreateProject} />
                </ModalBody>
            </Modal>
        </Card>
    )
}
