import { useSnackbar } from 'notistack';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetAlert } from '../../redux/actions/alert.action';



function Alert(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    const alert = useSelector(state => state.alert);

    setTimeout(() => { dispatch(resetAlert()) }, 3000)

    useEffect(() => {
        if (alert.text !== '') {
            enqueueSnackbar(alert.text,
                {
                    variant: alert.color,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                }
            )
        }
    }, [alert.text])

    return (
        <div>

        </div>
    );
}

export default Alert;

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useSnackbar } from 'notistack';
// import { resetAlert } from '../../redux/actions/alert.action';

// const Alert = (props) => {
//     const { enqueueSnackbar } = useSnackbar();

//     const dispatch = useDispatch()

//     setTimeout(() => {dispatch(resetAlert())}, 3000)

//     const alertS = useSelector(state => state.alert)

//     useEffect(
//         () => {
//             if (alertS.text !== '') {
//                 enqueueSnackbar(
//                     alertS.text,
//                     {
//                         variant: alertS.color,
//                         anchorOrigin: {
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }
//                     }
//                 )
//             }
//         },
//     [alertS.text])

//     return (
//         <>
//         </>
//     )
// }

// export default Alert