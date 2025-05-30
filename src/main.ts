
import { getData } from './db/mysql';
import { PhenotypeEntity } from './db/phenotype';
import { sensorEventSchemaModel } from './mongo/sensor-event-schema';
import { connect } from './mongo/mong';
import dayjs from 'dayjs';
/**
 * user_id
 * log_date;
 *
 * platform => device state 넣거나 새로 만들거나.;
 * device_name => device state 넣거나 새로 만들거나.;
 * distance => distance;
 * walking_count => counts;
 * call_log=>null;
 * total_call_cnt => null;
 * total_call_time=>null;
 * app_use_log=> 상의 후에 추가 예정;
 * total_app_use_time=> 상의 후에 추가 예정;
 * total_app_use_count=> 상의 후에 추가 예정;
 *
 *
 */
async function main() {
    connect();
    const data = await getData<PhenotypeEntity>(
        'select * from ' + process.env.DB_NAME + '.' + 'phenotype',
    );
    data.data.forEach(async (i) => {
        const unitTimestamp = dayjs(i.log_date).valueOf();
        let _d: any = {
            timestamp: unitTimestamp,
        };

        if (i.distance !== -1) {
            _d.distance = i.distance;
        }
        if (i.walking_count !== -1) {
            _d.value = i.walking_count;
        }
        if (i.distance === -1 && i.walking_count === -1) {
            return;
        }
        // console.log(_d);
        await sensorEventSchemaModel.create({
            id: i.user_id,
            timestamp: unitTimestamp,
            data: _d,
            sensor: 'lamp.steps',
            saved_timestamp: unitTimestamp,
        });
    });

    // connect();
    // const feature = await sensorEventSchemaModel.create({});
    // console.log(feature);
}

main();

