import supabase from "../externals/supabaseConnectionSDK.js";
import getImageUrl from '../externals/signed_urls.js';

const getPostDetails = async (req, res) => {
    // Get postId from the url
    const postId = req.params.id;

    // get post info
    const { data:postData, postError } = await supabase
    .from('test_posts')
    .select()
    .single()
    .eq('id', postId)  
    
    if(postError){
        res.sendStatus(500).json({msg: postError});
    }

    // Generate signed urls for images
    postData.signedUrls = [];
    for (const image of postData.thumbnails){

        const imageUrl = await getImageUrl(image);
        postData.signedUrls.push(imageUrl);
    }

    // Get info about the post author
    const { data:authorData, authorError } = await supabase
    .from('users')
    .select('username, profile_image')
    .eq('id', postData.author_id)
    .single()

    if(authorError){
        res.sendStatus(500).json({msg: authorError});
    }
    const profileImage = await getImageUrl(authorData.profile_image);
    postData.authorInfo = {
        username : authorData.username,
        profileImage : profileImage
    };

    // Get data for all stages
    const { data:stagesData, stagesError } = await supabase
    .from('test_stages')
    .select()
    .eq('post_id', postId) 

    if(stagesError){
        res.sendStatus(500).json({msg: postError});
    }
    postData.stages = stagesData;

    // Foreach stage get images signed Url
    for (const stage of postData.stages){
        const imagesUrl = [];
        for (const image of stage.images){
            imagesUrl.push(await getImageUrl(image));
        }

        stage.imagesUrl = imagesUrl;
    }

    res.json(postData)
}

export default getPostDetails