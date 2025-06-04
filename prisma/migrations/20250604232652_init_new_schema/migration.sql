/*
  Warnings:

  - You are about to drop the `categoria_actividad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dotacion_escenario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `horarios_dotacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parques` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dotacion_escenario" DROP CONSTRAINT "dotacion_escenario_parque_id_fkey";

-- DropForeignKey
ALTER TABLE "horarios_dotacion" DROP CONSTRAINT "horarios_dotacion_dotacion_escenario_fkey";

-- DropForeignKey
ALTER TABLE "horarios_dotacion" DROP CONSTRAINT "horarios_dotacion_id_categoria_actividad_fkey";

-- DropForeignKey
ALTER TABLE "horarios_dotacion" DROP CONSTRAINT "horarios_dotacion_id_usuario_fkey";

-- DropTable
DROP TABLE "categoria_actividad";

-- DropTable
DROP TABLE "dotacion_escenario";

-- DropTable
DROP TABLE "horarios_dotacion";

-- DropTable
DROP TABLE "parques";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "gn_park" (
    "pk_id" SERIAL NOT NULL,
    "pk_name" VARCHAR(255) NOT NULL,
    "pk_address" VARCHAR(500) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "gn_park_pkey" PRIMARY KEY ("pk_id")
);

-- CreateTable
CREATE TABLE "us_user" (
    "us_id" SERIAL NOT NULL,
    "us_name" VARCHAR(255) NOT NULL,
    "us_email" VARCHAR(255) NOT NULL,
    "us_user_type" VARCHAR(50) NOT NULL,
    "us_password" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "us_user_pkey" PRIMARY KEY ("us_id")
);

-- CreateTable
CREATE TABLE "ac_activity_category" (
    "ac_id" SERIAL NOT NULL,
    "ac_name" VARCHAR(255) NOT NULL,
    "ac_priority_level" INTEGER NOT NULL,
    "ac_description" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ac_activity_category_pkey" PRIMARY KEY ("ac_id")
);

-- CreateTable
CREATE TABLE "sc_scenario" (
    "sc_id" SERIAL NOT NULL,
    "pk_id" INTEGER NOT NULL,
    "sc_name" VARCHAR(255) NOT NULL,
    "sc_address" VARCHAR(500) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sc_scenario_pkey" PRIMARY KEY ("sc_id")
);

-- CreateTable
CREATE TABLE "sc_partition" (
    "pt_id" SERIAL NOT NULL,
    "sc_id" INTEGER NOT NULL,
    "pt_name" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sc_partition_pkey" PRIMARY KEY ("pt_id")
);

-- CreateTable
CREATE TABLE "sc_partition_segment" (
    "ps_id" SERIAL NOT NULL,
    "pt_id" INTEGER NOT NULL,
    "ps_name" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sc_partition_segment_pkey" PRIMARY KEY ("ps_id")
);

-- CreateTable
CREATE TABLE "sh_schedule_endowment" (
    "sh_id" SERIAL NOT NULL,
    "ac_id" INTEGER NOT NULL,
    "sh_start_time" VARCHAR(10) NOT NULL,
    "sh_end_time" VARCHAR(10) NOT NULL,
    "sh_start_date" DATE NOT NULL,
    "sh_end_date" DATE NOT NULL,
    "sc_id" INTEGER NOT NULL,
    "us_id" INTEGER NOT NULL,
    "sh_day" VARCHAR(20) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sh_schedule_endowment_pkey" PRIMARY KEY ("sh_id")
);

-- CreateTable
CREATE TABLE "ag_agenda" (
    "ag_id" SERIAL NOT NULL,
    "sc_id" INTEGER NOT NULL,
    "pt_id" INTEGER,
    "ps_id" INTEGER,
    "us_id" INTEGER NOT NULL,
    "ag_start_time" VARCHAR(10) NOT NULL,
    "ag_end_time" VARCHAR(10) NOT NULL,
    "ag_date" DATE NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ag_agenda_pkey" PRIMARY KEY ("ag_id")
);

-- CreateIndex
CREATE INDEX "gn_park_pk_name_idx" ON "gn_park"("pk_name");

-- CreateIndex
CREATE UNIQUE INDEX "us_user_us_email_key" ON "us_user"("us_email");

-- CreateIndex
CREATE INDEX "us_user_us_email_idx" ON "us_user"("us_email");

-- CreateIndex
CREATE INDEX "ac_activity_category_ac_name_idx" ON "ac_activity_category"("ac_name");

-- CreateIndex
CREATE INDEX "ac_activity_category_ac_priority_level_idx" ON "ac_activity_category"("ac_priority_level");

-- CreateIndex
CREATE INDEX "sc_scenario_pk_id_idx" ON "sc_scenario"("pk_id");

-- CreateIndex
CREATE INDEX "sc_scenario_sc_name_idx" ON "sc_scenario"("sc_name");

-- CreateIndex
CREATE INDEX "sc_partition_sc_id_idx" ON "sc_partition"("sc_id");

-- CreateIndex
CREATE INDEX "sc_partition_pt_name_idx" ON "sc_partition"("pt_name");

-- CreateIndex
CREATE INDEX "sc_partition_segment_pt_id_idx" ON "sc_partition_segment"("pt_id");

-- CreateIndex
CREATE INDEX "sc_partition_segment_ps_name_idx" ON "sc_partition_segment"("ps_name");

-- CreateIndex
CREATE INDEX "sh_schedule_endowment_ac_id_idx" ON "sh_schedule_endowment"("ac_id");

-- CreateIndex
CREATE INDEX "sh_schedule_endowment_sc_id_idx" ON "sh_schedule_endowment"("sc_id");

-- CreateIndex
CREATE INDEX "sh_schedule_endowment_us_id_idx" ON "sh_schedule_endowment"("us_id");

-- CreateIndex
CREATE INDEX "sh_schedule_endowment_sh_start_date_idx" ON "sh_schedule_endowment"("sh_start_date");

-- CreateIndex
CREATE INDEX "sh_schedule_endowment_sh_day_idx" ON "sh_schedule_endowment"("sh_day");

-- CreateIndex
CREATE INDEX "ag_agenda_sc_id_idx" ON "ag_agenda"("sc_id");

-- CreateIndex
CREATE INDEX "ag_agenda_pt_id_idx" ON "ag_agenda"("pt_id");

-- CreateIndex
CREATE INDEX "ag_agenda_ps_id_idx" ON "ag_agenda"("ps_id");

-- CreateIndex
CREATE INDEX "ag_agenda_us_id_idx" ON "ag_agenda"("us_id");

-- CreateIndex
CREATE INDEX "ag_agenda_ag_date_idx" ON "ag_agenda"("ag_date");

-- CreateIndex
CREATE INDEX "ag_agenda_ag_start_time_idx" ON "ag_agenda"("ag_start_time");

-- AddForeignKey
ALTER TABLE "sc_scenario" ADD CONSTRAINT "sc_scenario_pk_id_fkey" FOREIGN KEY ("pk_id") REFERENCES "gn_park"("pk_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sc_partition" ADD CONSTRAINT "sc_partition_sc_id_fkey" FOREIGN KEY ("sc_id") REFERENCES "sc_scenario"("sc_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sc_partition_segment" ADD CONSTRAINT "sc_partition_segment_pt_id_fkey" FOREIGN KEY ("pt_id") REFERENCES "sc_partition"("pt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sh_schedule_endowment" ADD CONSTRAINT "sh_schedule_endowment_ac_id_fkey" FOREIGN KEY ("ac_id") REFERENCES "ac_activity_category"("ac_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sh_schedule_endowment" ADD CONSTRAINT "sh_schedule_endowment_sc_id_fkey" FOREIGN KEY ("sc_id") REFERENCES "sc_scenario"("sc_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sh_schedule_endowment" ADD CONSTRAINT "sh_schedule_endowment_us_id_fkey" FOREIGN KEY ("us_id") REFERENCES "us_user"("us_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ag_agenda" ADD CONSTRAINT "ag_agenda_sc_id_fkey" FOREIGN KEY ("sc_id") REFERENCES "sc_scenario"("sc_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ag_agenda" ADD CONSTRAINT "ag_agenda_pt_id_fkey" FOREIGN KEY ("pt_id") REFERENCES "sc_partition"("pt_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ag_agenda" ADD CONSTRAINT "ag_agenda_ps_id_fkey" FOREIGN KEY ("ps_id") REFERENCES "sc_partition_segment"("ps_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ag_agenda" ADD CONSTRAINT "ag_agenda_us_id_fkey" FOREIGN KEY ("us_id") REFERENCES "us_user"("us_id") ON DELETE CASCADE ON UPDATE CASCADE;
