// src/models/Person.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';

export class Person extends Model {
    public id!: string; // Cambiado de number a string
    public fecha_nacimiento!: Date;
    public universidad!: string; // Cambiado para permitir cualquier string
    public carrera!: string; // Cambiado para permitir cualquier string
    public datos_personales?: string; // Ahora opcional
    public tipo_persona_role!: string; // Cambiado para permitir cualquier string
    public sexo!: string; // Cambiado para permitir cualquier string
}

Person.init({
    id: {
        type: DataTypes.STRING(255), // Actualizado a string para coincidir con el SQL
        allowNull: false,
        primaryKey: true,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY, // Solo fecha sin tiempo
        allowNull: false,
    },
    universidad: {
        type: DataTypes.STRING(255), // No enum porque Sequelize no soporta check constraint
        allowNull: false,
        validate: {
            isIn: [['FP-UNE', 'FAFI-UNE', 'FCE-UNE', 'FDCS-UNE', 'Otro']], // Validación de valores permitidos
        }
    },
    carrera: {
        type: DataTypes.STRING(255), // No enum por la misma razón
        allowNull: false,
        validate: {
            isIn: [['Lic. en Análisis de Sistemas', 'Lic. en Turismo', 'Ingeniería de Sistemas', 'Ingeniería Eléctrica', 'Otro']],
        }
    },
    datos_personales: {
        type: DataTypes.TEXT, // Texto largo
        allowNull: true, // Permitir nulos
    },
    tipo_persona_role: {
        type: DataTypes.STRING(50), // No enum pero limitado a 50 caracteres
        allowNull: false,
    },
    sexo: {
        type: DataTypes.STRING(10), // No enum pero limitado a 10 caracteres
        allowNull: false,
        validate: {
            isIn: [['Femenino', 'Masculino']], // Validación de valores permitidos
        }
    }
}, {
    tableName: 'persona',
    sequelize,
    timestamps: false, // Confirmado que no queremos timestamps
});

export default Person;
