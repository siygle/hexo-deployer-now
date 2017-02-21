# [hexo-deployer-now](https://hexo-deployer-now.now.sh/)
[Zeit now](https://zeit.co/now) deployer plugin of Hexo

## Installation
``` bash
$ npm install hexo-deployer-now --save
```

## Options
You can configure this plugin in `_config.yml`.
``` yml
deploy:
  type: now
  name: [app name]
  alias: [website alias]
```

## Todo
This deployer used [now-cli](https://github.com/zeit/now-cli) for now, but hope to switch [API](https://zeit.co/api) when it support static deployment.
