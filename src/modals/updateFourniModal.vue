<template>
    <div class="modal fade" id="updatefourni" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier fournisseur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="upusername" class='weight'>Nom fournisseur</label>
            <input type="text"  v-model="dataUp.name_fournisseur" id="upusername" class='form-control' placeholder="Nom d'utilisateur">
        </div>
        <div class="form-group">
            <label for="upphone" class='weight'>Mobile fournisseur</label>
            <input type="number"  v-model="dataUp.phone_fournisseur" id="upphone" class='form-control' placeholder="Mobile">
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
          var run = axios.post(this.link() + 'updatefourni',this.dataUp,this.cors())
          run.then(e=>{
             if(e.data == "yes")
                {
                   this.alrt("Opèration èffectuè",'','success')
                    setTimeout(() => {
                      document.getElementById('updatefourni').removeAttribute('class')
            document.getElementById('updatefourni').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
                    }, 2000);
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