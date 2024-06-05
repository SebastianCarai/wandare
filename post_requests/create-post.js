import db from '../dbconnection.js'

const createPost = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    res.json(req.body)
}

export default createPost