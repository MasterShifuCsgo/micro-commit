import cleanFields from "../../global/cleanFields.js";

export default function isInputDangerous(obj){   
  return JSON.stringify(obj) != JSON.stringify(cleanFields(obj));
} 