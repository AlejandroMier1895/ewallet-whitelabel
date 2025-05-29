<template>
    <b-modal ref="confirmTransactionModal" id="confirmTransactionModal" centered hide-footer size="lg" @hidden="walletPin = ''">
      <div class="d-flex justify-content-center title-text">Confirmar Transacción</div>
      <div class="d-flex justify-content-center mt-5 mb-4">
        <b-card-group class="confirmTransactionModal-cardGroup">
          <b-card class="card-left">
            <div class="icon d-flex justify-content-center align-items-center">
              <div v-if="icon === ' ' || icon === null || !icon" class="brown-circle d-flex justify-content-center align-items-center">
                <b-avatar class="avatar" :src="`${$router.options.base}img/ewallet-unknown-profilePicture.png`"/>
              </div>
              <div v-else>
                <b-avatar class="avatar" :src="`${$router.options.base}img/${icon}`"/>
              </div>
            </div>
          </b-card>
          <b-card class="card-right">
            <div class="d-flex align-items-center card-right-div">
              <div class="text">
                <div>{{action + ' a:'}}</div>
                <div class="font-weight-bold user" v-b-tooltip.hover title="Transferencia">
                  {{account}}</div>
              </div>
            </div>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-5 mb-5">
        <b-row align-h="center">
          <b-col cols="4" lg="2" md="4" class="text"><div>Monto:</div></b-col>
          <b-col cols="6" lg="4" md="4" class="text number font-weight-bold d-flex justify-content-end">
            {{'$ ' + setAmount(amount, 1)}}
            <span class="text number text-gray">{{setAmount(amount, 2)}}</span>
          </b-col>
        </b-row>
        <b-row align-h="center" class="mt-3">
          <b-col cols="4" lg="2" md="4" class="text">
            <div>Comisión:</div>
          </b-col>
          <b-col cols="6" lg="4" md="4" class="text number font-weight-bold d-flex justify-content-end">
            <div>{{'$ ' + setAmount(setCommission(),1)}}<span class="text-gray number">{{setAmount(setCommission(),2)}}</span></div>
          </b-col>
        </b-row>
        <b-row v-if="tariffs[action].iva" align-h="center" class="mt-3">
          <b-col cols="3" lg="2" md="4" class="text">
            <div>IVA <span class="text-percentage">(19%):</span></div>
          </b-col>
          <b-col cols="7" lg="4" md="4" class="text number font-weight-bold d-flex justify-content-end">
            <div>
              {{'$ ' + setAmount(setCommission()*0.19, 1)}}<span class="text number text-gray">{{setAmount(setCommission()*0.19, 2)}}</span>
            </div>
          </b-col>
        </b-row>
        <b-row align-h="center" class="mt-3">
          <b-col cols="3" lg="2" md="4" class="text"><div>Total:</div></b-col>
          <b-col cols="7" lg="4" md="4" class="text font-weight-bold d-flex justify-content-end">
            $ {{setAmount(setTotal(),1)}}
            <span class="text number text-gray">{{setAmount(setTotal(),2)}}</span>
          </b-col>
        </b-row>
        <b-form @submit.prevent="$emit('finishTransfer', setTotal())" >
            <b-row align-h="center" class="mt-lg-4">
              <b-col cols="9" xl="4" lg="4" md="5" class="mt-4">
                <div class="mt-4">
                  <b-form-input :type="showPin ? 'text' : 'password'" :formatter="formatewalletPin" v-model="walletPin" placeholder="PIN*" required></b-form-input>
                  <img class="pass-eye" @click="showPin = !showPin" role="img" :src="!showPin ? `${$router.options.base}img/${passwordIcons[1]}` : `${$router.options.base}img/${passwordIcons[0]}`" :alt="!showPin ? 'Mostrar ewalletletPIN.' : 'OcultewaewalletaroPIN.'"/>
                  <div class="d-flex justify-content-center text-danger mt-1" v-if="pin_error">Pin incorrecto</div>
                </div>
              </b-col>
            </b-row>
            <b-row align-h="center" class="mt-5">
              <b-col cols="6" xl="4" lg="4" md="4" >
                <b-button @click="()=>{$emit('cancelTransfer'); $bvModal.hide('confirmTransactionModal')}" id="cancel-button">Cancelar</b-button>
              </b-col>
              <b-col cols="6" xl="4" lg="4" md="4" >
                <b-button type="submit" id="action-button">
                  <span
                      v-if="loading"
                      style="width: 0.875rem; height: 0.875rem; margin-right: 0.1rem;"
                      class="spinner-border"
                  ></span>
                  {{action}}</b-button>
              </b-col>
            </b-row>
          </b-form>
      </div>
    </b-modal>
