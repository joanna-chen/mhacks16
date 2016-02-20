# Survey app

## Developing on the app

### Install Homebrew

[Reference](http://brew.sh/)

Run:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install NVM (node version manager)

[Reference](https://github.com/creationix/nvm#installation)

To install NVM, run:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Activate NVM by sourcing it in your shell:

```
. ~/.nvm/nvm.sh
```

This project is set to use Node version 4.3 by default. To install and use this version of node, run the following in the project directory:

```
nvm install
```

```
nvm use
```

### Install watchman

[Reference](https://www.firebase.com/blog/2016-01-20-tutorial-firebase-react-native.html)

Run:

```
brew install watchman
```

### Install React

[Reference](https://www.firebase.com/blog/2016-01-20-tutorial-firebase-react-native.html)

```
sudo npm install -g react-native-cli
```

