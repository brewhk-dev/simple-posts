Meteor.startup(function () {
	let postMaxLength = parseInt(process.env.SIMPLE_POST_MAX_LENGTH);
	if(isNaN(postMaxLength)) {
		postMaxLength = DEFAULT_POST_MAX_LENGTH
	}
	this.SIMPLE_POST_MAX_LENGTH = postMaxLength;

	this.ALLOW_GET_ALL_POSTS = !!process.env.ALLOW_GET_ALL_POSTS;
});