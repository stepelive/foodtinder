import React, {useState, useMemo, useRef} from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import {connect} from 'react-redux';
import {IconButton, Div,PanelSpinner, Alert} from '@vkontakte/vkui'
import {Icon28LikeCircleFillRed, Icon28CancelCircleFillRed} from '@vkontakte/icons';
import {openPopout, closePopout, closeModal, openModal, setPage, setStory} from '../../store/router/actions'
import {addProduct} from "../../store/cart/actions";
import {setProducts} from "../../store/products/actions";


function CardTinderCard(props) {
    const [currentIndex, setCurrentIndex] = useState(props.products.length - 1)
    const [needProducts, setProduct] = useState([])
    const [positiveFilters, addPositive] = useState([])
    const [negativeFilters, addNegative] = useState([])
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex);
    let childRefs = useMemo(
        () =>
            Array(props.products.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )
    

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canSwipe = currentIndex >= 0

    const swiped = (direction, nameToDelete, index) => {

        if (direction === "up" || direction === "down" ){
            addToCard(props.products[index]);
            return;
        }
        
        if (direction === "right" ) {
            var pr = needProducts;
            pr.push(props.products[index]);
            setProduct(pr);
            console.log(JSON.stringify(pr));
        }

        if (direction === "left" ){
            //disLike(props.products[index]);
            //Sort();
        }
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }
    const addToCard = (product) => {
        props.addProduct(product);
        openPopoutF();
    }

    const openPopoutF = () => {
        props.setPage('cart','cart');
    }

    const outOfFrame = (name, idx) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe =  (dir) => {
        if (canSwipe && currentIndex < props.products.length) {
             childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    const getProductUrl = (product) => {
        try {
            return 'url(https://www.delivery-club.ru/' + product.Image + ')'
        } catch (Ex) {
            return "url(https://tl.rulate.ru/i/book/19/10/18925.jpg)"
        }
    }

    const renderCardIfCan = (index, product) => {
        if (index + 2 < currentIndex){
            return undefined;
        }
        return renderCard(index, product);
    }

    const disLike = (product) => {
        var current = negativeFilters;
        console.log(current);
        var fields =  product.ProductName.toLowerCase().split(' ');
        addNegative(fields);
    }
    const Sort = () => {
        let products = props.products;
        let sorted = products.sort(SortByFields);
        props.setProducts(sorted);
        
    }
    const SortByFields = (a, b) =>{
        return GetProductScore(a) - GetProductScore(b);
    }
    const GetProductScore = (product) => {
        let score = 0;
        negativeFilters.filter(x=>{
            if(product.ProductName.toLowerCase().includes(x))
                score -=1;
        })

        positiveFilters.filter(x=>{
            if(product.ProductName.toLowerCase().includes(x))
                score +=1;
        })
        return score;
    }

    const positiveVibes = ["Да, супер!", "Нааайс!", "О, да!", "То что надо!", "Кайф!"];
    const negativeVibes = ["Что-нибудь другое...", "Нет, не то", "Не в настроении", "Ну... как-то..."];

    function getRandomPhrase(array) {
        const random = Math.floor(Math.random() * array.length);
        return array[random]
    }

    const getPhraseByDirection = (direction) => {
        switch (direction) {
            case "right":
                return getRandomPhrase(positiveVibes);
            case "left":
                return getRandomPhrase(negativeVibes)
        }
    }

    const renderCard = (index, product) => {
        return (
            <TinderCard
                ref={childRefs[index]}
                className='swipe'
                key={product.ProductId}
                onSwipe={(dir) => swiped(dir, product.ProductName, index)}
                onCardLeftScreen={() => outOfFrame(product.ProductName, index)}
            >
                <div className='card'>
                    <div
                        style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: getProductUrl(product)
                        }}
                        className='image'
                    ></div>
                    <h3 className="product_name">{product.ProductName}</h3>
                </div>
            </TinderCard>
        )
    }

    return (
        <div>
            <h1>FoodFinder</h1>
            <div className='cardContainer'>
                {props.products.map((product, index) => renderCardIfCan(index, product))}
            </div>
            
            <div className='buttons'>
                {canSwipe &&
                <Div className='buttons'>
                    <Icon28CancelCircleFillRed width={44} height={44}
                                               onClick={() => swipe('left')}></Icon28CancelCircleFillRed>
                    <Icon28LikeCircleFillRed width={44} height={44}
                                             onClick={() => swipe('right')}></Icon28LikeCircleFillRed>
                </Div>}
            </div>

            {lastDirection ? (
                <h2 key={lastDirection} className='infoText'>
                    {getPhraseByDirection(lastDirection)}
                </h2>
            ) : (
                <h2 className='infoText'>
                </h2>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        products: state.products.products,
    };
};

const mapDispatchToProps = {
    openPopout,
    closePopout, 
    closeModal, 
    openModal, 
    setPage, 
    setStory,
    addProduct,
    setProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(CardTinderCard);
