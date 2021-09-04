const AWS = require("aws-sdk");
const config = require("../config");
const AppError = require("../errors/appError");
const logger = require("../loaders/logger");

class ImageRepository {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.privateAccessKey,
    });
  }

  async uploadImage(name, image, type) {
    const Key = `${name}.${type.split("/")[1]}`;
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key,
        Body: image,
        ContentType: type,
        ACL: "public-read",
      };
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(new AppError(err.message, 502));
        }

        logger.info(`####### Image Location: ${data.location}`);
        resolve(`https://${config.aws.s3BucketName}.s3.amazonaws.com/${Key}`);
      });
    });
  }

  async deleteImage(Key) {
    Key = Key.split("/")[3];
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key,
      };
      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          reject(new AppError(err.message, 502));
        }
        resolve(true);
      });
    });
  }
}

module.exports = ImageRepository;
