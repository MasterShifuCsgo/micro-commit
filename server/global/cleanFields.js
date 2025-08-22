import f from "perfect-express-sanitizer";

export default function cleanFields(input){
  const options = {sql: true, xss: true, noSql: false, level: 5};
  return f.sanitize.prepareSanitize(input, options);
}
