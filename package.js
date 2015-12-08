Package.describe({
  name: 'brewhk:simple-post',
  version: '0.1.0',
  summary: 'A simple twitteresque publishing library',
  git: 'https://github.com/brewhk/simple-post.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('check');
  api.use('mongo');
  api.use('aldeed:collection2@2.5.0');
  api.use('stevezhu:lodash@0.0.0 || 1.0.0 || 3.0.0');
  api.use(['templating'], 'client');
  api.addFiles('lib/defaults.js', ['client', 'server']);
  api.addFiles('lib/collections.js', ['client', 'server']);
  api.addFiles('server/functions.js', 'server');
  api.addFiles('server/startup.js', 'server');
  api.addFiles('server/schema.js', 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/publications.js', 'server');
  api.addFiles('client/simple-post.js', 'client');
  api.export('SimplePost', 'client');
  api.export('SimplePosts', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('brewhk:simple-post');
  api.addFiles('simple-post-tests.js');
});
