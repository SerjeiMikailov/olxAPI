module.exports = {
    private: async (req, res, next) => {
        if(!req.query.token && !req.body.token) {
            res.json({notAllowed: true})
        }

        let token = '';
        if(req.query.token) {
            token = req.query.token
        }
        if(req.body.token) {
            token = req.body.token
        }

        const user = await User.findOne({token})

        if(!user) {
            res.json({notAllowed: true});
            return;
        }

        next();
    }
}