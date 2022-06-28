

import 'izitoast/dist/css/iziToast.min.css';


export function displaySuccessToast(message) {
    const iziToast = require('izitoast');
    iziToast.success({
        title: 'Success',
        message: message,
        position:"topCenter",
        backgroundColor:'#c6d537',
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
        backgroundColor:'#eaeae7',
       
    });
}