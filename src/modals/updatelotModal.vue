<template>
    <div class="modal fade" id="uplotprd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Suspendu administrateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
              <label for="code" class="weight">Code lot</label>
              <input type="text" v-model="lot.code_lot" class="form-control" id="code">
          </div>
          <div class="form-group">
              <label for="datefab" class="weight">Date fabrication</label>
              <input type="date" v-model="lot.date_fab" class="form-control" id="datefab">
          </div>
          <div class="form-group">
              <label for="datexp" class="weight">Date expiration</label>
              <input type="date" v-model="lot.date_fab" class="form-control" id="datexp">
          </div>
          <div class="form-group">
              <label for="price" class="weight">Prix</label>
              <input type="number" v-model="lot.price" class="form-control" id="price">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="confirm"   class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['lot'],
    methods: {
        confirm()
        {
  
            var run = axios.post(this.link() + 'updatelot',this.lot,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                }
            })
            run.catch(e=>{
                console.log('err')
            })
            
            
        }
    }
         
}
</script>