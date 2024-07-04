import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3,bucketName } from '../externals/s3bucket.js';


const getImageUrl = async (image, expirationTime) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: image
    });
    const url = await getSignedUrl(s3, command, { expiresIn: expirationTime ? expirationTime : 3600 });
    return url
}

export default getImageUrl;