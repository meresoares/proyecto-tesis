// src/models/Person.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config'; // Importar directamente desde el archivo de configuración

export class Person extends Model {
    public id!: number;
    public fecha_nacimiento!: Date;
    public universidad!: string;
    public carrera!: string;
    public datos_personales!: string;
    public tipo_persona_role!: 'Usuario' | 'Administrador';
}

Person.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    universidad: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    carrera: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    datos_personales: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tipo_persona_role: {
        type: DataTypes.ENUM('Usuario', 'Administrador'),
        allowNull: false,
    }
}, {
    tableName: 'persona',
    sequelize, // apasar la instancia de conexión
    timestamps: false, // Deshabilita la gestión automática de las columnas createdAt y updatedAt

});

export default Person; // Exportación por defecto del modelo
