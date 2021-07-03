<template>
    <!-- Modal -->
<div class="modal fade" id="addstock" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter stock</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="name" class="weight">Dèsignation stock</label>
            <input type="text" @keypress="checker" id="name" class="form-control" placeholder="Dèsignation stock" v-model="send.name">
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
    data : ()=>{
        return{
            dis : true,
            send : {
                name : null,
            }
        }
    },
    methods : {
        checker()
        {
            this.dis = (this.send.name == null) ? true : false
        },
        add()
        {
            var run = axios.post(this.link() + 'addstock',this.send,this.cors())
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