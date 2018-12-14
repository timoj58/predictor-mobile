const DATA_API = 'http://ec2-18-212-97-135.compute-1.amazonaws.com:8080/api/prediction';
const CLIENT_SERVICES_API = 'http://ec2-18-212-97-135.compute-1.amazonaws.com:8080/api/prediction/client-services';



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

export function teamForm(id, token) {
  return get(CLIENT_SERVICES_API+'/form/team/'+id, token);
}

export function players(team, token) {
  return get(DATA_API+"/players/team/"+team+'?current=true', token);
}

export function player(player, token) {
  return get(CLIENT_SERVICES_API+"/form/player/"+player, token);
}
