import { CallDirectionEnum } from '@/mongo/secondary_call_degree/enum/call_direction.enum';

// TODO: raw feature 제거
export class TelephonyDataDto {
    trace?: number;
    type?: CallDirectionEnum;

    duration?: number;
}
