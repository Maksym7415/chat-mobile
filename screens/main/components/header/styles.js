import {StyleSheet} from 'react-native';

export const mainHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedСhatsAmountContainer: {
    backgroundColor: '#ffffff',
    paddingRight: 5,
  },

  wrapperBurger: {
    marginRight: 30,
  },
  wrapperTitle: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 32,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: '#ffffff',
  },
  wrapperSearch: {},
  wrapperClose: {
    marginRight: 40,
  },
  wrpperSelectedAmount: {flex: 1},
  wrapperActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperAction: {
    marginLeft: 20,
  },
  wrapperOptions: {
    marginRight: 0,
  },
  dotsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  wrapperIconOption: {
    marginRight: 10,
  },
});
