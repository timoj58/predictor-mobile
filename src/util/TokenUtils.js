const minutes = 25;
const timeout = 60000 * minutes;

export function expires(start) {

   var now = new Date().getTime();
   if(now - start > timeout){
      return true;
  }

  return false;
}
