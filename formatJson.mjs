import fs from 'fs';
import path from 'path';

await fs.readdir('./2021/json/', (err, files) => {
    console.log(files)
    files.map(async (file) => {
        try {
            const subjectId = file.replace('.json', '')


            const jsonObject = JSON.parse(fs.readFileSync(`./2021/json/${subjectId}.json`, 'utf8'))[0];

            const data = []
            jsonObject.map(item => {
                data.push([...Object.values(item)])
            })

            const subjectContent = []
            data.map(item => {
                subjectContent.push(...item)
            })

            const subject = {}
            for(let i = 0; i < subjectContent.length; i++) {
                if(i % 2 === 0) {
                    // console.log(i, subjectContent[i], subjectContent[i + 1])
                    subject[subjectContent[i]] = subjectContent[i + 1]
                    console.log(i)
                }
            }

            // const formattedContent = {
            //     "id": subjectId,
            //     '科目名' : jsonObject[0]["1"],
            //     '講義名' : jsonObject[0]["3"],
            //     'サブタイトル' : jsonObject[1]["1"],
            //     '受講可能学科' : jsonObject[2]["1"],
            //     '担当研究室' : jsonObject[3]["1"],
            //     '担当教員' : jsonObject[4]["1"],
            //     '分野' : jsonObject[5]["1"],
            //     '対象学年' : jsonObject[5]["3"],
            //     '科目群' : jsonObject[6]["1"],
            //     'キャンパス' : jsonObject[6]["3"],
            //     '開講期間' : jsonObject[7]["1"],
            //     '曜日・時限' : jsonObject[7]["3"],
            //     '授業形態' : jsonObject[8]["1"],
            //     '単位数' : jsonObject[8]["3"],
            //     '履修条件' : jsonObject[9]["1"],
            //     '授業概要・カリキュラム上の位置づけ' : jsonObject[10]["1"],
            //     '授業方法' : jsonObject[11]["1"],
            //     '到達目標' : jsonObject[12]["1"],
            //     'ディプロマポリシーとの関連' : jsonObject[13]["1"],
            //     '授業計画・課題に対するフィードバック' : jsonObject[14]["1"],
            //     '履修上の留意点' : jsonObject[15]["1"],
            //     '成績評価の方法' : jsonObject[16]["1"],
            // }

            await fs.writeFileSync(`./2021/fjson/${subjectId}.json`, JSON.stringify(subject));
        } catch (e) {
            console.log(e);
        }
    })
})