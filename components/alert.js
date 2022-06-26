

/*import { Flip, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const displayErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: Flip,
        autoClose:2000
    })
}

const displayInfoToast = (message) => {
    toast.info(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: Flip,
        autoClose:false
    })
}

const displaySuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: Flip,
        autoClose:2000
    })
}

export { displayErrorToast, displayInfoToast, displaySuccessToast };






/*import * as React from 'react'*/

import 'izitoast/dist/css/iziToast.min.css';


export function displaySuccessToast(message) {
    const iziToast = require('izitoast');
    iziToast.success({
        title: 'Success',
        message: message,
        position:"topCenter",
        backgroundColor:'#eaeae7',
    });
}

export function displayErrorToast(message) {
    const iziToast = require('izitoast');
    iziToast.error({
        title: 'Error',
        message: message,
        position:"topCenter",
        backgroundColor:'#A3AEB1',
    });
}

export function displayInfoToast(message) {
    const iziToast = require('izitoast');
    iziToast.info({
        title: 'Info',
        message: message,
        position:"topCenter",
        backgroundColor:'#c6d537',
       
    });
}