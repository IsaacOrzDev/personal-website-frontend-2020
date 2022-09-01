import React, { useEffect, useCallback, Suspense } from 'react';
import withProviders from './withProviders';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import routes from 'config/routes';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import TimeService from 'services/timeService';
import MenuModalContainer from './components/MenuModalContainer';
import HeaderContainer from './components/HeaderContainer';
import MessageModalContainer from './components/MessageModalContainer';
import LoadingScreen from 'screens/LoadingScreen';
import GaService from 'services/gaService';
import GridBackground from 'components/layout/GridBackground';
import dataService from 'services/dataService';

// const LoadingScreen = React.lazy(() => import('screens/LoadingScreen'));
const Home = React.lazy(() => import('./routing/Home'));
const Works = React.lazy(() => import('./routing/Works'));

const App: React.FC = () => {
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    hasCookie: useSelector(globalSelectors.hasCookie),
    dataLoaded: useSelector(globalSelectors.dataLoaded),
    shouldShowContent: useSelector(globalSelectors.shouldShowContent),
  };

  const _finishLoading = useCallback(async () => {
    window.scrollTo({ top: 0 });
    dispatch(globalActions.setShouldShowContent(true));
    await TimeService.timeout(2600);
    dispatch(globalActions.setShouldListenScrollingEvent(true));
    if (!global.hasCookie) {
      dispatch(globalActions.setShouldShowCookieModal(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (global.theme === 'dark') {
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [global.theme]);

  useEffect(() => {
    GaService.initialize();
    dispatch(dataService.fetchAllData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!global.shouldShowContent && !global.shouldShowContent) {
    return (
      <LoadingScreen
        theme={global.theme}
        isDone={global.dataLoaded}
        onEnd={_finishLoading}
      />
    );
  }

  return (
    <>
      <Router>
        <HeaderContainer />
        <Suspense fallback={null}>
          <Switch>
            <Route path={routes.home} exact component={Home} />
            <Route path={routes.works} exact component={Works} />
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
        <MessageModalContainer />
        <MenuModalContainer />
      </Router>
      <GridBackground theme={global.theme} />
    </>
  );
};

export default withProviders(App);