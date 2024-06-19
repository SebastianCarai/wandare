import db from '../dbconnection.js'

const getLoggedUserInfo = async (req, res) => {
    const id = req.body.tokenDetails.id;
    const userDetails = await db.query(`SELECT id,username,email FROM users WHERE id=$1`, [id])

    res.json(userDetails.rows[0]);
}

export default getLoggedUserInfo