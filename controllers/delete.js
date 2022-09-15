const handleDelete = (db) => (req, res) => {
    db('users').where('id', req.params.id)
        .del()
        .then(res.json({ seccess: true }))
        .catch(err => res.status(400).json("unable to delete"))

    /*     db('login').where('id', req.params.id)
            .del()
            .then(res.json({ seccess: true }))
            .catch(err => res.status(400).json("unable to delete 2")) */

}

module.exports = {
    handleDelete
}