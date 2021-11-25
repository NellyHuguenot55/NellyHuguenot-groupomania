'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            allowNull: false,
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING(1000)
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
    }
};