const { pool } = require("../db");

class AssetTypes {
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
            `SELECT COUNT(*) FROM asset_types`
        );
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const assettypesResult = await pool.query(
            `SELECT 
            id,
            name            
          FROM asset_types a
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        return {
            asset_types: assettypesResult.rows,
            totalCount: totalCount
        };
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT 
            a.id,
            a.name
          FROM asset_types a
          WHERE a.id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }
}

module.exports = AssetTypes;