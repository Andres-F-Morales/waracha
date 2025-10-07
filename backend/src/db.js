const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Tabla users lista");

  await seedUserAdmin();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS owners (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Tabla owners lista");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS asset_types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL
    )
  `);

  await pool.query(`
    INSERT INTO asset_types (name) VALUES
      ('Laptop'),
      ('Celular'),
      ('Monitor'),
      ('Tablet'),
      ('Teclado')
    ON CONFLICT (name) DO NOTHING;
    `);

  console.log("Tabla asset_types lista");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      type_id INTEGER NOT NULL REFERENCES asset_types(id) ON DELETE RESTRICT,
      owner_id INTEGER REFERENCES owners(id) ON DELETE SET NULL,
      serial VARCHAR(150) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    console.log("Tabla assets lista");
}

async function seedUserAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASS;

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [adminEmail]);
  if (result.rows.length === 0) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      ["Admin", "Root", adminEmail, hashed, "admin"]
    );
    console.log(`Admin creado: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("Admin ya existe");
  }
}

module.exports = { pool, initDb };