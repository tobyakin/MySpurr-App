/* eslint-disable no-prototype-builtins */
// import { useToast } from "vue-toastification";

// const toast = useToast();

// export const catchAxiosError = (error) => {
//       console.log(error.response?.data?.message)

//   if (error.response?.data?.message) {
//     // Handle the main error message
//     toast.error(error.response.data.message, {
//       timeout: 4000
//     })
//   } else if (error.response?.data?.errors) {
//     // Handle validation errors
//     for (const key in error.response.data.errors) {
//       if (error.response.data.errors.hasOwnProperty(key)) {
//         toast.error(error.response.data.errors[key][0], {
//           timeout: 18000
//         })
//       }
//     }
//   } else {
//     // Handle generic error when no specific message is available
//     toast.error('An error occurred.', {
//       timeout: 4000
//     })
//   }
// }
// export const catchAxiosError = (error) => {

//     console.log(error.response?.data?.message)

//     if (error.response?.data?.message) {
//       toast.error(error.response?.data?.message, {
//         timeout: 4000
//       })
//     }

//     if(error.response?.data?.errors){
//         for (let key in error.response.data.errors) {
//             toast.error(error.response.data.errors[key][0], {
//                 timeout: 18000,
//             });
//         }
//     }

// }

// export const catchAxiosSuccess = (res) => {

//     if(res?.data?.message){
//         toast.success(res.data.message, {
//             timeout: 4000,
//         });
//     }

// }

/* eslint-disable no-prototype-builtins */
import { useToast } from "vue-toastification";

const toast = useToast();
// export const catchAxiosError = (error) => {
//   if (error?.response?.data) {
//     const responseData = error?.response?.data
// // console.log(responseData)
//     // Display the main error message
//     if (responseData.message) {
//       toast.error(responseData.message, {
//         timeout: 4000
//       })
//     }

//     // Display individual error messages
//     if (responseData.errors) {
//       for (const key in responseData.errors) {
//         if (responseData.errors.hasOwnProperty(key)) {
//           responseData.errors[key].forEach((errorMessage) => {
//             toast.error(errorMessage, {
//               timeout: 6000
//             })
//           })
//         }
//       }
//     }
//   }
// }
// export const catchAxiosError = (error) => {
//       console.log(error.response?.data?.message)

//   if (error.response?.data?.message) {
//     // Handle the main error message
//     toast.error(error.response.data.message, {
//       timeout: 4000
//     })
//   } else if (error.response?.data?.errors) {
//     // Handle validation errors
//     for (const key in error.response.data.errors) {
//       if (error.response.data.errors.hasOwnProperty(key)) {
//         toast.error(error.response.data.errors[key][0], {
//           timeout: 18000
//         })
//       }
//     }
//   } else {
//     // Handle generic error when no specific message is available
//     toast.error('An error occurred.', {
//       timeout: 4000
//     })
//   }
// }
// export const catchAxiosError = (error) => {

//     console.log(error.response?.data?.message)

//     if (error.response?.data?.message) {
//       toast.error(error.response?.data?.message, {
//         timeout: 4000
//       })
//     }

//     if(error.response?.data?.errors){
//         for (let key in error.response.data.errors) {
//             toast.error(error.response.data.errors[key][0], {
//                 timeout: 18000,
//             });
//         }
//     }

// }

export const catchAxiosError = (error) => {
  if (error?.response?.data) {
    const responseData = error.response.data;
    const statusCode = error.response.status;

    // Handle specific status codes
    switch (statusCode) {
      // case 400:
      //   toast.error("Bad Request: Please check your input.", { timeout: 4000 });
      //   break;
      // case 401:
      //   toast.error("Unauthorized: Please log in to continue.", { timeout: 4000 });
      //   break;
      // case 403:
      //   toast.error("Forbidden: You don't have permission to perform this action.", { timeout: 4000 });
      //   break;
      // case 404:
      //   toast.error("Not Found: The requested resource was not found.", { timeout: 4000 });
      //   break;
      case 500:
        toast.error("Forbidden: Access Denied.", { timeout: 4000 });
        break;
      default:
        if (responseData.message) {
          toast.error(responseData.message, { timeout: 4000 });
        }
    }

    // Display individual error messages if available
    if (responseData.errors) {
      for (const key in responseData.errors) {
        if (responseData.errors.hasOwnProperty(key)) {
          responseData.errors[key].forEach((errorMessage) => {
            toast.error(errorMessage, { timeout: 6000 });
          });
        }
      }
    }
  } else {
    // Handle network errors or other unknown issues
    toast.error("An unexpected error occurred. Please try again.", { timeout: 4000 });
  }
};


export const catchAxiosSuccess = (res) => {

    if(res?.data?.message){
        toast.success(res.data.message, {
            timeout: 4000,
        });
    }

}