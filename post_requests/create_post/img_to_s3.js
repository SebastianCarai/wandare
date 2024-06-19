import {PutObjectCommand} from '@aws-sdk/client-s3';
import { fileTypeFromBuffer } from 'file-type';

export default async (image, randomImageName, s3, bucketName) => {
    
    const imageName = randomImageName;

    const base64 = image.base64.split(",");
    // console.log(base64[1]);
    const buffer = Buffer.from(base64[1], "base64");

    const mimetype = await fileTypeFromBuffer(buffer);

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: mimetype.mime
    }

    const command = new PutObjectCommand(params)
    try {
        const response = await s3.send(command);
        console.log('Image uploaded successfully ' + response);
    } catch (error) {
        console.log(error);
    }
}