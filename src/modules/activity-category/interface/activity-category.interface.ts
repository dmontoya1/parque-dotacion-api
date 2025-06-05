export interface ActivityCategory {
  ac_id: number;
  ac_name: string;
  ac_priority_level: number;
  ac_description?: string | null;
  create_at: Date;
  update_at: Date;
  deleted_at?: Date | null;
}