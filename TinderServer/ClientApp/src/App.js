import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import * as VK from './js/services/VK';
import { openPopout } from  './js/services/_functions'

import {Epic, View, Root, Tabbar, ModalRoot, TabbarItem, ConfigProvider} from "@vkontakte/vkui";

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28More from '@vkontakte/icons/dist/28/more';
import CardItem from './js/panels/tinder/cardTinderCard';

import ModalTemplate from './js/components/modals/ModalTemplate';
import CardTinderCard from './js/panels/tinder/cardTinderCard'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;

        dispatch(VK.initApp());

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const {
            goBack,
            setStory,
            closeModal,
            openPopout,
            popouts,
            activeView,
            activeStory,
            activeModals,
            panelsHistory,
            colorScheme
        } = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <ModalTemplate
                    id="MODAL_PAGE_BOTS_LIST"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Epic activeStory={activeStory} tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={() => setStory('tindercard', 'tindercard')}
                            selected={activeStory === 'tindercard'}
                        ><Icon28Newsfeed/></TabbarItem>
                    </Tabbar>
                }>

                    <Root id="tindercard" activeView={activeView} popout={popout}>
                        <View
                            id="tindercard"
                            modal={homeModals}
                            activePanel={getActivePanel("modal")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <CardTinderCard openPopout={openPopout}
                                id="tindercard"/>
                        </View>
                    </Root>
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,

        colorScheme: state.vkui.colorScheme
    };
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({setStory, goBack, closeModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
