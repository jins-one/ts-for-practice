import dotenv from 'dotenv';
import { createConnection, FieldPacket, RowDataPacket } from 'mysql2/promise';

dotenv.config();
// 원본
type QueryDataWrap<T> = T & RowDataPacket;
const connection = createConnection({
    host: process.env.GCP_HOST,
    user: process.env.GCP_USER,
    database: process.env.GCP_DATABASE,
    password: process.env.GCP_PASSWORD,
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

//
const connectionRds = createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
});
export async function setData(query: string) {
    try {
        console.log('query start');
        console.log(`[query] : ${query}`);
        await (await connectionRds).query(query);
        console.log('query end');
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
}
interface TransInsertQuery<TData> {
    data: Partial<TData>;
    databaseName: string;
    tableName: string;
}
export function transInsertQuery<TData>({
    data,
    databaseName,
    tableName,
}: TransInsertQuery<TData>) {
    let columns = '';
    let values = '';
    Object.entries(data).forEach(([key, value], index) => {
        columns += index === 0 ? `${key}` : `,${key}`;
        if (typeof value === 'string') {
            values += index === 0 ? `'${value}'` : `,'${value}'`;
        } else if (value instanceof Date) {
            values += index === 0 ? `` : `,`;
            values += `CONVERT_TZ('${value
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')}', "+00:00", "+09:00")`;
        } else {
            values += index === 0 ? `${value}` : `,${value}`;
        }
    });
    return `INSERT INTO ${databaseName}.${tableName} (${columns}) VALUES (${values});`;
}
