import { Pool } from 'pg';

let conn: any;

if (!conn) {
  conn = new Pool({
    user: 'mendoza',
    password: 'x8nGTuPnh8HEJ9XtrV0sFaWkh0ntNtPU',
    host: 'dpg-cj4ivoiip7vuask1qh3g-a.oregon-postgres.render.com',
    port: 5432,
    database: 'thp_documents',
    ssl: true,
  });
}

export default { conn };
