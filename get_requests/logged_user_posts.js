import db from '../externals/dbconnection.js'

const getMyPosts = async (req, res) =>{
    const loggedUserID = req.body.id

    try {
        const myPosts = await db.query(`SELECT * FROM test_posts WHERE author_id=$1`, [loggedUserID])

        res.json(myPosts.rows)
    } catch (error) {
        throw error
    }


}

export default getMyPosts