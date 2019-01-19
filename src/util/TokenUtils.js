const minutes = 1;
const timeout = 60000 * minutes;

export function expires(start) {

   var now = new Date().getTime();

   console.log(start);
   console.log(now);
   console.log(timeout);

   if(now - start > timeout){
     console.log('expired');
      return true;
  }

  return false;
}
