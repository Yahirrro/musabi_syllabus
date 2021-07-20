import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const sessionId = "5kKXchdNAXwET7gPVvGRwPNg";

function matchAll(str, regex) {
  return str.matchAll(regex);
}

function matchStr(str, regex) {
  return str.match(regex);
}

function arrayExists(arr, item) {
  return arr.indexOf(item) > -1;
}

try {
  const data = fs.readFileSync(path.join('./table.txt'));
  const str = data.toString().replace(/\r?\n/g,'');
  const subjects = [];
  const regex = /subjectId=(............)/g;

  const errorSubjects = [];

  const result = matchStr(str, regex);

  for (let i = 0; i < result.length; i++) {
    const subjectId = result[i].substring(10);
    if (!arrayExists(subjects,subjectId)) subjects.push(subjectId);
  }

  console.log(subjects);
  const fileName = `./data/subjects.json`;
  fs.writeFileSync(fileName, JSON.stringify({ subjects : subjects}));

  for(let i = 0; i < subjects.length; i++) {
    const subject = subjects[i];

    try {
      const response = await fetch(`http://syllabus.musabi.ac.jp/ext_syllabus/syllabusReferenceContentsInit.do;jsessionid=${sessionId}.kmap1?subjectId=${subject}&formatCode=1&rowIndex=0&jikanwariSchoolYear=2021&ksSessionFlag=1&keepScrollTop=0`);
      const body = await response.text();
      const bodySimpleStr = body.replace(/\r?\n/g,"");
      const subjectData = matchStr(bodySimpleStr, /<table(?: .+?)?>.*?<\/table>/g);

      if(subjectData[3] === undefined || !!!matchStr(subjectData[3], /科目名/)) throw new Error("No data");

      const fileName = `./data/${subject}.txt`;
      fs.writeFileSync(fileName, subjectData[3]);
    }
    catch(e) {
      console.log(subject);
      errorSubjects.push(subject);
    }
  }

  console.log(errorSubjects);
  const fileName = `./data/errorSubjects.json`;
  fs.writeFileSync(fileName, JSON.stringify({ errors : errorSubjects}));
}
catch(err) {
  console.log(err);
}