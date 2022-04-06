import React from 'react'
import { IUserSchema } from '@user/schemas/user'
import { Avatar } from 'baseui/avatar'
import Text from './Text'

export interface IUserProps {
    user: IUserSchema
    size?: 'scale700' | 'scale800' | 'scale1000' | 'scale1200' | 'scale1400' | '64px' | '32px' | '16px' | '14px'
    style?: React.CSSProperties
}

export default function User({ user, size = 'scale800', style }: IUserProps) {
    const name = user.name

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                ...style,
            }}
        >
            {/* <Avatar size={size} name={name} src={} /> */}
            <Text>{name}</Text>
        </div>
    )
}