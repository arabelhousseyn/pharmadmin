<template>
    <div class="modal fade" id="repmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Replay</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="rep" class="weight">Rétroaction</label>
            <textarea id="rep" @keyup="checker" v-model="send.rep" placeholder="écris quelque chose !" class="form-control" cols="30" rows="10"></textarea>
        </div>
        <div class="form-group">
            <label for="statu" class="weight">Statu</label>
            <select @change="checker"  id="statu" class="form-control" v-model="send.statu">
                <option selected disabled>Choisir ...</option>
                <option value="1">Examinè</option>
                <option value="2">Non examinè</option>
            </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="submit" :disabled="dis" class="btn btn-success" >Soumettre</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['rec'],
    data : ()=>{
        return{
            dis : true,
            send : {
                rep: null,
                statu : null,
                id : null,
            }
        }
    },
    methods : {
        checker()
        {
            this.dis = (this.send.rep == null || this.send.statu == null) ? true : false
        },
        submit()
        {
            this.send.id = this.rec.id_rec
            var run = axios.post(this.link() +  'feedback', this.send,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.alrt('Opèration èffectè','','success')
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                }
            })
        }
    }
}
</script>