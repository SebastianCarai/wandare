import db from '../dbconnection.js'

const getLoggedUserInfo = async (req, res) => {
    const id = req.body.tokenDetails.id;
    const userDetails = await db.query(`SELECT id,username,email FROM test_users WHERE id=$1`, [id])

    console.log(userDetails.rows[0]);
    res.json(userDetails.rows[0]);
}

export default getLoggedUserInfo