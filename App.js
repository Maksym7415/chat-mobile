import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './navigation';
import store, {persistor} from './redux';

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </React.Fragment>
  );
};

export default App;
