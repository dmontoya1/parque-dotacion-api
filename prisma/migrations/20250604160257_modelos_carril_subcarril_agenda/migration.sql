-- CreateTable
CREATE TABLE "carriles" (
    "id" SERIAL NOT NULL,
    "dotacion_escenario_id" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carriles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcarriles" (
    "id" SERIAL NOT NULL,
    "carril_id" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcarriles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda" (
    "id" SERIAL NOT NULL,
    "dotacion_escenario_id" INTEGER,
    "carril_id" INTEGER,
    "subcarril_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "hora_inicio" VARCHAR(10) NOT NULL,
    "hora_fin" VARCHAR(10) NOT NULL,
    "tipoAsignacion" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carriles" ADD CONSTRAINT "carriles_dotacion_escenario_id_fkey" FOREIGN KEY ("dotacion_escenario_id") REFERENCES "dotacion_escenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcarriles" ADD CONSTRAINT "subcarriles_carril_id_fkey" FOREIGN KEY ("carril_id") REFERENCES "carriles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_dotacion_escenario_id_fkey" FOREIGN KEY ("dotacion_escenario_id") REFERENCES "dotacion_escenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_carril_id_fkey" FOREIGN KEY ("carril_id") REFERENCES "carriles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_subcarril_id_fkey" FOREIGN KEY ("subcarril_id") REFERENCES "subcarriles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
