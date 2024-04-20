// In this file you can configure migrate-mongo
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const config = {
    mongodb: {
        url: process.env.DB_CONN_STRING,
        databaseName: process.env.DB_NAME,

        options: {
            // @deprecated useNewUrlParser: true, // removes a deprecation warning when connecting
            // @deprecated useUnifiedTopology: true, // removes a deprecating warning when connecting
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: "migrations",

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: "Migrations",

    // The file extension to create migrations and search for in migration dir
    migrationFileExtension: ".js",

    // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
    // if the file should be run.  Requires that scripts are coded to be run multiple times.
    useFileHash: true,

    // Don't change this, unless you know what you're doing
    moduleSystem: 'esm',
};

export default config;