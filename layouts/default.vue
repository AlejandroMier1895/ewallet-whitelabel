<template>
  <div>
    <div class="vertical-menu">
      <div class="div-logo d-flex justify-content-center align-items-center">
         <img class="logo" :src="`${$router.options.base}img/ewallet-fullLogo-brown.svg`" alt="E-wallet logotipo." @click="$router.push('/dashboard')">
      </div>
      <div style="margin-left:33px;">
        <div class="mt-5 menu-balance menu-balance-black menu-balance-title">Balance de cuenta</div>
        <div v-if="balance !== '...'" class="menu-balance mt-3" :class="setBalanceClass()" style="font-weight:700 !important;">{{balance}}</div>
        <div v-else class="loadingBalance">
          <div class="mt-3 dot-flashing"></div>
        </div>
        <div class="mb-5 menu-balance mt-2 menu-balance-black">Moneda <span class="wallet-name">{{ wallet_name}}</span></div>
      </div>
      
      <hr />

      <nuxt-link v-for="link in sideLinks" :key="link.path" :to="link.path" class="vertical-menu--links">
        <div>
          <img class="mr-3" :src="`${$router.options.base}img/ewallet-${link.icon}.svg`" :alt="'Ir a ' + link.name + '.'" role="img"/>
          <span>{{ link.name }}</span>
        </div>
      </nuxt-link>
    </div>

    <div class="body-page">
      <navbar v-if="$route.path !== '/my-business'" />
      <Nuxt class="land-page" />
    </div>
    <footerlimitless></footerlimitless>
  </div>
</template>

<script>
import Footerlimitless from '../components/footer.vue'
import Navbar from '../components/navbar.vue'
export default {
  head: {
    bodyAttrs: {
      class: 'default-body'
    }
  },
  components: { Footerlimitless, Navbar},
  data() {
    return {
      balance: '...',
      wallet_name: 'MEX',
      sideLinks: [
        {
          name: 'Resumen',
          icon: 'home',
          path: '/dashboard'
        },
        {
          name: 'Transferir',
          icon: 'transfer',
          path: '/transfer'
        }
      ]
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      this.updateStatus();
      this.updateBalance();
      setInterval(() => this.updateStatus(), 9000);
      if(window.screen.width > 1205){
        setInterval(() => this.updateBalance(), 9000);
      }
    }
    else{
      //this.$auth.logout();
    };
  },
  methods: {
    updateStatus: function () {
      /*
      this.$apicall.fetchGET("api/user/login-status").then(
        (response) => {
          if (response.status != "200") {
            //this.logout();
          }else{
            //this.$auth.setUser(response.data.user);
          }
        })*/
    },
    updateBalance: function (){
      this.$axios.get("balance").then(
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
        }
      });
    },
    async logout(){
      await this.$auth.logout()
      
      window.location.replace('/ewallet-whitelabel/');
    },
    setBalanceClass(){
      switch(this.balance.length){
          case 13:
              return 'balance-millions'
          case 14:
              return 'balance-tenMillions'
          case 15: 
              return 'balance-hundredMillions'
          case 17: 
              return 'balance-billions'
      }
    },
    formatAmount(amount){
        return '$' + Number(parseFloat(amount).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})
    },
  }
}
</script>

<style lang="scss">
html {
  min-height: 100%;
}
* {
  box-sizing: border-box;
}

.default-body {
  position: relative;
  min-height: 100vh;
  background-image: none !important;
}

.vertical-menu {
  width: 244px; // Set a width if you like

  position: fixed;
  min-height: 100vh;
  overflow: auto;
  border: 0px;
  background-color: #FAF6F0;
  border-style: solid;
  border-right-width: 1px;
  border-color: #C4C4C4;

  .div-logo{
    height: 94px;
    border-style: solid;
    border-width: 0px;
    border-bottom-width: 1px;
    border-color: #C4C4C4;
    a{
      padding-left: 0;
      padding-right: 0;
      margin-bottom: 0;
    }
    .logo {
      max-width: 135px;
    }
  }
  hr{
    border-top: 1px solid #C4C4C4;
  }
  a {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    background-color: #FAF6F0; 
    color: #959393; 
    display: block;
    padding: 12px; // Add some padding
    padding-left: 33px;
    text-decoration: none; // Remove underline from links
    margin-bottom: 5%;

    &.vertical-menu--links {
      >div {
        padding: 10px 16px;
        margin: -10px -16px;
        width: 100%;
        display: flex;
        align-items: center;

        img {
          max-width: 30px;
          max-height: 30px;
        }

        &:hover {
          color: #8C4B1F;
          img{
            filter: brightness(0) saturate(100%) invert(29%) sepia(25%) saturate(1472%) hue-rotate(341deg) brightness(102%) contrast(89%);
          }
        }
      }

      &.nuxt-link-exact-active>div {
        color: #8C4B1F;
        border-radius: 8px;
        background: #EAD8C3;

        img {
          filter: brightness(0) saturate(100%) invert(29%) sepia(25%) saturate(1472%) hue-rotate(341deg) brightness(102%) contrast(89%);
        }
      }
    }
  }
}

.menu-balance {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 22px;
  color: #8C4B1F;
  text-align: left;
}
.balance-millions{
    font-size: 22px;
}
.balance-tenMillions{
    font-size: 20px;
}
.balance-hundredMillions{
    font-size: 18px;
}
.balance-billions{
    font-size: 16px;
}
.loadingBalance {
    margin-left: 10px;
    height: 22px;
    .dot-flashing {
      position: relative;
      width: 6px;
      height: 6px;
      top: 16px;
      border-radius: 5px;
      background-color: var(--withdraw);
      color: var(--withdraw);
      animation: dot-flashing 1s infinite linear alternate;
      animation-delay: 0.5s;
  }
  .dot-flashing::before, .dot-flashing::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
  }
  .dot-flashing::before {
      left: -9px;
      width: 6px;
      height: 6px;
      border-radius: 5px;
      background-color: var(--withdraw);
      color: var(--withdraw);
      animation: dot-flashing 1s infinite alternate;
      animation-delay: 0s;
  }
  .dot-flashing::after {
      left: 9px;
      width: 6px;
      height: 6px;
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
.menu-balance-black{
  color: #3E3A35;
  font-size: 16px;
  .wallet-name{
    font-weight: 700;
  }
}

.menu-balance-title{
  font-size: 18px;
}
.body-page {
  margin-left: 210px;
  background-color: #F8F1E7 !important;

  .land-page {
    padding-top: 5rem;
  }
}

@media screen and (max-width:1205px) {
  .vertical-menu {
    display: none !important;
  }

  .body-page {
    margin-left: 0px;
    background: #F8F1E7 !important;

    .land-page {
      padding-top: 180px;
    }
  }
}
@media only screen and (max-width: 575.98px) {
  .body-page {
    .land-page {
      padding-top: 180px;
    }
  }
}
</style>