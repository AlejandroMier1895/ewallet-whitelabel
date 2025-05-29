<template>
  <div v-if="!isLoaded" id="loader">
    <b-spinner id="spinner"></b-spinner> 
  </div>
  <div v-else id="login-page" class="d-flex flex-column">
    
    <TopBar>
      <template v-slot:mobile>
        <img :src="`${$router.options.base}img/ewallet-fullLogo-white.svg`" id="whiteLogo" alt="E-wallet logotipo." role="img"/>
      </template>

      <template v-slot:desktop>
        <div class="topBar-login">
          <img :src="`${$router.options.base}img/ewallet-fullLogo-brown.svg`" alt="E-wallet logotipo.">
        </div>
      </template>
    </TopBar>

    <div class="mt-auto mb-auto login-page-content box-shadow">

      <b-form class="box-shadow" @submit.prevent="userLogin">
        <div class="login-text mb-4">Iniciar Sesión</div>
        <div class="login-description mb-4">
          Para iniciar sesión, ingresa los datos que se te solicitan
        </div>

        <label for="email">Nombre de usuario</label>
        <b-form-input id="email" type="text" v-model="login.username"
          placeholder="Nombre de usuario" required></b-form-input>

        <label for="password">Contraseña</label>
        <div class="position-relative">
          <b-form-input id="password" :type="showPass ? 'text' : 'password'" v-model="login.password"
            placeholder="Contraseña" required></b-form-input>
            <img class="pass-eye" @click="showPass = !showPass" role="img" :src="!showPass ? `${$router.options.base}img/${passwordIcons[1]}` : `${$router.options.base}img/${passwordIcons[0]}`" :alt="!showPass ? 'Mostrar contraseña.' : 'Ocultar contraseña.'"/>
        </div>

        <div class="forgot-password"><a tabindex="0">¿Olvidaste tu contraseña?</a></div>
        <div class="d-flex justify-content-center align-items center">
          <b-button type="submit" id="login-button" tabindex="0">Iniciar Sesión</b-button>
        </div>
      </b-form>
    </div>

    <div id="background">
      <img rel="preload" :src="`${$router.options.base}img/ewallet-backgroundLogin.svg`" role="img" alt="Dos olas con los colores de E-wallet, naranja y verde, como imagen de fondo."/>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/topBar.vue'

export default {
  layout: 'empty',
  components: { TopBar},
  data() {
    return {
      isLoaded: false,
      login: {
        username: '',
        password: '',
        refresh: ''
      },
      showPass: false,
      passwordIcons: [
        "icon-bootstrap-eye-slash.svg",
        "icon-bootstrap-eye.svg",
      ],
    };
  },
  methods: {
    async userLogin() {
      this.$axios.post('/login').then(response => {
          this.$auth.setUser(response.data.user);
          if (this.$auth.user) {
            this.$router.push('/dashboard');
          }
      });
    },
    //Maketoast creates an alert type of message 
    Maketoast(toaster, titulo, append = false) {
      this.$bvToast.toast(toaster, {
        title: titulo,
        toaster: 'b-toaster-top-center',
        solid: true,
        appendToast: append
      });
    },
  },
  mounted(){
    window.addEventListener('load', () => {
      this.isLoaded = true;
    });
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  font-family: 'Poppins', sans-serif;
}
#loader {
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, #fcefdc 0%, #d9dcd7 50%, #b0bfc8 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  #spinner{
    width: 2.5rem !important;
    height: 2.5rem !important;
    color: #8C4B1F !important;
  }
}
#login-page {
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  #background {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(180deg, #fcefdc 0%, #d9dcd7 50%, #b0bfc8 100%);
    img {
      width: 100vw;
      height: auto;
      min-height: 100vh;
    }
  }

  #whiteLogo{
    max-width: 200px;
  }

  // Top Bar
  .topBar-login {
    max-width: 180px;
    margin: 25px 0;

    img {
      width: 100%;
    }
  }

  // Commom CSS
  .box-shadow {
    border-radius: 10px;
    box-shadow: 2px 2px 29px 0px rgba(0, 0, 0, 0.08);
  }

  button {
    border-radius: 40px;
    background: #8C4B1F;
    box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.10);
    border: none;
    text-align: center;
    padding: 18px 32px;
    margin: auto;
    font-weight: 700;
  }
  button:hover, button:focus{
    background: #687F2E;
  }

  // Login areas 
  .login-page-content {
    display: flex;
    max-width: 35vw;
    margin: 0 80px;
    padding: 64px 48px;
    background: rgba(255, 255, 255, 0.88);

    // Form login
    form {
      padding: 60px 60px 40px;
      margin: -64px -48px;

      .login-text {
        font-weight: 600;
        font-size: 28px;
        text-align: center;
        font-family: 'Poppins', sans-serif;
      }

      .login-description {
        font-size: 20px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }

      label {
        text-align: left;
        margin: 8px 0;
      }

      input {
        height: 50px;
        border-color: #C4C4C4;
        box-shadow: none;

        &::placeholder {
          color: transparent;
          font-weight: 400;
        }
      }

      .form-control {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        line-height: 29.26px;
      }

      #password.form-control {
        padding-right: 40px;
      }

      div.forgot-password {
        text-align: left;
        font-size: 14px;
        margin-top: 8px;
        color: #8C4B1F;
        a{
          cursor: pointer;
        }
      }

      button#login-button {
        margin-top: 30px;
      }

      .pass-eye {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }

  @media screen and (min-width: 1660px) {
    .login-page-content {
      margin: auto;
    }
  }

  @media screen and (max-width:1205px) {
    .box-shadow {
      box-shadow: none;
    }

    .login-page-content {
      padding: 0;
      min-width: 50vw;
      max-width: 100%;
      margin: auto;
      background: transparent;

      form {
        padding: 0;
        width: 100%;
        flex: initial;
        margin: auto;

        .login-text {
          font-size: 26px;
        }

        .login-description {
          display: none;
        }

        label {
          display: none;
        }

        input {
          margin-top: 20px;
          border-radius: 40px;
          border: transparent;
          box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.10);

          &::placeholder {
            color: #828282;
          }
        }

        .form-control {
          padding-left: 9%;
          padding-right: 9%;
        }

        div.forgot-password {
          color: #000;
          text-align: center;
        }

        button#login-button {
          width: 80%;
        }

        .pass-eye {
          top: 50%;
        }
      }
    }
    #background {
      left: 50%;
      transform: translateX(-50%);
      img {
        width: auto;
        height: 100vh;
      }
    }
  }

  @media screen and (max-width:767.98px) {
  // Small devices (landscape phones, less than 768px)
    .login-page-content {
      min-width: 75vw;
      form {
        .login-text {
          font-size: 16px;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    background-image: none;
  }
}
</style>
