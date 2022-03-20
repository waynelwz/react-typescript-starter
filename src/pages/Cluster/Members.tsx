import React from 'react'
import { useParams } from 'react-router-dom'
import ClusterMemberListCard from '@/components/Cluster/ClusterMemberListCard'

export default function ClusterMembers() {
    const { clusterName } = useParams<{ clusterName: string }>()

    return <ClusterMemberListCard clusterName={clusterName} />
}
