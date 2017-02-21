/* global - hexo */

'use strict'

const fs = require('hexo-fs')
const path = require('path')
const commandExists = require('command-exists')
const spawn = require('hexo-util/lib/spawn')

hexo.extend.deployer.register('now', function (args) {
  if (args.name || args.alias) {
    const HELP = [
      'You need to setup now API token and assign your app name first',
      'If you are not familiar with Zeit now, please go look their howto first:',
      'https://zeit.co/now'
    ];

    return console.log(HELP.join('\n'))
  }

  commandExists('now')
  .then(function () {
    let params = [
      '--static',
      `--name ${args.name}`,
      `--alias ${args.alias}`,
      hexo.public_dir
    ]

    return spawn('now', params, {verbose: true})
  })
  .catch(function () {
    const HELP = [
      'Need install & setup now-cli first',
      'https://zeit.co/now#get-started'
    ]

    return console.log(HELP.join('\n'))
  })

  // const nowDeployer = new nowClient(args.token);

  // let deployData = {};
  // fs.listDir(
  //   hexo.public_dir,
  //   {
  //     ignoreHidden: true
  //   },
  //   function(err, data) {
  //     if (err) return callback(err);

  //     data.forEach(function(item) {
  //       let realPath = path.join(hexo.public_dir, item);
  //       deployData[realPath] = fs.readFileSync(realPath);
  //     });

  //     deployData["now"] = {
  //       name: args.name,
  //       alias: args.alias || `${args.name}.now.sh`
  //     };

  //     nowDeployer
  //       .createDeployment(deployData)
  //       .then(resp => callback(null, `Deploy ${args.name} at ${new Date()}`))
  //       .catch(err => callback(err));
  //   }
  // );
});
