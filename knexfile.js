"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var config = {
    development: {
        client: process.env.DEV_CLIENT,
        connection: {
            host: process.env.DEV_DB_HOST,
            // port: process.env.DEV_DB_PORT,
            database: process.env.DEV_DB_NAME,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASSWORD,
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
            host: process.env.PROD_DB_HOST,
            // port: process.env.DEV_DB_PORT,
            database: process.env.PROD_DB_NAME,
            user: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PASSWORD,
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: process.env.PROD_DB_HOST,
            // port: process.env.PROD_DB_PORT,
            database: process.env.PROD_DB_NAME,
            user: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    }
};
exports.default = config;
