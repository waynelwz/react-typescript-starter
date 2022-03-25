import { IListQuerySchema } from '@/schemas/list'
import { useQuery } from 'react-query'
import { listModels } from '../services/model'
import qs from 'qs'

export function useFetchModels(query: IListQuerySchema) {
    const modelsInfo = useQuery(`fetchModels:${qs.stringify(query)}`, () => listModels(query))
    return modelsInfo
}
