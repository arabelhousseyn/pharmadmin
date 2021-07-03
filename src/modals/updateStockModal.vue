<template>
    <!-- Modal -->
<div class="modal fade" id="updatestock" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier stock</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="upname" class="weight">Dèsignation stock</label>
            <input type="text" id="upname" class="form-control" placeholder="Dèsignation stock" v-model="stock.name_stock">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="update"  class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['stock'],
    methods : {
        update()
        {
            var run = axios.post(this.link() + 'updatestock',this.stock,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                    setInterval(() => {
                        location.reload()
                    }, 2000);
                }else if(e.data == "no")
                {
                    this.statu('Stock dèja existe','error')
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        }
    }
}
</script>