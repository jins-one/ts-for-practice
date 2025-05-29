import { gptPost } from './arb-rw/gptPost';
import { arbRead } from './arb-rw/read';
import { writeArb } from './arb-rw/write';

type arbReadReturn<T> = T extends (...args: any) => Promise<infer U>
    ? U
    : never;
async function arbRW() {
    const body: arbReadReturn<typeof arbRead> = {};
    const arbContent = (await arbRead()) ?? {};
    Object.entries(arbContent).forEach(([key, value]) => {
        if (key[0] !== '@') {
            body[key] = value;
        }
    });
    const response = await gptPost(JSON.stringify(body));
    const msg = response.choices[0].message;
    const content = msg.content ?? '';
    const objContent = JSON.parse(content);
    console.log(body);
    const engArbData = { ...arbContent, ...objContent };
    const stringEngArbData = JSON.stringify(engArbData);
    writeArb(stringEngArbData);
}

async function main() {
    console.log(11);
}

main();
