import React from 'react'
import { useParams } from 'react-router-dom'
import DeploymentListCard from '@/components/Deployment/DeploymentListCard'

export default function ClusterDeployments() {
    const { clusterName } = useParams<{ clusterName: string }>()

    return <DeploymentListCard clusterName={clusterName} />
}
