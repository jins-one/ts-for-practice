import { DeviceStateDto } from './raw_feature_device_state/dto/device_state.dto';
import { StepsResultDto } from './raw_feature_steps/dto/steps_result.dto';
import { TelephonyDataDto } from './raw_feature_tephony/dto/telephony_data.dto';

export type TotalSensorEventType =
    | DeviceStateDto
    | TelephonyDataDto
    | StepsResultDto;
