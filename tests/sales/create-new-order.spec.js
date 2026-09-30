const {
  test
} = require('../../fixtures/test-fixtures');

const {
  CreateNewOrderPage
} = require('../../pages/sales/CreateNewOrderPage');


test.describe(
  'Sales - Create New Order',
  () => {

    test(
      'CreateOrderRunner',
      async ({ page }) => {

        const createNewOrderPage =
          new CreateNewOrderPage(page);


        await test.step(
          'Open Sales Order',
          async () => {

            await page.goto(
              '/sales/transactions/orders'
            );

          }
        );


        await test.step(
          'Click Tambah Baru',
          async () => {

            await createNewOrderPage
              .clickBtnTambahBaru();

          }
        );


        await test.step(
          'Select Customer',
          async () => {
            await createNewOrderPage
              .selectCustomer('73247');

          }
        );

        await test.step(
          'Select Lokasi',
          async () => {

            await createNewOrderPage
              .selectLokasi('Pusat');

          }
        );

        // await test.step(
        //   'Add Produk',
        //   async () => {

        //     await createNewOrderPage
        //       .addProduk2('QA-BengHani');

        //   }
        // );


        await test.step(
          'Scan Produk',
          async () => {

            await createNewOrderPage
              .scanProduk('QA-IDM-GR-2');

          }
        );


        await test.step(
          'Input Quantity',
          async () => {

            await createNewOrderPage
              .inputQty(2);

          }
        );


        await test.step(
          'Set Sudah Lunas',
          async () => {

            await createNewOrderPage
              .setSudahLunas();

          }
        );


        await test.step(
          'Simpan Order',
          async () => {

            await createNewOrderPage
              .clickSimpan();

          }
        );


        await test.step(
          'Pick ID Transaction',
          async () => {

            await createNewOrderPage
              .pickIDTransaction();

          }
        );

      }
    );

  }
);