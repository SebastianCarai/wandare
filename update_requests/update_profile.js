import bcrypt from 'bcrypt';
import crypto from 'crypto';
import supabase from '../externals/supabaseConnectionSDK.js';
import { s3,bucketName } from '../externals/s3bucket.js';
import imageToS3 from '../externals/img_to_s3.js'

const updateProfile = async (req, res) => {
    const id = req.body.tokenDetails.id;
    const typedPassword = req.body.password;
    const {username, email, isNewImage, profileImage } = req.body;
    
    const randomImageName = () => crypto.randomBytes(32).toString('hex');

    let update = {};
    
    if(isNewImage){
        const imageName = randomImageName();
        await imageToS3({base64: profileImage}, imageName, s3, bucketName);
        update = { username: username, email: email, profile_image : imageName};
    }else{
        update = { username: username, email: email };
    }

    // Check if password match
    try {
        const {data, err} = await supabase
        .from('users')
        .select()
        .single()
        .eq('id', id)

        const isMatch = await bcrypt.compare(typedPassword, data.password);
        

        // If password is right update the profile
        if(isMatch){
            const { error } = await supabase
            .from('users')
            .update(update)
            .eq('id', id);

            res.sendStatus(200)
        }
        // If password don't match throw error
        else{
            res.sendStatus(403).json({msg: 'Wrong password'})
        }

    } catch (error) {
        throw error
    }
}

export default updateProfile
