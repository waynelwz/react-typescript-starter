import { IResourceSchema } from '@/schemas/resource'
import { Select, SelectProps } from 'baseui/select'
import React from 'react'

export interface IResourceLabelsProps {
    resource: IResourceSchema
}

export default function MultiTags(args: SelectProps) {
    const [value, setValue] = React.useState([
        { label: 'AntiqueWhite', id: '#FAEBD7' },
        { label: 'Aquamarine', id: '#7FFFD4' },
        { label: 'AliceBlue', id: '#F0F8FF' },
        { label: 'Aqua', id: '#00FFFF' },
        { label: 'Azure', id: '#F0FFFA' },
        { label: 'Beige', id: '#F5F5DB' },
        { label: 'Beige', id: '#F5F5DC' },
        { label: 'Beige', id: '#F5F5DD' },
        { label: 'Beige', id: '#F5F5DE' },
        { label: 'Beige', id: '#F5F5DC' },
    ])
    return (
        <Select
            clearable={false}
            closeOnSelect={false}
            options={
                [
                    // { label: 'AliceBlue', id: '#F0F8FF' },
                ]
            }
            openOnClick={false}
            overrides={{
                SelectArrow: {
                    props: {
                        overrides: {
                            Svg: {
                                style: {
                                    display: 'none',
                                },
                            },
                        },
                    },
                },
                Dropdown: {
                    style: ({ $theme }) => ({
                        display: 'none',
                    }),
                },
            }}
            value={value}
            multi
            placeholder='Select color'
            onChange={({ value }) => setValue(value)}
            {...args}
        />
    )
}
