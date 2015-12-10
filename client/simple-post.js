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

SimplePost.getPostCountByAuthor = function (author, callback) {
	check(author, String);
	check(callback, Function);
	Meteor.call('simplePostGetPostCountByAuthor', author, callback);
};

SimplePost.getPostsByAuthors = function (authors, callback) {
	check(authors, [String]);
	check(callback, Function);
	Meteor.call('simplePostGetPostsByAuthors', authors, callback);
};

SimplePost.getPostCountByAuthors = function (authors, callback) {
	check(authors, [String]);
	check(callback, Function);
	Meteor.call('simplePostGetPostCountByAuthors', authors, callback);
};

SimplePost.getLatestPostsByAuthor = function (author, limit, callback) {
	check(author, String);
	check(limit, Number);
	check(callback, Function);
	Meteor.call('simplePostGetLatestPostsByAuthorWithLimit', author, limit, callback);
};

SimplePost.getLatestPostsByAuthors = function (authors, limit, callback) {
	check(authors, [String]);
	check(limit, Number);
	check(callback, Function);
	Meteor.call('simplePostGetLatestPostsByAuthorsWithLimit', authors, limit, callback);
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

SimplePost.deleteOwnPosts = function (callback) {
	check(callback, Function);
	if (Meteor.userId()) {
		Meteor.call('simplePostDeleteOwnPosts', callback);
		
	} else if (typeof callback === "function") {
		callback(new Meteor.Error(401, 'Error 401: Unauthorized', "User must be logged in to delete posts."), null);
	}
};