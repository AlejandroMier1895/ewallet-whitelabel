<template >
    <b-navbar toggleable="lg"  type="white" variant="info" class="p-0" id="navbar" >
      <b-collapse id="computer" is-nav >
        <b-navbar-nav class="topMenu">
            <b-nav-item  :class="[  this.$route.path == '/dashboard'  ? 'mt-1 ml-5 active-page' : 'mt-1 ml-5 unactive-page' ] " to="/dashboard">Resumen</b-nav-item>
            <b-nav-item  :class="[  this.$route.path == '/transfer'  ? 'mt-1 ml-4 active-page' : 'mt-1 ml-4 unactive-page' ] " to="/transfer">Transferir</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="user-button profile-picture-button d-flex align-items-center ml-auto mr-lg-5">
            <b-nav-item-dropdown right class="mr-3" no-caret>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <div class="profile-picture-div">
                <b-avatar :src="profilePicture"></b-avatar>
              </div>
              <span class="account-name d-flex justify-content-center align-items-center px-2" ref="account-name-span">{{account_name}}</span>
              <img style="width: 17px;" src="../static/img/icon-caretThin-down.svg" alt="Abrir menú desplegable para cerrar sesión." role="img"/>
            </template>
            <b-dropdown-item @click="logout()">Cerrar Sesión</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

      <div id="phone">
        <b-row class="mx-auto d-flex justify-content-center">
          <b-col cols="12">
            <div class="d-flex justify-content-center align-items-center position-relative">
              <svg @click="openInternalMenu" width="23" height="20" class="hamburger-button" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="23" height="20" fill="url(#pattern0_310_337)"/>
                <defs>
                <pattern id="pattern0_310_337" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_310_337" transform="matrix(0.0621118 0 0 0.0714286 -0.121118 0)"/>
                </pattern>
                <image id="image0_310_337" width="20" height="14" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAKUlEQVQ4EWP4////h//UA+8ZqGzgB4ZRQHkIUDlSRmOZ8iihgQmDPpYBpvfdeeyT3SQAAAAASUVORK5CYII="/>
                </defs>
              </svg>
              <div class="title text-center mt-4">{{titles[this.$route.path]}}</div>
            </div>
          </b-col>
          <b-col cols="12" class="mx-auto d-flex justify-content-center">
            <b-card class="balance-card">
                <div class="ml-4 mx-auto">
                    <div class="title-text mx-auto text-center">Balance</div>
                    <div class="balance-text mx-auto text-center mt-1"><b-spinner style="height:25px; width:25px;" v-if="loading"></b-spinner> {{balance}}</div>
                    <div v-if="this.$route.path == '/dashboard'" class="mt-4">
                      <div class="d-flex justify-content-center align-items-center accounting-rectangleGreen-parent">
                          <div class="accounting-rectangle accounting-rectangleGreen d-flex justify-content-center align-items-center">
                              <img class="card-image mr-3" src="/img/ewallet-debitCard.svg" alt="Debit card icon">
                          </div>
                          <div>
                              <div class="accounting-text">Débito</div>
                              <div class="accounting-amount">
                                 {{ewalletUser.debit_card}}
                              </div>
                          </div>
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                          <div class="accounting-rectangle accounting-rectangleRed d-flex justify-content-center align-items-center">
                              <img class="card-image mr-3" src="/img/ewallet-creditCard.svg" alt="Credit card icon">
                          </div>
                          <div>
                              <div class="accounting-text">Crédito</div>
                              <div class="accounting-amount">
                                 {{ewalletUser.credit_card}}
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
            </b-card>
          </b-col>
        </b-row>

        <internal-menu-modal ref="internalMenu" @logout="logout"></internal-menu-modal>
      </div>  
    </b-navbar>
</template>

