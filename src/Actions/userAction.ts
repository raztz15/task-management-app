interface User {
    id: string
    name: string
    email: string
}

type loginUser = {
    loggedIn: boolean
    user: User
}

export const loginUser = () => {

}