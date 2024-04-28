import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from '../libs/connectToDB';

// This will run migrations on the database, skipping the ones already applied
try {
    await migrate(db, { migrationsFolder: './src/db/migration' });
    // Don't forget to close the connection, otherwise the script will hang
    await connection.end();
} catch (error) {
    console.error(error);
    await connection.end();
    process.exit(1);
}
