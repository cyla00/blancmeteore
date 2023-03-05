<script setup lang="ts">

</script>

<template>
  <div>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>

html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
	font-family: Poppins;
	
}
body{
    margin: 0;
    padding: 0;
    font-family: Poppins;
    background: linear-gradient(to left top, #145277, #046989, #098198, #2799a3, #49b0aa);
}
i {
	vertical-align: middle;
}

.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 100ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.mobile-btn:active{
    opacity: 50%;
}

.desktop-btn:hover{
    opacity: 50%;
}
.desktop-btn:active{
    opacity: 100%;
}
</style>
