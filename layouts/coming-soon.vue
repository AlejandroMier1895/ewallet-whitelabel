<template>
    <div id="comingSoon-page" class="d-flex justify-content-center align-items-center">
        <div>
            <div class="d-flex justify-content-center comingSoon-img">
                <img rel="preload" :src="`${$router.options.base}img/ewallet-comingSoon.svg`" alt="Equipo de construcción preparando esta página." role="img"/>
            </div>
            <div class="d-flex justify-content-center comingSoon-message">Pronto estará listo para ti</div>
            <div class="d-flex justify-content-center">
                <b-button type="buton" @click="handleReturn()">Regresar</b-button>
            </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    layout: 'empty',
    methods: {
        handleReturn(){
            if(this.$route.path === '/'){
                window.location.reload(true);
            }else{
                this.$router.push('/dashboard');
            }
        },
    },
  }
</script>
  
<style lang="scss">
#comingSoon-page{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #81D4FA, #B3E5FC);
    padding-top: 5vh;
    .comingSoon-img{
        min-height: 60vh;
        img{
            max-height: 60vh;
            max-width: 80vw;
        }
    }
    .comingSoon-message{
        font-family: 'Roboto';
        font-size: 22px;
        font-weight: 400;
        line-height: 25.78px;
        color: #3E3A35;
    }
    button{
        margin-top: 2rem;
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
        .comingSoon-title{
            font-size: 30px;
            line-height: 42.17px;
        }
        .comingSoon-titleSall{
            font-size: 11px;
            line-height: 22.17px;
        }
    }
}
</style>