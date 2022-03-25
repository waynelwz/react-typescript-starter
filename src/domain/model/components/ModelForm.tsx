import { ICreateModelSchema, IModelSchema } from '../schemas/model'
import React, { useCallback, useEffect, useState } from 'react'
import { createForm } from '@/components/Form'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import useTranslation from '@/hooks/useTranslation'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import { isModified } from '@/utils'

const { Form, FormItem } = createForm<ICreateModelSchema>()

export interface IModelFormProps {
    model?: IModelSchema
    onSubmit: (data: ICreateModelSchema) => Promise<void>
}

export default function ModelForm({ model, onSubmit }: IModelFormProps) {
    const [values, setValues] = useState<ICreateModelSchema | undefined>(model)

    useEffect(() => {
        if (!model) {
            return
        }
        setValues({
            name: model.name,
            // description: model.description,
            // config: model.config,
        })
    }, [model])

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

    return (
        <Form initialValues={values} onFinish={handleFinish} onValuesChange={handleValuesChange}>
            <FormItem name='name' label={t('name')}>
                <Input disabled={model !== undefined ? true : undefined} />
            </FormItem>
            <FormItem>
                <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }} />
                    <Button
                        isLoading={loading}
                        // size={ButtonSize.compact}
                        disabled={!isModified(model, values)}
                    >
                        {t('submit')}
                    </Button>
                </div>
            </FormItem>
        </Form>
    )
}
