<template>
  <footer id="footer">
    <div class="phone" v-if="$store.state.auth.user != null">
      <b-button-group class="mt-2 d-flex justify-content-center">
        <b-button class="footer-btn">
          <nuxt-link to="/dashboard">
            <div :class="[this.$route.path == '/dashboard' ? 'active-page' : '']">
              <div class="d-flex justify-content-center">
                <img src="/img/ewallet-home.svg" class="icon-color" alt="Ir a inicio." role="img"/>
              </div>
              <div class="d-flex justify-content-center">
                <div class="menu-titles"> Resumen</div>
              </div>
            </div>
          </nuxt-link>
        </b-button>

        <b-button class="footer-btn">
          <nuxt-link to="/deposit">
            <div :class="[this.$route.path == '/deposit' ? 'active-page' : '']">
              <div class="d-flex justify-content-center">
              <img class="icon-color" src="/img/ewallet-deposit.svg" alt="Ir a Fondear." role="img">
              </div>
              <div class="d-flex justify-content-center">
              <div class="menu-titles">Depositar</div>
              </div>
            </div>
          </nuxt-link>
        </b-button>

        <b-button class="footer-btn">
          <nuxt-link to="/transfer">
            <div :class="[this.$route.path == '/transfer' ? 'active-page' : '']">
              <div class="d-flex justify-content-center">
              <img class="icon-color" src="/img/ewallet-transfer.svg" alt="Ir a Transferir." role="img">
              </div>
              <div class="d-flex justify-content-center">
              <div class="menu-titles">Transferir</div>
              </div>
            </div>
          </nuxt-link>
        </b-button>

        <b-button class="footer-btn">
          <nuxt-link to="/buy">
            <div :class="[this.$route.path == '/buy' ? 'active-page' : '']">
              <div class="d-flex justify-content-center">
              <img class="icon-color" src="/img/ewallet-buy.svg" alt="Ir a Comprar." role="img">
              </div>
              <div class="d-flex justify-content-center">
              <div class="menu-titles">Comprar</div>
              </div>
            </div>
          </nuxt-link>
        </b-button>

        <b-button class="footer-btn">
          <nuxt-link to="/withdraw">
            <div :class="[this.$route.path == '/withdraw' ? 'active-page' : '']">
              <div class="d-flex justify-content-center">
              <img class="icon-color" src="/img/ewallet-withdraw.svg" alt="Ir a Retirar." role="img">
              </div>
              <div class="d-flex justify-content-center">
              <div class="menu-titles">Retirar</div>
              </div>
            </div>
          </nuxt-link>
        </b-button>
      </b-button-group>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss">
#footer{
  background-color:#F8F8F8;
  color: #F6F6F6;
  width: 100%;
  height: 96px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  display: none;

  .phone{
    display: none;

    .responsive-icon{
      width: 25px;
      height: 25px;
    }
  }
}

@media only screen and (max-width: 1205px) {
  #footer{
    height: 90px;
    background-color: #FAF6F0;
    box-shadow: 0px -2px 6px 0px #C4C4C4;
    position:fixed;
    bottom:0;
    z-index:9;
    display: block;

    .phone{
      display: contents !important;

      .footer-btn{
        background-color: transparent;
        border-color: transparent;
        max-width: calc(100vw / 5);
        a:hover{
          text-decoration: none;
        }

        .menu-titles{
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          text-align: center;

          color: #CDB399;
        }

        .icon-color{
          height: 35px;
          filter: brightness(0) saturate(100%) invert(79%) sepia(42%) saturate(187%) hue-rotate(348deg) brightness(87%) contrast(87%);
        }

        .active-page{
          .menu-titles{
            color: #8C4B1F;
          }

          .icon-color{
            color: #8C4B1F;
            filter: brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(471%) hue-rotate(341deg) brightness(91%) contrast(87%);
          }
        }
      }

    }

  }
}

@media only screen and (max-width: 575.98px) {
  #footer{
    // height: 70px;

    .phone{
      .footer-btn{
        .icon-color{
          height: 25px;
        }

        .menu-titles{
          font-size: 12px;
        }
      }
    }
  }
}
</style>