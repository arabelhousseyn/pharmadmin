<template>
    <div class="modal fade" id="deleteadm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Suspendu administrateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p>Pour suspendu click sur <span class='green weight'>Oui</span> sinon <span class='red weight'>Fermer</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="removee"   class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['datadel'],
    methods: {
        removee()
        {
  
            var run = axios.post(this.link() + 'removead',this.datadel,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                   
            document.getElementById('deleteadm').removeAttribute('class')
            document.getElementById('deleteadm').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
            this.statu('Opèration èffectuè','success')

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