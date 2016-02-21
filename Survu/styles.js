const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#50cfe0',
  font: 'Lato-Light',
  weight: '700'
};

var styles = StyleSheet.create({
  creditText: {
    textAlign : 'center',
    fontSize : 16,
    fontFamily: constants.font,
    fontWeight: constants.weight,
    margin: 20,
  },
  titleText: {
    backgroundColor: constants.actionColor,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    height: 20,
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500",
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  statusbar: {
    backgroundColor: '#fff',
    color: constants.actionColor,
    height: 20,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 13,
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 150,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    marginLeft: 112
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  text: {
    color: 'black',
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  slider: {
    marginLeft: 30,
    marginRight: 30,
  },
  welcomeText: {
    margin:50,
    fontSize:45,
    textAlign:'center',
    fontFamily: constants.font,
    fontWeight: constants.weight,
  },
  qtext: {
    fontFamily: constants.font,
    fontWeight: constants.weight,
    margin: 20,
  },
})

module.exports = styles;
module.exports.constants = constants;
