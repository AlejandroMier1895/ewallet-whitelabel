<template>
    <div id="transfer-page">
        <b-container fluid>
            <b-row>
                <b-col cols="12" xl="10" lg="10" md="11" class="mx-auto" id="transfer-parentCol">
                    <b-card-group>
                        <b-card id="transfer-card" :class="topMessageActive ? 'transfer-page-card-smallPadding' : ''">
                            <div class="mt-2  ml-4 title-text computer">
                                Transferir
                            </div>

                            <b-row>
                                <b-col cols="10" xl="0" lg="0">
                                    <div class="mt-2 phone title-text"> Enviar a:</div>
                                </b-col>
                            </b-row>
                            <div class="d-flex justify-content-center align-items-center contacts-parent">
                                <b-card id="contacts-card">
                                    <div class="mt-3 ml-2">
                                        <div v-if="loadingContacts" class="d-flex justify-content-center align-items-center skeletons-div">
                                            <b-list-group-item @click="$bvModal.show('addContactModal')" class="contacts-item align-items-center pl-0 pr-0">
                                                <div class="phone contact--icon"><img src="../static/img/ewallet-plus.svg" alt="Agregar contacto." role="img"/></div>
                                                <div class="contact--info phone">
                                                    <div class="addContact-txt phone">Agregar</div>
                                                </div>
                                            </b-list-group-item>
                                            <div v-for="n in 4" class="skeleton-item">
                                                <div class="d-flex justify-content-center">
                                                    <b-skeleton  type="avatar" class="skeleton-icon"></b-skeleton>
                                                </div>
                                                <div class="contact--info">
                                                    <div class="addContact-txt skeleton-text phone">Agregar</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <b-list-group v-else-if="!loadingContacts" class="mt-3 contact--list position-relative">
                                            <b-list-group-item @click="$bvModal.show('addContactModal')" class="contacts-item align-items-center pl-0 pr-0">
                                                <div class="contact--icon plus-icon"><img src="../static/img/ewallet-plus.svg" alt="Agregar contacto." role="img"/></div>
                                                <div class="contact--info">
                                                    <div class="addContact-txt phone">Agregar</div>
                                                </div>
                                            </b-list-group-item>
                                            <div v-if="contacts.length === 0" class="addContacts-text" @click="$bvModal.show('addContactModal')">Agrega nuevos contactos +</div>
                                            <b-list-group-item v-for="contact in filteredContacts" :key="contact.email"
                                                class="contacts-item align-items-center pl-0 pr-0">
                                                <div @click="selectContact(contact)" class="contact--icon">
                                                    <b-avatar class="mr-3 avatar" :src="contact.profile_picture"/>
                                                </div>
                                                <div tabindex="0" @keyup.enter="selectContact(contact)" @click="selectContact(contact)" class="contact--info">
                                                    <div class="contact--name addContact-txt">{{ contactNicknameFormatter(contact.nickname) }}</div>
                                                    <div class="contact--email">{{ contact.contact_user_email }}</div>
                                                </div>
                                            </b-list-group-item>
                                            <b-list-group-item v-if="serverError" class="d-flex align-items-center pl-0 pr-0">
                                                <div @click="account = 'Contactos no disponibles'">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-database-fill-x mr-3" viewBox="0 0 16 16" style="color: #8C4B1F;">
                                                        <path d="M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1"/>
                                                        <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905"/>
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
                                                    </svg>
                                                </div>
                                                <div class="contact--info" @click="account = 'Contactos no disponibles'">
                                                    <div class="contact--name-serverError">Contactos no disponibles</div>
                                                    <div class="contact--email-serverError">Trabajamos para servirte</div>
                                                </div>
                                            </b-list-group-item>
                                        </b-list-group>
                                    </div>

                                    <add-contact-modal @contactSaved="()=>{getContacts(); account = '';}" @cleanContact="()=>{contactText.allowMaxTransfer=false; contactText.ewalletId = ''; contactText.alias = '';}" :editContact="editContact" :contactText="contactText" :minAmount="minAmount" @error="()=>{$bvModal.hide('addContactModal')}"></add-contact-modal>
                                </b-card>
                            </div>
                            <b-row class="ml-lg-2 transfer-row d-flex justify-content-center align-items-center">
                                <b-col cols="12" xl="8" lg="10">
                                    <b-form @submit.prevent="checkTransfer()" class="mt-lg-2">
                                        <div class="mt-3 form">
                                            <span class="input-text font-weight-bold computer">Usuario</span>
                                            <b-form-input type="text" class="computer" :class="account.length === 0 ? 'transfer-input-placeholder' : ''" v-model="account" required
                                                placeholder="E-wallet ID, correo electrónico o número celular"></b-form-input>
                                            <b-form-input type="text" class="phone" v-model="account" required
                                                placeholder="E-wallet ID, correo o celular"></b-form-input>
                                            <div class="text-danger mt-1" style="font-size:13px;" v-if="user_error">Usuario
                                                incorrecto</div>
                                        </div>
                                        <div class="mt-4 form">
                                            <span class="input-text font-weight-bold computer">Cantidad a Transferir</span>
                                            <b-form-input type="text" ref="currencyInput" @keyup="formatCurrency(amount)" @click="$refs.currencyInput.setSelectionRange(amount.length, amount.length)" required v-model="amount" class="add-placeholder amount-input" :class="amount.length === 0 ? 'transfer-input-placeholder' : ''"
                                                placeholder="Cantidad a transferir"></b-form-input>
                                        </div>
                                        <div v-if="amountUnformatted > balance" class="error-balance mt-1">Cantidad a transferir es mayor al balance disponible.</div>
                                        <div v-if="amountUnformatted > parseInt(maxTransfer) && amountUnformatted <= balance" class="error-balance mt-1">Cantidad a transferir es mayor al máximo permitido para este contacto.</div>
                                        <div v-if="amount_error" class="error-balance mt-1">El monto debe ser mayor o igual a {{formatMinAmount()}}</div>
                                        <div class="mt-4 form">
                                            <span class="input-text font-weight-bold computer">Razón o concepto</span>
                                            <b-form-input type="text" required v-model="concept" class=" add-placeholder"
                                                placeholder="Concepto"></b-form-input>
                                        </div>
                                        <label class="form-check mt-4 form">
                                            <input class="form-check-input" type="checkbox"
                                                id="blankCheckbox" :value="save" v-model="save" :disabled="!this.account ? false : this.isFavorite()"/>
                                            <span class="new-checkbox"></span>
                                            <span class="check-text">Deseo agregar este usuario a mi lista de
                                                contactos</span>
                                        </label>
                                        <div class="mt-lg-5 mb-lg-4 text-center">
                                            <b-button type="submit" id="transfer-button"
                                                :disabled="amountUnformatted > balance || amountUnformatted > parseInt(maxTransfer) || amount_error">Continuar</b-button>
                                        </div>
                                    </b-form>
                                </b-col>
                            </b-row>
                            <confirm-transaction-modal :account="account" :amount="amountUnformatted" action='Transferir'
                                :ewallet_pin="ewallet_pin" @inputewalletPin="ewallet_pin = $event" @finishTransfer="finishTransfer"
                                :pin_error="pin_error" @cleanPin="cleanPin" :icon="account_profilePicture" :loading="loadingTransaction"></confirm-transaction-modal>
                            <succesfull-transaction-modal :transaction="transaction" action="Transferir"></succesfull-transaction-modal>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import navbarVue from '../components/navbar.vue'
