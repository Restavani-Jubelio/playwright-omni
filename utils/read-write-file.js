const fs = require('fs');
const path = require('path');

const RESOURCES_DIR =
  path.resolve(
    __dirname,
    '..',
    'Resources'
  );

class ReadAndWriteFile {

  static getFilePath(fileLocation) {

    return path.join(
      RESOURCES_DIR,
      fileLocation
    );

  }


  static writeString(fileLocation, stringData) {

    try {

      const filePath =
        this.getFilePath(fileLocation);

      const directory =
        path.dirname(filePath);

      if (!fs.existsSync(directory)) {

        fs.mkdirSync(directory, {
          recursive: true
        });

      }

      fs.writeFileSync(
        filePath,
        stringData,
        'utf8'
      );

      return filePath;

    } catch (error) {

      console.error(
        `Failed to write file: ${fileLocation}`,
        error
      );

      return fileLocation;
    }

  }


  static async waitFileToExist(
    fileLocation,
    timeout = 30000
  ) {

    const filePath =
      this.getFilePath(fileLocation);

    const startTime =
      Date.now();

    while (!fs.existsSync(filePath)) {

      if (
        Date.now() - startTime >= timeout
      ) {

        throw new Error(
          `File not found within ${timeout}ms: ${filePath}`
        );

      }

      await new Promise(
        resolve => setTimeout(resolve, 1000)
      );

    }

    return filePath;

  }


  static readString(fileLocation) {

    try {

      const filePath =
        this.getFilePath(fileLocation);

      return fs
        .readFileSync(
          filePath,
          'utf8'
        )
        .trim();

    } catch (error) {

      console.error(
        `Failed to read file: ${fileLocation}`,
        error
      );

      return '';

    }

  }


  static deleteFile(fileLocation) {

    try {

      const filePath =
        this.getFilePath(fileLocation);

      if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        console.log(
          `Deleted the file: ${filePath}`
        );

        return true;

      }

      console.log(
        `File not found: ${filePath}`
      );

      return false;

    } catch (error) {

      console.error(
        `Failed to delete file: ${fileLocation}`,
        error
      );

      return false;
    }

  }


  static generateJsonName(
    cls,
    description
  ) {

    const className =
      typeof cls === 'string'
        ? cls
        : cls.name;

    return `${className}_${description}.json`;

  }

}

module.exports = {
  ReadAndWriteFile
};