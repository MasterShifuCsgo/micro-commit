import cleanFields from "../../global/cleanFields.js";

//true when dangerous obviously 
export default function isInputDangerous(obj){   
  return JSON.stringify(obj) != JSON.stringify(cleanFields(obj));
} 