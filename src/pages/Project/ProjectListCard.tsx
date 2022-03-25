import React, { useCallback, useState } from 'react'
import Card from '@/components/Card'
import { createProject } from '@project/services/project'
import { usePage } from '@/hooks/usePage'
import { ICreateProjectSchema } from '@project/schemas/project'
import ProjectForm from '@project/components/ProjectForm'
import { formatDateTime } from '@/utils/datetime'
import useTranslation from '@/hooks/useTranslation'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import User from '@/components/User'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'
import Table from '@/components/Table'
import { Link } from 'react-router-dom'
import { useFetchProjects } from '@project/hooks/useFetchProjects'
import { resourceIconMapping } from '@/consts'

export default function ProjectListCard() {
    const [page] = usePage()
    const projectsInfo = useFetchProjects(page)
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
    const handleCreateProject = useCallback(
        async (data: ICreateProjectSchema) => {
            await createProject(data)
            await projectsInfo.refetch()
            setIsCreateProjectOpen(false)
        },
        [projectsInfo]
    )
    const [t] = useTranslation()

    return (
        <Card
            title={t('projects')}
            titleIcon={undefined}
            extra={
                <Button size={ButtonSize.compact} onClick={() => setIsCreateProjectOpen(true)}>
                    {t('create')}
                </Button>
            }
        >
            <Table
                isLoading={projectsInfo.isLoading}
                columns={[t('Project Name'), t('Owner'), t('Created')]}
                data={
                    projectsInfo.data?.list.map((project) => {
                        return [
                            <Link key={project.id} to={`/projects/${project.id}`}>
                                {project.name}
                            </Link>,
                            project.owner && <User user={project.owner} />,
                            project.createTime && formatDateTime(project.createTime),
                        ]
                    }) ?? []
                }
                paginationProps={{
                    start: projectsInfo.data?.pageNum,
                    count: projectsInfo.data?.size,
                    total: projectsInfo.data?.total,
                    afterPageChange: () => {
                        projectsInfo.refetch()
                    },
                }}
            />
            <Modal
                isOpen={isCreateProjectOpen}
                onClose={() => setIsCreateProjectOpen(false)}
                closeable
                animate
                autoFocus
                unstable_ModalBackdropScroll
            >
                <ModalHeader>{t('create sth', [t('Project')])}</ModalHeader>
                <ModalBody>
                    <ProjectForm onSubmit={handleCreateProject} />
                </ModalBody>
            </Modal>
        </Card>
    )
}