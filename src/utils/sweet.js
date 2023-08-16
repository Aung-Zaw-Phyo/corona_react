import Swal from "sweetalert2";


export const success = (message) => {
    Swal.fire({
        title: 'Success',
        html: message,
        icon: 'success',
        confirmButtonText: 'Continue',
    })
}

export const fail = (message) => {
    Swal.fire({
        title: 'Fail',
        html: message,
        icon: 'warning',
        confirmButtonText: 'Continue',
    })
}