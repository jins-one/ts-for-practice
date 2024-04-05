import { getData, transInsertQuery } from '@/getData';

interface UserMove {
    id: number;
    uid: string;
    nickname: string;
    gender: string;
    email: string;
    created_at: Date;
    allow_remind: number;
    remind_at: string;
    birth: Date;
    account_type: number;
    deleted_at: Date;
    fcm_token: string;
}
interface NUserMove {
    id: number;
    uid: string;
    nickname: string;
    gender: string;
    email: string;
    created_at: Date;
    allow_remind: number;
    remind_at: string;
    birth: Date;
    account_type: number;
    deleted_at: Date;
    fcm_token: string;
}
export default async function userMove() {
    const { data } = await getData<UserMove>(
        'SELECT * from drpresso.user LIMIT 5;',
    );

    data.forEach((item) => {
        const que = transInsertQuery<NUserMove>({
            data: item,
            databaseName: 'drpresso',
            tableName: 'user',
        });
        console.log(que);
    });
}
