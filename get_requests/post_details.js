import supabase from "../supabaseConnectionSDK.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3,bucketName } from '../s3bucket.js';

const getPostDetails = async (req, res) => {
    const postId = req.params.id;

    const { data:postData, postError } = await supabase
    .from('test_posts')
    .select()
    .single()
    .eq('id', postId)  
    
    if(postError){
        res.sendStatus(500).json({msg: postError});
    }

    postData.signedUrls = [];
    for (const image of postData.thumbnails){

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: image
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        postData.signedUrls.push(url)
    }

    const { data:stagesData, stagesError } = await supabase
    .from('test_stages')
    .select()
    .eq('post_id', postId)  

    if(stagesError){
        res.sendStatus(500).json({msg: postError});
    }

    postData.stages = stagesData;

    res.json(postData)
}

export default getPostDetails