import confirmTransactionModal from '../components/modals/confirmTransactionModal.vue'
import SuccesfullTransactionModal from '../components/modals/succesfullTransactionModal.vue'
import addContactModal from '../components/modals/addContactModal.vue'
import sharedData from '../store/sharedData.json'
export default {
    middleware: 'auth-ready',
    components: { confirmTransactionModal, navbarVue, SuccesfullTransactionModal, addContactModal },
    data() {
        return {
            sharedData,
            minAmount: '',
            account: '',
            account_profilePicture: '',
            maxTransfer: '',
            amount: '',
            amountUnformatted: '',
            amount_error: false,
            concept: '',
            save: false,
            balance: null,
            ewallet_pin: '',
            transaction: [],
            pin_error: false,
            user_error: false,
            adminContacts: false,
            editContact: false,
            serverError: false,
            contactText:{
                ewalletId: '',
                alias: '',
                allowMaxTransfer: false,
                disabled: false,
                maxTransfer: '',
                maxTransferUnformatted: '',
            },
            searchContact: '',
            topMessageActive: null,
            contacts: [],
            loadingContacts: true,
            loadingTransaction: false,
        }
    },
    methods: {
        getBalance(){
            this.$axios.get("/balance").then(
            (response) => {
                if(response.status == "200")
                {
                    if(response.data.balance){
                        this.balance = parseFloat(response.data.balance);
                    }
                }
            });
        },
        selectContact(contact) {
            if(contact){
                this.account = contact.contact_user_email;
                this.maxTransfer = contact.max_amount;
                this.account_profilePicture = contact.profile_picture;
            }
        },
        getContacts() {
            this.$axios.get("/contacts").then(
            (response) => {
                if(response.status == "200")
                {
                    this.contacts = response.data;
                    this.serverError = false;
                    this.loadingContacts = false;
                    if(this.$route.hash !== '#addContact'){
                        const hash = this.$route.hash;
                        const contactIndex = parseInt(hash.substring(hash.lastIndexOf('-')+1,hash.length));
                        this.selectContact(this.contacts[contactIndex]);
                    }
                }
            });
        },
        finishTransfer(event) {
            let finalAmount = event;
            this.loadingTransaction = true;
            this.$axios.post('/transfer', {
                amount: finalAmount,
                user: this.account,
            }).then(
                response => {
                    if (response.status === 200){
                        this.loadingTransaction = false;
                        this.transaction = response.data.transaction;
                        this.$bvModal.hide('confirmTransactionModal');
                        this.cleanForm();
                        this.getBalance();
                        this.$bvModal.show('succesfullTransactionModal');
                    }
                }
            )
            .catch(
                error => {
                    return error.response
                }
            );
        },
        contactTextGenerator(contact){
            if(!this.editContact){
                this.contactText.ewalletId = '';
                this.contactText.alias = '';
                this.contactText.allowMaxTransfer = false;
                this.disabled = false; 
                this.contactText.maxTransfer = '';
                this.contactText.maxTransferUnformatted = '';
            }else{
                this.contactText.ewalletId = contact.contact_user_email;
                this.contactText.alias = contact.nickname;
                if(contact.max_amount === 0){
                    this.contactText.disabled = false; 
                    this.contactText.maxTransfer = '';
                }else{
                    this.contactText.disabled = true;
                    this.contactText.maxTransfer = contact.max_amount;
                }
            }
        },
        cleanForm(){
            this.account = '';
            this.amount = '';
            this.concept = '';
            this.save = false;
            this.ewallet_pin = '';
            this.pin_error= false;
        },
        cleanPin(){
            this.ewallet_pin = '';
            this.pin_error= false;
        },
        contactNicknameFormatter(nickname){
            if(window.screen.width <=1205){
                const space = nickname.indexOf(' ');
                if(space > 0){
                    if(nickname.length > 12){
                        const formattedNickname = nickname.substring(0,space+2) + '.';
                        return formattedNickname
                    }else{
                        return nickname
                    }
                }else{
                    return nickname;
                }
            }else{
                return nickname;
            }
        },
        isFavorite() {
            return this.contacts.find((element) => {
                if(this.account.indexOf('@') > 0){
                    return element.contact_user_email.toLowerCase() === this.account.toLowerCase();
                }else{
                    return element.ewallet_id.toLowerCase() === this.account.toLowerCase() || element.phone.toLowerCase() === this.account.toLowerCase();
                }
            })
        },
        timeFormatter(time){
            let result = time.toString();
            if(result.toString().length === 1){
               return  '0' + result;
            }else{
                return time
            }
        },   
        formatCurrency(input, blur){
            if (input === "") { 
                return; 
            }
            let original_length = input.length;
            let caret_pos = this.$refs.currencyInput.selectionStart;
            input = this.formatNumber(input);
            input = "$" + input;
            this.amount = input;
            this.amountUnformatted = this.amount.replace(/\$/g, "").replace(/\,/g, "");
            let updated_len = input.length;
            caret_pos = updated_len - original_length + caret_pos;
            if(blur !== "blur"){
                this.$refs.currencyInput.setSelectionRange(caret_pos, caret_pos);
            }
        }, 
        formatNumber(n) {
            return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        checkTransfer(){
            let min = parseFloat(this.minAmount);
            let amount = parseFloat(this.amountUnformatted);
            if(!this.isFavorite()){
                this.account_profilePicture = false;
            }
            if(amount >= min){
                this.$bvModal.show('confirmTransactionModal');
                this.amount_error = false;
            }else{
                this.amount_error = true;
            }
        },
        formatMinAmount(){
            return '$' + Number(parseFloat(this.minAmount).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})
        },
    },
    mounted() {
        this.minAmount = this.sharedData.tariffs.find((element)=> element.media === 'Transfer').min;
        this.getBalance();
        this.getContacts();
        if(this.$route.hash === '#addContact'){
            this.$bvModal.show('addContactModal');
        }
    },
    computed: {
        filteredContacts() {
            return this.contacts.filter(p => {
                // return true if the contact should be visible

                // check if the search string is a substring of the contact nickname (case insensitive)
                return p.nickname.toLowerCase().indexOf(this.searchContact.toLowerCase()) != -1;
            });
        }        
    },
    watch: {
        amount(){
            if(parseFloat(this.amountUnformatted) >= parseFloat(this.minAmount)){
                this.amount_error = false;
            }
        },
        account(){
            if(this.account.length === 0){
                this.maxTransfer = '';
            }
        }
    }
}
</script>

