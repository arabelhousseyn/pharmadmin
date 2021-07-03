<template>
    <div class="modal fade" id="deladmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Supprimer administrateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p>Pour supprimer click sur <span class='green weight'>Oui</span> sinon <span class='red weight'>Fermer</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="remove"   class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['ids'],
    methods : {
        remove()
        {
            
           var run  = axios.post(this.link() + 'removeadmin',{ids : this.ids},this.cors())
           run.then(e=>{
               if(e.data == "yes")
               {
                   this.alrt('Opèration èffectuè','','success')
                   setTimeout(() => {
                       location.reload()
                   }, 2000);
               }
           })
            
        }
    }
}
</script>