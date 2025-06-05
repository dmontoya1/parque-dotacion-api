import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ScScenarioService } from './sc-scenario.service';
import { CreateScScenarioDto } from './dto/create-sc-scenario.dto';
import { UpdateScScenarioDto } from './dto/update-sc-scenario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('sc-scenario')
@Controller('sc-scenario')
export class ScScenarioController {
  constructor(private readonly service: ScScenarioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los escenarios' })
  @ApiResponse({ status: 200, description: 'Lista de escenarios' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un escenario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Escenario encontrado' })
  @ApiResponse({ status: 404, description: 'Escenario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo escenario' })
  @ApiResponse({ status: 201, description: 'Escenario creado' })
  create(@Body() dto: CreateScScenarioDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un escenario' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Escenario actualizado' })
  @ApiResponse({ status: 404, description: 'Escenario no encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateScScenarioDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un escenario' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Escenario eliminado' })
  @ApiResponse({ status: 404, description: 'Escenario no encontrado' })
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
