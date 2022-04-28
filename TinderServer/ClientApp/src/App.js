import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import {setProducts} from './js/store/products/actions'
import * as VK from './js/services/VK';
import * as data from './productsmock.json'

import {
    View,
    Root,
    ModalRoot,
    ConfigProvider,
    AdaptivityProvider,
    PanelSpinner
} from "@vkontakte/vkui";

import Cart from './js/panels/tinder/cart'
import ModalTemplate from './js/components/modals/ModalTemplate';
import CardTinderCard from './js/panels/tinder/cardTinderCard'
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;
        this.updateProducts();

        dispatch(VK.initApp());
        dispatch(VK.getUserData());


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

    updateProducts() {
        var t = this;
        if (this.props.products.length === 0) {
            //axios.get("Proxy").then(x => {
            this.props.setProducts(data.default)
            // console.log(t.props.products)
            //});

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
            colorScheme,
            products,
            productsCart
        } = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <ModalTemplate
                    id="MODAL_PAGE_BOTS_LIST"
                    productList={productsCart}
                    onClose={() => closeModal()}
                />

            </ModalRoot>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <AdaptivityProvider>
                    <Root id="tindercard" activeView={activeView} popout={popout}>


                        <View
                            id="tindercard"
                            modal={homeModals}
                            activePanel={getActivePanel("modal")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            {products && products.length > 0 &&
                            <CardTinderCard id="tindercard"/>
                            }
                            {!products || products.length == 0 &&
                            <PanelSpinner/>
                            }

                        </View>
                        <View
                            id="cart"
                            modal={homeModals}
                            activePanel={getActivePanel("modal")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <Cart id="cart"/>
                        </View>
                    </Root>
                </AdaptivityProvider>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        productsCart: state.caart.products,
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
        ...bindActionCreators({setStory, goBack, closeModal, setProducts}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
