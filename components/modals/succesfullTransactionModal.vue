<template>
    <b-modal ref="succesfulltransactionmodal" id="succesfullTransactionModal" centered hide-footer  size="lg" @hidden="()=>{screenshotTaken = false}">
      <b-container  fluid  v-if="!screenshotTaken">
        <div id="screenshotSuccess" class="pt-4 pb-5">
            <div class="mb-4">
                <div  class="d-flex justify-content-center">
                    <img class="mr-3" id="transaction-finished" src="/img/ewallet-transactionFinished.svg" alt="Ícono de transacción exitosa." role="img"/>
                </div>
                <div class="title d-flex justify-content-center mt-3">¡TRANSACCIÓN<span>&nbsp; EXITOSA</span>!</div>
                <div class="date d-flex justify-content-center mt-1">{{transaction.date}}</div>
            </div>
            <div class="mt-5">
                <div class="amount d-flex justify-content-center"  :class="setAmountSize(transaction.amount)">
                    {{'$ ' + setAmount(transaction.amount, 1)}}
                    <span class="amount amount-gray" :class="setAmountSize(transaction.amount)">{{setAmount(transaction.amount, 2)}}</span>
                </div>
            </div>
            <div class="mt-5" style="background: #EAD8C3; width:100%; height: 88px;">
                <b-row align-h="center">
                    <b-col cols="4" xl="3" lg="3" md="3" class="text text-description text-description-small mt-3"><div>Recipiente:</div></b-col>
                    <b-col cols="7" xl="4" lg="4" md="4" class="text d-flex justify-content-end mt-3">{{transaction.recipient}}</b-col>
                </b-row>
                <b-row align-h="center" class="mt-3 ">
                    <b-col cols="4" xl="3" lg="3" md="3" class="text text-description"><div>ID <span class="computer">de Transacción</span>:</div></b-col>
                    <b-col cols="7" xl="4" lg="4" md="4" class="text d-flex justify-content-end">{{transaction.trans_id}}</b-col>
                </b-row>
            
            </div>
        </div>
        <div id="shareIcon" class="d-flex justify-content-center" @click="shareTransaction()"><span class="mr-3 mb-3 mt-1 text"> Compartir</span> <img style="width: 30px; height: 30px;" class="mr-3" src="/img/ewallet-compartir.svg" alt="Compartir Transacción."/></div>
        <div class="d-flex justify-content-center mt-4 mb-4">
            <b-button @click="$bvModal.hide('succesfullTransactionModal');" id="action-button">Regresar</b-button>
        </div>
      </b-container>
      <b-container v-else fluid id="imageContainer">
        <div class="d-flex justify-content-center align-items-start" id="image"></div>
        <div class="d-flex justify-content-center mt-5 mb-4">
            <b-button @click="saveImage()" id="action-button">Guardar comprobante</b-button>
        </div>
      </b-container>
    </b-modal>
</template>
<script>
import html2canvas from 'html2canvas';
export default {
  name:'succesfullTransactionModal',
  props:['transaction', 'action', 'bank', 'parent'],
  data() {
    return {
        windowWidth: '',
        screenshotTaken: false,
    }
  },
  methods: {
    setAmount(amount, position){
        const string = Number(parseFloat(amount).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).toString();
        if(position === 1){
            return string.substring(0,string.indexOf('.')+1);
        }else if(position === 2){
            return string.substring(string.indexOf('.')+1, string.length);
        }
    },
    shareTransaction(){
        html2canvas(document.querySelector('#screenshotSuccess'), 
        {
            backgroundColor: '#F8F1E7',
        }
        ).then(
            function(canvas) {
                document.getElementById('image').appendChild(canvas);
            });
        this.screenshotTaken = true;
    },
    saveImage(){
        var link = document.createElement('a');
        link.download = 'Ticket-' + this.transaction.trans_id + '.png';
        link.href = document.getElementsByTagName("CANVAS")[0].toDataURL();
        link.click();
    },
    setAmountSize(amount){
        if(amount){
            let amountStr = amount.toString();
            if(amountStr.indexOf('.') < 0){
                amountStr += '.00';
            }
            if(amountStr.length > 8){
                return 'amount-small'
            }
        }
    },
  },
  mounted(){
    this.windowWidth = window.screen.width;
  }
}
</script>
<style lang="scss">
html { min-height: 100%; }
#succesfullTransactionModal{
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    .modal-header{
        border-bottom: 0px;
    }
    .modal-body{
        padding:0rem;
    }
    .modal-header .close{
        margin: -1rem 0.0rem -1rem auto;
        color:#8C4B1F;
        font-size: 40px;
        font-weight: 400;
    }
    #imageContainer{
        padding: 20px;
        padding-top: 10px;
        #image{
            min-height: 356px;
            canvas{
                width: 75%!important;
                height: auto!important;
                border: 1px solid #8C4B1F;
                border-radius: 10px;
                box-shadow: 0px 4px 4px 0px #3E3A3540;
            }
        }
    }
    #transaction-finished{
        max-width: 25%;
    }
    .title{
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        text-align: center;

        color: #8C4B1F;
    }
    .date{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        text-align: center;

        color: #3E3A35;

    }
    .amount{
        font-weight: 700;
        font-size: 46px;
        line-height: 56px;
        text-align: center;
        color: #3E3A35;
    }
    .amount-gray{
        color: #3E3A3573;
    }
    .description{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;

        color: #3E3A35;

    }
    .text{
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        color: #3E3A35;
        font-weight: 700;
    }
    .text-description{
        font-weight: 400;
    }
    .computer{
        display: contents !important;
    }
    #shareIcon{
        cursor: pointer;
    }
    #action-button{
        box-sizing: border-box;
        width: 30%;
        height: 44px;
        background: #8C4B1F;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
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
    @media only screen and (max-width: 1205px) {
        .modal-header .close{
            padding-right: 8px;
        }
    }
    @media only screen and (max-width: 800px) {
        .text{
            font-size: 16px;
        }
        #action-button{
        width: 60%;
        }
        .computer{
            display: none !important;
        }
    }
    @media only screen and (max-width: 575.98px){
        .text-description-small{
            font-size: 14px;
        }
        .text-description-extraSmall{
            font-size: 10px;
        }
        .amount-small{
            font-size: 38px;
        }
    }
}


</style>