-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "tipo_usuario" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parques" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "direccion" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_actividad" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "nivel_prioridad" INTEGER NOT NULL,
    "descripcion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dotacion_escenario" (
    "id" SERIAL NOT NULL,
    "parque_id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "direccion" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dotacion_escenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios_dotacion" (
    "id" SERIAL NOT NULL,
    "id_categoria_actividad" INTEGER NOT NULL,
    "hora_inicio" VARCHAR(10) NOT NULL,
    "hora_fin" VARCHAR(10) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "dotacion_escenario" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "dia" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horarios_dotacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- AddForeignKey
ALTER TABLE "dotacion_escenario" ADD CONSTRAINT "dotacion_escenario_parque_id_fkey" FOREIGN KEY ("parque_id") REFERENCES "parques"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios_dotacion" ADD CONSTRAINT "horarios_dotacion_id_categoria_actividad_fkey" FOREIGN KEY ("id_categoria_actividad") REFERENCES "categoria_actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios_dotacion" ADD CONSTRAINT "horarios_dotacion_dotacion_escenario_fkey" FOREIGN KEY ("dotacion_escenario") REFERENCES "dotacion_escenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios_dotacion" ADD CONSTRAINT "horarios_dotacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
