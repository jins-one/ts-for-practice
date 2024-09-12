import { getData, setData, transInsertQuery } from '@/getData';

interface before {
    user_id: number;
    test_id: number;
    test_date: Date;
    severity: string;
    description: string;
    score: number;
    max_score: number;
    color: string;
}
interface after {
    id: number;
    user_id: number;
    mind_inspection_id: number;
    created_at: Date;
    severity: string;
    description: string;
    score: number;
    max_score: number;
}
export default async function mind_test_history() {
    const { data } = await getData<before>(
        'select * from drpresso.mind_test_history;',
    );
    data.forEach((item, index) => {
        const que = transInsertQuery<after>({
            data: {
                created_at: item.test_date,
                description: item.description,
                id: index + 1,
                max_score: item.max_score,
                mind_inspection_id: item.test_id,
                score: item.score,
                severity: item.severity,
                user_id: item.user_id,
            },
            databaseName: 'drpresso',
            tableName: 'mind_inspection_history',
        });
        console.log(que);
        setData(que);
    });
}
