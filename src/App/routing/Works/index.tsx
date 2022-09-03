import React, { useEffect, useCallback, Suspense } from 'react';
import styles from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import projectSelectors from 'store/project/selectors';
import { projectActions } from 'store/project';
import pages from 'config/pages';
import useResize from 'hooks/useResize';
import useWindow from 'hooks/useWindow';
import useNavigation from 'hooks/useNavigation';
import { forceCheck } from 'react-lazyload';
import useScrollEffect from 'hooks/useScrollEffect';
import GaService from 'services/gaService';
import useHidden from 'hooks/useHidden';

const ProjectScreen = React.lazy(() => import('screens/ProjectScreen/index'));
const ResponsiveProjectScreen = React.lazy(() =>
  import('screens/ProjectScreen/responsive')
);

const Works: React.FC = () => {
  // #region variables
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    page: useSelector(globalSelectors.page),
    dataLoaded: useSelector(globalSelectors.dataLoaded),
    shouldShowContent: useSelector(globalSelectors.shouldShowContent),
    shouldShowMenu: useSelector(globalSelectors.shouldShowMenu),
    shouldShowCookieModal: useSelector(globalSelectors.shouldShowCookieModal),
    shouldListenScrollingEvent: useSelector(
      globalSelectors.shouldListenScrollingEvent
    ),
  };

  const project = {
    visible: useSelector(projectSelectors.visible),
    selectedIndex: useSelector(projectSelectors.selectedIndex),
    list: useSelector(projectSelectors.list),
    years: useSelector(projectSelectors.years),
    dropdownVisible: useSelector(projectSelectors.dropdownVisible),
    listLength: useSelector(projectSelectors.listLength),
    isLastItem: useSelector(projectSelectors.isLastItem),
    selectedYear: useSelector(projectSelectors.selectedYear),
  };

  const [breakpoint, isResponsive] = useResize();
  const isHidden = useHidden();
  const { goToHomeSection } = useNavigation(isResponsive);
  const [windowOffset, currentWindowOffset] = useWindow();
  // #endregion

  // #region functions

  const _changeProjectSelectedIndex = useCallback((index: number) => {
    dispatch(globalActions.stopScrollingDuringAnimation());
    GaService.addButtonNavigationEvent('select project index');
    dispatch(projectActions.setSelectedIndex(index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _minusProjectSelectedIndex = useCallback(() => {
    dispatch(projectActions.minus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _plusProjectSelectedIndex = useCallback(() => {
    dispatch(projectActions.plus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _clickPreviousProject = useCallback(() => {
    dispatch(globalActions.stopScrollingDuringAnimation());
    GaService.addButtonNavigationEvent('select previous project');
    _minusProjectSelectedIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _clickNextProject = useCallback(() => {
    dispatch(globalActions.stopScrollingDuringAnimation());
    GaService.addButtonNavigationEvent('select next project');
    _plusProjectSelectedIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _showProjectDropdown = useCallback(() => {
    dispatch(projectActions.setDropdownVisible(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _dismissProjectDropdown = useCallback(() => {
    dispatch(projectActions.setDropdownVisible(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _scrollDown = useCallback(() => {
    GaService.addWheelNavigationEvent('down');
    if (!project.isLastItem) {
      _plusProjectSelectedIndex();
    }
  }, [_plusProjectSelectedIndex, project.isLastItem]);

  const _scrollUp = useCallback(() => {
    GaService.addWheelNavigationEvent('up');
    if (global.page === pages.projects && project.selectedIndex === 0) {
      goToHomeSection();
    } else if (global.page === pages.projects) {
      _minusProjectSelectedIndex();
    }
  }, [
    _minusProjectSelectedIndex,
    global.page,
    goToHomeSection,
    project.selectedIndex,
  ]);

  // #endregion

  // #region useEffect
  useScrollEffect(
    global.shouldListenScrollingEvent &&
      !project.dropdownVisible &&
      !isResponsive,
    _scrollDown,
    _scrollUp
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindowOffset.yTop]);

  useEffect(() => {
    if (isResponsive) {
      document.body.style.position = 'relative';
      forceCheck();
    } else {
      document.body.style.position = 'fixed';
    }
  }, [isResponsive]);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(globalActions.setShouldListenScrollingEvent(true));
    dispatch(globalActions.setPage(pages.projects));
    dispatch(projectActions.setVisible(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #endregion

  return (
    <div className={styles.container}>
      <Suspense fallback={null}>
        <ProjectScreen
          visible={project.visible}
          theme={global.theme}
          title="WORKS"
          dropdownVisible={project.dropdownVisible}
          isResponsive={isResponsive}
          isHidden={isHidden}
          breakpoint={breakpoint}
          windowOffsetTop={windowOffset.yTop}
          list={project.list}
          shouldListenScrollingEvent={global.shouldListenScrollingEvent}
          years={project.years}
          index={project.selectedIndex}
          onSelectIndex={_changeProjectSelectedIndex}
          onShowDropdown={_showProjectDropdown}
          onDismissDropdown={_dismissProjectDropdown}
          onSelectPrev={_clickPreviousProject}
          onSelectNext={_clickNextProject}
          onGoBack={goToHomeSection}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ResponsiveProjectScreen
          visible={project.visible}
          theme={global.theme}
          title="WORKS"
          breakpoint={breakpoint}
          isResponsive={isResponsive}
          isHidden={isHidden}
          windowOffsetTop={windowOffset.yTop}
          windowOffsetBottom={windowOffset.yBottom}
          shouldShowMenu={global.shouldShowMenu}
          list={project.list}
          years={project.years}
          index={project.selectedIndex}
          onSelectIndex={_changeProjectSelectedIndex}
        />
      </Suspense>
    </div>
  );
};

export default Works;
