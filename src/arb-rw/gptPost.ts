import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.GPT_API,
});
// const openai = new OpenAI({
//     organization:process.env.CHAT_GPT_ORGANIZATION_ID,
//     project: process.env.,
// });
export async function gptPost(user: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: [
                    {
                        type: 'text',
                        text: 'You are an expert in app development and translation. I will give you json data.\nThe data type I give you:\n{\n    "mind_report_item_month": "{month}월",\n    "mind_report_item_diary_count": "{diaryCount}일 기록",\n}\n\nTranslate the values into English and organize them. The data I give you are the words used in the buttons of an app released in Korea. For example, if it\'s `home\', translate it to `home\'. \n\nThe file will be read by flutter and the text assigned to the value will be used as the text of the button, so it contains bracketed characters like “{diaryCount} days logged”. Please translate the rest of the text except the bracketed part.\n\nI don\'t need your explanation, just the result in json.\nI\'ll use the `JSON.parse` function in `javascript` to convert it to an object.\nReturn it as the result of `JSON.stringify` so I can convert it right away.',
                    },
                ],
            },
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: user,
                    },
                ],
            },
            {
                role: 'assistant',
                content: [
                    {
                        type: 'text',
                        text: '{\n    "mind_report_item_month": "{month} month",\n    "mind_report_item_diary_count": "{diaryCount} days logged"\n}',
                    },
                ],
            },
        ],
        temperature: 1,
        max_tokens: 16383,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
            type: 'json_object',
        },
    });

    return response;
}
