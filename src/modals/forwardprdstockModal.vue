<template>
    <div class="modal fade" id="forwardprdstk" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Mouvement</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
              <label for="stock" class="weight">Stock</label>
              <select @change="checker" v-model="send.id" id="stock" class="form-control">
                  <option v-for="(stock,index) in stocks" :key="index" :value="stock.id_stock">{{stock.name_stock}}</option>
              </select>
          </div>
          <div class="form-group">
              <label for="qt" class="weight">Quantitè</label>
              <input type="number" v-model="send.qt" @keyup="checker" id="qt" placeholder="Quantitè" class="form-control">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="forward" :disabled="dis"  class="btn btn-success">Validè</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['sk','ids'],
    data : ()=>{
      return{
          stocks : [],
          send : {
              id : null,
              ids : null,
              qt : null,
          },
          dis : true,
      }
    },
    methods : {
         checker()
         {
             this.dis = (this.send.id == null || this.send.qt == null) ? true : false
         },
         forward()
         {
             this.send.ids = this.ids
             axios.post(this.link() + 'forward',this.send,this.cors())
             .then(e=>{
                 if(e.data == "yes")
                 {
                     this.alrt('Opèration èffectuè','','success')
                     setInterval(() => {
                         location.reload()
                     }, 2000);
                 }else{
                     this.statu('Entrèe un quantitè infèrieur a ' + e.data,'error')
                 }
             })
             .catch(e=>{
                 console.log('err')
             })
         }
    },
    created()
    {
        var run = axios.post(this.link() + 'stocksnegcurrent',{id : this.sk},this.cors())
        run.then(e=>{
           this.stocks = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>