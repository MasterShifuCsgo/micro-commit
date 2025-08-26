

//returns a formatted version of today year-month-date
export default function getToday(){
  const d = new Date();
  return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
}