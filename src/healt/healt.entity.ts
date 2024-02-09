
import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
@Entity({name: 'health'})
export class Health {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    idType: string;

    @Column()
    idNumber: string;

    @Column()
    dateBirth: Date;

    @Column()
    Weight: string;
    
    @Column()
    Height: string;
    
}