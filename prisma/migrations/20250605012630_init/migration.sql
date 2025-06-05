-- CreateTable
CREATE TABLE "us_users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user_type" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "us_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_parks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_parks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_activity_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "priority_level" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_activity_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_stage_allocations" (
    "id" SERIAL NOT NULL,
    "park_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_stage_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_allocation_schedules" (
    "id" SERIAL NOT NULL,
    "activity_category_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "stage_allocation_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "day" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_allocation_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_partitions" (
    "id" SERIAL NOT NULL,
    "stage_allocation_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_partitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_partition_segments" (
    "id" SERIAL NOT NULL,
    "partition_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_partition_segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gn_agendas" (
    "id" SERIAL NOT NULL,
    "stage_allocation_id" INTEGER,
    "partition_id" INTEGER,
    "partition_segment_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gn_agendas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "us_users_email_key" ON "us_users"("email");

-- AddForeignKey
ALTER TABLE "gn_stage_allocations" ADD CONSTRAINT "gn_stage_allocations_park_id_fkey" FOREIGN KEY ("park_id") REFERENCES "gn_parks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_allocation_schedules" ADD CONSTRAINT "gn_allocation_schedules_activity_category_id_fkey" FOREIGN KEY ("activity_category_id") REFERENCES "gn_activity_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_allocation_schedules" ADD CONSTRAINT "gn_allocation_schedules_stage_allocation_id_fkey" FOREIGN KEY ("stage_allocation_id") REFERENCES "gn_stage_allocations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_allocation_schedules" ADD CONSTRAINT "gn_allocation_schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "us_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_partitions" ADD CONSTRAINT "gn_partitions_stage_allocation_id_fkey" FOREIGN KEY ("stage_allocation_id") REFERENCES "gn_stage_allocations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_partition_segments" ADD CONSTRAINT "gn_partition_segments_partition_id_fkey" FOREIGN KEY ("partition_id") REFERENCES "gn_partitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_agendas" ADD CONSTRAINT "gn_agendas_stage_allocation_id_fkey" FOREIGN KEY ("stage_allocation_id") REFERENCES "gn_stage_allocations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_agendas" ADD CONSTRAINT "gn_agendas_partition_id_fkey" FOREIGN KEY ("partition_id") REFERENCES "gn_partitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_agendas" ADD CONSTRAINT "gn_agendas_partition_segment_id_fkey" FOREIGN KEY ("partition_segment_id") REFERENCES "gn_partition_segments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gn_agendas" ADD CONSTRAINT "gn_agendas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "us_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
