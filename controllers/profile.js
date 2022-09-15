const handleProfile = (req, res, db) => {
    const { id } = req.params;
    //let found = false;
    db.select('*').from('users').where({ id })
        .then(user => {
            res.json(user[0]);
        })
    /*     database.user.forEach(user => {
            if (user.id === id) {
                found = true;
                return res.json(user);
            }
        })
        if (!found) {
            res.status(400).json('not found');
        } */
}
module.exports = {
    handleProfile
    //handleProfile:handleProfile
}