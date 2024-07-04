import supabase from '../externals/supabaseConnectionSDK.js';
import getImageUrl from '../externals/signed_urls.js';

const homeFeed = async (req, res) => {
    const userId = req.body.tokenDetails.id;
    
    // Get most complete posts
    const {data, error} = await supabase
    .from('test_posts')
    .select('id, post_title, post_duration, thumbnails, author_id')
    .neq('author_id',userId)
    .neq('description', null)
    .neq('pricing', null)
    .neq('what_to_wear', null)
    .neq('pricing', null)
    .neq('required_documents', null)
    .limit(5)

    if(error){
        res.sendStatus(500).json({msg:error})
    }

    // For each post get author username
    for (const post of data){

        const postImages = []
        post.thumbnails.forEach(async image => {
            postImages.push(await getImageUrl(image));
        });

        const {data: postAuthor, postAuthorError} = await supabase
        .from('users')
        .select('username')
        .eq('id', post['author_id'])
        .single()


        if(postAuthorError){
            res.sendStatus(500).json({msg:postAuthorError})
        }

        post.images = postImages
        post.author = postAuthor.username;
    }

    res.json(data);
}

export default homeFeed