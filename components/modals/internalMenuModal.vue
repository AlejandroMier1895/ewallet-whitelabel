<template>
    <b-modal ref="internalmenumodal" id="internalMenuModal" border-0 hide-footer size="lg">
      <b-container  fluid class="profile mt-1 d-flex align-items-center">
            <b-row>
                <b-col cols="3" md="2">
                    <div v-show="profilePicture !== null && profilePictureLoading === false" class="profile-picture-div">
                        <img :class="setProfilePictureClass()" @load="profilePictureLoading = false" :src="`${$router.options.base}img/${profilePicture}`" alt="Ir a Mi Cuenta."/>
                    </div>
                </b-col>
                <b-col cols="9" md="10">
                    <div class="name mt-2">{{$store.state.auth.user.account_name}}</div>
                    <div class="ewalletID d-flex justify-content-start align-items-center"> 
                        <div>{{$store.state.auth.user.ewallet_id}}</div>
                        <span class="ml-3">
                            <button class="btn copy-btn" type="button" @click="copy($store.state.auth.user.ewallet_id)" v-b-tooltip.hover :title="tooltipMessage" @mouseleave="redefineTooltip">
                                <img class="copyToClipboard" :src="`${$router.options.base}img/ewallet-copyToClipboard.svg`" alt="Copiar ewalletID." role="img"/>
                            </button>
                        </span>
                    </div>
                </b-col>
            </b-row>   
      </b-container>
      <b-container  fluid class="mt-4 menu">
            <b-row @click="()=>{$router.push('/dashboard'); $bvModal.hide('internalMenuModal')}">
                <b-col cols="10">
                    <img class="icon-size icon-color" :src="`${$router.options.base}img/ewallet-home.svg`" alt="Ir a inicio." role="img"> 
                    <span class="title ml-3">Resumen</span>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                    <img  class="icon-arrow" :src="`${$router.options.base}img/ewallet-arrow.svg`"alt="" role="img">
                </b-col>
            </b-row>
            <b-row class="mt-4" @click="()=>{$router.push('/deposit'); $bvModal.hide('internalMenuModal')}">
                <b-col cols="10">
                    <img class="icon-size icon-color" :src="`${$router.options.base}img/ewallet-deposit.svg`" alt="Ir a Depositar." role="img"/>
                    <span class="title ml-3">Depositar</span>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                    <img  class="icon-arrow" :src="`${$router.options.base}img/ewallet-arrow.svg`" alt="Ir a Depositar." role="img"/>
                </b-col>
            </b-row>
            <b-row class="mt-4" @click="()=>{$router.push('/transfer'); $bvModal.hide('internalMenuModal')}">
                <b-col cols="10">
                    <img class="icon-size icon-color" :src="`${$router.options.base}img/ewallet-transfer.svg`" alt="Ir a Transferir." role="img"/>
                    <span class="title ml-3">Transferir</span>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                    <img  class="icon-arrow" :src="`${$router.options.base}img/ewallet-arrow.svg`" alt="Ir a Transferir." role="img"/>
                </b-col>
            </b-row>
            <b-row class="mt-4" @click="()=>{$router.push('/withdraw'); $bvModal.hide('internalMenuModal')}">
                <b-col cols="10">
                    <img class="icon-size icon-color" :src="`${$router.options.base}img/ewallet-withdraw.svg`" alt="Ir a Retirar." role="img"/>
                    <span class="title ml-3">Retirar</span>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                    <img  class="icon-arrow" :src="`${$router.options.base}img/ewallet-arrow.svg`" alt="Ir a Retirar." role="img"/>
                </b-col>
            </b-row>
            <b-row class="mt-4" @click="()=>{$router.push('/buy'); $bvModal.hide('internalMenuModal')}">
                <b-col cols="10">
                    <img class="icon-size icon-color" :src="`${$router.options.base}img/ewallet-buy.svg`" alt="Ir a Comprar." role="img"/>
                    <span class="title ml-3">Comprar</span>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                    <img  class="icon-arrow" :src="`${$router.options.base}img/ewallet-arrow.svg`" alt="Ir a Comprar." role="img"/>
                </b-col>
            </b-row>
            <div class="mt-5 mb-4 d-flex justify-content-center">
                <b-button type="submit" @click="logout()" class="button" >Cerrar Sesión</b-button>
            </div>
      </b-container>
    </b-modal>
</template>

