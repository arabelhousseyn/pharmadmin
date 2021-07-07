<template>
    <div class="container-fluid" id="login">
        <div class="boxDetails">
            <h3 class='titleColor weight center'>p-pharm</h3>
        <div class="card">
            <div class="card-body self">
                <p>Connecter vous</p>
                <div class="form-group">
                    <label for="username" class='weight'>Nom d'utilisateur</label>
                    <input type="text" @keypress="checker" v-model="login.username" id="username" placeholder="Nom d'utilisateur" class='form-control'>
                </div>
                <div class="form-group">
                    <label for="password" class='weight'>Mot de passe</label>
                    <input type="password" @keyup.enter="checkLogin" @keypress="checker" v-model="login.password" id="password" placeholder="Mot de passe" class='form-control'>
                </div>
                <button @click="checkLogin" @keyup.enter="checkLogin" :disabled="disabled" class='btn btn-primary form-control buttonColor'><span><ic icon="lock-open" /></span> S'identifier</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
     return{
        disabled : true,
        login : {
            username : null,
            password : null,
        }
     }
    },
    methods : {
       checker()
       {
           this.disabled = (this.login.username != null && this.login.password != null) ? false : true
       },
       checkLogin()
       {
           this.disabled = true
           var run =  axios.post(this.link() + 'loginCheck',this.login,this.cors())
           run.then(e=>{
               if(e.status == 200)
               {
                    if(e.data == "nopass")
               {
                   this.statu('Mot de passe Incorrect','error')
                  this.disabled = false
               }else if(e.data == "no"){
                   this.statu('Compte n\'existe pas','error')
                   this.disabled = false
               }else if(e.data == "noactive")
               {
                    this.statu('Votre compe est suspendu','error')
                   this.disabled = false
               }else{
                   console.log(e.data)
                   localStorage.setItem('logged',e.data[0].username_user)
                   localStorage.setItem('statu',e.data[0].statu)
                   location.reload()
               }
               }else{
                   this.alrt('Erreur dans server','','error')
               }
           })
           run.catch(e=>{
               console.log('err')
           })
       }
    },
    created()
    {
       
    }
}
</script>