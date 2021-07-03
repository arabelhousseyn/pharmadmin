<template>
    <div class="modal fade" id="lotprd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter lot</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="code" class="weight">Code lot</label>
            <input type="text" id="code" @keyup="checker" class="form-control" placeholder="Code lot" v-model="send.code" >
        </div>

        <div class="form-group">
            <label for="fab" class="weight">Date fabrication</label>
            <input type="date"  id="fab" @keyup="checker" class="form-control" v-model="send.fab">
        </div>

        <div class="form-group">
            <label for="exp" class="weight">Date expiration</label>
            <input type="date"  id="exp" @keyup="checker" class="form-control" v-model="send.exp">
        </div>

        <div class="form-group">
            <label for="price" class="weight">Prix</label>
            <input type="number"  id="price" @keyup="checker" class="form-control" placeholder="Prix" v-model="send.price">
        </div>

        <div class="form-group">
            <label for="qt" class="weight">Quantitè</label>
            <input type="number"  id="qt" @keyup="checker" class="form-control" placeholder="Quantitè" v-model="send.qts">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="add" :disabled="dis" class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['view'],
    data : ()=>{
        return{
            dis : true,
            send : {
                code : null,
                fab : null,
                exp : null,
                price : null,
                qts : null,
                id : null,
            }
        }
    },
    methods : {
        checker()
        {
            this.dis = (this.send.code == null || this.send.fab == null || this.send.exp == null || this.send.price == null
            || this.send.qts == null) ? true : false
        },
        add()
        {
            this.send.id = this.view
            var run = axios.post(this.link() + 'addlotprd',this.send,this.cors())
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