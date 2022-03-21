import React from 'react'
import { Button, KIND } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { StatefulMenu } from 'baseui/menu'
import { AiFillCaretDown } from 'react-icons/ai'
import { createUseStyles } from 'react-jss'
import useTranslation from '@/hooks/useTranslation'

const ITEMS = [{ label: 'Item One' }, { label: 'Item Two' }]
const USER_ITEMS = [{ label: 'Item One' }, { label: 'Item Two' }]

export default function HeaderLeftMenu() {
    const [t] = useTranslation()

    return (
        <div>
            <StatefulPopover
                focusLock
                placement={PLACEMENT.bottomLeft}
                content={({ close }) => (
                    <StatefulMenu
                        items={ITEMS}
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
                    {t('Project')}
                </Button>
            </StatefulPopover>
            <StatefulPopover
                placement={PLACEMENT.bottomLeft}
                content={({ close }) => (
                    <StatefulMenu
                        items={USER_ITEMS}
                        onItemSelect={() => close()}
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
                    {t('User')}
                </Button>
            </StatefulPopover>
        </div>
    )
}
