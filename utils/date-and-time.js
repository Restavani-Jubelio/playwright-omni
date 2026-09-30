class DateAndTime {

  // ==========================================
  // CURRENT TIME
  // ==========================================

  static getTime() {

    const now = new Date();

    return this.formatDate(
      now,
      'HH:mm'
    );

  }


  // ==========================================
  // CURRENT DATE
  // ==========================================

  static getDate() {

    const now = new Date();

    return this.formatDate(
      now,
      'dd MMMM yyyy'
    );

  }


  // ==========================================
  // DATE WITH OFFSET
  // ==========================================

  static getDate(
    dateOffset = 0,
    dateFormat = 'dd MMMM yyyy'
  ) {

    const date = new Date();

    date.setDate(
      date.getDate() + dateOffset
    );

    return this.formatDate(
      date,
      dateFormat
    );

  }


  // ==========================================
  // CURRENT DATE - SHORT YEAR
  // ==========================================

  static getDate2() {

    const now = new Date();

    return this.formatDate(
      now,
      "dd MMMM 'yy"
    );

  }


  // ==========================================
  // PAST DATE
  // ==========================================

  static getPastDate1(n) {

    const date = new Date();

    date.setDate(
      date.getDate() - n
    );

    return this.formatDate(
      date,
      'dd/MM/yyyy'
    );

  }


  // ==========================================
  // AFTER D-DAY
  // ==========================================

  static getafterDday(tgl) {

    const date = new Date();

    date.setDate(
      date.getDate() + tgl
    );

    return this.formatDate(
      date,
      'dd MMMM yy'
    );

  }


  // ==========================================
  // MONTH
  // ==========================================

  static getMonth(interval) {

    const date = new Date();

    date.setMonth(
      date.getMonth() + interval
    );

    return this.formatDate(
      date,
      'dd MMMM yy'
    );

  }


  // ==========================================
  // MONTH 2
  // ==========================================

  static getMonth2(intervalDays) {

    const date = new Date();

    date.setDate(
      date.getDate() + intervalDays
    );

    return this.formatDate(
      date,
      'MMM yyyy'
    );

  }


  // ==========================================
  // YEAR
  // ==========================================

  static getYear(intervalyear) {

    const date = new Date();

    date.setFullYear(
      date.getFullYear() + intervalyear
    );

    return this.formatDate(
      date,
      'yyyy'
    );

  }


  // ==========================================
  // FUTURE DATE 1
  // dd MMMM yyyy
  // ==========================================

  static getFutureDate1(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'dd MMMM yyyy'
    );

  }


  // ==========================================
  // FORMATTED DATE
  // dd/MM/yyyy
  // ==========================================

  static getFormattedDate(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'dd/MM/yyyy'
    );

  }


  // ==========================================
  // SET DATE
  // ==========================================

  static async setDate(
    locator,
    dateValue
  ) {

    await locator.evaluate(
      (element, value) => {

        element.value = value;

        element.dispatchEvent(
          new Event(
            'input',
            {
              bubbles: true
            }
          )
        );

        element.dispatchEvent(
          new Event(
            'change',
            {
              bubbles: true
            }
          )
        );

      },
      dateValue
    );

  }


  // ==========================================
  // FUTURE DATE 2
  // dd MMMM 'yy
  // ==========================================

  static getFutureDate2(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      "dd MMMM 'yy"
    );

  }


  // ==========================================
  // FUTURE DATE 3
  // MMMM dd, yyyy
  // ==========================================

  static getFutureDate3(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'MMMM dd, yyyy'
    );

  }


  // ==========================================
  // FUTURE DATE 4
  // yyyy-MM-dd
  // ==========================================

  static getFutureDate4(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'yyyy-MM-dd'
    );

  }


  // ==========================================
  // FUTURE DATE 5
  // yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  // ==========================================

  static getFutureDate5(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    );

  }


  // ==========================================
  // FUTURE DATE 6
  // d
  // ==========================================

  static getFutureDate6(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'd'
    );

  }


  // ==========================================
  // FUTURE DATE 7
  // d MMM yyyy
  // ==========================================

  static getFutureDate7(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'd MMM yyyy'
    );

  }


  // ==========================================
  // FUTURE DATE 8
  // dd/MM/yyyy
  // ==========================================

  static getFutureDate8(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'dd/MM/yyyy'
    );

  }


  // ==========================================
  // FUTURE DATE 9
  // dd/MM/yyyy HH:mm:ss
  // ==========================================

  static getFutureDate9(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'dd/MM/yyyy HH:mm:ss'
    );

  }


  // ==========================================
  // FUTURE DATE 10
  // MMM dd, yyyy
  // ==========================================

  static getFutureDate10(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'MMM dd, yyyy',
      'en-US'
    );

  }


  // ==========================================
  // CURRENT MONTH INTEGER
  // ==========================================

  static getMonth_Integer() {

    return new Date().getMonth() + 1;

  }


  // ==========================================
  // CURRENT MONTH FULL
  // ==========================================

  static getMonth_Full() {

    return new Intl.DateTimeFormat(
      'en-US',
      {
        month: 'long'
      }
    ).format(
      new Date()
    );

  }


  // ==========================================
  // CURRENT MONTH SHORT
  // ==========================================

  static getMonth_Short() {

    return new Intl.DateTimeFormat(
      'en-US',
      {
        month: 'short'
      }
    ).format(
      new Date()
    );

  }


  // ==========================================
  // DAY OF MONTH
  // ==========================================

  static getDayOfTheMonth() {

    return String(
      new Date().getDate()
    );

  }


  // ==========================================
  // DAY COUNT IN YEAR
  // ==========================================

  static getDayCount() {

    const now = new Date();

    const start = new Date(
      now.getFullYear(),
      0,
      1
    );

    const diff =
      now.getTime() - start.getTime();

    return String(
      Math.floor(
        diff / 86400000
      ) + 1
    );

  }


  // ==========================================
  // CURRENT MINUTE
  // ==========================================

  static getMinuteOfTheHourAsString() {

    return String(
      new Date().getMinutes()
    );

  }


  // ==========================================
  // CURRENT YEAR
  // ==========================================

  static getYear() {

    return new Date().getFullYear();

  }


  // ==========================================
  // CURRENT HOUR
  // ==========================================

  static getHourOfTheDay() {

    return String(
      new Date().getHours()
    );

  }


  // ==========================================
  // CURRENT WEEK COUNT
  // ==========================================

  static getWeekCount() {

    const date = new Date();

    const firstDay =
      new Date(
        date.getFullYear(),
        0,
        1
      );

    const pastDays =
      Math.floor(
        (
          date.getTime() -
          firstDay.getTime()
        ) / 86400000
      );

    return String(
      Math.ceil(
        (
          pastDays +
          firstDay.getDay() +
          1
        ) / 7
      )
    );

  }


  // ==========================================
  // CONVERT EPROC API DATE
  // ==========================================

  static convertDate(date) {

    const parsedDate =
      this.parseDateTime(
        date,
        'api'
      );

    parsedDate.setHours(
      parsedDate.getHours() + 7
    );

    return this.formatDate(
      parsedDate,
      'dd MMM yyyy, HH:mm WIB'
    );

  }


  // ==========================================
  // CONVERT RAW DB DATE
  // ==========================================

  static convertDate2(date) {

    const parsedDate =
      this.parseDateTime(
        date,
        'db'
      );

    parsedDate.setHours(
      parsedDate.getHours() + 7
    );

    return this.formatDate(
      parsedDate,
      'dd MMM yyyy, HH:mm WIB'
    );

  }


  // ==========================================
  // FUTURE DATE PLAN
  // ==========================================

  static getFutureDate8Plan(n) {

    const date = new Date();

    date.setDate(
      date.getDate() + n
    );

    return this.formatDate(
      date,
      'dd-MM-yyyy HH:mm:ss.SSSSSS'
    );

  }


  // ==========================================
  // ASSERT DATE FORMAT SLASH
  // dd/MM/yyyy
  // ==========================================

  static assertDateFormatSlash(date) {

    const regex =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (!regex.test(date)) {

      throw new Error(
        `Invalid date format: ${date}. Expected dd/MM/yyyy`
      );

    }

    return true;

  }


  // ==========================================
  // ASSERT DATE FORMAT MINUS
  // dd-MM-yyyy
  // ==========================================

  static assertDateFormatMins(date) {

    const regex =
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;

    if (!regex.test(date)) {

      throw new Error(
        `Invalid date format: ${date}. Expected dd-MM-yyyy`
      );

    }

    return true;

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  static formatDate(
    date,
    format,
    locale = 'id-ID'
  ) {

    const monthsFull =
      new Intl.DateTimeFormat(
        locale,
        {
          month: 'long'
        }
      ).formatToParts(date);

    const monthsShort =
      new Intl.DateTimeFormat(
        locale,
        {
          month: 'short'
        }
      ).formatToParts(date);

    const monthFull =
      monthsFull.find(
        item => item.type === 'month'
      ).value;

    const monthShort =
      monthsShort.find(
        item => item.type === 'month'
      ).value;

    const values = {

      yyyy: String(
        date.getFullYear()
      ),

      yy: String(
        date.getFullYear()
      ).slice(-2),

      MM: String(
        date.getMonth() + 1
      ).padStart(2, '0'),

      M: String(
        date.getMonth() + 1
      ),

      MMMM: monthFull,

      MMM: monthShort,

      dd: String(
        date.getDate()
      ).padStart(2, '0'),

      d: String(
        date.getDate()
      ),

      HH: String(
        date.getHours()
      ).padStart(2, '0'),

      H: String(
        date.getHours()
      ),

      mm: String(
        date.getMinutes()
      ).padStart(2, '0'),

      m: String(
        date.getMinutes()
      ),

      ss: String(
        date.getSeconds()
      ).padStart(2, '0'),

      s: String(
        date.getSeconds()
      ),

      SSS: String(
        date.getMilliseconds()
      ).padStart(3, '0')

    };

    let result = format;

    // Literal 'text'
    result = result.replace(
      /'([^']*)'/g,
      (_, text) => `__LITERAL_${text}__`
    );

    const tokens = [
      'yyyy',
      'MMMM',
      'MMM',
      'MM',
      'M',
      'dd',
      'd',
      'HH',
      'H',
      'mm',
      'm',
      'ss',
      's',
      'SSS',
      'yy'
    ];

    for (const token of tokens) {

      result = result.replace(
        new RegExp(token, 'g'),
        values[token]
      );

    }

    result = result.replace(
      /__LITERAL_(.*?)__/g,
      '$1'
    );

    return result;

  }


  // ==========================================
  // PARSE DATE
  // ==========================================

  static parseDateTime(
    value,
    type
  ) {

    if (type === 'api') {

      const match =
        value.match(
          /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{6})Z$/
        );

      if (!match) {

        throw new Error(
          `Invalid API date: ${value}`
        );

      }

      const [
        ,
        year,
        month,
        day,
        hour,
        minute,
        second,
        micro
      ] = match;

      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
        Number(micro.slice(0, 3))
      );

    }


    if (type === 'db') {

      const match =
        value.match(
          /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{6})$/
        );

      if (!match) {

        throw new Error(
          `Invalid DB date: ${value}`
        );

      }

      const [
        ,
        year,
        month,
        day,
        hour,
        minute,
        second,
        micro
      ] = match;

      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
        Number(micro.slice(0, 3))
      );

    }

    throw new Error(
      `Unknown date type: ${type}`
    );

  }

}

module.exports = {
  DateAndTime
};