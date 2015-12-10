Meteor.methods({
	'simplePostAddPost': function (content) {
		check(content, String);
		if(content.length > SIMPLE_POST_MAX_LENGTH) {
			throw new Meteor.Error(400, 'Error 404: Bad Request', "The length of the post exceed the character limit of " + SIMPLE_POST_MAX_LENGTH + " characters.");
		}
		return SimplePosts.insert({
			_id: incrementCounter('simple_post_counter', 'postIds').toString(),
			content: content,
			author: this.userId,
			createdAt: getTimestampNow()
		});
	},
	'simplePostGetPost': function (id) {
		check(id, String);
		return SimplePosts.findOne({
			_id: id,
			deletedAt: {
				$exists: false
			}
		});
	},
	'simplePostGetPosts': function (ids) {
		check(ids, [String]);
		return SimplePosts.find({
			_id: {$in: ids},
			deletedAt: {
				$exists: false
			}
		}).fetch();
	},
	'simplePostGetPostsByAuthor': function (author) {
		check(author, String);
		return SimplePosts.find({
			author: author,
			deletedAt: {
				$exists: false
			}
		}).fetch();
	},
	'simplePostGetPostCountByAuthor': function (author) {
		check(author, String);
		return SimplePosts.find({
			author: author,
			deletedAt: {
				$exists: false
			}
		}).count();
	},
	'simplePostGetPostsByAuthors': function (authors) {
		check(author, [String]);
		return SimplePosts.find({
			author: {
				$in: authors
			},
			deletedAt: {
				$exists: false
			}
		}).fetch();
	},
	'simplePostGetPostCountByAuthors': function (authors) {
		check(author, [String]);
		return SimplePosts.find({
			author: {
				$in: authors
			},
			deletedAt: {
				$exists: false
			}
		}).count();
	},
	'simplePostGetLatestPostsByAuthorWithLimit': function (author, limit) {
		check(author, String);
		check(limit, Number);
		return SimplePosts.find({
			author: author,
			deletedAt: {
				$exists: false
			}
		}, {
			limit: limit,
			sort: {
				createdAt: -1
			}
		}).fetch();
	},
	'simplePostGetLatestPostsByAuthorsWithLimit': function (authors, limit) {
		check(authors, [String]);
		check(limit, Number);
		return SimplePosts.find({
			author: {
				$in: authors
			},
			deletedAt: {
				$exists: false
			}
		}, {
			limit: limit,
			sort: {
				createdAt: -1
			}
		}).fetch();
	},
	'simplePostGetAllPosts': function () {
		if(ALLOW_GET_ALL_POSTS) {
			return SimplePosts.find({
				deletedAt: {
					$exists: false
				}
			}).fetch();	
		}
		throw new Meteor.Error(403, 'Error 404: Forbidden', "The administrators of the application has forbidden the fetching to all posts. You must specify the posts you wish to fetch to specifically, using another method.");
	},
	'simplePostEditPost': function (id, newContent) {
		check(id, String);
		check(newContent, String);
		if(newContent.length > SIMPLE_POST_MAX_LENGTH) {
			throw new Meteor.Error(400, 'Error 404: Bad Request', "The length of the post exceed the character limit of " + SIMPLE_POST_MAX_LENGTH + " characters.");
		}
		return SimplePosts.update({
			_id: id,
			author: this.userId
		}, {
			$set: {
				content: newContent
			}
		});
	},
	'simplePostDeletePost': function (id) {
		check(id, String);
		return SimplePosts.update({
			_id: id,
			author: this.userId
		}, {
			$set: {
				deletedAt: getTimestampNow()
			}
		});
	},
	'simplePostDeleteOwnPosts': function () {
		return SimplePosts.update({
			author: this.userId
		}, {
			$set: {
				deletedAt: getTimestampNow()
			}
		}, {
			multi: true
		});
	}
});