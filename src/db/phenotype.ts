export interface PhenotypeEntity {
    user_id: number | null;
    log_date: string | null;
    platform: string | null;
    device_name: string | null;
    distance: number | null;
    walking_count: number | null;
    call_log: string | null;
    total_call_cnt: number | null;
    total_call_time: number | null;
    app_use_log: string | null;
    total_app_use_time: number | null;
    total_app_use_count: number | null;
}
