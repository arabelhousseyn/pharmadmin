<template>
    <div class="modal fade" id="upprdmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier produit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="name" class="weight">Dèsignation produit</label>
            <input type="text" id="name" class="form-control" placeholder="Dèsignation produit" v-model="lk.name_product">
        </div>

        <div class="form-group">
          <label for="cats" class="weight">Categories</label>
          <select  v-model="lk.id_categorie" id="cats" class='form-control'>
            <option selected disabled>Choisir</option>
          <option v-for="(cat,index) in cats" :key="index" :value="cat.id_categorie">{{cat.name_categorie}} </option>
          </select>
        </div>
        <div class="form-group">
          <label for="dcis" class="weight">DCIS</label>
          <select v-model="lk.id_dci" id="dcis" class='form-control'>
            <option selected disabled>Choisir</option>
          <option v-for="(dci,index) in dcis" :key="index" :value="dci.id_dci">{{dci.name_dci}} </option>
          </select>
        </div>
        <div class="form-group">
          <label for="forms" class="weight">FORMS</label>
          <select  v-model="lk.id_form" id="forms" class='form-control'>
            <option selected disabled>Choisir</option>
          <option v-for="(form,index) in forms" :key="index" :value="form.id_form">{{form.name_form}} </option>
          </select>
        </div>
        <div class="form-group">
          <label for="upsill" class="weight">Seuil</label>
          <input type="number" id="upsill" class="form-control" placeholder="Seuil" v-model="lk.sill">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="update" class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['lk'],
    data : ()=>{
    return{
      dcis : null,
      forms : null,
      cats : null,
    }
  },
    methods : {
       update()
       {
           var run = axios.post(this.link() + 'updateproduct',this.lk,this.cors())
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
    },
    created()
   {

     var run = axios.get(this.link() + 'dcis')
     run.then(e=>{
       this.dcis = e.data
     })
     run.catch(e=>{
       console.log('err')
     })

     var run1 = axios.get(this.link() + 'forms')
     run1.then(e=>{
       this.forms = e.data
     })
     run1.catch(e=>{
       console.log('err')
     })

     var run2 = axios.get(this.link() + 'catss')
     run2.then(e=>{
       this.cats = e.data
     })
     run2.catch(e=>{
       console.log('err')
     })
   }
}
</script>