import { createGlobalState } from 'react-hooks-global-state'
import { IUserSchema } from '@user/schemas/user'
import { IProjectSchema } from '@project/schemas/project'
import { IModelDetailSchema } from '@model/schemas/model'
import { IModelVersionDetailSchema } from '@model/schemas/modelVersion'
import { IDatasetDetailSchema } from '@/domain/dataset/schemas/dataset'
import { IDatasetVersionDetailSchema } from '@/domain/dataset/schemas/datasetVersion'

export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'

const initialState = {
    themeType: 'light' as ThemeType,
    currentUser: undefined as IUserSchema | undefined,
    user: undefined as IUserSchema | undefined,
    userLoading: false,
    project: undefined as IProjectSchema | undefined,
    projectLoading: false,
    model: undefined as IModelDetailSchema | undefined,
    modelLoading: false,
    modelVersion: undefined as IModelVersionDetailSchema | undefined,
    modelVersionLoading: false,
    dataset: undefined as IDatasetDetailSchema | undefined,
    datasetLoading: false,
    datasetVersion: undefined as IDatasetVersionDetailSchema | undefined,
    datasetVersionLoading: false,
}

const { useGlobalState } = createGlobalState(initialState)
export default useGlobalState
