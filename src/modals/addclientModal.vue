<template>
    <div class="modal fade" id="addclient" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter client</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div class="form-group">
           <label for="fname" class="weight">Nom</label>
           <input type="text" @keypress="checker" v-model="send.fname" id="fname" class='form-control' placeholder="Nom">
       </div>
       <div class="form-group">
           <label for="lname" class="weight">Prènom</label>
           <input type="text" @keypress="checker" v-model="send.lname" id="lname" class='form-control' placeholder="Prènom">
       </div>

       <div class="form-group">
           <label for="username" class="weight">Nom d'utilisateur</label>
           <input type="text" @keypress="checker" v-model="send.username" id="username" class='form-control' placeholder="Nom d'utilisateur">
       </div>

       <div class="form-group">
           <label for="phone" class="weight">Mobile</label>
           <input type="number" @keypress="checker" v-model="send.phone" id="phone" class='form-control' placeholder="Mobile">
       </div>

       <div class="form-group">
           <label for="email" class="weight">Email</label>
           <input type="text" @keypress="checker" v-model="send.email" id="email" class='form-control' placeholder="Email">
       </div>

       <div class="form-group">
           <label for="adresse" class="weight">Adresse</label>
           <input type="text" @keypress="checker" v-model="send.adresse" id="adresse" class='form-control' placeholder="Adresse">
       </div>

       <div class="form-group">
           <label for="pass" class="weight">Mote de passe</label>
           <input type="password" @keyup="checker" v-model="send.pass" id="pass" class='form-control' placeholder="Mote de passe">
       </div>

       <div class="form-group">
           <label for="repass" class="weight">Re-enter mote de passe</label>
           <input type="password" @keyup="checker" v-model="send.repass" id="repass" class='form-control' placeholder="Re-enter mote de passe">
       </div>
       <p v-if="exep" v-html="msg"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button :disabled="dis" @click="add" type="button" class="btn btn-primary">Ajouter</button>
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
            dis : true,
            exep : false,
            msg : null,
            send : {
                fname : null,
                lname : null,
                username : null,
                phone : null,
                email : null,
                adresse : null,
                pass : null,
                repass : null,
            }
        }
    },
    methods : {
        add()
        {
            var run = axios.post(this.link() + 'addclient',this.send,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                    setInterval(() => {
                        location.reload()
                    }, 2000);
                }else if(e.data == "nousername")
                {
                    this.statu("Nom d'utilisateur dèja existe",'error')
                }else if(e.data == "nophone")
                {
                    this.statu("Mote de passe dèja existe",'error')
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
        checker()
        {
            this.dis = (this.send.fname == null || this.send.lname == null || this.send.username == null ||
            this.send.phone == null || this.send.email == null || this.send.adresse == null) ? true : false

            if(this.send.pass != null && this.send.repass != null)
            {
                if(this.send.pass == this.send.repass)
                {
                    this.exep = false
                    this.msg = ""
                }else{
                    this.exep = true
                    this.msg = '<span class="red">Mote de passe ne correspondent pas</span>'
                    this.dis = true
                }
            }else{
                this.dis = true
            }
        }
    }
}
</script>