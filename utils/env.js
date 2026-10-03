require('dotenv').config();

/** Test data (override in .env if needed). */
const env = {
  customer: process.env.CUSTOMER || 'BLANJA',
  location: process.env.LOCATION || 'Vani Room',
  // Comma-separated SKUs: the first is added via "Scan produk", the rest via "Tambah Baru (Ctrl+i)"
  products: (process.env.PRODUCTS || 'Vani1,Vani2').split(',').map((s) => s.trim()).filter(Boolean),
  courier: process.env.COURIER || 'JNE REG',
};

module.exports = { env };