<style lang="scss">
html {
    min-height: 100%;
}

#transfer-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-style: normal;

    @media screen and (min-width:1900px) {
        //Ultrawide screens
        #transfer-parentCol{
            max-width: 1378px!important;
        }
    }
    #transfer-parentCol{
        margin-bottom: 5%;
    }
    .phone {
        display: none !important;
    }

    span.topMessage-link{
        font-weight: 700;
        cursor: pointer;
        text-decoration: underline;
    }

    .title-text {
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 1.375rem;
        color: #3E3A35;
        margin-left: 3%;
    }

    #transfer-card {
        margin-top: 85px;
        flex-grow: 2;
        background: #D7C1AA;
        box-shadow: 2px 2px 29px rgba(0, 0, 0, 0.08);
        border-color: transparent;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;

        .input-text {
            font-weight: 400;
            font-size: 16px;
            line-height: 17px;
            color: #3E3A35;

        }

        .error-balance {
            font-weight: 400;
            font-size: 13px;
            line-height: 17px;
            color: #b03a2e;
        }

        .form-control {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 18px;
            line-height: 29.26px;
            color:#3E3A35;
            border: 1px solid rgba(196, 196, 196, 0.37);
            background: #F8F1E7;
            height: 60px;
        }

        .amount-input.form-control{
            font-size: 24px;
        }

        ::placeholder {
            font-weight: 400;
            font-size: 16px;
        }
        .transfer-input-placeholder.form-control{
            font-size: 16px;
        }
        .add-placeholder::placeholder {
            color: transparent;
        }

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .form-check {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding-left: 0px;

            input[type="checkbox"] {
                display: none;
            }

            span.new-checkbox {
                width: 18px;
                height: 18px;
                border: 2px solid #8C4B1F;
                background-color: #F8F1E7;
                display: inline-block;
                position: relative;
                border-radius: 4px;
                transition: background-color 0.3s ease;
            }

            input[type="checkbox"]:checked + span.new-checkbox {
                background-color: #8C4B1F;
            }

            input[type="checkbox"]:checked + span.new-checkbox::after {
                content: "";
                position: absolute;
                left: 4px;
                top: 1px;
                width: 5px;
                height: 10px;
                border: solid #FAF6F0;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
        }

        .check-text {
            font-family: 'Roboto' !important;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;

            color: #3E3A35;
        }

        #transfer-button {
            width: 35%;
            height: 44px;
            left: 512px;
            top: 689px;

            background: #8C4B1F;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
            border-color: transparent;
        }

        #transfer-button:hover, #transfer-button:focus{
            background: #687F2E;
        }
    }
    .transfer-page-card-smallPadding{
        margin-top: 25px!important;
    }
    .contatcs-parent{
        width: 100%;
    }
    #contacts-card {
        background: transparent;
        min-width: 330.664px;
        max-width: 75%;
        min-width: 75%;
        min-height: 158px;
        order: 1;
        margin: 0;
        box-shadow: none;
        border: none;
        .card-body {
            > div {
                margin-top: 0 !important;

                &.ml-2 {
                    margin-left: 1rem !important;
                }
                .list-group {
                    margin-top: 0 !important;
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    max-width: 100%;
                    overflow: scroll;
                    // Hide scrollbar for IE, Edge and Firefox
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .list-group::-webkit-scrollbar {
                    // Hide scrollbar for Chrome, Safari and Opera
                    display: none;
                }
            }
            .skeletons-div{
                .skeleton-item{
                    min-width: 20%;
                }
                .skeleton-icon{
                    width: 68px;
                    height: 68px;
                    margin: 12px 0 0 0;
                }
                .skeleton-text{
                    margin: 20px auto 0 auto;
                }
            }
            .phone{
                div{
                    height: 64px;
                }
            }
            .addContact-txt{
                font-family: "Montserrat";
                font-size: 14px;
                color: transparent;
                text-align: center;
                line-height: 1;
                height: auto!important;
            }
            .list-group-item{
                min-width: 20%;
                max-width: 20%;
                .contact--info{
                    margin: 20px auto 0 auto;
                }
                .contact--icon{
                    display: flex!important;
                    justify-content: center;
                    img{
                        min-height: 68px;
                        min-width: 68px;
                    }
                }
                .contact--iconEmpty{
                    align-items: center;
                    background-color: var(--withdraw);
                    border-radius: 50%;
                    height: 68px;
                    width: 68px;
                    img{
                        min-height: auto;
                        min-width: auto;
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
                .avatar{
                    margin-right: 0!important;
                    min-height: 68px;
                    min-width: 68px;
                }
                .contact--name{
                    color: #8C4B1F;
                }
                .contact--nameEmpty{
                    color: transparent;
                }
            }
            .contact--list{
                .contacts-item{
                    display: block;
                }
            }
            .addContacts-text{
                position: absolute;
                bottom: 0;
                right: 35px;

                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 10.97px;
                color: #8C4B1F;
            }
            .addContact div:not(.phone),
            .input-group {
                display: none;
            }

            .contact--info{
                .contact--email{
                    display: none;
                }
            }

            .b-skeleton{
                background-color: #8C4B1F60;
            }
            
            .list-group-item {
                border: none;
                padding: 0;
                margin: 12px 0 0 0;
                background: transparent;
                cursor: pointer;

                .avatar {
                    background-color: #8C4B1F;
                }

                .contact--name {
                    color: #3E3A35;
                    font-size: 18px;
                }

                .contact--name-serverError {
                    color: #3E3A35;
                    font-size: 15px;
                }
            }
        }
    }
    @media screen and (max-width:1397px) {
        #contacts-card-title{
            padding-right: 0rem!important;
        }
        .contact--email{
            font-size: 0.85rem!important;
        }
    }
    @media screen and (max-width:1267px) {
        #contacts-card-title{
            span{
                font-size: 1rem !important;
            }
        }
    }
    @media screen and (min-width:1205px) {
        #transfer-parentCol{
            min-width: 900px!important;
        }
    }
    @media screen and (max-width:1205px) {
        margin-top: 2rem;
        .phone {
            display: block !important;
        }
        .phone.contacts--itemEmpty{
            display: flex !important;
        }

        .computer {
            display: none !important;
        }

        .title-text {
            font-size: 16px;
            margin-left: 3%;
            color: #3E3A35;
        }

        .card-group {
            display: flex;
            flex-direction: column;

            #transfer-card {
                order: 2;
                flex-grow: 4;
                margin-top: 0px;
                margin-bottom: 25%;
                box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                background-color: transparent;

                > .card-body {
                    padding-top: 0;
                }

                .transfer-row{
                    justify-content: center!important;
                }
                .form {
                    margin-left: 3%;
                }

                .form-control {
                    width: 100%;
                    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
                    border: transparent;
                    padding-left: 5%!important;
                    background: #D7C1AA;
                }
                .form-control::placeholder{
                    color: #3E3A35;
                }

                .add-placeholder::placeholder {
                    font-weight: 400;
                    color: #3E3A35;
                }

                #transfer-button {
                    margin-top: 10%;
                    margin-bottom: -1%;
                    width: 60%;
                }

                .form-check-input {
                    width: 14px;
                    height: 14px;
                    background: #E5E5E5;
                    border: transparent;
                    border-radius: 5px;
                }
                
                .error-balance{
                    margin-right: 20px;
                    margin-left: calc(3% + 20px);
                }
            }
            .transfer-page-card-smallPadding{
                margin-top: 0px!important;
            }
            #contacts-card {
                display: block;
                
                order: 1;
                margin: 0;
                box-shadow: none;
                border: none;
                max-width: 100%;
                min-width: 100%;
                .card-body {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding-left: 0px;
                    margin-left: -30px;
                    
                    > div {
                        margin-top: 0 !important;

                        &.ml-2 {
                            margin-left: 1rem !important;
                        }
                        .list-group {
                            margin-top: 0 !important;
                            display: flex;
                            flex-direction: row;
                            min-width: 78vw;
                            max-width: 78vw;
                            // Hide scrollbar for IE, Edge and Firefox
                            -ms-overflow-style: none;  /* IE and Edge */
                            scrollbar-width: none;  /* Firefox */
                        }
                        .list-group::-webkit-scrollbar {
                            // Hide scrollbar for Chrome, Safari and Opera
                            display: none;
                        }
                    }
                    .skeletons-div{
                        min-width: 78vw;
                        max-width: 78vw;
                        .skeleton-item{
                            min-width: 20%;
                        }
                        .skeleton-icon{
                            width: 68px;
                            height: 68px;
                            margin: 12px 0 0 0;
                        }
                        .skeleton-text{
                            margin: 20px auto 0 auto;
                        }
                    }
                    
                    .phone{
                        div{
                            height: 64px;
                        }
                    }
                    .addContact-txt{
                        font-family: "Montserrat";
                        font-size: 14px;
                        color: transparent;
                        text-align: center;
                        line-height: 1;
                        height: auto!important;
                    }
                    .list-group-item{
                        min-width: 20%;
                        max-width: 20%;
                        .contact--info{
                            margin: 20px auto 0 auto;
                        }
                        .contact--icon{
                            display: flex!important;
                            justify-content: center;
                            img{
                                min-height: 68px;
                                min-width: 68px;
                            }
                        }
                        .contact--iconEmpty{
                            align-items: center;
                            background-color: var(--withdraw);
                            border-radius: 50%;
                            height: 68px;
                            width: 68px;
                            img{
                                min-height: auto;
                                min-width: auto;
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
                        .avatar{
                            margin-right: 0!important;
                            min-height: 68px;
                            min-width: 68px;
                        }
                        .contact--name{
                            color: #8C4B1F;
                        }
                        .contact--nameEmpty{
                            color: transparent;
                        }
                    }
                    .contact--list{
                        .contacts-item{
                            display: block;
                        }
                    }
                    .addContacts-text{
                        position: absolute;
                        bottom: 0;
                        right: 35px;

                        font-family: 'Poppins', sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 10.97px;
                        color: #8C4B1F;
                    }
                    .addContact div:not(.phone),
                    .input-group {
                        display: none;
                    }

                    .contact--info{
                        .contact--email{
                            display: none;
                        }
                    }

                    .b-skeleton{
                        background-color: #8C4B1F60;
                    }
                }
            }
        }
    }
    @media screen and (max-width:850px) {
        .card-group {
            #contacts-card {
                .card-body {
                    > div {
                        .list-group {
                            margin-top: 0 !important;
                            display: flex;
                            flex-direction: row;
                            min-width: 85vw;
                            max-width: 85vw;
                        }
                    }
                    .skeletons-div{
                        min-width: 85vw;
                        max-width: 85vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width:575.98px) {
        .card-group {
            #contacts-card {
                .card-body {
                    > div {
                        .list-group {
                            margin-top: 0 !important;
                            display: flex;
                            flex-direction: row;
                            min-width: 90vw;
                            max-width: 90vw;
                        }
                    }
                    .skeletons-div{
                        min-width: 90vw;
                        max-width: 90vw;
                        .skeleton-icon{
                            width: 48px;
                            height: 48px;
                            margin: 12px 0 0 0;
                        }
                    }
                    .addContact-txt{
                        font-size: 9px;
                    }
                    .addContacts-text{
                        right: 10px;
                        font-size: 9px;
                    }
                    .list-group-item{
                        min-width: 20%;
                        max-width: 20%;
                        .contact--info{
                            margin: 20px auto 0 auto;
                        }
                        .avatar{
                            min-height: 48px;
                            min-width: 48px;
                        }
                        .contact--icon{
                            img{
                                min-height: 48px;
                                min-width: 48px;
                            }
                        }
                        .contact--iconEmpty{
                            width: 48px;
                            height: 48px;
                            img{
                                min-height: auto;
                                min-width: auto;
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
                }
            }
        }
    }
}
</style>