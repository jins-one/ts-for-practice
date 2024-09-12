import { getData, setData, transInsertQuery } from '@/getData';

interface before {
    user_id: number;
    topic_id: number;
    user_answer: string;
    created_at: Date;
}

interface after {
    id: number;
    user_id: number;
    topic_id: number;
    user_answer: string;
    created_at: Date;
}
export default async function discovery_history() {
    const { data } = await getData<before>(
        'select * from drpresso.discovery_history;',
    );

    data.forEach((item, index) => {
        const que = transInsertQuery<after>({
            data: {
                id: index + 1,
                ...item,
            },
            databaseName: 'drpresso',
            tableName: 'discovery_history',
        });
        console.log(que);
        setData(que);
    });
}
