import React, {useState, useMemo, useRef} from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import {connect} from 'react-redux';
import {IconButton,PanelHeader,PanelHeaderClose,Avatar, Div,PanelSpinner, Alert, Button} from '@vkontakte/vkui'
import {Icon28LikeCircleFillRed, Icon28CancelCircleFillRed} from '@vkontakte/icons';
import {openPopout, closePopout, goBack, closeModal, openModal, setPage, setStory} from '../../store/router/actions'
import {addProduct} from "../../store/cart/actions";
import {setProducts} from "../../store/products/actions";


function Cart(props) {
    
    

    return (
        <Div>
             <link
                href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700&display=swap'
                rel='stylesheet'
            />
            <link
                href='https://fonts.googleapis.com/css?family=Roboto&display=swap'
                rel='stylesheet'
            />

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
                        Вы и {props.products.map((x) => (x.product.ProductName))} подходите друг-другу 
            </p>
            <div className='lovers-images'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"></img>
                <img src={"https://www.delivery-club.ru/" + props.products.map((x) => (x.product.Image))} ></img>
            </div>
            <Button 
                size='l'
                style={{fontFamily: 'Roboto'}}
                label='regular'
                onClick={() => openInNewTab('https://www.delivery-club.ru')}>
                Перейти к оформлению заказа
            </Button>
        </Div>
        
    )
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        products: state.caart.products,
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
