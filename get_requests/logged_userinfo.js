import supabase from '../externals/supabaseConnectionSDK.js';
import getImageUrl from '../externals/signed_urls.js';

const getLoggedUserInfo = async (req, res) => {
    const id = req.body.tokenDetails.id;

    const { data, error } = await supabase
    .from('users')
    .select('id, username , email, profile_image')
    .eq('id', id)
    .single()

    if(error){
        res.json(error);
    }

    const imageUrl = await getImageUrl(data.profile_image, 604800);
    data.imageUrl = imageUrl;

    res.json(data);
}

export default getLoggedUserInfo