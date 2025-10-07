const { pool } = require("../db");

class Asset {
    static async create({ name, type_id, owner_id, serial }) {
        const result = await pool.query(
            `INSERT INTO assets (name, type_id, owner_id, serial, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING id, name, type_id, owner_id, serial, created_at, updated_at`,
            [name, type_id, owner_id, serial]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT 
            a.id,
            a.name,
            a.created_at,
            a.updated_at,
            t.name AS type_name,
            o.first_name || ' ' || o.last_name AS owner_name,
            o.email AS owner_email,
            a.serial
          FROM assets a
          LEFT JOIN asset_types t ON t.id = a.type_id
          LEFT JOIN owners o ON o.id = a.owner_id
          WHERE a.id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    static async findBySerial(serial) {
        const result = await pool.query(
            `SELECT 
            a.id,
            a.name,
            a.created_at,
            a.updated_at,
            t.name AS type_name,
            o.last_name || ' ' || o.first_name AS owner_name,
            o.email AS owner_email,
            a.serial
          FROM assets a
          LEFT JOIN asset_types t ON t.id = a.type_id
          LEFT JOIN owners o ON o.id = a.owner_id
          WHERE a.serial = $1`,
            [serial]
        );
        return result.rows[0] || null;
    }

    static async all(queryParams) {
        // valores por defecto en la desetructuración
        const { 
            range = '[0, 9]', 
            sort = '["id", "ASC"]' 
        } = queryParams;

        const [rangeStart, rangeEnd] = range ? JSON.parse(range) : [0, 9];
        const limit = rangeEnd - rangeStart + 1;
        const offset = rangeStart;
        
        const [sortBy, sortOrder] = sort ? JSON.parse(sort) : ['id', 'ASC'];

        const countResult = await pool.query(
            `SELECT COUNT(*) FROM assets`
        );
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const assetsResult = await pool.query(
            `SELECT 
            a.id,
            a.name,
            a.created_at,
            a.updated_at,
            t.name AS type_name,
            o.last_name || ' ' || o.first_name AS owner_name,
            o.email AS owner_email,
            a.serial
          FROM assets a
          LEFT JOIN asset_types t ON t.id = a.type_id
          LEFT JOIN owners o ON o.id = a.owner_id
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        return {
            assets: assetsResult.rows,
            totalCount: totalCount
        };
    }

    static async update(id, { name, type_id, owner_id, serial }) {
        const result = await pool.query(
            `UPDATE assets SET name = $1, type_id = $2, owner_id = $3, serial = $4, updated_at = NOW()
            WHERE id = $5
            RETURNING id, name, type_id, owner_id, created_at, updated_at`,
            [name, type_id, owner_id, serial, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query(`DELETE FROM assets WHERE id = $1`, [id]);
        return true;
    }
}

module.exports = Asset;