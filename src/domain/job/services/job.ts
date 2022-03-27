import axios from 'axios'
import { ICreateJobSchema, IJobSchema, IUpdateJobSchema, IJobDetailSchema } from '../schemas/job'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listJobs(projectId: string, query: IListQuerySchema): Promise<IListSchema<IJobSchema>> {
    const resp = await axios.get<IListSchema<IJobSchema>>(`/project/${projectId}/job`, {
        params: query,
    })
    return resp.data
}

export async function fetchJob(projectId: string, jobId: string): Promise<any> {
    const resp = await axios.get<IJobDetailSchema>(`/project/${projectId}/job/${jobId}`)
    return resp.data
}

export async function createJob(projectId: string, data: ICreateJobSchema): Promise<IJobSchema> {
    const resp = await axios.post<IJobSchema>(`/project/${projectId}/job`)
    return resp.data
}
