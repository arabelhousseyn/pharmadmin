<template>
    <div class="modal fade" id="exampleModal13" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter lot</h5>
      </div>
      <div class="modal-body">
          <div class="form-group">
              <label for="code" class="weight">Code lot</label>
              <input @keypress="cheker" type="text" v-model="send.code" id="code" class='form-control' placeholder="Code lot">
          </div>
          <div class="form-group">
              <label for="datefab" class="weight">Date fabrication</label>
              <input @keypress="cheker" type="date" v-model="send.fab" id="datefab" class='form-control'>
          </div>
          <div class="form-group">
              <label for="datexp" class="weight">Date d'expiration</label>
              <input @keypress="cheker" type="date" v-model="send.exp" id="datexp" class='form-control'>
          </div>
          <div class="form-group">
              <label for="prixvente" class="weight">Prix vente</label>
              <input @keypress="cheker" type="text" v-model="send.vente" placeholder="ex : 2000" id="prixvente" class='form-control'>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button"  @click="close" class="btn btn-secondary">Fermer</button>
        <button type="button" :disabled="diss" @click="go"  class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['lots','idprod'],
    data : ()=>{
        return{
            diss : true,
            send : {
                code : null,
                fab : null,
                exp : null,
                vente : null,
                id : null,
            }
        }
    },
    methods : {
        close()
       {
         document.getElementById('exampleModal13').style.display = "none"
         document.querySelector('.modal-backdrop').removeAttribute('class')
       },
       cheker()
       {
          this.diss = (this.send.code == null || this.send.fab == null || this.send.exp == null || this.send.vente == null) ? true : false
       },
       go()
       {
           this.send.id = this.idprod
         var run = axios.post(this.link() + 'addlots',this.send,this.cors())
         run.then(e=>{
             this.lots.push(e.data[0])
             this.lots.reverse()
             this.close()
             this.statu('Opèration èffectuè','success')
         })  
       }
    }
}
</script>