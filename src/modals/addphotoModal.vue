<template>
    <div class="modal fade" id="addphotomodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Miniature</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <div class="custom-file">
    <input @change="handleImage" accept=".png,.jpeg,.png" type="file" class="custom-file-input" id="validatedCustomFile" required>
    <label class="custom-file-label" for="validatedCustomFile">Miniature png/jpg/jpeg...</label>
  </div>
  <div style='text-align: center;margin: 41px;' v-if="tmp != null" class="display">
   <img :src="tmp" style="width:200px;height:200px;" alt="photo">
  </div>
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
    props : ['lk'],
    data :  ()=>{
        return{
            dis : true,
            tmp : null,
            send : {
                pic : null,
            }
        }
    },
    methods : {
      handleImage(e)
      {
          this.send.pic = e.target.files[0]
                  var read = new FileReader();
                  read.onload = (f)=>{
                     this.tmp = f.target.result
                  }
                  read.readAsDataURL(e.target.files[0])
                  this.dis = false
      },
      add()
      {
          var form = new FormData()
          form.append('id',this.lk.id_product)
          form.append('image',this.send.pic)
          var run = axios.post(this.link() + 'addphoto',form,this.cors())
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