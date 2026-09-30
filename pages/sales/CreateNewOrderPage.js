const {
  click,
  sendKeys,
  getTextCustomWithSavingData
} = require('../../utils/element-helper');


class CreateNewOrderPage {

  constructor(page) {

    this.page = page;

    this.btnTambahBaru = page.locator(
      'xpath=//button[text()="Tambah Baru"]'
    );

    this.clickAddCustomer = page.locator(
      'xpath=//*[@id="content"]/div/div/form/div/div[2]/div[1]/div/div[1]/div/div[4]/div/div[1]/div/div/div'
    );

    this.txtInputPelanggan = page.locator(
      'xpath=//input[@placeholder="Pilih Pelanggan"]'
    );

    this.clickListPelanggan = page.locator(
  'li[data-option-index="0"]:visible'
    );

    this.clickAddLokasi = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/div/div[2]/div/div[8]/div/div/div'
    );

    this.txtInputLokasi = page.locator(
      'xpath=//input[@placeholder="Pilih Lokasi"]'
    );

    this.btnTambahBaruLokasi = page.locator(
     'xpath=//button[text()="Tambah Baru"]'
    );

    this.txtInputProduk = page.locator(
      'xpath=/html/body/div[5]/div/div[1]/div/div/div[1]/div/div/input'
    );

    this.clickListProduk = page.locator(
      'xpath=/html/body/div[5]/div/div[1]/div/div/div[2]/div/div/div/div[1]/div[1]/div/div/div/div[2]'
            
    );

