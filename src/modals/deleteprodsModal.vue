<template>
    <div class="modal fade" id="delprods" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Supprimer produit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p>Pour supprimer click sur <span class='green weight'>Oui</span> sinon <span class='red weight'>Fermer</span></p>
          <ol>
            <li v-for="(d,index) in dds1" :key="index">{{d}}</li>
          </ol>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="removee"   class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['dds','dds1'],
    methods: {
        removee()
        {
            let i = 0;
            var run = axios.post(this.link() + 'deleteproducts',{dds : this.dds},this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                  this.alrt('Opèration èffectuè','','success')
                  location.reload()
                }
            })
            run.catch(e=>{
                console.log('err')
            })
            
            
        }
    }
         
}
</script>