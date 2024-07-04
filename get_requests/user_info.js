import supabase from '../externals/supabaseConnectionSDK.js';
import getImageUrl from '../externals/signed_urls.js';

const getUserInfo = async (req, res) => {
    const username = req.params.username;

    const { data, error } = await supabase
    .from('users')
    .select('id, username , profile_image')
    .eq('username', username)
    .single()

    if(error){
        res.json(error);
    }

    const imageUrl = await getImageUrl(data.profile_image, 604800);
    data.imageUrl = imageUrl;

    res.json(data);
}

export default getUserInfo