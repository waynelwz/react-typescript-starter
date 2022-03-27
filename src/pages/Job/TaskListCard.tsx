import React, { useCallback, useState } from 'react'
import Card from '@/components/Card'
import { usePage } from '@/hooks/usePage'
import { ICreateTaskSchema } from '@job/schemas/task'
import { formatDateTime } from '@/utils/datetime'
import useTranslation from '@/hooks/useTranslation'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import User from '@/components/User'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'
import Table from '@/components/Table'
import { Link, useParams } from 'react-router-dom'
import { useFetchTasks } from '@job/hooks/useFetchTasks'
import { resourceIconMapping } from '@/consts'
import { useJob } from '@job/hooks/useJob'

export default function TaskListCard() {
    const [page] = usePage()
    const { jobId, projectId } = useParams<{ jobId: string; projectId: string }>()
    const { job } = useJob()

    const jobsInfo = useFetchTasks(projectId, jobId, page)
    const [t] = useTranslation()

    return (
        <Card>
            <Table
                isLoading={jobsInfo.isLoading}
                // t('sth name', [t('Job Version')]),
                columns={[t('Tag'), t('Created'), t('Owner'), t('Action')]}
                data={
                    // jobsInfo.data?.list.map((job) => {
                    //     return [
                    //         // job.Version,
                    //         job.tag,
                    //         job.createTime && formatDateTime(job.createTime),
                    //         job.owner && <User user={job.owner} />,
                    //         <Button size='mini' key={job.id} onClick={() => {}}>
                    //             {t('Revert')}
                    //         </Button>,
                    //     ]
                    // }) ??
                    []
                }
                paginationProps={{
                    start: jobsInfo.data?.pageNum,
                    count: jobsInfo.data?.size,
                    total: jobsInfo.data?.total,
                    afterPageChange: () => {
                        jobsInfo.refetch()
                    },
                }}
            />
        </Card>
    )
}
