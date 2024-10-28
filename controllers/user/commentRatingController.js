const Comments = require('../../models/commentsSchema');

// getting user id from session
function getUserIdFromSession(req) {
    return req.session?._id ?? req.session.passport?.user;
}

const addComment = async (req, res) => {
    try {

        const { productId, comment } = req.body;

        const userId = getUserIdFromSession(req);

        const commentExixt = await Comments.findOne({ productId });

        if (commentExixt) {
            await Comments.updateOne({ productId }, { $push: { comments: { userId, comment } } })
        } else {
            const newComment = new Comments({
                productId,
                comments: [
                    {
                        userId,
                        comment,
                    },
                ],
            });

            await newComment.save();

        }

        res.redirect(`/product/${productId}`)

    } catch (error) {

        console.log(error);
        res.render('user/pageNotFound')
    }
};

module.exports = {
    addComment,
};
