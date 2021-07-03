<template>
    <div class="modal fade" id="exampleModal12" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter produit</h5>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="name" class="weight">Nom produit</label>
          <input type="text" @keypress="checker" v-model="send.name"  id="name" class='form-control' placeholder="Nom produit">
        </div>
        <div class="form-group">
          <div class="custom-file">
    <input accept=".png,.jpg,.jpeg" type="file" @change="handleImage" class="custom-file-input" id="validatedCustomFile" required>
    <label class="custom-file-label" for="validatedCustomFile">Choisir une photo png/jpg/jpeg (optionnel)...</label>
    <img :src="tmp" v-if="tmp != null" style="width : 100px; height:100px;" alt="image">
  </div>
        </div>
        <div class="form-group">
          <label for="cats" class="weight">Categories</label>
          <select @change="checker" v-model="send.cat" id="cats" class='form-control'>
            <option selected disabled>Choisir</option>
          <option v-for="(cat,index) in cats" :key="index" :value="cat.id_categorie">{{cat.name_categorie}} </option>
          </select>
        </div>
        <div class="form-group">
          <label for="sill" class="weight">Seuil</label>
          <input type="number" id="sill" class="form-control" @change="checker" v-model="send.sill" placeholder="Seuil">
        </div>
        <div v-if="tog">
          <div class="form-group">
          <label for="dcis" class="weight">DCIS</label>
          <select @change="checker" v-model="send.dci" id="dcis" class='form-control'>
            <option selected disabled>Choisir</option>
          <option v-for="(dci,index) in dcis" :key="index" :value="dci.id_dci">{{dci.name_dci}} </option>
          </select>
        </div>
        <div class="form-group">
          <label for="forms" class="weight">FORMES</label>
          <select @change="checker" v-model="send.form" id="forms" class='form-control'>
            <option selected disabled>Choisir</option>
          <option v-for="(form,index) in forms" :key="index" :value="form.id_form">{{form.name_form}} </option>
          </select>
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="close" class="btn btn-secondary">Fermer</button>
        <button type="button" @click="go" :disabled="diis" class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props : ['prods'],
  data : ()=>{
    return{
      diis : true,
      dcis : null,
      forms : null,
      cats : null,
      send : {
        name : null,
        pic : null,
        dci : null,
        form : null,
        cat : null,
        sill : 0,
      },
      tmp : null,
      allow : null,
      tog : false
    }
  },
   methods : {
       close()
       {
         document.getElementById('exampleModal12').style.display = "none"
         document.querySelector('.modal-backdrop').removeAttribute('class')
       },
       handleImage(e)
       {
                  this.send.pic = e.target.files[0]
                  var read = new FileReader();
                  read.onload = (f)=>{
                     this.tmp = f.target.result
                  }
                  read.readAsDataURL(e.target.files[0])
       },
       checker()
       {
         this.tog = (this.send.cat  == 1 || this.send.cat == null) ? false : true
         this.diis = (this.send.name == null ||  this.send.cat == null) ? true : false
       },
       go()
       {
         var form = new FormData()
         form.append('name',this.send.name)
         form.append('pic',this.send.pic)
         form.append('dci',this.send.dci)
         form.append('form',this.send.form)
         form.append('cat',this.send.cat)
         form.append('sill',this.send.sill)
         var run = axios.post(this.link() + 'addproduct',form,this.cors())
         run.then(e=>{
           this.prods.push(e.data[0])
           this.prods.reverse()
           this.close()
           this.statu('Opèration èffectuè','success')
         })
         run.catch(e=>{
           console.log('err')
         })
       }

   },
   created()
   {
     var run = axios.get(this.link() + 'dcis',this.cors())
     run.then(e=>{
       this.dcis = e.data
     })
     run.catch(e=>{
       console.log('err')
     })

     var run1 = axios.get(this.link() + 'forms',this.cors())
     run1.then(e=>{
       this.forms = e.data
     })
     run1.catch(e=>{
       console.log('err')
     })

     var run2 = axios.get(this.link() + 'catss',this.cors())
     run2.then(e=>{
       this.cats = e.data
     })
     run2.catch(e=>{
       console.log('err')
     })
   }
}
</script>