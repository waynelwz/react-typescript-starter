import { listModelVersions } from '../services/modelVersion'
import { Select, SelectProps } from 'baseui/select'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export interface IModelVersionSelectorProps {
    projectId: string
    value?: string
    onChange?: (newValue: string) => void
    overrides?: SelectProps['overrides']
    disabled?: boolean
}

export interface IModelVersionSelectorWithModelIdProps extends IModelVersionSelectorProps {
    modelId: string
}
export interface IModelVersionSelectorWithoutModelIdProps extends IModelVersionSelectorProps {
    modelId?: string
}

export default function ModelVersionSelector({
    projectId,
    modelId,
    value,
    onChange,
    overrides,
    disabled,
}: IModelVersionSelectorWithModelIdProps | IModelVersionSelectorWithoutModelIdProps) {
    const [keyword, setKeyword] = useState<string>()
    const [options, setOptions] = useState<{ id: string; label: React.ReactNode }[]>([])
    const modelVersionsInfo = useQuery(
        `listModelVersions:${keyword}`,
        // todo the right way of modelId ?? ''
        () => listModelVersions(projectId, modelId ?? '', { start: 0, count: 100, search: keyword }),
        { enabled: !!modelId }
    )

    const handleModelVersionInputChange = _.debounce((term: string) => {
        if (!term) {
            setOptions([])
            return
        }
        setKeyword(term)
    })

    useEffect(() => {
        if (modelVersionsInfo.isSuccess) {
            setOptions(
                modelVersionsInfo.data?.list.map((item) => ({
                    id: item.name,
                    label: item.name,
                })) ?? []
            )
        } else {
            setOptions([])
        }
    }, [modelVersionsInfo.data?.list, modelVersionsInfo.isSuccess])

    return (
        <Select
            disabled={disabled}
            overrides={overrides}
            isLoading={modelVersionsInfo.isFetching}
            options={options}
            onChange={(params) => {
                if (!params.option) {
                    return
                }
                onChange?.(params.option.id as string)
            }}
            onInputChange={(e) => {
                const target = e.target as HTMLInputElement
                handleModelVersionInputChange(target.value)
            }}
            value={
                value
                    ? [
                          {
                              id: value,
                          },
                      ]
                    : []
            }
        />
    )
}
