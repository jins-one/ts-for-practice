import dotenv from 'dotenv';
import { createConnection, FieldPacket, RowDataPacket } from 'mysql2/promise';

dotenv.config();
// 원본
type QueryDataWrap<T> = T & RowDataPacket;
const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export async function getData<TDataRow>(
    query: string,
): Promise<{ data: TDataRow[]; field: FieldPacket[] }> {
    try {
        const [data, field]: [QueryDataWrap<TDataRow>[], FieldPacket[]] =
            await (await connection).query(query);
        return { data, field };
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
}
