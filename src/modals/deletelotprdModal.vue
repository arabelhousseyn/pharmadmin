<template>
    <div class="modal fade" id="dellotprd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Supprimer lot</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <p>Pour confirmer appuyez sur <span class='green'>oui</span> sinon <span class="red">non</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Non</button>
        <button type="button" @click="yes" class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['ids'],
    data : ()=>{
        return{
            snd : {
                ids : null,
            }
        }
    },
    methods : {
        yes()
        {
            this.snd.ids = this.ids
            var run = axios.post(this.link() + 'dellotprd',this.snd,this.cors())
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