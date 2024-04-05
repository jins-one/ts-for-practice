async function getData<TDataRow>(
    query: string,
): Promise<{ data: QueryDataWrap<TDataRow>[]; field: FieldPacket[] }>;
async function setData(query: string);
function transInsertQuery<TData>({
    data,
    databaseName,
    tableName,
}: TransInsertQuery<TData>);
