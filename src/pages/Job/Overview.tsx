import React, { useCallback, useState } from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import Table from '@/components/Table'
import useTranslation from '@/hooks/useTranslation'
import { useJob, useJobLoading } from '@job/hooks/useJob'
import Card from '@/components/Card'

export default function JobOverview() {
    const { job } = useJob()
    const { jobLoading } = useJobLoading()

    const [t] = useTranslation()

    const jobName = job?.name ?? ''

    return (
        <Card title={`${t('sth name', [t('Job')])}: ${jobName}`}>
            <Table
                isLoading={jobLoading}
                columns={[t('File'), t('Size')]}
                data={
                    // job?.files?.map((file: IJobFileSchema) => [file?.name, file?.size]) ??
                    []
                }
            />
        </Card>
    )
}
