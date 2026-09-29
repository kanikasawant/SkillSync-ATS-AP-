import { pool } from './db/index.js';

async function migrateEnum() {
  const client = await pool.connect();
  try {
    console.log('1. Creating PostgreSQL ENUM type organization_status...');
    await client.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'organization_status') THEN 
          CREATE TYPE organization_status AS ENUM ('active', 'expired'); 
        END IF; 
      END $$;
    `);

    console.log('2. Sanitizing existing data...');
    await client.query(`
      UPDATE organizations 
      SET status = 'active' 
      WHERE status NOT IN ('active', 'expired') OR status IS NULL;
    `);

    console.log('3. Altering column type to organization_status ENUM...');
    await client.query(`ALTER TABLE organizations ALTER COLUMN status DROP DEFAULT;`);
    await client.query(`ALTER TABLE organizations ALTER COLUMN status TYPE organization_status USING status::organization_status;`);
    await client.query(`ALTER TABLE organizations ALTER COLUMN status SET DEFAULT 'active';`);

    console.log('✅ PostgreSQL ENUM Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

migrateEnum();
