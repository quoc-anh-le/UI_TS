import {create} from 'zustand'
import { User } from '../types/user'
import { Survey, SurveyInfo } from '../types/survey'


type Authen = {
    user: User,
    isAdmin: boolean,
    isAuthenticated: boolean,
    login: (userData: User) => void
    checkAdmin: (isAdmin: boolean) => void
    logout: () => void
}

type SurveyCard = {
    surveyInfo: SurveyInfo[],
    setSurveyCard: (data: SurveyInfo[]) => void
}

type SurveyIndividual = {
    surveyInvidual: SurveyInfo[],
    setSurveyIndividual: (data: SurveyInfo[]) => void
}

type DoSurvey = {
    survey: Survey,
    setSurvey: (data: any) => void
}

type Action = {
    action: string,
    setAction: (action: string) => void
}

type Color = 'success' | 'error' | 'warning' | 'info';

type Alert = {
    alert: boolean,
    message: string,
    severity: Color,
    setAlert: (isAlert: boolean, message: string, severity: Color) => void
}



export const useAuthStore = create<Authen>((set) => {
    const storedUser = localStorage.getItem('user');
    const storedIsLoggedIn = localStorage.getItem('isloggedIn');
  
    return {
      user: storedUser ? JSON.parse(storedUser) : {},
      isAdmin: false,
      isAuthenticated: storedIsLoggedIn === 'true',
      login: (userData: User) => set({ user: userData, isAuthenticated: true }),
      checkAdmin: (isAdmin: boolean) => set({ isAdmin }),
      logout: () => set({ user: {} as User, isAuthenticated: false }),
    };
  });

export const useSurveyIndividualStore = create<SurveyIndividual>((set) => ({
    surveyInvidual: [] as SurveyInfo[],
    setSurveyIndividual: (data: SurveyInfo[]) => set({ surveyInvidual: data })
}))

export const useSurveyCardStore = create<SurveyCard>((set) => ({
    surveyInfo: [] as SurveyInfo[],
    setSurveyCard: (data: SurveyInfo[]) => set({ surveyInfo: data })
}))

export const useActionStore = create<Action>((set) => ({
    action: "",
    setAction: (action: string) => set({action: action})
}))

export const useDoForm = create<DoSurvey>((set) => ({
    survey: {} as Survey,
    setSurvey: (data: any) => set({survey: data})
}))

export const useAlert = create<Alert>((set) => ({
    alert: false,
    message: "",
    severity: 'success',
    setAlert: (isAlert: boolean, message: string, severity: Color) => set({alert: isAlert, message, severity: severity})
}))