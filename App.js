import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
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
      <Provider store={store}>
        <Navigation />
      </Provider>
    </React.Fragment>
  );
};

export default App;
