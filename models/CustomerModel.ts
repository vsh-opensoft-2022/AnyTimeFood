import { DataTypes, Model, Optional, Sequelize } from 'sequelize';


const CustomerModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    interface CustomerAttributes {
        id: string,
        name: string,
        email: string
    };
    
    interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'>{}
    
    interface CustomerInstance extends Model<CustomerAttributes, CustomerCreationAttributes>,
        CustomerAttributes {
            createdAt?: Date,
            updatedAt?: Date
        }
    
    return sequelize.define<CustomerInstance>(
        'Customer',
        {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: dataTypes.UUID,
                unique: true,
            },
            name: {
                allowNull: true,
                type: dataTypes.TEXT,
            },
            email: {
                allowNull: true,
                type: dataTypes.TEXT,
            }
        }
    )
}

export default CustomerModel;