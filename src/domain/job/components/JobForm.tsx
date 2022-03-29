import { ICreateJobFormSchema, ICreateJobSchema, IJobFormSchema, IJobSchema } from '../schemas/job'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { createForm } from '@/components/Form'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import useTranslation from '@/hooks/useTranslation'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import { isModified } from '@/utils'
import { RadioGroup, Radio, ALIGN } from 'baseui/radio'
import { Select, TYPE, Value } from 'baseui/select'
import ModelSelector from '@/domain/model/components/ModelSelector'
import { Label1, Label2 } from 'baseui/typography'
import Divider from '@/components/Divider'
import { useParams } from 'react-router'
import ModelVersionSelector from '@/domain/model/components/ModelVersionSelector'
import MultiTags from '@/components/Tag/MultiTags'
import DatasetSelector from '@/domain/dataset/components/DatasetSelector'
import DatasetVersionSelector from '@/domain/dataset/components/DatasetVersionSelector'

const { Form, FormItem } = createForm<ICreateJobFormSchema>()

export interface IJobFormProps {
    job?: IJobFormSchema
    onSubmit: (data: ICreateJobFormSchema) => Promise<void>
}

export default function JobForm({ job, onSubmit }: IJobFormProps) {
    const [values, setValues] = useState<ICreateJobFormSchema | undefined>(undefined)
    const [datasetVersionIds, setDatasetVersionIds] = useState<string[]>([])
    const { projectId } = useParams<{ projectId: string }>()
    const [modelId, setModelId] = useState('')
    const [datasetId, setDatasetId] = useState('')

    useEffect(() => {
        if (!job) {
            return
        }
        // todo job edit
        // setDatasetVersionIds(job.datasetVersionIds)
        // setValues({
        // })
    }, [job])

    const [loading, setLoading] = useState(false)

    const handleValuesChange = useCallback((_changes, values_) => {
        setValues(values_)
        values_.modelId && setModelId(values_.modelId)
        values_.datasetId && setDatasetId(values_.datasetId)
        console.log(values_)
    }, [])

    const handleFinish = useCallback(
        async (values_) => {
            setLoading(true)
            try {
                await onSubmit({
                    datasetVersionIds: datasetVersionIds.join(','),
                    ...values_,
                })
            } finally {
                setLoading(false)
            }
        },
        [onSubmit]
    )

    const handleAddDataset = useCallback(() => {
        if (!values?.datasetVersionId) return
        const ids = new Set(datasetVersionIds)
        ids.add(values.datasetVersionId)
        setDatasetVersionIds([...Array.from(ids)])
    }, [values, datasetVersionIds])

    const handleResetDataset = useCallback((value) => {
        setDatasetVersionIds([...value])
    }, [])

    const datasetVersionItem = useMemo(() => {}, [datasetVersionIds])

    const [t] = useTranslation()

    return (
        <Form initialValues={values} onFinish={handleFinish} onValuesChange={handleValuesChange}>
            <Divider orientation='left'>
                <Label1>{t('Model Information')}</Label1>
            </Divider>
            <div style={{ display: 'flex', alignItems: 'left', gap: 20 }}>
                <FormItem label={t('sth name', [t('Model')])} name='modelId' required>
                    <ModelSelector
                        projectId={projectId}
                        overrides={{
                            Root: {
                                style: {
                                    width: '144px',
                                },
                            },
                        }}
                    ></ModelSelector>
                </FormItem>
                {modelId && (
                    <FormItem label={t('Version')} required name='modelVersionId'>
                        <ModelVersionSelector
                            projectId={projectId}
                            modelId={modelId}
                            overrides={{
                                Root: {
                                    style: {
                                        width: '144px',
                                    },
                                },
                            }}
                        ></ModelVersionSelector>
                    </FormItem>
                )}
            </div>
            <Divider orientation='left'>
                <Label1>{t('Datasets')}</Label1>
            </Divider>
            <div style={{ display: 'flex', alignItems: 'left', gap: 20, flexWrap: 'wrap' }}>
                <FormItem label={t('sth name', [t('Dataset')])} name='datasetId'>
                    <DatasetSelector
                        projectId={projectId}
                        overrides={{
                            Root: {
                                style: {
                                    width: '200px',
                                },
                            },
                        }}
                    ></DatasetSelector>
                </FormItem>
                {datasetId && (
                    <FormItem label={t('Version')} name='datasetVersionId'>
                        <DatasetVersionSelector
                            projectId={projectId}
                            datasetId={datasetId}
                            overrides={{
                                Root: {
                                    style: {
                                        width: '200px',
                                    },
                                },
                            }}
                        ></DatasetVersionSelector>
                    </FormItem>
                )}
                <div style={{ marginTop: 30 }}>
                    <Button type='button' onClick={handleAddDataset}>
                        Add
                    </Button>
                </div>
            </div>
            <div style={{ width: '420px' }}>
                <MultiTags
                    value={datasetVersionIds}
                    placeholder={'selected tags'}
                    getValueLabel={(params) => {
                        // todo with dataset name
                        const id = params.option?.id
                        return id + ''
                    }}
                    onChange={handleResetDataset}
                />
            </div>
            <Divider orientation='left'>
                <Label1>{t('Environment')}</Label1>
            </Divider>
            <FormItem>
                <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }} />
                    <Button
                        isLoading={loading}
                        // size={ButtonSize.compact}
                        disabled={!isModified(job, values)}
                    >
                        {t('submit')}
                    </Button>
                </div>
            </FormItem>
        </Form>
    )
}
