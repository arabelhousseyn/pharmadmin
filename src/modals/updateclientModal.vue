<template>
    <div class="modal fade" id="updateclient" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier client</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div class="form-group">
           <label for="upfname" class="weight">Nom</label>
           <input type="text"  v-model="client.fname" id="upfname" class='form-control' placeholder="Nom">
       </div>
       <div class="form-group">
           <label for="uplname" class="weight">Prènom</label>
           <input type="text" v-model="client.lname" id="uplname" class='form-control' placeholder="Prènom">
       </div>

       <div class="form-group">
           <label for="upusername" class="weight">Nom d'utilisateur</label>
           <input type="text" v-model="client.username" id="upusername" class='form-control' placeholder="Nom d'utilisateur">
       </div>

       <div class="form-group">
           <label for="upphone" class="weight">Mobile</label>
           <input type="number" v-model="client.phone" id="upphone" class='form-control' placeholder="Mobile">
       </div>

       <div class="form-group">
           <label for="upemail" class="weight">Email</label>
           <input type="text" v-model="client.email" id="upemail" class='form-control' placeholder="Email">
       </div>

       <div class="form-group">
           <label for="upadresse" class="weight">Adresse</label>
           <input type="text" v-model="client.adresse" id="upadresse" class='form-control' placeholder="Adresse">
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button  @click="update" type="button" class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    props : ['client'],
    data : ()=>{
        return{
            dis : true,
        }
    },
    methods : {
        update()
        {
            var run = axios.post(this.link() + 'updateclient',this.client,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                     document.getElementById('updateclient').removeAttribute('class')
            document.getElementById('updateclient').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
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
        }
    },
}
</script>