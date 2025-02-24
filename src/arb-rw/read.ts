import fs from 'fs';

interface Annotation {
    type?: string;
    description?: string;
}
interface ArbData {
    [key: string]: Annotation | string;
}
// ARB 파일 경로 설정
const arbFilePath = `${__dirname}/kr.arb`;

export async function arbRead(filePath = arbFilePath) {
    try {
        // 파일 읽기 (동기)
        const data = fs.readFileSync(filePath, 'utf8');

        // JSON 파싱
        return JSON.parse(data) as ArbData;
        // const body: ArbData = {};
        // Object.entries(arbContent).forEach(([key, value]) => {
        //     if (key[0] !== '@') {
        //         body[key] = value;
        //     }
        // });
        // const response = await gptPost(JSON.stringify(body));
        // const msg = response.choices[0].message;
        // const content = msg.content ?? '';
        // const objContent = JSON.parse(content);
        // console.log(body);
        // const engArbData = { ...arbContent, ...objContent };
        // const stringEngArbData = JSON.stringify(engArbData);
        // writeArb(stringEngArbData);
    } catch (error) {
        console.error('파일 읽기 또는 JSON 파싱 오류:', error);
    }
}
