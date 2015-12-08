Schemata = {};

Schemata.Posts = new SimpleSchema({
	content: {
		type: String
	},
	author: {
		type: String
	},
	deletedAt: {
		type: Number,
		optional: true
	}
});

SimplePosts.attachSchema(Schemata.Posts);