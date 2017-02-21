/* global hexo */

'use strict'

const commandExists = require('command-exists')
const spawn = require('hexo-util/lib/spawn')
const jsonfile = require('jsonfile')

hexo.extend.deployer.register('now', function (args) {
  let log = this.log
  let publicDir = this.public_dir

  if (!args.name) {
    const HELP = [
      'You need to setup now API token and assign your app name first',
      'If you are not familiar with Zeit now, please go look their howto first:',
      'https://zeit.co/now'
    ]

    return console.log(HELP.join('\n'))
  }

  commandExists('now')
  .then(function () {
    let config = {
      name: args.name,
      type: 'npm'
    }
    if (args.alias) config['alias'] = args.alias

    log.info('now.json: ', config)
    jsonfile.writeFileSync(`${publicDir}/now.json`, config)

    return spawn('now', publicDir, {verbose: true})
  })
  .catch(function () {
    const HELP = [
      'Need install & setup now-cli first',
      'https://zeit.co/now#get-started'
    ]

    return console.log(HELP.join('\n'))
  })
})
