import * as React from 'react';
import {Provider} from 'react-redux';
import Navigation from './navigation';
import store from './redux';
import setAxios from './config/axios';

const App = () => {
  // USEEFFECTS
  React.useEffect(() => {
    setAxios();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
