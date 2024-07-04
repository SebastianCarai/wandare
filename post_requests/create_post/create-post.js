import crypto from 'crypto';
import supabase from '../../externals/supabaseConnectionSDK.js';
import { s3,bucketName } from '../../externals/s3bucket.js';
import imageToS3 from '../../externals/img_to_s3.js'

const createPost = async (req, res) => {

    try {
        // Get data from request body
        const {authorId, title, description, thumbnails, duration, stages, price, whatToWear, requiredDocuments, mapCenter, mapZoom} = req.body;
    
        // Function that generates string for image name
        // This name will be used to generate SignedUrl for s3 images
        const randomImageName = () => crypto.randomBytes(32).toString('hex');
    
        const imagesNames = []
        // Add image name to array
        // Save images to s3 bucket
        thumbnails.forEach(async image => {
            const imageName = randomImageName();
            imagesNames.push(imageName);
            await imageToS3(image, imageName, s3, bucketName);
        });
    
        // Add post data to db and then get the result
        const { data, error } = await supabase
        .from('test_posts')
        .insert([{ 
            'author_id': authorId,
            'post_title' : title, 
            'post_duration' : duration,
            'thumbnails' : imagesNames,
            'description' : description,
            'pricing' : price,
            'what_to_wear' : whatToWear,
            'required_documents': requiredDocuments,
            'map_center' : mapCenter,
            'map_zoom' : mapZoom
         }])
        .select('id')
        .single()
    
        // Handle responses from db
        if(error){
            console.log(error);
        }
        const post = data;
        post.stages = [];
    
        // For each stage
        for (const stage of stages){
            // Images name of each stage (will be used to get SignedUrl)
            const stageImagesNames = [];
    
            // For each image of the stage
            for (const stageImage of stage.images){
                // Add image name to array
                const stageImageName = randomImageName();
                stageImagesNames.push(stageImageName);
                // Save image to S3 bucket
                await imageToS3(stageImage, stageImageName, s3, bucketName);
            }
    
            // Add record in stage table
            const { data:stageData, stagesError } = await supabase
            .from('test_stages')
            .insert({ 
                'name' : stage.name, 
                'stage_type' : stage.stageType,
                'marker' : stage.marker,
                'images': stageImagesNames,
                'description' : stage.description,
                'post_id': post.id,                
            })
    
            if(stagesError){
                console.log(stagesError)
            }         
        };
        
        res.json(post.id);

    } catch (error) {
        res.sendStatus(500).json({msg: error})
    }
    


}

export default createPost