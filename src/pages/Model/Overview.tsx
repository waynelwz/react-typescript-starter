import React, { useCallback, useState } from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import Table from '@/components/Table'
import useTranslation from '@/hooks/useTranslation'
import { useModel, useModelLoading } from '@model/hooks/useModel'
import Card from '@/components/Card'
import { formatDateTime } from '@/utils/datetime'
import User from '@/components/User'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import { ICreateModelSchema } from '@model/schemas/model'
import { createModel } from '@model/services/model'
import { Modal, ModalBody, ModalHeader } from 'baseui/modal'
import ModelForm from '@model/components/ModelForm'
import { useFetchModels } from '@model/hooks/useFetchModels'
import { usePage } from '@/hooks/usePage'

export default function ModelOverview() {
    const { model } = useModel()
    const { modelLoading } = useModelLoading()

    const [t] = useTranslation()

    return (
        <Card title={t('overview')} titleIcon={undefined}>
            <Table
                isLoading={modelLoading}
                columns={[t('sth name', [t('Model')]), t('Created'), t('Owner')]}
                data={[
                    [
                        model?.name,
                        model?.owner && <User user={model?.owner} />,
                        model?.createTime && formatDateTime(model.createTime),
                    ],
                ]}
            />
        </Card>
    )
}
