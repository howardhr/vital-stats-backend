import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { HealtService } from './healt.service';
import { HealhDTO } from './healt.dto';

@Controller('api/v1/healt')
export class HealtController {

    constructor(private readonly healtService: HealtService) { }


    /**
     *  Metodo que crea un nuevo registro
     *
     * @param {HealhDTO} healhDTO 
     * @return {any}
     */
    @Post('healty/user')
    create(@Body() healhDTO: HealhDTO) {
        try {
            return this.healtService.create(healhDTO);
        } catch (error) {
            return error;
        }
    }

    /**
     * Metodo que tare todos los los usuarios.
     *
     * @return {type} descripción del valor de retorno
     */
    @Get('healty/user')
    getAll() {
        try {
            return this.healtService.getAll();
        } catch (error) {
            return error;
        }
    }

    /**
     * Metodo que obtiene un u usario por id.
     *
     * @param {number} id - el ID del elemento a recuperar
     * @return {any} el elemento de datos recuperado, o un error si ocurre
     */
    @Get('healty/user/:id')
    getById(@Param('id') id: number) {
        try {
            return this.healtService.getById(id);
        } catch (error) {
            return error;
        }
    }

    /**
     * Metodo que actualiza datos del usuario.
     *
     * @param {number} id
     * @param {HealhDTO}
     * @return {any}
     */
    @Put('healty/user/:id')
    update(@Param('id') id: number, @Body() healhDTO: HealhDTO) {
        try {
            return this.healtService.update(id, healhDTO);
        } catch (error) {
            return error;
        }
    }
    
    /**
     * Metodo que elimina un registro .
     *
     * @param {number} id
     * @return {any}
     */
    @Delete('healty/user/:id')
    delete(@Param('id') id: number) {
        try {
            return this.healtService.delete(id);
        } catch (error) {
            return error;
        }
    }
}
