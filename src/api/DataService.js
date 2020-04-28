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


export function events(country, competition){
  return get(HOST+'/events?country='+country+'&competition='+competition);
}

export function todaysEvents(){
  return get(HOST+'/events');
}

//why using market?
export function previousFixtures(competition){
 return get(HOST+'/previous-fixtures?competition='+competition);
}

export function predictions(team){
  return get(HOST+'/predictions?team-id='+team);
}

export function accuracy(key){
  return get(HOST+'/accuracy?key='+encodeURIComponent(key));
}

export function globalRating(team, market){
  return get(HOST+'/global-rating?team='+team+'&market='+market);
}

export function selectedBets(){
  return get(HOST+'/selected-bets');
}
