import mongoose, { Schema } from 'mongoose';
import { TotalSensorEventType } from './total_sensor_event.type';
import { SensorNameEnum } from './sensor_name.enum';
import { DeviceStateDto } from './raw_feature_device_state/dto/device_state.dto';
import { TelephonyDataDto } from './raw_feature_tephony/dto/telephony_data.dto';
import { StepsResultDto } from './raw_feature_steps/dto/steps_result.dto';
const sensorEventSchema = new Schema({
    id: { type: Number },

    timestamp: { type: Number },

    data: {
        enum: [DeviceStateDto, TelephonyDataDto, StepsResultDto],
        type: Object,
    },

    sensor: { type: String, enum: Object.values(SensorNameEnum) },

    saved_timestamp: { type: Number },
});
export const sensorEventSchemaModel = mongoose.model(
    'sensor_events',
    sensorEventSchema,
);
