const HOST = 'http://ec2-3-85-248-39.compute-1.amazonaws.com';
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
    .then((response) => {
      if(response.status === 401 || response.status === 403){
        throw new Error('token');
      }
      return response.json();
    }
    )
    .then((responseJson) => {
      return responseJson;
    });
}


export function countries(type, token) {
  return get(DATA_API+'/cache/countries', token);
}

export function countriesAndCompetitions(type, token) {
  return get(DATA_API+'/cache/countries-and-competitions', token);
}

export function competitions(type, country, token) {
  return get(DATA_API+'/cache/competitions?country='+country, token);
}

export function allTeams(type, token) {
  return get(DATA_API+'/teams', token);
}


export function teams(type, country, competition, token) {
  return get(DATA_API+'/teams?country='+country+'&competition='+competition, token);
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

export function event(home, away, token){
  return get(DATA_API+'/events/upcoming-event?home='+home+'&away='+away, token);
}


export function events(type, country, competition, token){
  return get(DATA_API+'/events/upcoming-events?country='+country+'&competition='+competition, token);
}

export function todaysEvents(type, token){
  return get(DATA_API+'/events/upcoming-events', token);
}

export function previousFixtures(competition, market, token){
  if(market === undefined){
   return get(CLIENT_SERVICES_API+'/prediction/previous-fixtures/'+competition, token);
 }
 return get(CLIENT_SERVICES_API+'/prediction/previous-fixtures/'+competition+'?market='+market, token);
}

export function predictions(type, country, competition, team, token){
  return get(CLIENT_SERVICES_API+'/prediction/prices-with-predictions?country='
                         +country
                         +'&competition='
                         +competition
                         +'&team-id='+team, token);
}

export function previousMeetings(home, away, token){
  return get(CLIENT_SERVICES_API+'/form/teams/previous-meetings?home='+home+'&away='+away, token);
}

export function accuracy(key, token){
  return get(CLIENT_SERVICES_API+'/performance/accuracy?key='+encodeURIComponent(key), token);
}

export function globalRatings(market, token){
  return get(CLIENT_SERVICES_API+'/performance?market='+market, token);
}

export function globalRating(team, market, token){
  return get(CLIENT_SERVICES_API+'/performance/'+team+'?market='+market, token);
}

export function competitionRatings(token){
  return get(CLIENT_SERVICES_API+'/performance/competitions', token);

}

export function selectedBets(type, token){
  return get(CLIENT_SERVICES_API+'/prediction/selected-bets', token);
}

export function selectedBetsAgainst(type, token){
  return get(CLIENT_SERVICES_API+'/prediction/selected-bets-against-machine', token);
}

export function betHistory(type, token){
  return get(CLIENT_SERVICES_API+'/bet-history', token);
}

export function machineLoadingStatus(token){
  return get(DATA_API+'/automation/status', token);
}
