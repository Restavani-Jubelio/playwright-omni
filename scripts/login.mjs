// Buka browser, kamu login manual, sesi login disimpan ke .auth/user.json.
// Jalankan: npm run login
import { chromium } from '@playwright/test';
import 'dotenv/config';
import fs from 'node:fs';

const baseURL = process.env.BASE_URL || 'https://v2.jubelio.com';
fs.mkdirSync('.auth', { recursive: true });

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto(baseURL);

console.log('\n>> Silakan login di browser yang terbuka (maks 5 menit)...\n');

// Anggap login berhasil kalau menu utama (Penjualan & Gudang) sudah kelihatan.
await page.getByText('Gudang', { exact: true }).first().waitFor({ timeout: 5 * 60 * 1000 });
await page.getByText('Penjualan', { exact: true }).first().waitFor();

await context.storageState({ path: '.auth/user.json' });
console.log('>> Sesi login tersimpan di .auth/user.json. Sekarang jalankan: npm test\n');
await browser.close();
