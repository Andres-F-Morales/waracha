const { pool } = require("../db");

class Owner {
    static async create({ first_name, last_name, email }) {
        const result = await pool.query(
            `INSERT INTO owners (first_name, last_name, email, created_at, updated_at)
            VALUES ($1, $2, $3, NOW(), NOW())
            RETURNING id, first_name, last_name, email, created_at, updated_at`,
            [first_name, last_name, email ]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query(
            `SELECT * FROM owners WHERE email = $1`, 
            [email]
        );
        return result.rows[0] || null;
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT id, first_name, last_name, email, created_at, updated_at
            FROM owners WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    static async all(queryParams) {
        // valores por defecto en la desestructuración
        const { 
            range = '[0, 9]', 
            sort = '["id", "ASC"]' 
        } = queryParams;

        const [rangeStart, rangeEnd] = range ? JSON.parse(range) : [0, 9];
        const limit = rangeEnd - rangeStart + 1;
        const offset = rangeStart;
        
        const [sortBy, sortOrder] = sort ? JSON.parse(sort) : ['id', 'ASC'];

        const countResult = await pool.query(
            `SELECT COUNT(*) FROM owners`
        );
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const ownersResult = await pool.query(
            `SELECT id, first_name, last_name, email, created_at, updated_at 
            FROM owners
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        return {
            owners: ownersResult.rows,
            totalCount: totalCount
        };
    }

    static async update(id, { first_name, last_name }) {
        const result = await pool.query(
            `UPDATE owners SET first_name = $1, last_name = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING id, first_name, last_name, email, created_at, updated_at`,
            [first_name, last_name, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query(`DELETE FROM owners WHERE id = $1`, [id]);
        return true;
    }
}

module.exports = Owner;