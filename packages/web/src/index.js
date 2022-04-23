import { AppRegistry } from 'react-native'

import App from 'app/src/App'

AppRegistry.registerComponent('Bracket', () => App)
AppRegistry.runApplication('Bracket', {
  rootTag: document.getElementById('root'),
})
