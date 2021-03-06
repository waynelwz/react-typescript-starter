import Card from '@/components/Card'
import { createForm } from '@/components/Form'
import LoginLayout from '@/components/LoginLayout'
import { useCurrentThemeType } from '@/hooks/useCurrentThemeType'
import useTranslation from '@/hooks/useTranslation'
import { ILoginUserSchema } from '@/schemas/user'
import { loginUser } from '@/services/user'
import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import qs from 'qs'
import React, { useCallback, useState } from 'react'
import logo from '@/assets/logo.svg'
import logoDark from '@/assets/logo-dark.svg'
import { useHistory, useLocation } from 'react-router-dom'
import { useStyletron } from 'baseui'
import Text from '@/components/Text'
import { createUseStyles } from 'react-jss'
import { IThemedStyleProps } from '@/interfaces/IThemedStyle'
import ZButton from '@/components/ZButton'

const { Form, FormItem } = createForm<ILoginUserSchema>()

export default function Login() {
    const [t] = useTranslation()
    const location = useLocation()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    // todo
    const [, theme] = useStyletron()
    // const currentThemeType = useCurrentThemeType()

    const handleFinish = useCallback(
        async (data: ILoginUserSchema) => {
            setIsLoading(true)
            try {
                await loginUser(data)
                const search = qs.parse(location.search, { ignoreQueryPrefix: true })
                let { redirect } = search
                if (redirect && typeof redirect === 'string') {
                    redirect = decodeURI(redirect)
                } else {
                    redirect = '/'
                }
                history.push(redirect)
            } finally {
                setIsLoading(false)
            }
        },
        [history, location.search]
    )

    return (
        <LoginLayout
            style={{
                // TODO
                background: '#efeFEF',
                color: theme.colors.contentPrimary,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Card
                        bodyStyle={{
                            padding: 24,
                            width: 480,
                            borderRadius: 12,
                            boxShadow: 'none',
                        }}
                    >
                        <Form onFinish={handleFinish}>
                            <div
                                style={{
                                    color: theme.colors.contentPrimary,
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    lineHeight: '24px',
                                    marginBottom: '36px',
                                }}
                            >
                                {t('LOGIN')}
                            </div>
                            <FormItem name='name_or_email' label={t('Username')}>
                                <Input />
                            </FormItem>
                            <FormItem name='password' label={t('password')}>
                                <Input type='password' />
                            </FormItem>
                            <FormItem>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flexGrow: 1 }} />
                                    <ZButton isLoading={isLoading} size='compact'>
                                        {t('login')}
                                    </ZButton>
                                </div>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </div>
        </LoginLayout>
    )
}
