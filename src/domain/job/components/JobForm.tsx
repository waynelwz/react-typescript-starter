import { ICreateJobFormSchema, ICreateJobSchema, IJobFormSchema, IJobSchema } from '../schemas/job'
import React, { useCallback, useEffect, useState } from 'react'
import { createForm } from '@/components/Form'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import useTranslation from '@/hooks/useTranslation'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import { isModified } from '@/utils'
import { RadioGroup, Radio, ALIGN } from 'baseui/radio'
import { FileUploader } from 'baseui/file-uploader'
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
    const [datasetVersionIds, setDatasetVersionIds] = useState<Value>([])
    const { projectId } = useParams<{ projectId: string }>()
    const [modelId, setModelId] = useState('')
    const [datasetId, setDatasetId] = useState('')
    const [datasetIds, setDatasetIds] = useState([])

    useEffect(() => {
        if (!job) {
            return
        }
        // setValues({
        //     ...job,
        // })
    }, [job])

    const [loading, setLoading] = useState(false)

    const handleValuesChange = useCallback((_changes, values_) => {
        setValues(values_)
        values_.modelId && setModelId(values_.modelId)
        values_.datasetId && setDatasetId(values_.datasetId)
    }, [])

    const handleFinish = useCallback(
        async (values_) => {
            setLoading(true)
            try {
                await onSubmit(values_)
            } finally {
                setLoading(false)
            }
        },
        [onSubmit]
    )

    const handleAddDataset = useCallback(() => {}, [])

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
            <div style={{ display: 'flex', alignItems: 'left', gap: 20 }}>
                <FormItem label={t('sth name', [t('Dataset')])} name='datasetId' required>
                    <DatasetSelector
                        projectId={projectId}
                        overrides={{
                            Root: {
                                style: {
                                    width: '144px',
                                },
                            },
                        }}
                    ></DatasetSelector>
                </FormItem>
                {datasetId && (
                    <FormItem label={t('Version')} required name='datasetVersionId'>
                        <DatasetVersionSelector
                            projectId={projectId}
                            datasetId={datasetId}
                            overrides={{
                                Root: {
                                    style: {
                                        width: '144px',
                                    },
                                },
                            }}
                        ></DatasetVersionSelector>
                    </FormItem>
                )}
                <Button size='mini' onClick={handleAddDataset}>
                    Add
                </Button>
            </div>
            <MultiTags></MultiTags>
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
