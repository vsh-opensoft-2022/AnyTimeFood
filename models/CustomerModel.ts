import { DataTypes, Model, Optional, Sequelize } from 'sequelize';


const CustomerModel = (sequelize: Sequelize) => {

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
                type: DataTypes.UUID,
                unique: true,
            },
            name: {
                allowNull: true,
                type: DataTypes.TEXT,
            },
            email: {
                allowNull: true,
                type: DataTypes.TEXT,
            }
        }
    )
}

export default CustomerModel;