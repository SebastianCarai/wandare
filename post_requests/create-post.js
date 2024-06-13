import db from '../dbconnection.js'

const createPost = async (req, res) => {
    console.log('Bodys');

    res.json(req.body)
}

export default createPost