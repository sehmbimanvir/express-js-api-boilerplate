import User from '../models/user'
export default {
    list(req, res) {
        User.find({}, (err, users) => {
            res.send(users)
        })
    },
    show(req, res) {
        User.findById(req.params.id, (err, user) => {
            res.send(user)
        })
    },
    store(req, res) {
        let user = new User(req.body)
        user.save((err, result) => {
            res.send(result)
        })
    }
}