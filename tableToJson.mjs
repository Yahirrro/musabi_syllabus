import fs from 'fs';
import {Tabletojson} from 'tabletojson';

// read a file in directory
await fs.readdir('./data/', (err, files) => {

    files.map(async (file, i) => {
        const txt = await fs.readFileSync('./data/' + file, 'utf8');
        const json = Tabletojson.convert(txt);

        const fileName = `./json/${file.replace('.txt', '')}.json`;
        await fs.writeFileSync(fileName, JSON.stringify(json));

        console.log(i, file);
    })
})