import React from 'react'
import { Button, KIND } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { StatefulMenu } from 'baseui/menu'
import { AiFillCaretDown } from 'react-icons/ai'
import { createUseStyles } from 'react-jss'
import useTranslation from '@/hooks/useTranslation'

export default function HeaderLeftMenu() {
    const [t] = useTranslation()

    const PROJECT_ITEMS = [
        { label: t('Create Project'), type: 'create' },
        { label: t('Project List'), type: 'list' },
    ]
    const USER_ITEMS = [
        { label: t('Create User'), type: 'create' },
        { label: t('User List'), type: 'list' },
    ]

    return (
        <div>
            <StatefulPopover
                focusLock
                placement={PLACEMENT.bottomLeft}
                content={({ close }) => (
                    <StatefulMenu
                        items={PROJECT_ITEMS}
                        onItemSelect={({ item }) => {
                            console.log(item)
                            close()
                        }}
                        overrides={{
                            List: { style: { height: '150px', width: '138px' } },
                        }}
                    />
                )}
            >
                <Button
                    overrides={{
                        BaseButton: {
                            style: ({ $theme }) => ({
                                'backgroundColor': 'transparent',
                                ':hover': {
                                    backgroundColor: 'transparent',
                                },
                            }),
                        },
                    }}
                    endEnhancer={() => <AiFillCaretDown size={24} />}
                >
                    {t('PROJECT')}
                </Button>
            </StatefulPopover>
            <StatefulPopover
                placement={PLACEMENT.bottomLeft}
                content={({ close }) => (
                    <StatefulMenu
                        items={USER_ITEMS}
                        onItemSelect={() => close()}
                        overrides={{
                            List: { style: { height: '100px', width: '125px' } },
                        }}
                    />
                )}
            >
                <Button
                    overrides={{
                        BaseButton: {
                            style: ({ $theme }) => ({
                                'backgroundColor': 'transparent',
                                ':hover': {
                                    backgroundColor: 'transparent',
                                },
                            }),
                        },
                    }}
                    endEnhancer={() => <AiFillCaretDown size={24} />}
                >
                    {t('USER')}
                </Button>
            </StatefulPopover>
        </div>
    )
}
