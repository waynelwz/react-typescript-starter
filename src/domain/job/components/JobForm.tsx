import { ICreateJobSchema, IJobSchema } from '../schemas/job'
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

const { Form, FormItem } = createForm<ICreateJobSchema>()

export interface IJobFormProps {
    job?: IJobSchema
    onSubmit: (data: ICreateJobSchema) => Promise<void>
}

export default function JobForm({ job, onSubmit }: IJobFormProps) {
    const [values, setValues] = useState<ICreateJobSchema | undefined>(undefined)
    const [importBy, setImportBy] = useState('upload')
    const [datasetVersionIds, setDatasetVersionIds] = useState<Value>([])

    useEffect(() => {
        if (!job) {
            return
        }
        // setValues({
        //     model: job.,
        //     // description: job.description,
        //     // config: job.config,
        // })
    }, [job])

    const [loading, setLoading] = useState(false)

    const handleValuesChange = useCallback((_changes, values_) => {
        setValues(values_)
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

    const [t] = useTranslation()
    console.log(importBy)

    return (
        <Form initialValues={values} onFinish={handleFinish} onValuesChange={handleValuesChange}>
            <div></div>
            <FormItem>
                <Select
                    options={[
                        { id: 'AliceBlue', color: '#F0F8FF' },
                        { id: 'AntiqueWhite', color: '#FAEBD7' },
                        { id: 'Aqua', color: '#00FFFF' },
                        { id: 'Aquamarine', color: '#7FFFD4' },
                        { id: 'Azure', color: '#F0FFFF' },
                        { id: 'Beige', color: '#F5F5DC' },
                    ]}
                    labelKey='id'
                    valueKey='color'
                    placeholder='Choose a color'
                    maxDropdownHeight='300px'
                    type={TYPE.search}
                    multi
                    onChange={({ value }) => setDatasetVersionIds(value)}
                    value={datasetVersionIds}
                />
            </FormItem>
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
