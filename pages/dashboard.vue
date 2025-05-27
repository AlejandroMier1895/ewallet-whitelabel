<template>
    <div id="dashboard-page">
        <b-container fluid>
            <b-row>
                <b-col cols="10" class="mx-auto">
                    <div class="d-flex justify-content-center">
                        <b-card-group id="dashboard-card-group" :class="topMessageActive ? 'dashboard-card-group-smallPadding' : ''">
                            <b-card-group id="dashboard-targeta">
                                <b-card id="account-balance-card">
                                    <div class="ml-3 balance-text">
                                        <span>Balance de Cuenta</span>
                                    </div>
                                    <div class="balance-div">
                                        <div class="mt-5 d-flex justify-content-end" :class="balance === '...' ? 'loadingBalance' : ''"> 
                                            <span v-if="balance !== '...'" class="balance" :class="setBalanceClass()">{{balance.toString().substring(0,balance.toString().indexOf(".")+1)}}</span>
                                            <span v-else class="dot-flashing"></span>
                                            <span v-if="balance !== '...'" class="balance balance-decimal" :class="setBalanceClass()">{{balance.toString().substring(balance.toString().indexOf(".")+1,balance.toString().length)}}</span>
                                        </div>
                                        <div class="mt-3 d-flex justify-content-end">
                                            <span class="coin-text">Moneda</span><span class="ml-2 coin">{{wallet_name}}</span>
                                        </div> 
                                    </div>
                                </b-card>
                                <b-card id="accounting-card">
                                    <div>
                                        <div class="d-flex justify-content-center align-items-center accounting-rectangleGreen-parent">
                                            <div class="accounting-rectangle accounting-rectangleGreen d-flex justify-content-center align-items-center">
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.94119 15.9921C6.93686 16.5444 7.38104 16.9956 7.93331 17C8.48558 17.0043 8.9368 16.5601 8.94113 16.0079L6.94119 15.9921ZM8.77156 0.298928C8.38412 -0.0946499 7.75097 -0.0996209 7.35739 0.287825L0.943666 6.60163C0.550088 6.98907 0.545117 7.62222 0.932563 8.0158C1.32001 8.40937 1.95315 8.41435 2.34673 8.0269L8.04783 2.41463L13.6601 8.11572C14.0475 8.5093 14.6807 8.51427 15.0743 8.12683C15.4678 7.73938 15.4728 7.10624 15.0854 6.71266L8.77156 0.298928ZM8.94113 16.0079L9.0589 1.00831L7.05896 0.992611L6.94119 15.9921L8.94113 16.0079Z" fill="#687F2E"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <div class="accounting-amount" :class="income === '...' ? 'loading-amount' : setAmountClass(income)">
                                                    <div ref="dashboardIncome" v-if="income !== '...'" :style="'min-width: ' + this.accountingMinWidth + 'px'">{{ formatAmount(income) }}</div>
                                                    <span v-else class="dot-flashing"></span>
                                                </div>
                                                <div class="accounting-text">Ingresos</div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <div class="accounting-rectangle accounting-rectangleRed d-flex justify-content-center align-items-center">
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 1C9 0.447715 8.55228 3.69217e-08 8 0C7.44772 -3.69217e-08 7 0.447715 7 1L9 1ZM7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L15.0711 10.3431C15.4616 9.95262 15.4616 9.31946 15.0711 8.92893C14.6805 8.53841 14.0474 8.53841 13.6569 8.92893L8 14.5858L2.34315 8.92893C1.95262 8.53841 1.31946 8.53841 0.928932 8.92893C0.538407 9.31946 0.538407 9.95262 0.928932 10.3431L7.29289 16.7071ZM7 1L7 16L9 16L9 1L7 1Z" fill="#B03A2E"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <div class="accounting-amount" :class="outcome === '...' ? 'loading-amount' : setAmountClass(outcome)">
                                                    <div ref="dashboardOutcome" v-if="outcome !== '...'" :style="'min-width: ' + this.accountingMinWidth + 'px'">{{ formatAmount(outcome) }}</div>
                                                    <span v-else class="dot-flashing"></span>
                                                </div>
                                                <div class="accounting-text">Egresos</div>
                                            </div>
                                        </div>
                                    </div>
                                </b-card>
                            </b-card-group>

                            <b-card-group class="card-columns">
                                <b-card class="personal-info-card trophy-card">
                                    <div>
                                        <div class="d-flex justify-content-start align-items-center mb-3">
                                            <div class="profile-picture-div mr-3">
                                                <b-avatar :src="profilePicture"></b-avatar>
                                            </div>
                                            <div class="account-info">
                                                <div class="description">
                                                    <div class="accountInfo-ewalletletID">{{ewalletUser.name + " " +ewalletUser.paternal_surname}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center mb-3">
                                            <img class="card-image mr-3" src="/img/ewallet-debitCard.svg" alt="Debit card icon">
                                            <div class="account-info">
                                                <div class="title">Débito</div>
                                                <div class="description d-flex justify-content-center align-items-center">
                                                    <div class="accountInfo-ewalletletID mr-3">{{ewalletUser.debit_card}}</div>
                                                    <button class="btn copy-btn" type="button" @click="copy(ewalletUser.debit_card)" v-b-tooltip.hover :title="tooltipMessage" @mouseleave="redefineTooltip">
                                                        <img class="copyToClipboard" src="../static/img/ewallet-copyToClipboard.svg" alt="Copiar ewalletID." role="img"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <img class="card-image mr-3" src="/img/ewallet-creditCard.svg" alt="Credit card icon">
                                            <div class="account-info">
                                                <div class="title">Crédito</div>
                                                <div class="description d-flex justify-content-center align-items-center">
                                                    <div class="accountInfo-ewalletletID mr-3">{{ewalletUser.credit_card}}</div>
                                                    <button class="btn copy-btn" type="button" @click="copy(ewalletUser.credit_card)" v-b-tooltip.hover :title="tooltipMessage" @mouseleave="redefineTooltip">
                                                        <img class="copyToClipboard" src="../static/img/ewallet-copyToClipboard.svg" alt="Copiar ewalletID." role="img"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </b-card>
                            </b-card-group>
                        </b-card-group>
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12" xl="10" lg="10" md="11" class="mt-4 mx-auto d-flex justify-content-center responsive-col">
                    <b-card-group id="dashboard-second-cardGroup" class="gap-20">
                        <b-card id="action-btns-card">
                            <b-row>
                                <b-col cols="12">
                                    <b-card id="pieCharts-card">
                                        <div class="ml-3 balance-text">
                                            <span>Control de Gastos</span>
                                        </div>
                                        <div class="pieCharts-parentDiv d-flex justify-content-around align-items-center">
                                            <div class="pieCharts-vForDiv" v-for="pieChart in pieCharts" @click="$router.push('/' + pieChart.ref)">
                                                <div class="d-flex justify-content-center">
                                                    <div class="progress-bar" :class="pieChartsLoading ? 'progress-bar-loading' : ''" :style="'background: radial-gradient(closest-side, #D7C1AA 80%, transparent 80% 100%), conic-gradient('+ pieChart.color + ' ' + pieChart.percentage + '%, #e9e9e9 0)'"></div>
                                                </div>
                                                <div class="pieCharts-name">{{pieChart.name}}</div>
                                                <div v-if="!pieChartsLoading" class="pieCharts-amount">{{pieChartsLoading ? pieChart.amount : formatAmount(pieChart.amount).substring(0,formatAmount(pieChart.amount).indexOf('.')) }}<span class="pieCharts-decimal">{{ pieChartsLoading ? '' : formatAmount(pieChart.amount).substring(formatAmount(pieChart.amount).indexOf('.'), formatAmount(pieChart.amount).length) }}</span></div>
                                                <div v-else class="loading-pieCharts-amount">
                                                    <div class="dot-flashing"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-card>

                        <b-card id="contacts-card">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="sendMoney-group" @click="$router.push({path: '/transfer', hash: 'addContact'})">
                                    <div class="sendMoney-img d-flex justify-content-center">
                                        <img src="../static/img/ewallet-plus.svg" alt="Agregar contacto." role="img"/>
                                    </div>
                                    <div class="sendMoney-txt">Enviar</div>
                                </div>
                                <div v-if="loadingContacts" class="contacts-div d-flex justify-content-start align-items-center">
                                    <div v-for="n in 4" class="contact-group">
                                        <div class="contact-img d-flex justify-content-center">
                                            <b-skeleton type="avatar" class="contact-avatar"></b-skeleton>
                                        </div>
                                        <div class="contact-txt" style="color: transparent;">empty</div>
                                    </div>
                                </div>
                                <div v-else-if="!loadingContacts" class="contacts-div d-flex justify-content-start align-items-center position-relative">
                                    <div v-if="contacts.length === 0" class="contact-group" v-for="contact in contactsEmpty" :key="contact.name">
                                        <div class="contact-img d-flex justify-content-center" @click="$router.push({path: '/transfer', hash: 'addContact'})">
                                            <div class="contact-avatar contact-avatar-empty d-flex justify-content-center align-items-center">
                                                <img :class="'contact-avatar-empty-' + contact.name" :src="require('../static/img/' + contact.icon)" alt="Imagen de perfil de Perfil" role="img"/>
                                            </div>
                                        </div>
                                        <div class="contact-txt contact-txt-emtpy">{{ contact.name }}</div>
                                    </div>
                                    <div v-if="contacts.length === 0" class="addContacts-text" @click="$router.push({path: '/transfer', hash: 'addContact'})">Agrega nuevos contactos +</div>
                                    <div v-else class="contact-group" v-for="contact in contacts" :key="contact.contact_user_email">
                                        <div class="contact-img d-flex justify-content-center" @click="$router.push({path: '/transfer', hash: 'contact-' + contacts.findIndex(x => x.contact_user_email === contact.contact_user_email)})">
                                            <b-avatar class="contact-avatar" :src="contact.profile_picture"/>
                                        </div>
                                        <div class="contact-txt">{{ contactNicknameFormatter(contact.nickname) }}</div>
                                    </div>
                                </div>
                            </div>
                        </b-card>

                        <b-card id="transactions-card" class="mt-4">
                            <div id="transactions-firstDiv">
                                <div class="title-text mb-4">Últimas transacciones</div>
                                <b-card-body v-if="transactions.length === 0 && !loading" class="no-transactions d-flex align-items-center justify-content-center">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <b-card-text class="d-flex align-items-center justify-content-center">
                                            <img src="../static/img/ewallet-noTransactions.svg" alt="No hay transacciones disponibles." role="img"/>
                                        </b-card-text>
                                    </div>
                                </b-card-body>
                                <b-table :per-page="windowWidth > 768 ? 6 : 3" hover :items="transactions" :fields="transaction_fields" :busy="loading" responsive  
                                    class="table-borderless">
                                    <template #table-busy>
                                        <div class="text-center my-2" style="color:#8C4B1F;">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>Cargando</strong>
                                        </div>
                                    </template>
                                    <template #cell(transaction_type) = "data"  v-if="transactions.length > 0">
                                        <b-row>
                                            <b-col cols="8">
                                                <div class="d-flex align-items-center">
                                                    <div class="d-flex align-items-center position-relative">
                                                        <img class="mr-3 transaction-icon" :src="data.item.transaction_status === 'Cancelado' || data.item.transaction_status === 'Rechazado' || data.item.transaction_status === 'Expirado' ? '/img/transactions/red.svg' : data.item.transaction_status === 'Exitoso' ? '/img/ewallet-successfulTransaction.svg' : '/img/ewallet-pendingTransaction.svg'" :alt="data.item.transaction_status === 'Cancelado' || data.item.transaction_status === 'Rechazado' || data.item.transaction_status === 'Expirado' ? 'Transacción no exitosa.' : data.item.transaction_status === 'Exitoso' ? 'Transacción exitosa.' : 'Transacción pendiente.'" role="img"/>
                                                    </div>
                                                    <div>
                                                        <div class="transaction-title">{{data.item.transaction_type}}</div>
                                                        <div class="date d-flex align-items-center justify-content-start">
                                                            {{data.item.transferDate_dashboard}}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </b-col>
                                            <b-col cols="4">
                                                <span class="transaction-title d-flex justify-content-start amount">{{data.item.amount}}</span>
                                            </b-col>
                                        </b-row>
                                    </template>
                                </b-table>
                            </div>
                            <template #footer>
                                <nuxt-link class="d-flex justify-content-center" to="/transactions" style="color:#3E3A35;"><em>Ver todos las transacciones</em></nuxt-link>
                            </template>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import navbarVue from '../components/navbar.vue'
import { copyToClipboard } from '../utils/index'
  export default {
    middleware: 'auth-ready',
    components:{navbarVue},
    data() {
      return {
        balance:'...',
        income:'...',
        outcome:'...',
        wallet_name:'MEX',
        topMessageActive: null,
        windowWidth: null,
        tooltipMessage: 'Haz clic para copiar',
        profilePicture: null,
        accountingMinWidth: 0, //variable used to match income and outcome width
        ewallet_pin: '',
        pin_error: false,
        //Transactions history variables
        transactions:[],
        transaction_fields:[
            {
                label: '',
                key: "transaction_type",
            }
        ],
        loading: false, //Loading transactions
        loadingTransaction: false, //Loading canceled transaction
        transactionInfo: [],
        transactionDetails: [],
        canceledTransaction: '',
        //
        //Contacts variables
        contacts: [],
        contactsEmpty: [
            {
                icon: 'ewallet-logoV.svg',
                name: 'v',
            },
            {
                icon: 'ewallet-logoA.svg',
                name: 'a',
            },
            {
                icon: 'ewallet-logoR.svg',
                name: 'r',
            },
            {
                icon: 'ewallet-logoO.svg',
                name: 'o',
            }
        ],
        serverError: false,
        loadingContacts: true,
        //
        //Pie Charts variables
        pieChartsLoading: true,
        pieCharts:[
            {
                color: '#687F2E',
                percentage: 100,
                name: 'Transferencias',
                ref: 'transfer',
                amount: '...',
            },
            {
                color: '#81D4FA',
                percentage: 100,
                name: 'Depósitos',
                ref: 'deposit',
                amount: '...',
            },
            {
                color: '#8C4B1F',
                percentage: 100,
                name: 'Retiros',
                ref: 'withdraw',
                amount: '...',
            },
            {
                color: '#FFCF71',
                percentage: 100,
                name: 'Compras',
                ref: 'comprar',
                amount: '...',
            }
        ],
        //Intervals store the reference of an interval to be able to destroy it later
        balanceInterval: '',
        transactionsInterval: '',
        accountingInterval: '',
        pieChartsInterval: '',
      }
    },
    methods:{
        updateBalance: function (){
            this.$axios.get("/balance").then(
            (response) => {
                if(response.status == "200")
                {
                    if(response.data.balance){
                        this.balance = this.formatAmount(response.data.balance)
                    }
                    this.wallet_name = response.data.wallet_name
                    if(!this.wallet_name){
                        this.wallet_name  = 'MEX';
                    }
                }
            });
        },
        updateAccounting(){
            this.$axios.get("/accounting").then(
            (response) => {
                if(response.status == "200")
                {
                    this.income = response.data.income;
                    this.outcome = response.data.outcome;
                }
            });
        },
        getPieCharts(){
            this.$axios.get("/pie_charts").then(
            (response) => {
                if(response.status == "200")
                {
                    const transfers = response.data.transfers;
                    const deposits = response.data.deposits;
                    const withdraws = response.data.withdraws;
                    const purchases = response.data.purchases;
                    let total = deposits + withdraws + transfers + purchases;
                    this.pieCharts[0].amount = transfers;
                    this.pieCharts[0].percentage = transfers*100/total;
                    this.pieCharts[1].amount = deposits;
                    this.pieCharts[1].percentage = deposits*100/total;
                    this.pieCharts[2].amount = withdraws;
                    this.pieCharts[2].percentage = withdraws*100/total;
                    this.pieCharts[3].amount = purchases;
                    this.pieCharts[3].percentage = purchases*100/total;
                    this.pieChartsLoading = false;
                }
            });
        },
        myTransactions(load){
            if(load){
                this.loading = true;
                this.getMyTransactions();
                this.loading = false;
            }else{
                this.getMyTransactions();
            }

        },
        getMyTransactions(){
            this.$axios.get("/transactions").then(
            (response) => {
                if(response.status == "200")
                {
                    this.transactions = response.data.slice(0, 3).map(
                        transactions => {
                            const year = new Date(transactions.transfer_date).getFullYear();
                            const month = new Date(transactions.transfer_date).getMonth();
                            const day = new Date(transactions.transfer_date).getDate();
                            let hour = new Date(transactions.transfer_date).getHours();
                            hour = this.timeFormatter(hour);
                            let minutes = new Date(transactions.transfer_date).getMinutes();
                            minutes = this.timeFormatter(minutes);
                            const date = new Date(year, month, day);
                            const monthName = date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase() + date.toLocaleString('default', { month: 'short' }).slice(1);
                            transactions.transferDate_dashboard = monthName + ' ' + day;
                            transactions.hour = hour + ":" + minutes;
                            transactions.amount = this.formatAmount(transactions.amount);
                            switch(transactions.transaction_type){
                                case 'Ewallet Transfer':
                                    if(transactions.detail_type === 'send'){
                                        transactions.amount = '- ' + transactions.amount;
                                    }
                                    transactions.fuente = transactions.sender_name;
                                    break;
                                case 'Retiro':
                                    transactions.amount = '- ' + transactions.amount;
                                    transactions.fuente = transactions.description;
                                    break;
                                case 'Compra':
                                if(transactions.is_qr_transaction){
                                    if(transactions.flow_type === 'sent'){
                                        transactions.amount = '- ' + transactions.amount;
                                    }
                                    transactions.fuente = transactions.sender_name;
                                }else{
                                    transactions.fuente = transactions.description;
                                }
                                    break;
                            }
                            return transactions
                        }
                    )
                }
            });
        },
        getContacts() {
            this.$axios.get("/contacts").then(
            (response) => {
                if(response.status == "200")
                {
                    this.contacts = response.data;
                    this.loadingContacts = false;
                }
            });
        },
        contactNicknameFormatter(nickname){
            const space = nickname.indexOf(' ');
            if(space > 0){
                if(nickname.length > 12){
                    const formattedNickname = nickname.substring(0,space+2) + '.';
                    return formattedNickname
                }else{
                    return nickname
                }
            }else{
                return nickname
            }
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
        setBalanceClass(){
            switch(this.balance.length){
                case 10:
                    return 'balance-tenThousands'
                case 11:
                    return 'balance-hundredThousands'
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
        timeFormatter(time){
            let result = time.toString();
            if(result.toString().length === 1){
               return  '0' + result;
            }else{
                return time
            }
        },
        formatAmount(amount){
            return '$' + Number(parseFloat(amount).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})
        },
        setAmountClass(amount){
            switch(amount.toString().length){
                case 8:
                    return 'amount-medium'
                case 9: 
                    return 'amount-medium'
                case 10: 
                    return 'amount-medium'
                case 11:
                    return 'amount-small'
                case 12: 
                    return 'amount-small'
                case 13: 
                    return 'amount-xsmall'
                case 14: 
                    return 'amount-xsmall'
            }
        },
        setAccountingWidths(incomeWidth,outcomeWidth){
            if(incomeWidth !== outcomeWidth){
                if(incomeWidth > outcomeWidth){
                    this.accountingMinWidth = incomeWidth;
                }else{
                    this.accountingMinWidth = outcomeWidth;
                }
            }
        },
        cleanPin(){
            this.ewalletlet_pin = '';
            this.pin_error= false;
        },
    },
    computed: {
        ewalletUser(){
            return this.$store.state.auth.user;
        },
    },
    mounted(){
        this.myTransactions(true);
        this.updateBalance();
        this.updateAccounting();
        this.getPieCharts();
        this.transactionsInterval = setInterval(() => this.myTransactions(false), 9000);
        if(window.screen.width > 1205){
            this.balanceInterval = setInterval(() => this.updateBalance(), 9000);
            this.accountingInterval = setInterval(() => this.updateAccounting(), 9000);
            this.pieChartsInterval = setInterval(() => this.getPieCharts(), 9000);
        }
        this.getContacts();
        this.windowWidth = window.screen.width;
        this.profilePicture = this.ewalletUser.profile_picture;
    },
    updated(){
        if(this.$refs.dashboardIncome && this.$refs.dashboardOutcome){
            this.setAccountingWidths(this.$refs.dashboardIncome.getBoundingClientRect().width, this.$refs.dashboardOutcome.getBoundingClientRect().width);
        }
    },
    destroyed(){
        clearInterval(this.transactionsInterval);
        if(window.screen.width > 1205){
            clearInterval(this.balanceInterval);
            clearInterval(this.accountingInterval);
            clearInterval(this.pieChartsInterval);
        }
    }
  }
</script>

<style lang="scss">
html { min-height: 100%; }
:root {
  --deposit: #81D4FA;
  --withdraw: #8C4B1F; 
  --transfer:#687F2E;
  --comprar:#F4BB2E;
}
#dashboard-page{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-style: normal;

    span.topMessage-link{
        font-weight: 700;
        cursor: pointer;
        text-decoration: underline;
    }

    #topMessage{
        max-width: 1230px;
        min-width: 1230px;
    }

    #dashboard-card-group{
        margin-top:5%;
        height: 250px;
        max-width: 1200px;
        min-width: 1200px;
        flex-wrap: nowrap;
        gap: 20px;

        #dashboard-targeta {
            flex: 2;
        }

        #account-balance-card{
            height: 270px;;
            border-color: transparent;
            box-shadow: 2px 2px 29px rgba(0, 0, 0, 0.08);
            background: #D7C1AA;
            .card-body{
                position: relative;
            }
            .balance-div{
                position: absolute;
                right: 15%;
                bottom: 80px;
                .loadingBalance {
                    padding-right: 15px;
                }
                .dot-flashing {
                    position: relative;
                    width: 10px;
                    height: 10px;
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
                    left: -15px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: var(--withdraw);
                    color: var(--withdraw);
                    animation: dot-flashing 1s infinite alternate;
                    animation-delay: 0s;
                }
                .dot-flashing::after {
                    left: 15px;
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
            .balance-text{
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
            }
            .balance{
                font-weight: 700;
                font-size: 42px;
                line-height: 30px;
                color: var(--withdraw);
            }
            .balance-tenThousands{
                font-size: 40px;
            }
            .balance-hundredThousands{
                font-size: 38px;
            }
            .balance-millions{
                font-size: 34px;
            }
            .balance-tenMillions{
                font-size: 32px;
            }
            .balance-hundredMillions{
                font-size: 30px;
            }
            .balance-billions{
                font-size: 26px;
            }
            .balance-decimal{
                color: #8C4B1F40;
            }
            .coin-text{
                font-weight: 400;
                font-size: 20px;
            }
            .coin{
                font-weight: 700;
                font-size: 20px;

                color: #3E3A35;
            }
        }
        #ewallet-card{
            height: 270px;
            border-color: transparent;
            box-shadow: 2px 2px 29px 0px rgba(0, 0, 0, 0.08);
            background: #D7C1AA;
            .card-body{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .ewallet-card-img{
                img{
                    min-width: 248px;
                    max-width: 90%;
                    min-height: 152px;
                    max-height: 206.5px;
                }
            }
            .ewallet-card-description{
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #828282;
                padding-top: 17px;
            }
        }
        #accounting-card{
            height: 270px;
            max-width: 270px;
            border-color: transparent;
            box-shadow: 2px 2px 29px 0px rgba(0, 0, 0, 0.08);
            background: #D7C1AA;
            .card-body{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .accounting-rectangle{
                width: 41px;
                height: 41px;
                border-radius: 8px;
                margin-right: 20px;
            }
            .accounting-rectangleGreen{
                background-color: #687F2E50;
            }
            .accounting-rectangleGreen-parent{
                margin-bottom: 39px;
            }
            .accounting-rectangleRed{
                background-color: #B03A2E50;
            }
            .accounting-amount{
                font-family: 'Poppins', sans-serif;
                font-size: 20px;
                font-weight: 700;
                line-height: 24.38px;
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
                font-size: 18px;
            }
            .amount-small{
                font-size: 16px;
            }
            .amount-xsmall{
                font-size: 14px;
            }
            .accounting-text{
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 17.07px;
            }
        }
        .card-columns{
            flex: 1;
            display: grid;
            width:21rem;
            .personal-info-card{
                background: #D7C1AA;
                box-shadow: 2px 2px 29px 0px rgba(0, 0, 0, 0.08);
                width: 100%;
                height: 270px;
                border-color: transparent;
                .ewalletId-background{
                    width: 46px;
                    height: 46px;
                    background-color: #687F2E;
                    border-radius: 30px;
                    .img-style{
                        width: 16.241px;
                        height: 17.87px;
                    }
                }
                .card-image{
                    max-height: 46px;
                    min-height: 46px;
                }
                .profile-picture-div{
                    display: inline-flex;
                    justify-content: center;
                    align-items: start;
                    align-self: center;
                    min-width: 46px;
                    min-height: 46px;
                    width: 69px;
                    height: 69px;
                    text-align: center;
                    border-radius: 50%;
                    border:1px solid #8C4B1F;
                    overflow: hidden;
                    .b-avatar{
                        min-width: 46px;
                        min-height: 46px;
                        width: 69px;
                        height: 69px;
                        background: #8C4B1F;
                    }
                }
                .img-style{
                    max-width: 56px;
                    max-height: 56px; 
                }
                .account-info{
                    .title{
                        font-size: 14px;
                        font-weight: 400;
                        line-height: normal;
                    }
                    .description{
                        font-size: 20px;
                        font-weight: 700;
                        line-height: normal;
                        .accountInfo-ewalletID{
                            margin-right: 15px;
                        }
                        .copy-btn{
                            border-radius: 0px 10px 10px 0px;
                            background: #D7C1AA;
                            border:transparent;
                            outline: none;
                            padding: 0;
                            &:focus {
                                border-radius: 0;
                                //box-shadow: none;
                            }
                            .copyToClipboard{
                                filter: brightness(0) saturate(100%) invert(29%) sepia(8%) saturate(5524%) hue-rotate(344deg) brightness(102%) contrast(85%);
                            }
                        }
                    }
                }
            }
            .trophy-card{
                .card-body{
                    padding: 0px;
                    padding-left: 30px;
                    min-height: 100%;
                    min-width: 100%;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    >div{
                        margin-right: 40px;
                    }
                }
            }
        }
    }
    .dashboard-card-group-smallPadding{
        margin-top: 25px!important;
    }
    .card-group [class*='col-'] {
        float:none;
    }
    .gap-20 {
        gap: 20px;
    }
    #dashboard-second-cardGroup{
        max-width: 1200px;
        min-width: 1200px;
        margin-bottom: 5%;
    }

    #action-btns-card{
        flex-grow: 2;
        height: 150px;
        border-color: transparent;
        background-color: transparent;
        a{
            text-decoration: none;
        }
        .card-body {
            padding: 24px 0;
            height: 64px;

            .action-btn{
                height: 64px;
                width: 100%;
                box-shadow: 4px 4px 10px 0px rgba(196, 196, 196, 0.60);
                border-color: transparent;
                background: #D7C1AA;
                .text{
                    font-size: 16px;
                    font-weight: 700;
                    color: #3E3A35;
                }
                .action-img{
                    margin-top:-1rem !important; 
                    width: 25px;
                    height: 25px;
                    border-radius: 9px !important;
                    img{
                        max-width: 20px;
                        max-height: 20px;
                    }
                }                
            }
        }
        #pieCharts-card{
            width: 100%;
            height: 331px;
            margin-bottom: 30px;
            box-shadow: 4px 4px 10px 0px rgba(196, 196, 196, 0.60);
            border-color: transparent;
            background: #D7C1AA;
            .card-body{
                padding: 24px 20px;
                height: 100%;
            }
            .balance-text{
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                margin-bottom: 2.3rem;
            }
            .pieCharts-parentDiv{
                margin-left: 46.18px;
                margin-right: 46.18px;
                margin-top: -35px;
                height: 100%;
                .pieCharts-vForDiv{
                    width: 25%;
                    .progress-bar {
                        width: 66.30px;
                        height: 66.30px;
                        border-radius: 50%; 
                        margin-bottom: 13.69px;  
                    }
                    .progress-bar-loading{
                        animation: pulse 1s infinite;
                    }
                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                    .pieCharts-name{
                        font-family: 'Poppins', sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 17.07px;
                        text-align: center;
                        margin-bottom: 15px;
                    }
                    .pieCharts-amount{
                        font-family: 'Poppins', sans-serif;
                        font-size: 16px;
                        font-weight: 700;
                        line-height: 19.5px;
                        text-align: center;
                        .pieCharts-decimal{
                            font-size: 11px;
                            line-height: 13.41px;
                        }
                    }
                    .loading-pieCharts-amount {
                        .dot-flashing {
                            position: relative;
                            width: 6px;
                            height: 6px;
                            left: calc(50% - 3px);
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
                }
            }
        }
    }
    #contacts-card{
        display: none;
    }
    #transactions-card{
        width: 399px;
        height: 331px;
        background: #D7C1AA;
        box-shadow: 2px 2px 29px rgba(0, 0, 0, 0.08);
        border-color:transparent;

        #transactions-firstDiv{
            height: 100%;
        }

        .title-text{
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
        }

        .no-transactions{
            padding: 0px;
            height: 100%;
            div{
                height: 100%;
                width: 100%;
                img{
                    max-width: 80%;
                }
            }
        }
        .transaction-title{
            font-family: 'Helvetica Neue';
            line-height: 21.47px;
            font-weight: 400;
            font-size: 14px;
        }
        .amount{
            color: #8C4B1F;
            font-weight: 700;
        }
        .transaction-icon{
            width: 25px;
            height: 25px;
            filter: brightness(0) saturate(100%) invert(26%) sepia(10%) saturate(6154%) hue-rotate(352deg) brightness(107%) contrast(81%);
        }
        .date{
            font-family: 'Helvetica Neue';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 16.93px;
            height: 100%;
        }
        .table {
            margin-top:-30px !important;
            overflow: hidden;
        }
        .card-footer {
            background: #D7C1AA;
            box-shadow: 2px 2px 29px rgba(0, 0, 0, 0.08);
            border-color: transparent;
            em{
                font-weight: 400;
                font-size: 16px;
                line-height: 17px;

                text-align: center;

                color: #3E3A35;
            }
        }

    }
    #cancel-button{
        box-sizing: border-box;
        width: 30%;
        height: 44px;
        background: #FFFFFF;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        border-color:#8C4B1F;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #8C4B1F;
        margin-right: 30px;
    }
    #cancel-button:hover, #cancel-button:focus{
        border-color: #687F2E;
        color:#687F2E;
    }
    @media screen and (max-width: 1500px) {
        #dashboard-card-group,  #dashboard-second-cardGroup{
            max-width: 961.664px;
            min-width: 961.664px;
        }
        #topMessage{
            max-width: calc(961.664px + 30px);
            min-width: calc(961.664px + 30px);
        }
    }
    @media screen and (max-width:1305px) {
        #dashboard-card-group{
            max-width: 920px;
            min-width: 920px;
            #account-balance-card{
                .balance-text{
                    font-size: 18px;
                }
                .coin-text{
                    font-size: 16px;
                }
                .coin{
                    font-size: 16px;
                }
            }
        }
        #dashboard-second-cardGroup{
            max-width: 920px;
            min-width: 920px;
        }
        #topMessage{
            max-width: calc(920px + 30px);
            min-width: calc(920px + 30px);
        }
    }
    @media screen and (max-width:1250px) {
        #dashboard-card-group, #dashboard-second-cardGroup{
            max-width: 900px;
            min-width: 900px;
        }
        #topMessage{
            max-width: calc(900px + 30px);
            min-width: calc(900px + 30px);
        }
    }
    @media screen and (max-width:1205px) {
        #dashboard-card-group{
            display: none !important;
        }
        .responsive-col{
            display: block!important;
            margin-top: 11rem!important;
            #dashboard-second-cardGroup{
                max-width: auto;
                min-width: auto;
                margin-bottom: 0px;
            }
        }
        #action-btns-card{
            margin-top: 30px;
            margin-bottom: 20px;
            height: 100%;
            display: none;
        }
        #contacts-card{
            display: contents;
            max-width: 80%;
            .card-body{
                padding-top: 0px;
                padding-bottom: 0px;
            }
            .sendMoney-group{
                min-width: 20%;
                max-width: 20%;
                margin-left: 6vw;
                //margin-right: 6vw;
                .sendMoney-img{
                    img{
                        height: 68px;
                    }
                }
                .sendMoney-txt{
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    color: #8C4B1F;
                    text-align: center;
                    line-height: 1;
                    margin-top: 20px;
                }
            }
            .contacts-div{
                min-width: 65%;
                max-width: 65%;
                overflow-x: scroll;
                // Hide scrollbar for IE, Edge and Firefox
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .contacts-div::-webkit-scrollbar {
                // Hide scrollbar for Chrome, Safari and Opera
                display: none;
            }
            .addContacts-text{
                position: absolute;
                bottom: 0;
                right: 12px;

                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 10.97px;
                color: #8C4B1F;
            }
            .contact-group{
                min-width: 25%;
                .contact-img{
                    .contact-avatar{
                        background-color: #8C4B1F;
                        opacity: 100%;
                        min-height: 68px;
                        min-width: 68px;
                    }
                    .contact-avatar-empty{
                        border-radius: 50%;
                        img{
                            width: auto;
                            height: auto;
                        }
                        img.contact-avatar-empty-v{
                            width: 36.83px;
                            height: auto;
                        }
                        img.contact-avatar-empty-a{
                            width: 24.08px;
                            height: auto;
                        }
                        img.contact-avatar-empty-r{
                            width: auto;
                            height: 22.67px;
                        }
                        img.contact-avatar-empty-o{
                            width: 24.08px;
                            height: auto;
                        }
                    }
                }
                .contact-txt{
                    font-size: 14px;
                    text-align: center;
                    color: #8C4B1F;
                    margin-top: 20px;
                    line-height: 1;
                }
                .contact-txt-emtpy{
                    color: transparent;
                }
                .b-skeleton.contact-avatar{
                    background-color: #8C4B1F60!important;
                }
                .b-skeleton.contact-txt{
                    background-color: #8C4B1F00!important;
                }
                .b-skeleton-text{
                    margin-bottom: 0px;
                }
            }
        }
        #transactions-card{
            width: 100%;
            height: 610px;
            margin-bottom: 29%;
            padding-right: 4rem;
            padding-left: 4rem;
            background: transparent;
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
            .transaction-icon{
                width: 35px;
                height: 35px;
            }
            .title-text, .transaction-title{
                color: #3E3A35;
            }
            .title-text{
                padding-bottom: 30px;
            }
            .horizontal-line{
                display: none;
            }
        }
        .card-group {
            display: block;
        }
        .transactionDetailsResponsive{
            padding-right: 20px;
            padding-left: 20px;
            margin-bottom: 6rem;
            #arrowBack{
                margin-top: 3.5rem!important;
                .title-text {
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 20px;
                }
            }
            #details-div {
                background: rgba(196, 196, 196, 0.19);
                margin-top: 5%;
                .description {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;
                    display: flex;
                    justify-content: start;
                    margin-left: 0.938rem;
                }

                .detail {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 17px;
                    text-align: right;
                    display: flex;
                    justify-content: end !important;
                    margin-right: 0.938rem;
                }
                .Pendiente {
                    color: #F38E61;
                }

                .Exitoso{
                    color: #687F2E;
                }

                .Rechazado{
                    color: #C72121;
                }
            }
        }
    }
    @media only screen and (max-width: 768px) {
        #transactions-card{
            height: auto;
            .card-body{
                min-height: 278.789px;
                padding-bottom: 0px;
            }
            .no-transactions{
                img{
                    margin-top: 0px;
                }
            }
        }
    }
    @media only screen and (max-width: 575.98px) {
        #action-btns-card{
            margin-top: 25px;
            margin-bottom: 10px;
        }
        #contacts-card{
            .sendMoney-group{
                margin-left: 0vw;
                .sendMoney-img{
                    img{
                        height: 48px;
                    }
                }
                .sendMoney-txt{
                    font-size: 10.5px;
                }
            }
            .contacts-div{
                min-width: 80%;
                max-width: 80%;
            }
            .addContacts-text{
                right: 0;
                font-size: 9px;
            }
            .contact-group{
                .contact-img{
                    .contact-avatar{
                        min-height: 48px;
                        min-width: 48px;
                    }
                    .contact-avatar-empty{
                        img{
                            width: auto;
                            height: auto;
                        }
                        img.contact-avatar-empty-v{
                            width: auto;
                            height: auto;
                        }
                        img.contact-avatar-empty-a{
                            width: auto;
                            height: auto;
                        }
                        img.contact-avatar-empty-r{
                            width: auto;
                            height: auto;
                        }
                        img.contact-avatar-empty-o{
                            width: auto;
                            height: auto;
                        }
                    }
                }
                .contact-txt{
                    font-size: 10.5px;
                }
            }
        }
        #transactions-card{
            margin-top: 0.5rem!important;
            padding-right: 0rem;
            padding-left: 0rem;
            .transaction-icon{
                width: 30px;
                height: 30px;
            }
        }
    }
    @media only screen and (max-width: 575.98px) and (max-height: 700px){ 
        //Smaller phones
        #action-btns-card{
            margin-top: 5px;
            margin-bottom: 0px;
        }
    }
    @media only screen and (max-width: 400px) {
        #contacts-card{
            .sendMoney-group{
                .sendMoney-txt{
                    font-size: 9px;
                }
            }
            .contact-group{
                .contact-txt{
                    font-size: 9px;
                }
            }
        }
        #transactions-card{
            .title-text{
                padding-bottom: 15px;
            }
        }
    }

}

</style>