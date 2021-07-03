<template>
    <div class="modal fade" id="addfourni" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter fournisseur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="name" class='weight'>Nom fournisseur</label>
            <input type="text" @keypress="checker" v-model="data.name" id="name" class='form-control' placeholder="Nom fournisseur">
        </div>

        <div class="form-group">
            <label for="mobile" class='weight'>Mobile fournisseur</label>
            <input type="text" @keypress="checker" v-model="data.phone" id="mobile" class='form-control' placeholder="Mobile fournisseur">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" :disabled="dis" @click="add" class="btn btn-primary">Ajouter</button>
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
            data : {
                name : null,
                phone :  null,
            },
            dis : true
        }
    },
    methods :{
        add()
        {
            var run = axios.post(this.link() + 'addfourni',this.data,this.cors())
            run.then(e=>{
              if(e.data == "no")
              {
                this.statu('Mobile dèja utilisè','error')
              }else if(e.data == "yes")
              {
                this.alrt('Opèration èffectuè','','success')
                setTimeout(() => {
                 location.reload()
                }, 2000);
              }
            })
            run.catch(e=>{
              console.log('err')
            })  
        },
        checker()
        {
          this.dis = (this.data.name == null || this.data.phone == null) ? true : false
        }
    }
}
</script>