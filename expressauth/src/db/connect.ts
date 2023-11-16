import pg from 'pg';
import fs from 'fs'
const {Pool} = pg
import * as dotenv from "dotenv";
dotenv.config();

const loadCert = () => {
    try {
        return fs.readFileSync("./rds-ca-2019-eu-central-1.pem").toString();
    } catch (error) {
        console.error("Error loading SSL certificate:", error.message);
        return null; // Return null if certificate loading fails
    }
};

const createPool = (debug: boolean) => {
    if (debug) {
        return new Pool({
            password: process.env.DB_PASSWORD,
            port: 5432,
            host: 'db',
            user: 'postgres',
            database: 'main',
        });
    } else {
        const sslCert = loadCert();
        if (!sslCert) {
            throw new Error("SSL certificate not found or could not be loaded.");
        }

        return new Pool({
            password: process.env.DB_PASSWORD,
            port: 5432,
            host: '***RDS***',
            user: 'postgres',
            database: 'main',
            ssl: {
                ca: sslCert,
            },
        });
    }
};
const DEBUG = process.env.DEBUG === 'true';

export default createPool(DEBUG)
