<template>
    <div class="modal fade" id="recyclient" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Re-active client</h5>
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
    props : ['client'],
    methods : {
        yes()
        {
            var run = axios.post(this.link() + 'reactiveclient',this.client,this.cors())
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