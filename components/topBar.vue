<template>
  <div class="navbar justify-content-center">
    <div class="mobile">
      <slot name="mobile"></slot>
    </div>

    <div class="desktop">
      <slot name="desktop"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile {
  display: none;
  width: 100%;
}

@media screen and (max-width: 1205px) {
  .navbar {
    background-image: url("/img/ewallet-header.png");
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