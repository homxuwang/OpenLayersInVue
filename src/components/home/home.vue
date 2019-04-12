<template>
 <div class="home">
   <app-header></app-header>
   <v-map style="height:100%"></v-map>
 </div>
</template>

<script>
import appHeader from '@/components/modules/appHeader'
import VMap from '@/components/globa/map-component'
 export default {
   name: 'home',
   components: {
     appHeader,
     VMap
   },
   data () {
     return {

     }
   }
 }
</script>

<style>
 
</style>
