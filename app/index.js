var path = require('path')
  , yeoman = require('yeoman-generator')
  , defaults = {
    baseFileName: 'index'
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
      , libName = extractLib(this._, this.appname)

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


  userInfo: function () {
    var done = this.async()

    githubUserInfo(this.githubUser, function (res) {
      this.realname = res.name
      this.email = res.email
      this.githubUrl = res.html_url
      done()
    }.bind(this))
  },

  bower: function () {
    this.template('_bower.json', 'bower.json')
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json')
  },

  git: function () {
    this.copy('gitignore', '.gitignore')
  },

  projectFiles: function () {
    this.template('index-tmpl.js', this.baseFileName + '.js')
    this.template('test-tmpl.js', 'test.js')
    this.template('README.md', 'README.md')
    this.template('LICENSE.md', 'LICENSE.md')
  },

  install: function () {
    this.installDependencies({
      bower: true,
      npm: true,
      skipInstall: this.options['skip-install']
    })
  }
})

function extractLib (_, appname) {
  var slugged = _.slugify(appname)
  var match = slugged.match(/^generator-(.+)/)

  if (match && match.length === 2) {
    return match[1].toLowerCase()
  }

  return slugged
}

function toCamelCase (input) {
  return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase()
  })
}

function githubUserInfo (name, cb) {
  if (name === 'opudalo') return cb({
    name: 'Eugene Chechurin',
    email: 'e.chechurin@gmail.com',
    html_url: 'https://github.com/opudalo'
  })

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
    console.log(res)
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
