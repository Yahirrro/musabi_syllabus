import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const sessionId = "GXVowEIK8rR2PZa5PApZx-d0";

const errorSubjects = JSON.parse(fs.readFileSync('./errorSubjects.json', 'utf8')).errorSubjects;

console.log(errorSubjects);

function matchStr(str, regex) {
  return str.match(regex);
}

for(let i = 0; i < errorSubjects.length; i++){
  const subject = errorSubjects[i];

  try {
    const response = await fetch(`http://syllabus.musabi.ac.jp/ext_syllabus/syllabusReferenceContentsInit.do;jsessionid=${sessionId}.kmap1?subjectId=${subject}&formatCode=1&rowIndex=0&jikanwariSchoolYear=2021&ksSessionFlag=1&keepScrollTop=0`,
      {
        headers: {
          'Cookie': `JSESSIONID=${sessionId}.kmap2`,
        },
      }
    );
    const body = await response.text();

    const bodySimpleStr = body.replace(/\r?\n/g,"");
    const subjectData = matchStr(bodySimpleStr, /<table(?: .+?)?>.*?<\/table>/g);

    if(subjectData[3] === undefined || !!!matchStr(subjectData[3], /科目名/)) {
      console.log(`http://syllabus.musabi.ac.jp/ext_syllabus/syllabusReferenceContentsInit.do;jsessionid=${sessionId}.kmap1?subjectId=${subject}&formatCode=1&rowIndex=0&jikanwariSchoolYear=2021&ksSessionFlag=1&keepScrollTop=0`);
      throw new Error("No data");
    }

    const fileName = `./data/${subject}.txt`;
    fs.writeFileSync(fileName, subjectData[3]);
  }
  catch(e) {
    console.log(e);
  }

  console.log(subject + '  :  ' + i + '/' +errorSubjects.length);
}