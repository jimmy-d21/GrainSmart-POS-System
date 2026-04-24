import dotenv from "dotenv";
dotenv.config();

const ENV = {
  server: {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database_name: process.env.DB_NAME,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    secret_key: process.env.CLOUDINARY_SECRET_KEY,
  },
  jwt: process.env.JWT_SECRET,
};

export default ENV;
