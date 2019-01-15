export function predictedGoals(result){

 const filtered = result.filter(score => score.score > 0.0);

 var weightedGoals = 0.0;
 for(var i=0; i < filtered.length; i++){
   weightedGoals += (filtered[i].key * (filtered[i].score / 100));
 }

 return weightedGoals;
}
