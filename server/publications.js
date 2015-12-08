Meteor.publish('simplePost', function (id) {
	check(id, String);
	return SimplePosts.find({
		_id: id,
		deletedAt: {
			$exists: false
		}
	});
});

Meteor.publish('simplePosts', function (ids) {
	check(ids, [String]);
	return SimplePosts.find({
		_id: {$in: ids},
		deletedAt: {
			$exists: false
		}
	});
});

Meteor.publish('simplePostsByAuthor', function (author) {
	check(author, String);
	return SimplePosts.find({
		author: author,
		deletedAt: {
			$exists: false
		}
	});
});

Meteor.publish('simplePostsAll', function () {
	if(ALLOW_GET_ALL_POSTS) {
		return SimplePosts.find({
			deletedAt: {
				$exists: false
			}
		});	
	}
	this.error(new Meteor.Error(403, 'Error 404: Forbidden', "The administrators of the application has forbidden the subscription to all posts. You must specify the posts you wish to subscribe to specifically, by subscribing to another publication."));
});