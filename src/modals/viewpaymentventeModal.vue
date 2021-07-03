<template>
    <div @click="handle" class="modal fade" id="viewvente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><button class='btn btn-primary'>Appuyze ici</button></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-if="view.length > 0" class="modal-body">
        <p><span class="weight">Mode payment : </span><span v-if="view[0].type_payment == 0">Chèque</span> <span v-if="view[0].type_payment == 1">Espèce</span> <span v-if="view[0].type_payment == 2">A terme</span></p>
        <p><span class="weight">Numèro de chèque : </span><span v-if="view[0].bn_number != null">{{view[0].bn_number}}</span> <span v-if="view[0].bn_number == null">/</span></p>
        <p><span class="weight">Date payment : </span><span>{{view[0].date}}</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['cmd'],
    data : ()=>{
        return{
            send : {
                id : null,
            },
            view : [],
        }
    },
    methods : {
        handle()
        {
            this.send.id = this.cmd
            var run = axios.post(this.link() + 'getpaymentvente',this.send,this.cors())
        run.then(e=>{
            this.view = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
        }
    }
}
</script>