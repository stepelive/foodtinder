import React, {useState, useMemo, useRef} from 'react'
import TinderCard from 'react-tinder-card'
import * as data from '../../../productsmock.json'
import axios from 'axios'
import {connect} from 'react-redux';
import { IconButton, Div, Alert } from '@vkontakte/vkui'
import { Icon28LikeCircleFillRed, Icon28CancelCircleFillRed } from '@vkontakte/icons';

const bannedCategories = ["Соусы", "Напитки", "Дополнительно", "Закуски"]
const bannedWords = ["Соус", "Салфетк"]
var bannedProducts = [];

function isProductBanned(productName)
{
  for (var i = 0; i < bannedWords.length; i++) {
    productName = productName.toLowerCase();
    if (productName.includes(bannedWords[i].toLocaleLowerCase())){
      return true
    }
  }

  return false
}

function isCategoryBanned(categoryName)
{
  for (var i = 0; i < bannedCategories.length; i++) {
    categoryName = categoryName.toLowerCase();
    if (categoryName.includes(bannedCategories[i].toLocaleLowerCase())){
      return true
    }
  }

  return false
}

for (var i = 0; i < data.menu.length; i++) {
  if (isCategoryBanned(data.menu[i].name)) {
    bannedProducts = bannedProducts.concat(data.menu[i].productIds);
  }
}

console.log(bannedProducts)
const allData = data.products.filter((x) => {return !bannedProducts.includes(x.id.primary) && !isProductBanned(x.name)});
const bannedCategories = ["Соусы", "Напитки", "Дополнительно", "Закуски"]
const bannedWords = ["Соус", "Салфетк"]
var bannedProducts = [];

function isProductBanned(productName)
{
  for (var i = 0; i < bannedWords.length; i++) {
    var productName = productName.toLowerCase();
    if (productName.includes(bannedWords[i].toLocaleLowerCase())){
      return true
    }
  }

  return false
}

function isCategoryBanned(categoryName)
{
  for (var i = 0; i < bannedCategories.length; i++) {
    var categoryName = categoryName.toLowerCase();
    if (categoryName.includes(bannedCategories[i].toLocaleLowerCase())){
      return true
    }
  }

  return false
}

for (var i = 0; i < data.menu.length; i++) {
  if (isCategoryBanned(data.menu[i].name)) {
    bannedProducts = bannedProducts.concat(data.menu[i].productIds);
  }
}

console.log(bannedProducts)
const allData = data.products.filter((x) => {return !bannedProducts.includes(x.id.primary) && !isProductBanned(x.name)});

function CardTinderCard() {
    const [currentIndex, setCurrentIndex] = useState(allData.length - 1)
    const [cart, setCurrentCart] = useState(allData.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)


    const changes = "фылвфы вофылов"
    const childRefs = useMemo(
        () =>
            Array(allData.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )
    const getProducts = ()=>{
        
        axios.get("Proxy").then(x=>{console.log(x.data)});
    }
    getProducts();

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }
    
    const canSwipe = currentIndex >= 0

    const swiped = (direction, nameToDelete, index) => {

        if(direction === "right")
            addToCard(allData[index]);
        
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }
    const addToCard = (product) => {
      // this.props.openPopout(undefined);
       /* console.log(openModal)
        openModal("MODAL_PAGE_BOTS_LIST");*/
    }

    const openPopoutF = () => {
       /* openPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    style: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                }]}
                onClose={() => closePopout()}
            >
                <h2>Вопрос значит</h2>
                <p>Вас роняли в детстве?</p>
            </Alert>
        );*/
    }
    
    const outOfFrame = (name, idx) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        
        
        if (canSwipe && currentIndex < allData.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    const getProductUrl = (product) => {
        try {
            return 'url(https://www.delivery-club.ru/' + product.images[650] + ')'
        } catch (Ex) {
            return "url(https://tl.rulate.ru/i/book/19/10/18925.jpg)"
        }
    }

    const renderCardIfCan = (index, product) => {
        if (index + 2 < currentIndex)
            return undefined;
        return renderCard(index, product);
    }
    const getDirection = (direction) => {
        switch (direction) {
            case "right":
                return "like";
            case "left":
                return "dislike"
            case "up":
                return "similar"
        }
    }
    const renderCard = (index, product) => {
        return (
            <TinderCard
                ref={childRefs[index]}
                className='swipe'
                key={product.id.primary}
                onSwipe={(dir) => swiped(dir, product.name, index)}
                onCardLeftScreen={() => outOfFrame(product.name, index)}
            >
                <div className='card'>
                    <div
                        style={{
                            backgroundSize: "300px",
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: getProductUrl(product)
                        }}
                        className='image'
                    ></div>
                    <h3 className="product_name">{product.name}</h3>

                </div>
            </TinderCard>
        )
    }

    return (
        <div>
            <link
                href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700&display=swap'
                rel='stylesheet'
            />
            <link
                href='https://fonts.googleapis.com/css?family=Roboto&display=swap'
                rel='stylesheet'
            />

            <h1>FoodTinder</h1>

            <div className='cardContainer'>
                {allData.map((product, index) => renderCardIfCan(index, product)
                )}
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
                    {getDirection(lastDirection)}
                </h2>
            ) : (
                <h2 className='infoText'>
                    Влево=пропустить, вправо=в корзину, вверх=показать похожее
                </h2>
            )}
        </div>
    )
}

const mapDispatchToProps = {
    
};

export default connect(null, mapDispatchToProps)(CardTinderCard);
