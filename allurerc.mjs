import { defineConfig } from "allure";

// Allure 3 report settings (no Java needed): `npm run allure:serve`
export default defineConfig({
  name: "Jubelio E2E",
  output: "./allure-report",
  plugins: {
    awesome: {
      options: {
        reportName: "Jubelio E2E",
        reportLanguage: "en",
        // Group the test list by the labels set in each test: Jubelio › Penjualan › Buat pesanan dan proses
        groupBy: ["epic", "feature", "story"],
      },
    },
  },
});
