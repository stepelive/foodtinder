import React, {useState, useMemo, useRef} from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import {connect} from 'react-redux';
import {IconButton,Panel,Group,PanelHeader,PanelHeaderClose,Avatar, Div,PanelSpinner, Alert, Button} from '@vkontakte/vkui'
import {Icon28LikeCircleFillRed, Icon28CancelCircleFillRed} from '@vkontakte/icons';
import {openPopout, closePopout, goBack, closeModal, openModal, setPage, setStory} from '../../store/router/actions'
import {addProduct} from "../../store/cart/actions";
import {setProducts} from "../../store/products/actions";

function openInNewTab(url) {
    window.open(url, '_blank').focus();
   }

function Cart(props) {
    
    const getProductUrl = (product) => {
        try {
            return 'url(https://www.delivery-club.ru/' + product.Image + ')'
        } catch (Ex) {
            return "url(https://tl.rulate.ru/i/book/19/10/18925.jpg)"
        }
    }

    return (
        <Panel id={props.id}>
            <Group>
                <PanelHeader
                    onClick={()=>{props.setPage('tindercard','tindercard')}}
                    left={<PanelHeaderClose />}
                    right={<Avatar size={36} />}
                >😊
                </PanelHeader>

                <h1 style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                    fontSize: 54
                }}>It's a Match!
                </h1>
                <p  style={{
                    fontFamily: 'Roboto',
                    fontSize: 24
                }}>
                    Вы и {props.product.ProductName} подходите друг-другу
                </p>
                <div className='lovers-images'>
                    <Avatar
                        size={100}
                        src={"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                    />

                    <Avatar
                        size={100}
                        src={`https://www.delivery-club.ru/${props.product.Image}`}
                    />
                </div>
                <Button
                    size='l'
                    style={{fontFamily: 'Roboto'}}
                    label='regular'
                    onClick={() => openInNewTab('https://www.delivery-club.ru')}>
                    Перейти к оформлению заказа
                </Button>
            </Group>
            
        </Panel>
        
    )
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        product: state.cart.product,
    };
};

const mapDispatchToProps = {
    openPopout,
    closePopout, 
    closeModal, 
    openModal, 
    setPage, 
    goBack,
    setStory,
    addProduct,
    setProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
