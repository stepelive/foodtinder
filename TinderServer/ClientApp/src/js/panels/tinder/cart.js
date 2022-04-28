import React, {useState, useMemo, useRef} from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import {connect} from 'react-redux';
import {IconButton,PanelHeader,PanelHeaderClose,Avatar, Div,PanelSpinner, Alert} from '@vkontakte/vkui'
import {Icon28LikeCircleFillRed, Icon28CancelCircleFillRed} from '@vkontakte/icons';
import {openPopout, closePopout, goBack, closeModal, openModal, setPage, setStory} from '../../store/router/actions'
import {addProduct} from "../../store/cart/actions";
import {setProducts} from "../../store/products/actions";


function Cart(props) {
    
    

    return (
        <Div>
            <PanelHeader
                onClick={()=>{props.setPage('tindercard','tindercard')}}
                left={<PanelHeaderClose />}
                right={<Avatar size={36} />}
            >
                Корзина
            </PanelHeader>
            <div>
                {props.products.map((x) =>
                    (<div key={x.product.ProductName}>
                        {x.product.ProductName}

                    </div>))
                }
            </div>
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
