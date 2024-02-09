import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from './healt.entity';
import { HealhDTO } from './healt.dto';
import { IHealth } from './interface';

@Injectable()
export class HealtService {
    constructor(@InjectRepository(Health) private readonly healthRepository: Repository<Health>) { }

    /**
     * Metodo que crea un nuevo registro.
     *
     * @param {HealhDTO} healhDTO -> datos a crear
     * @return {Promise<IHealth>} 
     */
    async create(healhDTO: HealhDTO): Promise<IHealth> {
        try {
            const newHealth = this.healthRepository.create(healhDTO);
            return await this.healthRepository.save(newHealth);
        } catch (error) {
            throw error;
        }
    }


    /**
     * Metodo que obtiene todos los registros
     *
     * @return {Promise<IHealth[]>}
     */
    async getAll(): Promise<IHealth[] | string> {
        try {
            const healths = await this.healthRepository.find();
            if (healths.length === 0) {
                return 'No se encontraron usuarios.';
            }

            const healthsWithIMC = healths.map((health) => {
                const { imc, status } = this.calculateIMCAndStatus(health);
                return { ...health, imc, status };
            });

            return healthsWithIMC;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Metodo que calcula el IMC "Índice de Masa Corporal".
     *
     * @param {Health} health
     * @return {{ imc: number; status: string }}
     */
    private calculateIMCAndStatus(health: Health): { imc: number; status: string } {
        const weightInKg = parseFloat(health.Weight.replace('kg', '').trim());
        const heightInMeters = parseFloat(health.Height.replace('cm', '').trim()) / 100;
        const imc = weightInKg / (heightInMeters * heightInMeters);
        let status = '';
        if (imc < 18.5) {
            status = 'Bajo peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            status = 'Normal';
        } else if (imc >= 25 && imc < 29.9) {
            status = 'Sobrepeso';
        } else {
            status = 'Obeso';
        }
        return { imc, status };
    }




    /**
     * Metodo que obtiene un registro por id.
     *
     * @param {number} id -> identificador
     * @return {Promise<IHealth>}
     */
    async getById(id: number): Promise<IHealth> {
        try {
            const health = await this.healthRepository.findOne({ where: { id } });
            if (!health) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
    
            const { imc, status } = this.calculateIMCAndStatus(health);
            const healthWithIMC = { ...health, imc, status };
    
            return healthWithIMC;
        } catch (error) {
            throw error;
        }
    }
    


    /**
     * Metodo que actualia la información del usuario.
     *
     * @param {number} id 
     * @param {HealhDTO} healhDTO 
     * @return {Promise<IHealth>}
     */
    async update(id: number, healhDTO: HealhDTO): Promise<IHealth> {
        try {
            await this.healthRepository.findOneOrFail({ where: { id } });
            await this.healthRepository.update(id, healhDTO);
            return await this.healthRepository.findOne({ where: { id } });
        } catch (error) {
            throw error;
        }
    }


    /**
     * Elimina  un registro por ID.
     * 
     * @param {number} id
     * @return {Promise<void>} 
     */
    async delete(id: number): Promise<void> {
        try {
            const result = await this.healthRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }
}
