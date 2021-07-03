<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><ic icon="bars"/></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/" class="nav-link" >Acceuil</router-link>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
       <li v-if="stat == 0 || stat == 1" @click="handle" class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <ic icon="bell" size="1x" />
          <span class="badge badge-danger">{{numberofNotifs}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right" style="width:max-content;">
          <span class="dropdown-item dropdown-header">{{numberofNotifs}} Notifications</span>
          <div class="dropdown-divider"></div>
          <div  v-for="(notif,index) in Notifs" :key="index" class="details">
            <router-link class="dropdown-item" to="ventecart">
            <ic icon="box" /> <div class="data">
              {{"Nouvelle commande " + notif.notif.ref_commande + ' de ' + notif.client.fname + ' ' + notif.client.lname}}
            </div>
            <span class="float-right text-muted text-sm">{{notif.notif.notif_date}}</span>
          </router-link>
          <div class="dropdown-divider"></div>
          </div>
        </div>
      </li>
      <div class="dropdown show">
  <a class="btn btn-secondary dropdown-toggle special" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span style='margin-right:68px;'>{{username}}</span>
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a @click="logout" class="dropdown-item" href=""><span>Dèconnexion <span> <ic icon="power-off" /> </span></span></a>
  </div>
</div>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <ic icon="expand-arrows-alt"/>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Push from 'push.js'
import m from 'moment'
import axios from 'axios'
export default {
  data : ()=>{
    return{
      username : localStorage.getItem('logged'),
      Notifs : [],
      numberofNotifs : 0,
      stat : localStorage.getItem('statu'),
    }
  },
  methods : {
    logout()
    {
      localStorage.removeItem('logged')
      localStorage.removeItem('statu')
      location.href = '/'
    },
    handle()
    {
      setTimeout(() => {
        var run = axios.get(this.link() + 'mark',this.cors())
      run.then(e=>{})
      run.catch(e=>{
        console.log(e.data)
      })
      }, 5000);
    }
  },
  created()
  {
    if(this.stat == 0 || this.stat == 1)
    {
       setInterval(() => {
     let run =  axios.get(this.link() + 'getnotifications',this.cors())
   run.then(e=>{
     localStorage.setItem('statusCode',e.status)
       this.numberofNotifs = e.data.length
     this.Notifs = e.data
     for (const notif of e.data) {
       notif.notif.notif_date = m(notif.notif.notif_date).calendar()
       if(notif.notif.pushed == 0)
       {
         Push.create("p-pharm", {
    body: "Nouvelle commande " + notif.notif.ref_commande + ' de ' + notif.client.fname + ' ' + notif.client.lname,
    icon: 'assets/images/logo.jpg',
    timeout: 4000,
    onClick: function () {
        location.href = '/ventecart'
        this.close();
    }
});
       }
     }
   })
   }, 3000);
    }
  },
}
</script>