<script>
import { copyToClipboard } from '../../utils/index'
export default {
    name:'internalMenuModal',
    data() {
        return {
            tooltipMessage: 'Haz clic para copiar',
            profilePicture: null,
            profilePictureLoading: true,
            base: '',
        }
    },
    methods:{
        open() {
            this.$bvModal.show('internalMenuModal');
        },
        logout(){
            this.$emit('logout')
        },
        redefineTooltip() {
            /* Need the setTimeout to compensate the tolltip fade out */
            setTimeout(() => {
                this.tooltipMessage = 'Haz clic para copiar';
            }, 300)
        },
        async copy(message) {
            try {
                await copyToClipboard(message);
                this.tooltipMessage = "¡Copiado!";
            } catch(e) {
                this.tooltipMessage = "Error al copiar, inténtalo de nuevo.";
            }
        },
        setProfilePictureClass(){
            const img = new Image();
            img.src =`${this.base}img/${this.profilePicture}`;
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            if (height > width){
                return 'profile-picture profile-picture-heightGreater'
            }else if (width > height){
                return 'profile-picture profile-picture-widthGreater'
            }else if (width === height){
                return 'profile-picture'
            }
        }
    },
    mounted(){
        this.profilePicture = this.$store.state.auth.user.profile_picture;
        this.base = this.$router.options.base;
        const el = document.querySelector('.modal-header');
        if (el) {
            el.style.backgroundImage = `url('${this.base}img/ewallet-header.png')`;
        }
    },  
}
</script>

<style lang="scss">
html { min-height: 100%;}
.modal-content {
    border: transparent;
    background: #F8F1E7;
}
#internalMenuModal > div{
    position: absolute!important;
    top: -30px!important;
    left: -10px!important;
}
#internalMenuModal{
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    background: #F8F1E7;
    .modal-dialog{
        min-width: 50%!important;
    }
    .modal-header{
        border-bottom: 0px;
        height: 12.7vh;
        border-radius: 0px 0px 35px 35px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .modal-body{
        height: 87.3vh;
        background: #F8F1E7;
    }
    .profile{
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        height: 104px;
        background: #D7C1AA;
        .profile-icon{
            width:62px; 
            height:60px;
        }
        .profile-picture-div{
            display: inline-flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            min-width: 62px;
            min-height: 60px;
            width:62px; 
            height:60px;
            text-align: center;
            border-radius: 50%;
            border:1px solid #8C4B1F;
            overflow: hidden;
            cursor: pointer;
            .profile-picture{
                max-width: 62px; 
                max-height: 60px; 
                border-radius: 50%;
            }
            .profile-picture-heightGreater{
                min-width: 62px;
                max-width: 62px;
                max-height: none;
            }
            .profile-picture-widthGreater{
                min-height: 60px;
                max-height: 60px;
                max-width: none;
            }
        }
        .name{
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            padding-left: 10px;
            color: #3E3A35;
        }
        .name-small{
            font-size: 12px;
        }
        .ewalletID{
            font-weight: 400;
            font-size: 16px;
            line-height: 19.09px;
            padding-left: 10px;
            span{
                .copy-btn{
                    border-radius: 0px 10px 10px 0px;
                    background: #D7C1AA;
                    border:transparent;
                    outline: none;
                    padding: 0;
                    &:focus {
                        box-shadow: none;
                    }
                    img.copyToClipboard{
                        filter: brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(471%) hue-rotate(341deg) brightness(91%) contrast(87%);
                    }
                }
            }
        }
    }
    .menu{
        a{
            text-decoration: none;
        }
        .row{
            padding-top: 20px;
            cursor: pointer;
        }
        .icon-size{
            width: 35px;
            height: 35px;
        }
        .icon-color{
            opacity: 1;
            filter: brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(471%) hue-rotate(341deg) brightness(91%) contrast(87%);
        }
        .title{
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 20px;
        }
        .icon-arrow{
            max-height: 25px;
            margin: auto 0;
        }
        .button{
            position: absolute;
            bottom: 5%;
            width: 70%;
            height: 44px;
            background: #8C4B1F;
            border:transparent;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 40px;
            font-weight: 600;
            font-size: 16px;
            line-height: 17px;
            text-align: center;

            color: #FFFFFF;

        }
    }  
    @media screen and (max-width:820px) {
        .modal-dialog{
            min-width: 60%!important;
        }
    }
    @media screen and (max-width:575.98px) {
        .modal-body{
            height: 85.3vh;
        }
        .profile{
            .name{
                padding-left: 0px;
            }
            .ewalletID{
                padding-left: 0px;
            }
        }
        .menu{
            .row{
                padding-top: 0px;
            }
            .icon-size{
                width: 25px;
                height: 25px;
            }
            .title{
                font-size: 0.938rem;
            }
            .button{
                font-size: 14px;
            }
        }
    }
    @media screen and (max-width:385px) {
        .menu{
            .title{
                font-size: 13px;
            }
        }
    }
    @media screen and (max-width:344px) {
        .menu{
            .title{
                font-size: 12px;
            }
        }
    }
}
@media screen and (max-width:575.98px) {
    #internalMenuModal > div{
        position: relative!important;
        top: auto!important;
        left: auto!important;
        margin: 0;

        &, .modal-content {
            height: 100%;
        }
    }
}

// Hack to show footer
@media screen and (max-width: 1205px) {
    #internalMenuModal.modal {        
        &, +.modal-backdrop {
            // 90px is the footer height
            height: calc(100% - 91px);
        }
    }
}
</style>