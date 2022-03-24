import axios from 'axios'
import { ICreateProjectSchema, IProjectSchema, IUpdateProjectSchema } from '../schemas/project'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listProjects(query: IListQuerySchema): Promise<IListSchema<IProjectSchema>> {
    const resp = await axios.get<IListSchema<IProjectSchema>>('/project', { params: query })
    return resp.data
}

export async function fetchProject(projectId: string): Promise<any> {
    const resp = await axios.get<IProjectSchema>(`/project/${projectId}`)
    return resp.data
}

export async function createProject(data: ICreateProjectSchema): Promise<IProjectSchema> {
    const resp = await axios.post<IProjectSchema>('/project', data)
    return resp.data
}

export async function updateProject(data: IUpdateProjectSchema): Promise<IProjectSchema> {
    const resp = await axios.patch<IProjectSchema>('/api/v1/current_org', data)
    return resp.data
}
