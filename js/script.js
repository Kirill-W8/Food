'use strict';

window.addEventListener('DOMContentLoaded',()=>{
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsParent = document.querySelector('.tabheader__items'),
    tabContent = document.querySelectorAll('.tabcontent');
    //Tabs
    function showTabContent (i = 0){

            tabContent[i].classList.remove('hide');
            tabContent[i].classList.add('show');
            tabContent[i].classList.add('fade');   
            tabs[i].classList.add('tabheader__item_active');
    }

    function hideTabContent (){

        tabContent.forEach(tab =>{
            tab.classList.remove('show');
            tab.classList.add('hide');

        });

        tabs.forEach(tab=>{
            tab.classList.remove('tabheader__item_active');
        });
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target){
            tabs.forEach((tab,i) => {

                if(target == tab){
                
                    hideTabContent();
                    showTabContent(i);

                }
            });
        }

    });

    //Timer
    const deadLine = '2022-01-22',
          lessTime = Date.parse(deadLine) - Date.parse(new Date()) - (3*1000*60*60);


          function setTime(endtime){
            const t = Date.parse(endtime) - Date.parse(new Date()) - (3*1000*60*60),
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 *60 ) % 24)),
                  minutes = Math.floor((t / (1000*60) % 60)),
                  seconds = Math.floor(((t / 1000) % 60));
                  
            return{
                'end': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };      
    
        }
    
        function getZero(num){
            if(num >= 0 && num < 10){
                return(`0${num}`);
            }else{
                return(num);
            }
        }
    
        function setClock(selector, deadLine){
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  interval = setInterval(setTimeNumbers, 1000);    
                  setTimeNumbers();  
    
            function setTimeNumbers(){
                const timeArr = setTime(deadLine);
                days.innerHTML = getZero(timeArr.days);
                hours.innerHTML = getZero(timeArr.hours);
                minutes.innerHTML = getZero(timeArr.minutes);
                seconds.innerHTML = getZero(timeArr.seconds);
                
                if(timeArr.end <= 0){
                    clearInterval(interval);
                }
    
            }
    
        }
    
        
    if(lessTime > 0){
        setClock('.timer', deadLine);
    }else{
        const timer = document.querySelector('.timer');
              timer.querySelector('#days').innerHTML = '00';
              timer.querySelector('#hours').innerHTML = '00';
              timer.querySelector('#minutes').innerHTML = '00';
              timer.querySelector('#seconds').innerHTML = '00';
    }

    //Tabs

    const modal= document.querySelector('.modal'),
          body = document.querySelector('body'),
          btn = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('.modal__close');
          


    function showModal(){
        body.style.overflow = 'hidden';
        modal.classList.add('show');
        modal.classList.remove('hide');
    }

    function hideModal(){
        body.style.overflow = '';
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    
     btn.forEach( (button)=>{
        button.addEventListener('click', ()=> {
            showModal();
            clearTimeout(openModalBeforeTime);
        });
     });
     
     


    modalClose.addEventListener('click', () => {
        hideModal();
    });

    modal.addEventListener('click',(event) =>{
        if(event.target === modal){
            hideModal();
        }        
    });

    document.addEventListener('keydown',(event) =>{
        if(event.code === 'Escape' && modal.classList.contains('show')){
            hideModal();
        }
    });

     const openModalBeforeTime = setTimeout(showModal, 5000000);


    //Classes for cards

    class MenuCard {
        constructor(textTitle, textSubtitle, img, altText, cost, parantSelector, ...classes){
            this.textTitle = textTitle;
            this.textSubtitle = textSubtitle;
            this.img = img;
            this.cost = cost;
            this.altText = altText;
            this.transfer = 27;
            this.parant = document.querySelector(parantSelector);
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH(){
            this.cost = this.cost * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                element.classList.add('menu__item');
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }

            this.classes.forEach(className => element.classList.add(className));
           
            element.innerHTML = `
            
                <img src=${this.img} alt=${this.altText}>
                <h3 class="menu__item-subtitle">${this.textTitle}</h3>
                <div class="menu__item-descr">${this.textSubtitle}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                </div>
                
            `;
            this.parant.append(element);
        }
    }

    new MenuCard(
        'Меню "Постное"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '"img/tabs/post.jpg"',
        '"vegy"',
        30,
        '.menu .container'
        
        


    ).render();

    new MenuCard(
        'Меню "Постное"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '"img/tabs/post.jpg"',
        '"vegy"',
        30,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        'Меню "Постное"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '"img/tabs/post.jpg"',
        '"vegy"',
        30,
        '.menu .container',
        'menu__item',
        'big'
    ).render();
    

   // Forms

   const forms = document.querySelectorAll('form');

   const message = {
        loading: 'Загрузка',
        success: 'Спасибо, мы скоро с вами свяжемся',
        fail: 'Что-то пошло не так'
   };

   forms.forEach(form => {
       postData(form);
   });

   function postData (form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let  formData = new FormData(form),
                 object = {};

            formData.forEach((value, key ) => {
               object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }

            ).then(data => data.text()).
            then(data => {
                console.log(data);
                showThanksModal(message.success);
            }).catch(() => {
                showThanksModal(message.fail);
            }).finally(() => {
                form.reset();
            });

            
          
    });
    
   }

   const modalThanks = document.createElement('div'),
        modalRectangle = document.createElement('div'),
        modalTitle = document.createElement('div'),
        modalThanksClose = document.createElement('div'),
        modalBtn = document.createElement('div');


   function createThanksModal(){
    

        modalThanks.classList.add('hide');
        modalThanks.classList.remove('show'); 

        modalBtn.innerHTML = 'Ясно';
        modalThanksClose.innerHTML = '&times;';




        modalThanks.classList.add('modal');
        modalRectangle.classList.add('modal__content');
        modalTitle.classList.add('modal__title');
        modalThanksClose.classList.add('modal__close');
        modalBtn.classList.add('btn','btn_dark','btn_min');



        modalRectangle.style.width = '30%';
        modalRectangle.style.height = '31%';
        modalRectangle.style.margin = '100px auto';
        modalBtn.style.display = 'flex';
        modalBtn.style.marginTop = '30px';
        
        body.append(modalThanks); 
        modalThanks.append(modalRectangle);
        modalRectangle.append(modalThanksClose, modalTitle, modalBtn); 
        
       

        modalBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        modalThanks.classList.add('hide');
        modalThanks.classList.remove('show');    
                
        });

       modalThanksClose.addEventListener('click', (e)=>{
        e.preventDefault();

        modalThanks.classList.add('hide');
        modalThanks.classList.remove('show');
        body.style.overflow = '';    
                
        });

       modalBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        modalThanks.classList.add('hide');
        modalThanks.classList.remove('show');
        body.style.overflow = '';    
        
        });

        setTimeout(() => {
        modalThanks.classList.add('hide');
        modalThanks.classList.remove('show');
        body.style.overflow = '';  
        }, 5000);
  
   }


   createThanksModal();

   function showThanksModal(text) {
        hideModal();
        modalTitle.innerHTML = text;
        modalThanks.classList.remove('hide');
        modalThanks.classList.add('show');
        body.style.overflow = 'hidden';   

   }
   

});




 
