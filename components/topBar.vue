<template>
  <div class="navbar justify-content-center" :style="bgStyle">
    <div class="mobile">
      <slot name="mobile"></slot>
    </div>

    <div class="desktop">
      <slot name="desktop"></slot>
    </div>
  </div>
</template>

<script> 
export default {
  data(){
    return{
      isMobile: false
    }
  },
  computed: {
    bgStyle() {
      if (this.isMobile) {
        return {
          backgroundImage: `url('${this.$router.options.base}img/ewallet-header.png')`
        }
      }
      return {}
    }
  },
  mounted(){
    this.isMobile = window.innerWidth <= 1205
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 1205
    })
  }
}
</script>

<style lang="scss" scoped>
.mobile {
  display: none;
  width: 100%;
}

@media screen and (max-width: 1205px) {
  .navbar {
    height: 150px;
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0px 0px 35px 35px;
    width: 100%;
    padding: 0;
  }

  .desktop {
    display: none;
  }

  .mobile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>