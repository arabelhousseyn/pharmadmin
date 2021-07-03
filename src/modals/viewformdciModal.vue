<template>
    <div class="modal fade" id="formdci" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Forme / Dci</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="disp != null" class="flxbtn">
            <p><span class="weight">Forme : </span> <span>{{disp[0].name_form}}</span> </p>
            <p><span class="weight">Dci : </span> <span>{{disp[0].name_dci}}</span> </p>
        </div>
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
    props : ['lk1'],
    data : ()=>{
        return{
            disp : null,
        }
    },
   async created()
    {
         await axios.post(this.link() + 'formdcis',this.lk1,this.cors())
        .then(e=>{
            this.disp = e.data
        })
        .catch(e=>{
            console.log('err')
        })
    }
}
</script>