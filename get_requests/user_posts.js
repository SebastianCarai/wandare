import supabase from '../externals/supabaseConnectionSDK.js';
import getImageUrl from '../externals/signed_urls.js';

const getUserPosts = async (req, res) => {
    const id = req.params.id;

    if(id == 'undefined'){
        res.sendStatus(500).json({msg: 'Error'})
    }

    const {data, error} = await supabase
    .from('test_posts')
    .select()
    .eq('author_id', id)


    for (const post of data){
        const imagesUrl = [];
        
        for (const image of post.thumbnails){
            imagesUrl.push(await getImageUrl(image));
        }

        post.images = imagesUrl;
    }


    res.json(data);
}

export default getUserPosts