'use strict'
const fs = require('hexo-fs')
const path = require('path')
const nowClient = require('now-client')

hexo.extend.deployer.register('now', function (args, callback) {
  if (!args.token || args.name) {
    const HELP = [
      'You need to setup now API token and assign your app name first',
      'If you are not familiar with Zeit now, please go look their howto first:',
      'https://zeit.co/api'
    ]

    console.log(HELP.join('\n'))
    return callback()
  }

  const nowDeployer = new nowClient(args.token)

  let deployData = {}
  fs.listDir(hexo.public_dir, {
    ignoreHidden: true
  }, function (err, data) {
    if (err) return callback(err)

    data.forEach(function (item) {
      let realPath = path.join(hexo.public_dir, item)
      deployData[realPath] = fs.readFileSync(realPath)
    })

    deployData['now'] = {
      'name': args.name,
      'alias': args.alias || `${args.name}.now.sh`
    }

    nowDeployer.createDeployment(deployData)
      .then(resp => callback(null, `Deploy ${args.name} at ${new Date()}`))
      .catch(err => callback(err))
  })
})
