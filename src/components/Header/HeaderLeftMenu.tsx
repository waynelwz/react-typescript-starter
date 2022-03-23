import React, { useCallback, useState } from 'react'
import { Button } from 'baseui/button'
import { toaster } from 'baseui/toast'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { StatefulMenu } from 'baseui/menu'
import { AiFillCaretDown } from 'react-icons/ai'
import { createUseStyles } from 'react-jss'
import useTranslation from '@/hooks/useTranslation'
import { Modal, ModalBody, ModalHeader } from 'baseui/modal'
import ProjectFrom, { IProjectFormProps } from '@/domain/Project/ProjectForm'
import { createProject } from '@/domain/Project/services/project'
import { ICreateProjectSchema } from '@/domain/Project/schemas/project'

const ITEMS = [{ label: 'Item One' }, { label: 'Item Two' }]
const USER_ITEMS = [{ label: 'Item One' }, { label: 'Item Two' }]

export default function HeaderLeftMenu() {
    const [t] = useTranslation()
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
    const handleCreateProject = useCallback(async (data: ICreateProjectSchema) => {
        await createProject(data)
        setIsCreateProjectModalOpen(false)
        toaster.positive(t('password changed'), { autoHideDuration: 2000 })
    }, [])

    return (
        <div>
            <StatefulPopover
                focusLock
                placement={PLACEMENT.bottomLeft}
                content={({ close }) => (
                    <StatefulMenu
                        items={ITEMS}
                        onItemSelect={({ item }) => {
                            setIsCreateProjectModalOpen(true)
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
            <Modal
                isOpen={isCreateProjectModalOpen}
                onClose={() => setIsCreateProjectModalOpen(false)}
                closeable
                animate
                autoFocus
                unstable_ModalBackdropScroll
            >
                <ModalHeader>{t('Project')}</ModalHeader>
                <ModalBody>
                    <ProjectFrom onSubmit={handleCreateProject} />
                </ModalBody>
            </Modal>
        </div>
    )
}
