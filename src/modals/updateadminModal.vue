<template>
    <div class="modal fade" id="updateadmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier administrateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="upusername" class='weight'>Nom d'utilisateur</label>
            <input type="text"  v-model="dataUp.username_user" id="upusername" class='form-control' placeholder="Nom d'utilisateur">
        </div>
        <div class="form-group">
            <label for="upphone" class='weight'>Mobile</label>
            <input type="number"  v-model="dataUp.phone" id="upphone" class='form-control' placeholder="Mobile">
        </div>

        <div class="form-group">
            <label for="upemail" class='weight'>Email</label>
            <input type="text"  v-model="dataUp.email" id="upemail" class='form-control' placeholder="Email">
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="updatee"  class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    props : ['dataUp'],
    methods : {
        updatee()
        {
          var run = axios.post(this.link() + 'updateadmin',this.dataUp,this.cors())
          run.then(e=>{
             if(e.data == "yes")
                {
                   this.alrt("Opèration èffectuè",'','success')
                    setTimeout(() => {
                      this.hideModal()
                    }, 2000);
                }else if(e.data == "nousername")
                {
                    this.dis = false
                    this.statu("Nom d'utilisateur dèja utilisè",'error')
                }else if(e.data == "nophone")
                {
                    this.dis = false
                    this.statu("Mobile dèja utilisè",'error')
                }
          })
          run.catch(e=>{
            console.log('err')
          })
        }
    }
}
</script>