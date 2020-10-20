export default function sliceEn(word) {
  let rep = new RegExp(word.spelling, 'i');
  
  for(let exp of word.examples) {
    let strArr = exp.en.split(rep);
    
    exp.en1 = strArr[0];
    exp.en2 = word.spelling;
    exp.en3 = strArr[1];  
  }
  
  return word;   
}