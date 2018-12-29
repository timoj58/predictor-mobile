const AUTH_API = 'http://ec2-34-228-166-229.compute-1.amazonaws.com:8080/api/prediction/authenticate';


export function isUsernameOnFile(username) {
  return fetch(AUTH_API+'/onfile?username='+username)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.onfile);
      return responseJson.onfile;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function authenticate(username, password) {
  return fetch(AUTH_API,
  {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     username: username,
     password: password,
   })
 }) .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson.applicationToken;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function create(username, password) {
  return fetch(AUTH_API+'/create',
  {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     username: username,
     encryptedPassword: password,
     activeAccount: true,
     permissions: ["USERS"]
   })
 }) .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson.applicationToken;
    })
    .catch((error) => {
      console.error(error);
    });
}
