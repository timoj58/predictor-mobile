//not for now but add some security at some point.....but using cognito / iam i think.
const HOST = 'https://kx3ncoorp1.execute-api.us-east-1.amazonaws.com/mobile';

export function get(url) {

console.log(url);

  return fetch(url, {
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
  })
    .then((response) => {
      if(response.status === 401 || response.status === 403){
        throw new Error('token');
      }


      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    });
}


export function countriesAndCompetitions() {
  return get(HOST+'/competitions');
}


export function events(competition){
  return get(HOST+'/events?competition='+competition);
}

//why using market?
export function previousFixtures(competition){
 return get(HOST+'/previous-fixtures?competition='+competition);
}

export function predictions(competition, home, away, type){
  return get(HOST+'/predictions?competition='+competition+'&home='+home+'&away='+away+'&type='+type);
}

export function accuracy(key){
  return get(HOST+'/accuracy?key='+encodeURIComponent(key));
}

export function globalRating(competition, team, type){
  return get(HOST+'/global-rating?team='+team+'&type='+type+'&competition='+competition);
}

export function selectedBets(){
  return get(HOST+'/selected-bets');
}
