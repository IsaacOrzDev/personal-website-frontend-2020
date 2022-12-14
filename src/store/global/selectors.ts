import { State } from '../state';

const theme = (state: State) => state.global.theme;
const visible = (state: State) => state.global.visible;
const page = (state: State) => state.global.page;
const name = (state: State) => state.global.name;
const title = (state: State) => state.global.title;
const homeImages = (state: State) => state.global.homeImages;
const messageContent = (state: State) => state.global.messageContent;
const dataLoaded = (state: State) => state.global.dataLoaded;
const shouldShowContent = (state: State) => state.global.shouldShowContent;
const shouldShowMenu = (state: State) => state.global.shouldShowMenu;
const shouldShowCookieModal = (state: State) =>
  state.global.shouldShowCookieModal;
const shouldListenScrollingEvent = (state: State) =>
  state.global.shouldListenScrollingEvent;

const globalSelectors = {
  theme,
  visible,
  page,
  name,
  title,
  homeImages,
  messageContent,
  dataLoaded,
  shouldShowContent,
  shouldShowMenu,
  shouldShowCookieModal,
  shouldListenScrollingEvent,
};

export default globalSelectors;