</template>
<script>
import sharedData from '../../store/sharedData.json'
export default {
  name:'confirmTransactionModal',
  props:['account', 'amount', 'action', 'pin_error', 'icon', 'loading', 'parent',],
  data() {
    return {
      sharedData,
      passwordIcons:[
          "icon-bootstrap-eye-slash.svg",
          "icon-bootstrap-eye.svg",
      ],
      showPin: false,
      walletPin: '',
      tariffs:{
          Transferir: {
            variable: null,
            fija: null,
            iva: true,
            gmf: true,
          },
      },
      windowWitdh: '',
    }
  },
  mounted(){
    this.setFinalTariffs();
    this.windowWitdh = window.screen.width;
  },
  watch: {
      action() {
        this.setFinalTariffs();
      }
  },
  methods: {
    setAmount(amount, position){
      if(!amount){
        amount = 0;
      }
      const string = Number(parseFloat(amount).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).toString();
      if(position === 1){
          return string.substring(0,string.indexOf('.')+1);
      }else if(position === 2){
          return string.substring(string.indexOf('.')+1, string.length);
      }
    },
    setFinalTariffs(){
      this.setTariffs('Transfer');
    },
    setTariffs(method){
      const backInfo = this.sharedData.tariffs.find((element)=> element.media === method);
      this.tariffs[this.action].variable = parseFloat(backInfo.percent)/100;
      this.tariffs[this.action].fija = parseFloat(backInfo.fixed);
      this.tariffs[this.action].gmf = backInfo.gmf;
    },
    setCommission(){
      const fija = this.tariffs[this.action].fija;
      const variable = this.tariffs[this.action].variable;
      return fija + this.amount*variable
    },
    setTotal(){
      let iva 
      let total
      if(this.tariffs[this.action].iva){
        iva = this.setCommission()*0.19;
      }else{
        iva = 0;
      }
      total = parseFloat(this.amount) + parseFloat(this.setCommission()) + parseFloat(iva);
      return total
    },
    formatewalletPin(input){
      return input.replace(/\D/g, "").replace(/^\d{5}/, input.substring(0,4));
    }
  }
}
</script>
<style lang="scss">
html { min-height: 100%; }
#confirmTransactionModal{
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    line-height: normal;
    .pass-eye {
      position: absolute;
      right: 25px;
      top: 44px;
      cursor: pointer;
    }
    .modal-header{
        border-bottom: 0px;
    }
    .modal-header .close{
      margin: -1rem 0.0rem -1rem auto;
      color:#8C4B1F;
      font-size: 40px;
      font-weight: 400;
    }
    .title-text{
        color: #3E3A35;
        font-size: 24px;
        font-weight: 700;
    }
    .confirmTransactionModal-cardGroup{
      flex: 2;
      max-width: 50%;
      border: 2px solid #8C4B1F;
      .card-left{
        background: #FAF6F0;
        border-color: transparent;
        box-shadow: 2px 2px 29px rgba(0, 0, 0, 0.08);
      }
      .card-right{
        background: #FAF6F0;
        border-color: transparent;
        box-shadow: 2px 2px 29px 0px rgba(0, 0, 0, 0.08);
        flex: 1.8;
        .card-body{
          padding-left: 30px;
        }
        .card-right-div{
          height: 100%;
        }
      }
    }
    .icon{
      height: 100%;
      .brown-circle{
        min-width: 68px;
        min-height: 68px;
        max-width: 68px;
        max-height: 68px;
        border-radius: 40px;
        background: #8C4B1F;
        .bank--initial{
          color: white;
          font-weight: 600;
          font-size: 22px;
        }
      }
      .transparent-circle{
        background: transparent;
      }
      .avatar{
        min-width: 68px;
        min-height: 68px;
        max-width: 68px;
        max-height: 68px;
        background: #8C4B1F;
      }
      img{
        max-height: 68px;
      }
      .pagar-div{
        min-width: 100%;
        min-height: 100%;
        border-radius: 10px 0px 0px 10px;
        padding-top: 5%;
        padding-bottom: 5%;
        img{
          max-width: 75%;
        }
      }
    }
    .card-body:has(.pagar-div){
      padding: 0px;
    }
    .text{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;

        color: #3E3A35;
        max-width: 100%;
        .user{
          max-width: 100%;
        }
    }
    .number{
      font-weight: 700;
    }
    .text-gray{
      color: #3E3A3573;
    }
    .form-control{
        background: #EAD8C3;
        border: 2px solid #8C4B1F;
        color:#3E3A35;
        width: 100%;
        height: 60px;
        text-align: center;
        padding-right: 35px;
        padding-left: 35px;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        line-height: 29.26px;
    }
    input::-webkit-credentials-auto-fill-button {
      position: absolute;
      right: 50px;
    }
    ::placeholder {
      text-align: center; 
      color:#3E3A35;
      font-size: 16px;
      font-weight: 400;
    }
  #action-button{
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    background: #8C4B1F;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    border-color:transparent;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    color: #FFFFFF;

  }
  #action-button:hover, #action-button:focus{
      background: #687F2E;
  }
  #cancel-button{
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    background: #FAF6F0;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    border-color:#8C4B1F !important;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    color: #8C4B1F;

  }
  #cancel-button:hover, #cancel-button:focus{
      border-color: #B03A2E !important;
      color:#B03A2E;
  }
  @media only screen and (max-width: 1205px) {
    .modal-header .close{
        padding-right: 8px;
    }
  }
  @media only screen and (max-width: 991px) {
    .confirmTransactionModal-cardGroup{
      max-width: 70%;
      .text{
        .user{
          font-size: 16px;
        }
      }
    }
  }
  @media only screen and (max-width: 800px) {
    .text{
        font-size: 16px;
    }
    .icon{
      display: flex !important;
      justify-content: center !important;

    }
    #register-button{
      width: 30%;
    }
  }
  @media screen and (max-width:575.98px) {
    .text-percentage{
      font-size: 10.5px;
    }
    .confirmTransactionModal-cardGroup{
      display: flex;
      max-width: 82%;
      > .card {
        margin-bottom: 0px;
      }
      .card-left{
        .icon{
          .brown-circle{
            min-width: 58px;
            min-height: 58px;
            max-width: 58px;
            max-height: 58px;
            img{
              max-width: 45px;
              min-width: 45px;
              min-height: 45px;
              padding: 10px;
            }
          }
          .avatar{
            img{
              max-width: 80px;
              min-width: 80px;
              min-height: 80px;
            }
          }
        }
      }
      .card-right{
        .card-body{
          padding-left: 20px;
          padding-right: 0px;
        }
      }
      .text{
        .user{
          font-size: 13.5px;
        }
      }
    }
    #action-button.loading-button{
      font-size: 12px;
    }
    #action-button.loading-buttonSmall{
      font-size: 10px;
    }
  }

}


</style>