import axios from 'axios';

//const API_KEY = 'AIzaSyB9-dbpDTjm2xMBaDsn7TM5djaQDlGAhzM';
const API_KEY = 'AIzaSyC7TS36d2PCz_1ABQz-X0fgrVs7Jr6_DT4';

const UWUNM_API_KEY = 'AIzaSyB9-dbpDTjm2xMBaDsn7TM5djaQDlGAhzM';

async function authenticate(mode, email, password){
  console.log("Auth Console ", API_KEY);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
      }).catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
    
      });

      const resp = response.data;
      return resp;
      
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);  
}


export function login(email, password) {
    return authenticate('signInWithPassword', email, password);      
  }
