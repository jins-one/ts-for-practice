import fs from 'fs';

export function writeArb(data: string, fileName = 'eng.arb') {
    const path = `${__dirname}/${fileName}`;
    fs.writeFileSync(path, data, 'utf8');
}
