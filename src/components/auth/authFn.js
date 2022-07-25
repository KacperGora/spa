
const authFn = async (url, enteredMail, enteredPassword) => {
  // try {
    const response = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredMail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      
   const data = await response.json()
  //  if(!response.ok){
  //   if (data.error.message === 'EMAIL_NOT_FOUND'){
  //     throw Error('Nie znaleziono takiego adresu email.')
  //   } 
  //  }

   return { data, response}
//   } catch (error) {
//     return error
//  }
  }


export default authFn;
