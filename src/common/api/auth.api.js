import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";


export const signUpAPI = (data) => {

    return new Promise((resolve, reject) => {
        try {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    onAuthStateChanged(auth, (user) => {

                        sendEmailVerification(user)

                        resolve({ payload: "Email verification is sent."});

                    })
                })
                .then((afterEmail) => {
                    onAuthStateChanged(auth, (user) => {
                        if (user.emailVerified) {
                            resolve({ payload: "Signup Successfully"})
                        } else {
                            reject({ payload: "Please verify email id first."})
                        }
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log("hii", errorCode);
                    if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                        reject({ payload: "Email id already registerd"})
                    } else {
                        reject({ payload: "Something went wrong"})
                    }
                })
        } catch (error) {
            reject({ payload: error.message})
        }
    })
}
