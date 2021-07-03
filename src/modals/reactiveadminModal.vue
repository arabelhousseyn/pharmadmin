<template>
    <div class="modal fade" id="recadm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Re-activè administrateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p>Pour re-activè click sur <span class='green weight'>Oui</span> sinon <span class='red weight'>Fermer</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="re"   class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['rec'],
    methods: {
        re()
        {
          var run = axios.post(this.link() + 'reactive',{id : this.rec.id_user},this.cors())
          run.then(e=>{
              if(e.data == "yes")
              {
                 this.statu('Opèration èffectuè','success')
                 setTimeout(() => {
                     location.reload()
                 }, 1000);
              }
          })
        }
    }
         
}
</script>