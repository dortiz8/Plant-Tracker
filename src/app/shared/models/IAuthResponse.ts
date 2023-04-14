export interface AuthResponseBody{
    isAuthSuccessful: boolean, 
    errorMessage: string, 
    token: string, 
    refreshToken: string,
    userId: string 
}