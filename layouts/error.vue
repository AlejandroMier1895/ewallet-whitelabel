<template>
    <div id="error-page" class="d-flex justify-content-center align-items-center">
        <div>
            <div class="d-flex justify-content-center error-img">
                <img src="../static/img/ewallet-error.svg" alt="Ícono con texto: Oooops." role="img"/>
            </div>
            <div v-if="error.statusCode === 404">
                <div class="d-flex justify-content-center error-title">Esta pagina no </div>
                <div class="d-flex justify-content-center error-title">está disponible</div> 
            </div>
            <div v-else>
                <div class="d-flex justify-content-center error-title" :class="error.message.length > 15 ? 'error-titleSall' : ''">{{ error.message }} </div>
            </div>
            <div class="d-flex justify-content-center error-message">Regresar a la página de inicio</div>
            <div class="d-flex justify-content-center">
                <b-button type="buton" @click="handleReturn()">Regresar</b-button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'empty',
    props: ['error'],
    methods: {
        handleReturn(){
            if(this.$route.path === '/'){
                window.location.reload(true);
            }else{
                this.$router.push('/dashboard');
            }
        }
    }
  }
  </script>
  
  <style lang="scss">
  #error-page{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #81D4FA, #B3E5FC);
    padding-top: 5vh;
    .error-img{
        img{
            max-height: 40vh;
            max-width: 80vw;
            margin-left: -20px;
        }
    }
    .error-title{
        font-family: 'Poppins', sans-serif;
        font-size: 51px;
        font-weight: 700;
        line-height: 62.17px;
        color: #3E3A35;
        text-align: center;
    }
    .error-titleSall{
        font-size: 21px;
        line-height: 32.17px;
    }
    .error-title:first-of-type, .error-message, button{
        margin-top: 5vh;
    }
    .error-message{
        font-family: 'Roboto';
        font-size: 22px;
        font-weight: 400;
        line-height: 25.78px;
        color: #3E3A35;
    }
    button{
        background-color: #8C4B1F;
        border-radius: 40px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 600;
        line-height: 17.07px;
        color: white;
        border: transparent;
        height: 52px;
        width: 154px;
    }
    button:hover, button:focus{
        background: #687F2E;
    }
    @media only screen and (max-width: 575.98px) {
        .error-title{
            font-size: 30px;
            line-height: 42.17px;
        }
        .error-titleSall{
            font-size: 11px;
            line-height: 22.17px;
        }
    }
  }
  </style>