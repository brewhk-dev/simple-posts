SimplePost = {};

SimplePost.addPost = function (postContent, callback) {
	check(postContent, String);
	check(callback, Function);
	if (Meteor.userId()) {
		Meteor.call('simplePostAddPost', postContent, callback);
	} else if (typeof callback === "function") {
		callback(new Meteor.Error(401, 'Error 401: Unauthorized', "User must be logged in to add new posts."), null);
	}
};

SimplePost.getPost = function (id, callback) {
	check(id, String);
	check(callback, Function);
	Meteor.call('simplePostGetPost', id, callback);
};

SimplePost.getPosts = function (ids, callback) {
	check(ids, [String]);
	check(callback, Function);
	Meteor.call('simplePostGetPosts', ids, callback);
};

SimplePost.getPostsByAuthor = function (author, callback) {
	check(author, String);
	check(callback, Function);
	Meteor.call('simplePostGetPostsByAuthor', author, callback);
};

SimplePost.getAllPosts = function (callback) {
	check(callback, Function);
	Meteor.call('simplePostGetAllPosts', callback);
};

SimplePost.editPost = function (id, newPostContent, callback) {
	check(id, String);
	check(newPostContent, String);
	check(callback, Function);
	if (Meteor.userId()) {
		Meteor.call('simplePostEditPost', id, newPostContent, callback);
	} else if (typeof callback === "function") {
		callback(new Meteor.Error(401, 'Error 401: Unauthorized', "User must be logged in to edit posts."), null);
	}
};

SimplePost.deletePost = function (id, callback) {
	check(id, String);
	check(callback, Function);
	if (Meteor.userId()) {
		Meteor.call('simplePostDeletePost', id, callback);
	} else if (typeof callback === "function") {
		callback(new Meteor.Error(401, 'Error 401: Unauthorized', "User must be logged in to delete posts."), null);
	}
};