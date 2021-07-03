<template>
  <div id="app">
    <div v-if="!connected" class="toogle">
        <login />
    </div>
    <div v-if="connected" class="admin">
      <div class="wrapper">
        <navigation-comp />
        <header-comp />
        <transition name="fade" mode="out-in">
      <router-view  />
        </transition>
      <footer-comp />
      </div>
    </div>
  </div>
</template>

<script>
import login from './views/login'
import headerComp from './components/headerComp'
import navigationComp from './components/navigationComp'
import footerComp from './components/footerComp'
export default {
  data : ()=>{
    return {
      connected : null,
      hero : false,
      code_statu : localStorage.getItem('statusCode')
    }
  },
  components : {
    login,
    headerComp,
    navigationComp,
    footerComp
  },
    created()
    {
           if(localStorage.getItem('logged') != undefined)
           {
             this.connected = true
           }else{
             this.connected = false
           }

           window.onoffline = ()=>{
             window.ononline = ()=>{
               this.statu('La connexion a été rétablie','success')
               this.hero = true
             }
             if(!this.hero)
             {
               this.statu('Pas de connection','error')
               this.hero = false
             }
           }
          setInterval(() => {
           if(this.code_statu != undefined && this.code_statu != 200)
           {
               this.alrt('Erreur dans serveur','','error')
           }
          }, 1000);
    }
}
</script>