    this.clickInputQty = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/section[1]/div[2]/div/div/div[2]/div/div/div/div[1]/div/div[1]/div/div/div[3]/div/div/div'
    );

    this.txtInputQty = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/section[1]/div[2]/div/div/div[2]/div/div/div/div[1]/div/div[1]/div/div/div[3]/div/div/div/input'
    );

    this.SwitchIsPaid = page.locator(
      'xpath=//input[@name="is_paid"]/ancestor::span[contains(@class,"MuiSwitch-switchBase")]'
    );

    this.btnSimpan = page.locator(
      'xpath=//button[text()="Simpan"]'
    );

    this.txtInputReceiver = page.locator(
      'xpath=//input[@placeholder="Masukkan nama penerima"]'
    );

    this.clickInputReceiver = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/section[2]/div[2]/div/div/div/div/div/div[2]/div/div'
    );

    this.clickAlamat = page.locator(
      'xpath=//span[text()="Masukkan Alamat"]'
    );

    this.clickInputAlamat = page.locator(
      'xpath=/html/body/div[4]/div[3]/div/div/div/div/div/div[2]/div[2]/div/div'
    );

    this.txtInputAlamatDetailed = page.locator(
      'xpath=//input[@placeholder="Cth:  Blok, Unit No, Patokan"]'
    );

    this.txtInputNegara = page.locator(
      'xpath=//input[@placeholder="Masukkan negara"]'
    );

    this.clickInputPostalcode = page.locator(
      'xpath=/html/body/div[4]/div[3]/div/div/div/div/div/div[4]/div[2]/div/div/div'
    );

    this.txtInputPostalcode = page.locator(
      'xpath=//input[@placeholder="Masukkan provinsi/kota/kode pos."]'
    );

    this.clickSimpanAlamatButton = page.locator(
      'xpath=/html/body/div[4]/div[3]/div/div/div/div/div/div[5]/button'
    );

    this.btnClose = page.locator(
      'xpath=//button[@title="Close"]'
    );

    this.clickInputTelp = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/section[2]/div[2]/div/div/div/div/div/div[6]/div/div'
    );

    this.txtInputTelp = page.locator(
      'xpath=//input[@placeholder="Masukkan no telepon"]'
    );

    this.SwitchIsCOD = page.locator(
      'xpath=//input[@name="is_acknowledge"]/ancestor::span[contains(@class,"MuiSwitch-switchBase")]'
    );

    this.SwitchIsJubelioShipment = page.locator(
      'xpath=//input[@name="is_jubelio_shipment"]/ancestor::span[contains(@class,"MuiSwitch-switchBase")]'
    );

    this.clickInputResi = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/section[3]/div[2]/div/div/div/div[1]/div/div[4]/div/div'
    );

    this.txtInputResi = page.locator(
      'xpath=//input[@placeholder="Masukkan no. resi"]'
    );

    this.clickInputBeratBarang = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/section[3]/div[2]/div/div/div/div[1]/div/div[6]/div/div'
    );

    this.txtInputBeratBarang = page.locator(
      'xpath=//input[@placeholder="Total Berat Barang"]'
    );

    this.txtInputKurir = page.locator(
      'xpath=//input[@placeholder="Pilih kurir"]'
    );

    this.inputScanProduk = page.locator(
      'xpath=//input[@placeholder="Scan produk"]'
    );

    this.locationCheckboxes = page.locator(
      'xpath=//table//tbody/tr/td[1]//span'
    );

    this.btnProsesPesanan = page.locator(
      'xpath=//button/span[text()="Proses Pesanan"]'
    );

    this.idTransaction = page.locator(
      'xpath=/html/body/div[2]/div/div/div[2]/div[3]/div[2]/div[2]/div/table/tbody/tr[1]/td[2]/span/a/div/span'
    );

    this.lblPesanan = page.locator(
      'xpath=/html/body/div[2]/div/div/div[2]/div[1]/div/div[1]/h4'
    );

    this.btnSimpanOrder = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[1]/div/div[2]/div[1]/div/div/button'
    );

    this.txtInputToko = page.locator(
      'xpath=//input[@placeholder="Pilih Toko"]'
    );

    this.clickInputToko = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/div/div[2]/div/div[6]/div/div/div'
    );

    this.clickListToko = page.locator(
      'xpath=//li[@data-option-index="0"]'
    );

    this.btnClearToko = page.locator(
      'xpath=/html/body/div[2]/div/div/form/div/div[2]/div[1]/div/div[2]/div/div[6]/div/div/div/div/button[1]'
    );
  }


  async addStore(store) {

    await click(
      this.clickInputToko
    );


    await click(
      this.btnClearToko
    );


    await sendKeys(
      this.txtInputToko,
      store
    );

    await click(
      this.clickListToko
    );

    return this;
  }


  async pickIDTransaction() {

    await click(
      this.locationCheckboxes
    );


    await getTextCustomWithSavingData(
      this.page,
      this.idTransaction,
      'idSO.txt'
    );

    await click(
      this.btnProsesPesanan
    );

    await this.page.waitForTimeout(
      2000
    );

    return this;
  }


  async selectCustomer(customer) {


    await click(
      this.clickAddCustomer
    );

    await sendKeys(
      this.txtInputPelanggan,
      customer
    );

    await this.page.waitForTimeout(5000);
  await click(
    this.clickListPelanggan
  );


  return this;
  }


  async selectLokasi(lokasi) {

    await click(
      this.clickAddLokasi
    );

    await sendKeys(
      this.txtInputLokasi,
      lokasi
    );

    await click(
      this.clickListLokasi
    );
   await  this.page.waitForTimeout(9000);
    return this;
  }


  async refreshSection() {

    await this.page.waitForTimeout(
      30000
    );

    console.log(
      'Ini sedang refreshing halaman, harap tunggu sebentar...'
    );

    await this.page.reload();

    await this.page.waitForTimeout(
      9000
    );

    await this.page.waitForTimeout(
      30000
    );

    return this;
  }


  async scanProduk(produk) {

    await sendKeys(
      this.inputScanProduk,
      `${produk}\n`
    );

    return this;
  }


  async addProduk2(produk2) {

    await click(
      this.btnTambahBaruLokasi
    );

    await sendKeys(
      this.txtInputProduk,
      produk2
    );

    await click(
      this.clickListProduk
    );

    return this;
  }


  async inputQty(qty) {

    await click(
      this.clickInputQty
    );

    await sendKeys(
      this.txtInputQty,
      String(qty)
    );

    return this;
  }


  async setSudahLunas() {

    await click(
      this.SwitchIsPaid
    );

    return this;
  }


  async clickSimpan() {

    await click(
      this.btnSimpan
    );

    await getTextCustomWithSavingData(
      this.page,
      this.idTransaction,
      'idSO.txt'
    );

    return this;
  }


  async clickBtnTambahBaru() {

    await click(
      this.btnTambahBaru
    );

    return this;
  }


  async clickBtnSimpanOrderEdit() {

    await this.btnSimpan.scrollIntoViewIfNeeded();

    await click(
      this.btnSimpan
    );

    return this;
  }

}


module.exports = {
  CreateNewOrderPage
};