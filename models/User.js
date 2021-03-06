const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create outr User model
class User extends Model {}

// define table columns and configuration
User.init({
    // define an id columnn
    id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this the equivalent of SQL's 'NOT NULL' option
        allowNull: false,
        //Instruct that this is the Primary Key
        primaryKey: true,
        // Turn on auto increment
        autoIncrement: true
    },
    // Define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Define an email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // There cannot be any duplicat email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data thtrough validators before creating the data
        validate: {
            isEmail: true
        }
    },
    // Define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // This means thewpassword must be at least four characters long
            len: [4]
        }
    }
}, {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
});

module.exports = User;