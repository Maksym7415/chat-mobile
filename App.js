import * as React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
// import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './navigation';
import store, {persistor} from './redux';
import setAxios from './config/axios';

const App = () => {
  // USEEFFECTS
  React.useEffect(() => {
    setAxios();
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Navigation />
        {/* </PersistGate> */}
      </Provider>
    </React.Fragment>
  );
};

export default App;
