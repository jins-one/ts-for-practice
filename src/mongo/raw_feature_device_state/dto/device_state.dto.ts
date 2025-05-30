import { DeviceStateRepresentationNumberEnum } from '../enum/device_state_representation_number.dto';

// TODO: raw feature 제거
export class DeviceStateDto {
    sensor?: string;
    value?: DeviceStateRepresentationNumberEnum; //number이길 기대하고 있다
    battery_level?: number;
    timestamp?: number;
}
