import { getData, transInsertQuery } from '../getData/index';

// old db
interface Diaries {
    id: number;
    user_id: number;
    last_modified: Date;
    log_date: Date;
    user_content: string;
    metadata: string;
    main_emotion: string;
    sub_emotion: string;
    keywords: string;
    status: string;
    is_private: number;

    counselor_answer_id: number;

    lock_expired_at: Date;
    is_deleted: number;
}

// new db
interface NDiaries {
    id: number;
    user_id: number;
    last_modified: Date;
    log_date: Date;
    user_content: string;
    metadata: string;
    main_emotion: string;
    sub_emotion: string;
    keywords: string;
    status: string;
    is_private: number;

    diary_answer_id: number;
    lock_counselor_id: number;
    lock_expired_at: string;
    is_deleted: number;
}
export default async function diaryMove() {
    const { data } = await getData<Diaries>(
        'SELECT * FROM drpresso.diary LIMIT 5;',
    );
    data.forEach((item) => {
        const target: Partial<NDiaries> = {
            id: item.id,
            user_id: item.user_id,
            last_modified: item.last_modified,
            log_date: item.log_date,

            user_content: item.user_content,
            metadata: item.metadata,
            main_emotion: item.main_emotion,
            sub_emotion: item.sub_emotion,
            keywords: item.keywords,
            status: item.status,
            is_private: item.is_private,

            diary_answer_id: item.counselor_answer_id,
            is_deleted: item.is_deleted,
        };
        const insertQuery = transInsertQuery<NDiaries>({
            data: target,
            databaseName: 'drpresso',
            tableName: 'diary',
        });
        console.log(insertQuery);
    });
}
