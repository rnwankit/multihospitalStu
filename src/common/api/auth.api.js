import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";


export const signUp = (email, password) => {
    console.log(email, password);
    return new Promise((resolve, reject) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            sendEmailVerification(user)

                            resolve("Email verification is sent.");
                        }
                    })
                    .then((afterEmail) => {
                        onAuthStateChanged(auth, (user) => {
                            if (user.emailVerified) {
                                resolve("Signup Successfully")
                            } else {
                                reject("Please verify email id first.")
                            }
                        })
                    })
                .catch((error) => {
                        const errorCode = error.code;
                        console.log("hii");
                        if (errorCode.localeCompare("auth/email-already-exists") === 0) {
                            reject("Email id already registerd")
                        } else {
                            reject("Something went wrong")
                        }

                    })
                })
        } catch (error) {
            reject(error.message)
        }
    })
}
