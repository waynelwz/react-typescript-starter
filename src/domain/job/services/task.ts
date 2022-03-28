import axios from 'axios'
import { ICreateTaskSchema, ITaskSchema, IUpdateTaskSchema, ITaskDetailSchema } from '../schemas/task'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listTasks(
    projectId: string,
    jobId: string,
    query: IListQuerySchema
): Promise<IListSchema<ITaskSchema>> {
    const resp = await axios.get<IListSchema<ITaskSchema>>(`/api/v1/project/${projectId}/job/${jobId}/version`, {
        params: query,
    })
    return resp.data
}

export async function fetchTask(projectId: string, jobId: string, taskId: string): Promise<any> {
    const resp = await axios.get<ITaskDetailSchema>(`/api/v1/project/${projectId}/job/${jobId}/version/${taskId}`)
    return resp.data
}

export async function updateTask(
    projectId: string,
    jobId: string,
    taskId: string,
    data: IUpdateTaskSchema
): Promise<ITaskSchema> {
    const resp = await axios.patch<ITaskSchema>(`/api/v1/project/${projectId}/job/${jobId}/version/${taskId}`, data)
    return resp.data
}

export async function revertTask(projectId: string, jobId: string, taskId: string): Promise<ITaskSchema> {
    const resp = await axios.patch<ITaskSchema>(`/api/v1/project/${projectId}/job/${jobId}/version/${taskId}/revert`)
    return resp.data
}
