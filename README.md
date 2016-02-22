# Survu: A Survey App with a Twist

Survu is a survey app that allows companies to gather data in a more consistent manner by providing the consumers with an incentive as well. Each time after the client or consumer utilizes a service, they can enter a code found on their receipt into our app. Once on out app, they'll be able to connect their credit card and take a short survey. In return for their time and opinion, they'll receive a small sum of money into their bank account. Survu supplies companies with affordable data while also helping the general public using the app benefit.

See more at http://devpost.com/software/mhacks16

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

### Install all the node modules

```
npm install
```

### If you have trouble with unlocking files for access in Xcode

Remove all the node modules:

```
rm -rf node_modules/
```

Reinstall all the node modules with the correct permissions

```
npm install
```

