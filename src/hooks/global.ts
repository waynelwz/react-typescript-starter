import { createGlobalState } from 'react-hooks-global-state'
import { IUserSchema } from '@user/schemas/user'
import { IProjectFullSchema } from '@project/schemas/project'
// import { IModelFullSchema } from '@model/schemas/model'

export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'

const initialState = {
    themeType: 'light' as ThemeType,
    currentUser: undefined as IUserSchema | undefined,
    user: undefined as IUserSchema | undefined,
    userLoading: false,
    project: undefined as IProjectFullSchema | undefined,
    projectLoading: false,
    // model: undefined as IModelFullSchema | undefined,
    // modelLoading: false,
}

const { useGlobalState } = createGlobalState(initialState)
export default useGlobalState
