import React from 'react'
import { IUserSchema } from '@user/schemas/user'
import Text from '@/components/Text'

export interface IUserProps {
    user: IUserSchema
    size?: 'scale700' | '32px' | '16px' | '14px'
    style?: React.CSSProperties
}

export default function User({ user, size = 'scale700', style }: IUserProps) {
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
            <Text>{name}</Text>
        </div>
    )
}
