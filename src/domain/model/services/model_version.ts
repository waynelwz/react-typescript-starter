import axios from 'axios'
import { ICreateModelSchema, IModelSchema, IUpdateModelSchema } from '../schemas/model'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listModels(query: IListQuerySchema): Promise<IListSchema<IModelSchema>> {
    const resp = await axios.get<IListSchema<IModelSchema>>('/model', { params: query })
    return resp.data
}

export async function fetchModel(modelId: string): Promise<any> {
    const resp = await axios.get<IModelSchema>(`/model/${modelId}`)
    return resp.data
}

export async function createModel(data: ICreateModelSchema): Promise<IModelSchema> {
    const resp = await axios.post<IModelSchema>('/model', data)
    return resp.data
}

export async function updateModel(data: IUpdateModelSchema): Promise<IModelSchema> {
    const resp = await axios.patch<IModelSchema>('/api/v1/current_org', data)
    return resp.data
}
