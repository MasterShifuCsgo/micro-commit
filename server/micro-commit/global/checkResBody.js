


export default function checkResBody(body, fields){
  if(body == undefined) return false;
  return fields.every((field)=>{return field in body});
}