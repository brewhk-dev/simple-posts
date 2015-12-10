Schemata = {};

Schemata.Posts = new SimpleSchema({
	content: {
		type: String
	},
	author: {
		type: String
	},
	createdAt: {
		type: Number,
		decimal: false
	},
	deletedAt: {
		type: Number,
		decimal: false,
		optional: true
	}
});

SimplePosts.attachSchema(Schemata.Posts);