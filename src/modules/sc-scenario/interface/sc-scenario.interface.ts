export interface ScScenario {
  sc_id: number;
  pk_id: number;
  sc_name: string;
  sc_address: string;
  create_at: Date;
  update_at: Date;
  deleted_at?: Date | null;
}