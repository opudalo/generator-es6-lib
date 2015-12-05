var slugify = require("underscore.string/slugify")
var mkdirp = require('mkdirp')
var yeoman = require('yeoman-generator')
  , defaults = {
    baseFileName: 'index',
    githubUser: {
      name: 'Eugene Chechurin',
      email: 'e.chechurin@gmail.com',
      html_url: 'https://github.com/opudalo'
    }
  }


module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json')
    this.currentYear = (new Date()).getFullYear()
  },

  askForUsername: function () {
    var done = this.async()
      , prompts = [{
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: (process.env && process.env.USER !== undefined) ? process.env.USER : 'username'
      }]

    this.prompt(prompts, function (props) {
      this.githubUser = props.githubUser

      done()
    }.bind(this))
  },

  askForLib: function () {
    var done = this.async()
      , libName = extractLib(this.appname)

    var prompts = [{
      name: 'libName',
      message: 'What\'s the name of your project?',
      default: libName
    }]

    this.prompt(prompts, function (props) {
      this.libName = props.libName
      this.baseFileName = defaults.baseFileName
      this.exportName = toCamelCase(this.libName)

      done()
    }.bind(this))
  },

  askForLibDescription: function () {
    var done = this.async()
      , prompts = [{
        name: 'libDescription',
        message: 'Briefly describe your library:',
        default: this.libName + ' micro library'
      }]

    this.prompt(prompts, function (props) {
      this.libDescription = props.libDescription

      done()
    }.bind(this))
  },

  askForEs5mode: function () {
    var done = this.async()
      , prompts = [{
        type: "list",
        name: 'es5mode',
        message: 'Force es5 only mode (optional):',
        choices: [{
          name: 'no, thanks',
          value: false
        }, {
          name: 'yes, please',
          value: true
        }],
        default: 0
      }]

    this.prompt(prompts, function (props) {
      this.es5mode = props.es5mode

      done()
    }.bind(this))
  },

  askForTestEnvironment: function () {
    var done = this.async()
      , prompts = [{
        type: "list",
        name: 'testEnvironment',
        message: 'Select test environment:',
        choices: ['browser', 'node']
      }]

    this.prompt(prompts, function (props) {
      this.testEnvironment = props.testEnvironment

      done()
    }.bind(this))
  },

  userInfo: function () {
    var done = this.async()

    githubUserInfo(this.githubUser, function (res) {
      this.realname = res.name
      this.email = res.email
      this.githubUrl = res.html_url
      done()
    }.bind(this))
  },

  projectFiles: function () {
    mkdirp.sync('src');
    mkdirp.sync('test');
    mkdirp.sync('lib');

    this.template(this.es5mode ? 'src/_index_es5.js' : 'src/_index.js', 'src/' + this.baseFileName + '.js')
    this.template(this.es5mode ? 'test/_test_es5.js' : 'test/_test.js', 'test/test.js')
    this.template('_README.md', 'README.md')
    this.template('_LICENSE.md', 'LICENSE.md')
    this.template('_package.json', 'package.json')
    this.template('_gulpfile.js', 'gulpfile.js')

    this.copy('test/runner.html', 'test/runner.html')
    this.copy('gitignore', '.gitignore')
  },

  install: function () {
    this.installDependencies({
      npm: true,
      skipInstall: this.options['skip-install']
    })
  }
})

function extractLib (appname) {
  var slugged = slugify(appname)
  var match = slugged.match(/^generator-(.+)/)

  if (match && match.length === 2) return match[1].toLowerCase()

  return slugged
}

function toCamelCase (input) {
  return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase()
  })
}

function githubUserInfo (name, cb) {
  if (name === 'opudalo') return cb(defaults.githubUser)

  var GithubApi = require('github')
    , proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null
    , config = {
      version: '3.0.0'
    }
    , github

  if (proxy) config.proxy = getProxy()

  github = new GithubApi(config)

  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) throw new Error(err.message + '\n\nCannot fetch your github profile. Make sure you\'ve typed it correctly.')
    cb(JSON.parse(JSON.stringify(res)))
  })
}

function getProxy() {
  var proxyUrl = url.parse(proxy)
    , url = require('url')
  return {
    host: proxyUrl.hostname,
    port: proxyUrl.port
  }
}
