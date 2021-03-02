
const action={
    logInUser:(data)=>{
        return {
            type:"REQUEST_LOGIN",
            payload:data
        }
    },
    LogedInUser:(data)=>{
        return {
            type:"SET_LOGED_IN_USER_DATA",
            payload:data

        }
    },
    loggedOut:()=>{
        return {
            type:'LOGGED_OUT'
        }
    }

}
export default action