<template>
  <b-modal ref="addContactModal" id="addContactModal" @hidden="cleanContact" centered hide-footer size="lg">
    <div class="text-center title-text mb-5">Agregar Contacto</div>

    <b-form @submit.prevent="saveContact()" class="ml-l-5 mr-l-5">
      <b-form-group label="Usuario" label-for="input-ewalletId">
        <b-form-input id="input-ewalletId" class="computer" v-model="user.name" required placeholder="Nombre completo"></b-form-input>
        <b-form-input id="input-ewalletId" class="phone" v-model="user.name" required placeholder="Nombre completo"></b-form-input>
      </b-form-group>

      <b-form-group class="mt-4" label="Nickname" label-for="input-nickname">
        <b-form-input id="input-nickname" v-model="user.nickname" required placeholder="Usuario"></b-form-input>
      </b-form-group>

      <div class="form-group d-flex justify-content-center pt-4 pb-5">
        <b-button type="submit" class="transfer-modal-button">Agregar Contacto</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      user:{
        name: '',
        nickname: '',
      }
    }
  },
  methods: {
    cleanContact() {
      this.user = {name: '', nickname: '',}
    },
    saveContact() {
      this.$axios.post('/add-contact', {
        nickname: this.user.nickname,
      }).then(
          response => {
            if (response.status === 200){
              this.$emit('contactSaved');
              this.$bvModal.hide('addContactModal');
              this.cleanContact();
            }
          }
      )
      .catch(
          error => {
              return error.response
          }
      );
    },
  },
}
</script>

<style lang="scss">
#addContactModal {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  line-height: normal;
  .phone {
      display: none !important;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .modal-header {
    border-bottom: 0px;
    background: #F8F1E7;
  }
  .modal-content {
      background: #F8F1E7;
  }
  .modal-header .close {
    margin: -1rem 0.2rem -1rem auto;
    width: 22px;
    height: 18.857px;
    color: #8C4B1F
  }

  .title-text {
    color: #3E3A35;
    font-size: 24px;
    font-weight: 700;
  }

  form {
    .form-group {
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;

      label {
        color: #3E3A35;
        font-size: 14px;
        font-weight: 700;
      }
      .custom-control-label::before{
        margin-top: -0.20rem !important;
      }
      .custom-control-label::after{
        margin-top: -0.20rem !important;
      }
      .form-control:disabled{
        background-color: #EAD8C3 !important;
      }
      .form-control{
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 29.26px;
        color:#3E3A35;
        background: #EAD8C3;
        border: 2px solid #8C4B1F;
      }
      ::placeholder {
        font-weight: 400;
        color:#3E3A35;
      }
      .transfer-input-placeholder.form-control{
          font-size: 14px;
      }
      .amount-input.form-control{
          font-size: 18px;
      }
      input {
        padding: 20px;
        border-radius: 5px;
        border: 1px solid rgba(196, 196, 196, 0.37);
        height: 60px;
        &:focus {
          box-shadow: none;
        }
      }
      .error-balance {
          font-weight: 400;
          font-size: 12px;
          line-height: 17px;
          color: #b03a2e;
      }
    }
    .transfer-modal-button {
        width: 35%;
        height: 44px;
        left: 512px;
        top: 689px;

        background: #8C4B1F;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        border-color: transparent;
    }

    .transfer-modal-button:hover, .transfer-modal-button:focus{
        background: #687F2E;
    }

    @media screen and (max-width:1205px) {
        .phone {
            display: block !important;
        }

        .computer {
            display: none !important;
        }
    }

    @media only screen and (max-width: 991px) {
      .transfer-modal-button {
        width: 55%
      }
    }
    @media only screen and (max-width: 800px) {
      margin: 0 !important;

      .form-group {
        max-width: 90%;
      }
    }
    @media only screen and (max-width: 375px) {
      .transfer-modal-button {
        width: 65%
      }
    }
  }
}
</style>