import React from 'react';
import {connect} from 'react-redux';

import {Cell, Avatar, ModalPage, ModalPageHeader, PanelHeaderButton, withPlatform, IOS} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

class ModalTemplate extends React.Component {

    render() {
        const {id, onClose, platform} = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={platform !== IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Cancel/></PanelHeaderButton>}
                        right={platform === IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    >
                        ModalTemplate
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <Cell
                    description="Описание"
                    before={<Avatar size={40} src="https://vk.com/images/community_100.png?ava=1"/>}
                >
                    Название
                </Cell>
            </ModalPage>
        );
    }

}

export default withPlatform(connect()(ModalTemplate));
