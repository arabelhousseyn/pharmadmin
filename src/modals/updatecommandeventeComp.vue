<template>
    <div class="modal fade" id="uplotcart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier lot</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
              <label for="qtt" class="weight">Quantitè</label>
              <input type="text" name="" id="" :value="detail.qt_cart" class="form-control">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="change" class="btn btn-success" data-dismiss="modal">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['detail'],
    methods : {
        change()
        {
            var run = axios.post(this.link() + 'updateLotsCommande',this.detail,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration effectuée','','success')
                    location.reload()
                }
            })
        }
    }
}
</script>