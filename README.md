# simple-post
A simple twitteresque publishing library

### Overview

`brewhk:simple-post` provides a `SimplePost` object containing functions you'd need to add, edit, delete and read posts. It also publishes the `SimplePosts` collection for you to do more sophisticated queries with.

### Schema

Every SimplePost document follows the following schema.

<table>
  <tr>
    <th>Property Name</th>
    <th>Type</th>
    <th>Mandatory</th>
  </tr>
  <tr>
    <td>content</td>
    <td>String</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>author</td>
    <td>String</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>deletedAt</td>
    <td>Number</td>
    <td>No</td>
  </tr>
</table>

### Usage

First, add the package from Atmosphere.

    meteor add brewhk:simple-post

##### Adding Post

    SimplePost.addPost(postContent, callback)

Callback is called with two objects - `error` and `result`. `result` will be the `_id` of the post document.

##### Editing Post

    SimplePost.editPost(id, newPostContent, callback)

Callback is called with two objects - `error` and `result`. `result` will be `1` on success, `0` if no document matched.

##### Retrieving Post(s)

There are two ways to retrieve posts - using Meteor methods or using subscription / publication.

###### Using methods

    SimplePost.getPost(id, callback) // id is the _id of the SimplePost

Callback is called with two objects - `error` and `result`. `result` will be the SimplePost document on success, or `undefined` if no document matched.

    SimplePost.getPosts(ids, callback) // `ids` is an array of SimplePost _id
    SimplePost.getPostsByAuthor(author, callback) // author is _id of the author
    SimplePost.getAllPosts(callback)

Callback is called with two objects - `error` and `result`. `result` will be an array of matched SimplePost documents on success, or an empty array if no document matched.

###### Using Publish & Subscribe

`brewhk:simple-post` provides the `SimplePosts` collection which you can subscribe to. Using subscription gives you more control over when the data is retrieved, and may allows you to perform more complex operations client-side.

`brewhk:simple-post` provides the following subscriptions, which serves identical functions to the methods above:

    simplePost(id)
    simplePosts(ids)
    simplePostsByAuthor(author)
    simplePostsAll()

##### Deleting Post

`brewhk:simple-post` performs soft-deletes.

    SimplePost.deletePost(id, callback)

Callback is called with two objects - `error` and `result`. `result` will be `1` on success, `0` if no document matched.

### Settings

You can override default values by providing these environment variables.

* `SIMPLE_POST_MAX_LENGTH` - Set the maximum length for each post, defaults to `200`
* `ALLOW_GET_ALL_POSTS` - Set whether you'd allow clients to fetch or subscribe to all posts data (i.e. use `SimplePost.getAllPosts(callback)` or `Meteor.subscribe('simplePostsAll')`), defaults to `false`