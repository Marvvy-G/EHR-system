var s3 = require('s3');


module.exports = function (file) {

    return new Promise((resolve, reject) => {

        try {
            var client = s3.createClient({
                maxAsyncS3: 20,     // this is the default
                s3RetryCount: 3,    // this is the default
                s3RetryDelay: 1000, // this is the default
                multipartUploadThreshold: 20971520, // this is the default (20 MB)
                multipartUploadSize: 15728640, // this is the default (15 MB)
                s3Options: {
                    accessKeyId: "8kp4JmOkV4Vs1ptH",
                    secretAccessKey: "PY0qcbPO2QMs7vYHVbCSZFJz4TwLH4whP5F2J00n",
                    // any other options are passed to new AWS.S3()
                    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
                },
            });

            const params = {
                Bucket: "ehr",
                Key: 'jso',
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            };

            console.log(params)

            var uploader = client.uploadFile(params);

            uploader.on('error', function (err) {
                console.error("unable to upload:", err.stack);
                reject(err.stack)
            });

            uploader.on('progress', function () {
                console.log("progress", uploader.progressMd5Amount,
                    uploader.progressAmount, uploader.progressTotal);
            });

            uploader.on('data', function (data) {
                console.log(data)
                resolve(data.Location)

                // return data.Location;
            });

            uploader.on('end', function () {
                console.log("done uploading");
            });
        } catch (err) {
            console.error(err);
        }

    })

}