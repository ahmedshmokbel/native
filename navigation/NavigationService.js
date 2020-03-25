// NavigationService.js

import {NavigationActions} from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}
function goBack(routeName, params) {
   _navigator.dispatch(NavigationActions.goBack())
}
function goBackTo(routeName, params) {
  _navigator.dispatch(NavigationActions.goBackTo(routeName))
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  goBackTo,
}
