import fs from 'fs';

const errorSubjects = ["223100001526","223100005028","223100007355","223100001492","223100001498","223100006705"]

function removeReturn(fileName) {
  const file = fs.readFileSync(fileName, 'utf8');
  const newFile = file.replace(/\r?\n/g,'');
  console.log(newFile);
  fs.writeFileSync(fileName, newFile);
}

for(let subject of errorSubjects) {
  removeReturn(`./data/${subject}.txt`);
  console.log(`./data/${subject}.txt`) 
}