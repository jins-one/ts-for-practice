import { getData, transInsertQuery } from '@/getData';

interface before {
    user_id: number;
    payload: string;
    is_read: number;
    created_at: Date;
    notification_id: number;
}
interface Payload {
    category: string;
    title: string;
    body: string;
    click_action: {
        type: string;
        diary_id: number | null;
    };
}
interface after extends Omit<Payload, 'click_action'> {
    receiver_id: number;
    payload: number | null;
    is_read: number;
    created_at: Date;
    id: number;
    status: 'SENT';
    notification_type: 'NORMAL';
    click_action: string;
}
export default async function user_notification() {
    const { data } = await getData<before>(
        'select * from drpresso.user_notification',
    );
    data.forEach(async (item, index) => {
        const pay: { data: Payload } = await JSON.parse(item.payload);
        const que = transInsertQuery<after>({
            data: {
                id: index + 1,
                created_at: item.created_at,
                is_read: item.is_read,
                notification_type: 'NORMAL',
                receiver_id: item.user_id,
                status: 'SENT',
                body: pay.data.body,
                category: pay.data.category,
                click_action: pay.data.click_action.type,
                payload: pay.data.click_action?.diary_id ?? null,
                title: pay.data.title,
            },
            databaseName: 'drpresso',
            tableName: 'push_notification_log',
        });
        console.log(que);
    });
}
