<template>
    <div class="modal fade" id="paymentachat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Payment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="payment" class="weight">Mode payment</label>
            <select @change="toogle" v-model="send.mode" id="payment" class='form-control'>
                <option selected disabled>Choisir</option>
                <option value="0">Chèque</option>
                <option value="1">Espèce</option>
                <option value="2">A terme</option>
            </select>
        </div>
        <div v-if="view" class="form-group">
            <label for="number" class="weight">Numèro de chèque</label>
            <input type="text" id="number" v-model="send.number" placeholder="Numèro de chèque" class='form-control'>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" :disabled="dis" @click="pay" class="btn btn-success">Validè</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['cmd'],
    data :()=>{
        return{
            dis : true,
           send : {
               mode : null,
               number : null,
               id : null,
           },
           view : false,
        }
    },
    methods : {
        pay()
        {
            this.send.id = this.cmd
            var run = axios.post(this.link() + 'paymentachat',this.send,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                    setInterval(() => {
                        location.reload()
                    }, 2000);
                }else if(e.data == "no")
                {
                    this.statu('Entrer numèro du chèque','error')
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
        toogle()
        {
            this.view = (this.send.mode  == 0) ? true : false 
            this.dis = (this.send.mode == null) ? true : false
        }
    }
    
}
</script>