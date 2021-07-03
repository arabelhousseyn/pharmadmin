<template>
    <div class="modal fade" id="validcmdvente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Validation commande</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p>Pour validè click sur <span class='green weight'>Oui</span> sinon <span class='red weight'>Refusè</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="no"  class="btn btn-danger">Refusè</button>
        <button type="button" @click="yes"  class="btn btn-success">Oui</button>
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
        yes()
        {
            var run = axios.post(this.link() + 'yescmdvente',this.detail,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                    setInterval(() => {
                        location.reload()
                    }, 2000);
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
        no()
        {
            var run = axios.post(this.link() + 'nocmdvente',this.detail,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectuè','','success')
                    setInterval(() => {
                        location.reload()
                    }, 2000);
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        }
    }
}
</script>