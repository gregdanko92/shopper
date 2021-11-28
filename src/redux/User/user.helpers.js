import { auth } from './../../firebase/utility'

export const handleResetPasswordAPI = (email) => {
    const config = {
                url:'http://localhost:3000/login'  //change for live version
            }
    return new Promise((resolve, reject)=>{

        auth.sendPasswordResetEmail(email, config)
                .then(()=>{
                    resolve()
                })
                .catch(()=>{
                    const err = ['Email not found please try again']
                    reject(err)

                })
    })
}