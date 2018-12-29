const HOST = 'http://ec2-34-228-166-229.compute-1.amazonaws.com:8080';
const DATA_API = HOST+'/api/prediction';
const CLIENT_SERVICES_API = HOST+'/api/prediction/client-services';



export function get(url, token) {

console.log(url);

  return fetch(url, {
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'application-token': token
       }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function types(token) {
  return fetch(DATA_API+'/cache/types', token);
}

export function countries(type, token) {
  return get(DATA_API+'/cache/countries?type='+type, token);
}

export function competitions(type, country, token) {
  return get(DATA_API+'/cache/competitions?type='+type+'&country='+country, token);
}

export function teams(type, country, competition, token) {
  return get(DATA_API+'/teams?type='+type+'&country='+country+'&competition='+competition, token);
}

export function team(id, token) {
  return get(CLIENT_SERVICES_API+'/form/team/'+id, token);
}

export function players(team, token) {
  return get(DATA_API+"/players/team/"+team+'?current=true', token);
}

export function player(player, token) {
  return get(CLIENT_SERVICES_API+'/form/player/'+player, token);
}

export function events(type, country, competition, token){
  return get(DATA_API+'/events/upcoming-events?type='+type+'&country='+country+'&competition='+competition, token);
}

export function predictions(type, country, competition, team, token){
  return get(CLIENT_SERVICES_API+'/prediction/prices-with-predictions?type='
                         +type
                         +'&country='
                         +country
                         +'&competition='
                         +competition
                         +'&team-id='+team, token);
}

export function previousMeetings(home, away, token){
  return get(CLIENT_SERVICES_API+'/form/teams/previous-meetings?home='+home+'&away='+away, token);
}

export function accuracy(key, token){
  return get(CLIENT_SERVICES_API+'/performance/accuracy?key='+key, token);
}

export function globalRatings(market, token){
  return get(CLIENT_SERVICES_API+'/performance?market='+market, token);
}

export function selectedBets(type, market, event, token){
  return get(CLIENT_SERVICES_API+'/prediction/selected-bets?type='+type+'&market='+market+'&event='+event, token);
}

export function betHistory(type, token){
  return get(CLIENT_SERVICES_API+'/bet-history/'+type, token);
}
