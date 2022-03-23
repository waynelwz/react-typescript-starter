import axios from 'axios'
import {
    ICreateProjectSchema,
    IProjectFullSchema,
    IProjectSchema,
    IUpdateProjectSchema,
} from '../schemas/project'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listProjects(query: IListQuerySchema): Promise<IListSchema<IProjectSchema>> {
    const resp = await axios.get<IListSchema<IProjectSchema>>('/api/v1/orgs', { params: query })
    return resp.data
}

export async function fetchProject(): Promise<any> {
    return Promise.resolve({})
    // const resp = await axios.get<IProjectFullSchema>('/api/v1/current_org')
    // return resp.data
}

export async function listProjectModelModules(): Promise<string[]> {
    const resp = await axios.get<string[]>('/api/v1/current_org/model_modules')
    return resp.data
}

export async function listProjectEvents(query: IListQuerySchema): Promise<IListSchema<IEventSchema>> {
    const resp = await axios.get<IListSchema<IEventSchema>>('/api/v1/current_org/events', { params: query })
    return resp.data
}

export async function listProjectEventOperationNames(resourceType: ResourceType): Promise<string[]> {
    const resp = await axios.get<string[]>('/api/v1/current_org/event_operation_names', {
        params: {
            resource_type: resourceType,
        },
    })
    return resp.data
}

export async function createProject(data: ICreateProjectSchema): Promise<IProjectFullSchema> {
    const resp = await axios.post<IProjectFullSchema>('/project', data)
    return resp.data
}

export async function updateProject(data: IUpdateProjectSchema): Promise<IProjectFullSchema> {
    const resp = await axios.patch<IProjectFullSchema>('/api/v1/current_org', data)
    return resp.data
}
