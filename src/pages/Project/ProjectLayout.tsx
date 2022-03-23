import React from 'react'
import BaseLayout from '../BaseLayout'
import ProjectSidebar from './ProjectSidebar'

export interface IProjectLayoutProps {
    children: React.ReactNode
}

export default function ProjectLayout({ children }: IProjectLayoutProps) {
    return <BaseLayout sidebar={undefined}>{children}</BaseLayout>
}
