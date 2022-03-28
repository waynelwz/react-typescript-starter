import { listDatasetVersions } from '../services/datasetVersion'
import { Select, SelectProps } from 'baseui/select'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export interface IDatasetVersionSelectorProps {
    projectId: string
    value?: string
    onChange?: (newValue: string) => void
    overrides?: SelectProps['overrides']
    disabled?: boolean
}

export interface IDatasetVersionSelectorWithDatasetIdProps extends IDatasetVersionSelectorProps {
    datasetId: string
}
export interface IDatasetVersionSelectorWithoutDatasetIdProps extends IDatasetVersionSelectorProps {
    datasetId?: string
}

export default function DatasetVersionSelector({
    projectId,
    datasetId,
    value,
    onChange,
    overrides,
    disabled,
}: IDatasetVersionSelectorWithDatasetIdProps | IDatasetVersionSelectorWithoutDatasetIdProps) {
    const [keyword, setKeyword] = useState<string>()
    const [options, setOptions] = useState<{ id: string; label: React.ReactNode }[]>([])
    const datasetVersionsInfo = useQuery(
        `listDatasetVersions:${keyword}`,
        // todo the right way of datasetId ?? ''
        () => listDatasetVersions(projectId, datasetId ?? '', { start: 0, count: 100, search: keyword }),
        { enabled: !!datasetId }
    )

    const handleDatasetVersionInputChange = _.debounce((term: string) => {
        if (!term) {
            setOptions([])
            return
        }
        setKeyword(term)
    })

    useEffect(() => {
        if (datasetVersionsInfo.isSuccess) {
            setOptions(
                datasetVersionsInfo.data?.list.map((item) => ({
                    id: item.name,
                    label: item.name,
                })) ?? []
            )
        } else {
            setOptions([])
        }
    }, [datasetVersionsInfo.data?.list, datasetVersionsInfo.isSuccess])

    return (
        <Select
            disabled={disabled}
            overrides={overrides}
            isLoading={datasetVersionsInfo.isFetching}
            options={options}
            onChange={(params) => {
                if (!params.option) {
                    return
                }
                onChange?.(params.option.id as string)
            }}
            onInputChange={(e) => {
                const target = e.target as HTMLInputElement
                handleDatasetVersionInputChange(target.value)
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