<script> 
import internalMenuModal from './modals/internalMenuModal.vue'
import { copyToClipboard } from '../utils/index'
export default {
  name: 'Navbar',
  components: {internalMenuModal},
  props: ['userInfo', 'emailResent'],
  data(){
    return{
      addressList:[{text:'Select Address', value:null}],
      wireAddressList:[{text:'Select Address', value:null}],
      cryptoAddressList:[{text:'Select Address', value:null}],
      addresses:[],
      balance:'',
      loading: true,
      account_name: '',
      welcomeMessage: '',
      titles:{},
      profilePicture: null,
      income:'...',
      outcome:'...',
      accountingMinWidth: 0,
      accountingInterval: '',
      tooltipMessage: 'Haz clic para copiar',
      businessCredentialsStatus: false,
    }
  },
  methods: {
    openInternalMenu() {
      this.$refs.internalMenu.open();
    },
    async logout() {
      window.location.replace('/');

      setTimeout(() => {
        this.$auth.logout().catch(err => {
          console.error('Error en logout:', err);
        });
      }, 100);
    },
    updateBalance: function (load){
      this.$axios.get("/balance").then(
      (response) => {
          if(response.status == "200")
          {
              if(response.data.balance){
                  this.balance = this.formatAmount(response.data.balance);
              }
              this.wallet_name = response.data.wallet_name
              if(!this.wallet_name){
                  this.wallet_name  = 'MEX';
              }
              this.loading = false;
          }
      });
    },
    formatAmount(amount){
        return '$' + Number(parseFloat(amount).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
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
  },
  computed: {
    ewalletUser(){
        return this.$store.state.auth.user;
    },
  },
  mounted(){
    this.profilePicture = this.ewalletUser.profile_picture;
    this.account_name = this.ewalletUser.account_name;
    if(this.ewalletUser == null) this.account_name = "";
    if(this.ewalletUser.name === null) this.account_name = "";
    if(this.account_name !== ''){
      const name = this.account_name;
      const space = name.indexOf(' ');
      //If the name has more than one word
      if(space > 0){
        if(name.length > 14){
          this.account_name = name.substring(0,space+2) + '.';
        }
      }
    };
    this.updateBalance(true);
    if(window.screen.width <= 1205){
      setInterval(() => this.updateBalance(false), 9000);
    }
    switch(this.ewalletUser.gender){
      case 2: 
        if(this.account_name === null || this.account_name === ''){
          this.welcomeMessage = '¡Bienvenida!';
        }else{
          this.welcomeMessage = '¡Bienvenida '+this.account_name+'!';
        }
        break;
      default: 
        if(this.account_name === null || this.account_name === ''){
          this.welcomeMessage = '¡Bienvenido!';
        }else{
          this.welcomeMessage = '¡Bienvenido '+this.account_name+'!';
        }
    };
    this.titles = {
      '/dashboard': this.welcomeMessage,
      '/transfer':'Transferir',
    };
  },
}
</script>

<style lang="scss">
 #navbar{
    position: fixed; /* Set the navbar to fixed position */
    top:0;
    z-index: 100;
    background-color: #FAF6F0 !important;
    width: calc(100% - 210px);
    height: 94px;
    border:0px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    border-style: solid;
    border-bottom-width: 1px;
    border-color: #C4C4C4;
    #computer{
      .topMenu{
        margin-left: 3rem;
        margin-right: 38px;
      }
      .user-button{
        height: 94px;
        padding-left: 38px;
        border: 0px;
        border-style: solid;
        border-left-width: 1px;
        border-color: #C4C4C4;
        .profile-picture-div{
          display: inline-flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #8C4B1F;
          overflow: hidden;
          .b-avatar{
            width: 31px;
            height: 31px;
            background: #8C4B1F;
          }
        }
      }
      .profile-picture-button{
        a{
          display: flex;
        }
      }
      .account-name{
        font-weight: 400;
        font-size: 22px;
        line-height: 27px;

        color: #959393;
      }
      .active-page{
          a{
              height: 94px;
              display: flex;
              align-items: center;
              border-bottom: 3px solid #8C4B1F !important;
              font-weight: 700;
              color:#8C4B1F !important;
          }
      }
      .unactive-page{
        a{
          height: 94px;
          display: flex;
          align-items: center;
          color:#C4C4C4 !important;
        }
      }
      .nav-link{
          color: #1A374B !important;    
          font-style: normal;
          font-weight: 400;
          font-size: 22px;
          line-height: 26px;
      }
    }
    #phone{
      display: none !important;
      .title{
        font-weight: 400;
        font-size: 24px;
        line-height: 27px;

        color: #FAF6F0;
      }
    }
    @media only screen and (max-width: 1300px) {
      #computer{
        .topMenu{
          margin-left: 0rem;
        }
      }
    }
    @media only screen and (max-width: 1240px) {
      #computer{
        .topMenu{
          margin-right: 25px;
        }
        .user-button{
          padding-left: 25px;
        }
      }
    }
    @media only screen and (max-width: 1205px) {
      height: 120px;
      margin-bottom: 13%;
      background-image: url("/img/ewallet-header.png");
      background-position-y: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 0px 0px 35px 35px;
      width: 100%;
      flex-wrap: wrap;

      #computer{
        display: none !important;
      }
      #phone{
        display: contents !important;
        .hamburger-button{
          position: fixed;
          top: 25px;
          left: 4%;
          filter: brightness(0) saturate(100%) invert(100%) sepia(72%) saturate(624%) hue-rotate(294deg) brightness(107%) contrast(96%);
        }
        .balance-card{
            width: 44.5rem;
            margin-top:2%;
            background-color: #FAF6F0;
            border:transparent;
            box-shadow: 4px 4px 10px 0px rgba(196, 196, 196, 0.60);
            .title-text{
              font-size: 22px;
              font-weight: 600;
              color: #3E3A35;
            }
            .balance-text{
                font-weight: 700;
                font-size: 24px;
                color: #8C4B1F;
            }
            .level-text{
              font-size: 18px;
              font-weight: 500;
            }
            .accounting-rectangle{
                width: 41px;
                height: 41px;
                border-radius: 8px;
                margin-right: 15px;
                img{
                  max-height: 41px;
                }
            }
            .accounting-rectangleGreen-parent{
                margin-bottom: 20px;
            }
            .accounting-amount{
                font-family: 'Poppins', sans-serif;
                font-size: 18px;
                font-weight: 700;
                line-height: 24.38px;
                color: #3E3A35;
                min-height: 24.5px;
                min-width: 102.37px;
                position: relative;
            }
            .loading-amount{
                line-height: 10px;
                min-height: 10px;
                margin-top: 9.5px;
                min-width: 102.37px;
                position: relative;
                .dot-flashing {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: var(--withdraw);
                    color: var(--withdraw);
                    animation: dot-flashing 1s infinite linear alternate;
                    animation-delay: 0.5s;
                    margin-left: 15px;
                    margin-bottom: 5px;
                }
                .dot-flashing::before, .dot-flashing::after {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    bottom: 5px;
                }
                .dot-flashing::before {
                    left: 0px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: var(--withdraw);
                    color: var(--withdraw);
                    animation: dot-flashing 1s infinite alternate;
                    animation-delay: 0s;
                }
                .dot-flashing::after {
                    left: 30px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: var(--withdraw);
                    color: var(--withdraw);
                    animation: dot-flashing 1s infinite alternate;
                    animation-delay: 1s;
                }

                @keyframes dot-flashing {
                    0% {
                        background-color: var(--withdraw);
                    }
                    50%, 100% {
                        background-color: #8C4B1F40;
                    }
                }
            }
            .amount-medium{
                font-size: 16px;
            }
            .amount-small{
                font-size: 14px;
            }
            .amount-xsmall{
                font-size: 12px;
            }
            .accounting-text{
                font-family: 'Poppins', sans-serif;
                font-size: 12px;
                font-weight: 400;
                line-height: 17.07px;
                color: #3E3A35;
            }
        }
        .user-card{
          .return-arrow, .level{
            position: absolute;
            z-index: 2;
          }
          .level{
            right: 0;
          }
          .profile-icon{
            width: 125px;
            height: 125px;
            margin-top: 28px;
          }
          .profile-avatar{
            margin-top: 0px;
            background: #8C4B1F;
          }
          .profile-picture-div{
            display: inline-flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            width: 125px;
            height: 125px;
            text-align: center;
            border-radius: 50%;
            border:1px solid #8C4B1F;
            overflow: hidden;
            .b-avatar{
              width: 125px;
              height: 125px;
              background: #8C4B1F;
            }
          }
          .dropdown-button{
            .btn-link{
                color: #3E3A35;
                font-family: 'Helvetica Neue';
                font-size: 12px;
                font-weight: bold;
                padding: 0px;
            }
          }
          .user-info{
            color: #3E3A35;
            font-size: 18px;
            font-weight: 400;
            line-height: normal;
            text-align: center;
          }
          .user-info-bold{
            font-weight: 700;
          }
          .copy-btn{
              border-radius: 0px 10px 10px 0px;
              background: #FFF;
              border:transparent;
              outline: none;
              padding: 0;
              padding-bottom: 0.5rem;
              &:focus {
                  box-shadow: none;
              }
              img.copyToClipboard{
                  filter: brightness(0) saturate(100%) invert(60%) sepia(99%) saturate(2206%) hue-rotate(323deg) brightness(94%) contrast(104%);
              }
          }
          .myBusinessUser-col{
            min-height: 61px;
          }
          .user-info-title{
            font-size: 22px;
          }
          .user-info-title-small{
            font-size: 18px;
          }
          .profile-button{
            height: 37px;
            width: 50%;
            background: #8C4B1F;
            border-radius: 40px;
            border-color: transparent;
            margin-top: 0.4rem;
    
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 18px;
            line-height: 17px;
            text-align: center;
    
            color: #FFFFFF;
          }
        }
        .ewalletID-card{
          margin-top: 14px;
          .ewalletID-div{
            min-height: 50px;
            .profile-picture-div{
              display: inline-flex;
              justify-content: center;
              align-items: center;
              align-self: center;
              width: 33px;
              height: 33px;
              text-align: center;
              border-radius: 50%;
              border:1px solid #8C4B1F;
              overflow: hidden;
              margin-right: 14px;
              margin-top: 0px;
              .b-avatar{
                width: 33px;
                height: 33px;
                background: #8C4B1F;
              }
            }
            .ewalletID{
              color: #707070;
              font-weight: 400;
            }
          }
        }
        .credencials-card{
          border-radius: 32.5px;
          position: relative;
          .medal{
            width: 32px;
            height: 32px;
          }
          .settings-circle{
            border: 1px solid #C4C4C437;
            border-radius: 50%;
            width: 33px;
            height: 33px;

            position: absolute;
            right: 15px;
            top: calc(50%  - 16.5px);
          }
        }
      }
    }
    @media only screen and (max-width: 820px) {
      //iPad Air
      #phone{
        .balance-card{
          width: 35.5rem;
        }
        .title{
          font-size: 20px;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      //iPad Mini
      #phone{
        .balance-card{
          width: 34.25rem;
        }
      }
    }

    @media only screen and (max-width: 575.98px) {
      height: 150px;
      #phone{
        .hamburger-button{
          position: absolute;
          bottom: 7%;
          left: 4%;
          top: auto;
        }
        .title{
          margin-top: 48px!important;
          height: 31px;
          font-size: 16px;
          font-weight: 500;
        }
        .balance-card{
          width: 20.5rem;
          .title-text{
            font-size: 18px;
            font-weight: 600;
            //padding-top: 4px;
          }
          .balance-text{
            font-size: 22px;
          }
          .level-text{
            font-size: 16px!important;
            font-weight: 500;
          }
        }
        .user-card{
          width: 21.438rem;
          .user-info{
            font-size: 0.850rem;
            min-height: 22px;
          }
          .user-info-title{
            font-size: 1rem;
          }
          .user-info-title-small{
            font-size: 0.7rem;
          }
          .profile-button{
            height: 35px;
            font-size: 14px;
          }
        }
      }
    }
    @media only screen and (max-width: 575.98px) and (max-height: 700px){ 
      #phone{
        .user-card{
          .profile-icon{
            width: 96px;
            height: 96px;
            margin-top: 0px;
          }
          .profile-picture-div{
            display: inline-flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            width: 96px;
            height: 96px;
            text-align: center;
            border-radius: 50%;
            border:1px solid #8C4B1F;
            overflow: hidden;
            margin-top: 0px;
            .b-avatar{
              width: 96px;
              height: 96px;
              background: #8C4B1F;
            }
          }
        }
        .ewalletID-card{
          margin-top: 10px;
          .ewalletID-div{
            min-height: auto;
          }
        }
      }
    }
 }
</style>