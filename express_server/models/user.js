import { Model, DataTypes } from "sequelize";
import sequelize from "../database.js";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_superuser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_staff: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        date_joined: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "auth_user",
        timestamps: false,
    }
);

export default User;
