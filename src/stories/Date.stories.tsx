import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Modal, ModalBody } from 'baseui/modal'

import ApiTokenForm from '../components/ApiTokenForm'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/ApiTokenForm',
    component: ApiTokenForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof Modal> = (args) => (
    <Modal isOpen>
        <ModalBody>
            <ApiTokenForm {...args} />
        </ModalBody>
    </Modal>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
