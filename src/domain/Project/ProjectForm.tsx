import { ICreateProjectSchema, IProjectFullSchema } from './schemas/project'
import React, { useCallback, useEffect, useState } from 'react'
import { createForm } from '@/components/Form'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import useTranslation from '@/hooks/useTranslation'
import { Button, SIZE as ButtonSize } from 'baseui/button'
import { isModified } from '@/utils'

const { Form, FormItem } = createForm<ICreateProjectSchema>()

export interface IProjectFormProps {
    project?: IProjectFullSchema
    onSubmit: (data: ICreateProjectSchema) => Promise<void>
}

export default function ProjectForm({ project, onSubmit }: IProjectFormProps) {
    const [values, setValues] = useState<ICreateProjectSchema | undefined>(project)

    useEffect(() => {
        if (!project) {
            return
        }
        setValues({
            name: project.name,
            description: project.description,
            config: project.config,
        })
    }, [project])

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
                <Input disabled={project !== undefined ? true : undefined} />
            </FormItem>
            <FormItem>
                <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }} />
                    <Button isLoading={loading} size={ButtonSize.compact} disabled={!isModified(project, values)}>
                        {t('submit')}
                    </Button>
                </div>
            </FormItem>
        </Form>
    )
}
