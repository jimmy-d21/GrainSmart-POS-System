import pg from "pg";
import ENV from "../utils/ENV.js";

const { Pool } = pg;
const { host, port, user, password, database_name } = ENV.database;

const db = new Pool({
  host,
  port,
  user,
  password,
  database: database_name,
});

const checkConnect = async () => {
  try {
    const client = await db.connect();
    console.log(`Database Connected successfully`);
  } catch (error) {
    console.error(`Error Connecting to database: ${error.message}`);
  }
};
export default db;
