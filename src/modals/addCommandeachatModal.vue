<template>
    <div class="modal fade bd-example-modal-lg" id='largemod' tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Ajouter commande achat</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="fournis" class='weight'>Les fournisseurs</label>
          <select @change="checker" v-model="da.fournis" id="fournis" class="form-control">
            <option selected disabled>Choisir</option>
            <option v-if="da.only == null" v-for="(fo,index) in fournis" :key="index" :value="fo.id_fournisseur">{{fo.name_fournisseur}}</option>
            <option  v-for="(fo,index) in fournis" :key="index" v-if="da.only == fo.id_fournisseur" :value="fo.id_fournisseur">{{fo.name_fournisseur}}</option>
          </select>
        </div>
        <label for="prods" class='weight'>Les produits</label>
        <div class="input-group mb-3">
          <select @change="check" v-model="da.id" id="prods" class="form-control">
            <option selected disabled>Choisir</option>
            <option v-for="(prod,index) in prods" :key="index" :value="prod.id_product">{{prod.name_product}}</option>
          </select>
          <div class="input-group-append">
    <button class="btn btn-success" data-toggle="modal" data-target="#exampleModal12" type="button"><ic icon="plus" /></button>
  </div>
        </div>
        <div v-if="view">
          <label for="lots" class='weight'>Les Lots</label>
        <div  class="input-group mb-3">
          <select @change="checker" v-model="da.lot" id="lots" class="form-control">
            <option v-for="(lot,index) in lots" :key="index" :value="lot.id_lot">{{lot.code_lot}} / expiration : {{lot.date_exp}} / Quantitè : {{ lot.qt }}</option>
          </select>
          <div class="input-group-append">
    <button class="btn btn-success" data-toggle="modal" data-target="#exampleModal13" type="button"><ic icon="plus" /></button>
  </div>
        </div>
        </div>
        <div class="form-group">
             <label for="price" class="weight">Prix achat</label>
             <input @keypress="checker" type="text" v-model="da.price" id="price" class='form-control' placeholder="Prix achat">
        </div>
        <div class="form-group">
             <label for="qt" class="weight">Qunatitè</label>
             <input @keypress="checker" type="text" v-model="da.qt" id="qt" class='form-control' placeholder="Quantitè">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="close" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="valid" :disabled="dis" class="btn btn-success"> <ic icon="check" /> Validè</button>
        <button type="button" @click="save" :disabled="dis1" class="btn btn-success"> <ic icon="save" /> Sauvgardez</button>
      </div>
    </div>
  </div>
  <addproduct-modal :prods="prods" />
  <addlot-modal :lots="lots"  :idprod="da.id" />
</div>
</template>
<script>
import axios from 'axios'
import addproductModal from './addproductModal'
import addlotModal from './addlotModal'
export default {
  props : ['cmd','fourni'],
  data : ()=>{
    return{
      fournis : null,
      prods : null,
      lots : null,
      dis : true,
      dis1 : true,
      view : false,
      da : {
        fournis : null,
        id: null,
        lot : null,
        price : null,
        qt : null,
        user : localStorage.getItem('logged'),
        cmd : null,
        only : null,
      }
    }
  },
  methods: {
    close()
    {
      document.querySelector('.modal-backdrop').removeAttribute('class')
    },
    check()
    {
      this.view = (this.da.id == null) ? false : true
      if(this.view)
      {
        var run = axios.post(this.link() + 'getlots2',this.da,this.cors())
        run.then(e=>{
          this.lots = e.data
        })
        run.catch(e=>{
          console.log('err')
        })
      }
    },
    checker()
    {
      this.dis1 = (this.da.fournis == null || this.da.id == null || this.da.lot == null || this.da.price == null || this.da.qt == null)
      ? true : false
    },
    save()
    {
      var run = axios.post(this.link() + 'save',this.da,this.cors())
      run.then(e=>{
         this.da.cmd = e.data[0].id_commandeachat
         this.da.only = e.data[0].id_fournisseur
         this.da.fournis = null
         this.da.id = null
         this.da.lot = null
         this.da.price = null
         this.da.qt = null
         this.statu('Opèration èffectuè','success')
         this.dis = false
      })
      run.catch(e=>{
        console.log('err')
      })
    },
    valid()
    {
      var run = axios.post(this.link() + 'valid',this.da,this.cors())
      run.then(e=>{
        if(e.data == "yes")
        {
          this.alrt('Opèration èffectuè','','success')
          document.getElementById('largemod').style.display = "none"
         document.querySelector('.modal-backdrop').removeAttribute('class')
         setInterval(() => {
           location.reload()
         }, 1000);
        }
      })
      run.catch(e=>{
        console.log('err')
      })
    }
  },
  components : {
    addproductModal,
    addlotModal
  },
  created()
  {
    this.da.cmd = (this.cmd != null) ? this.cmd  : null
    this.da.only = (this.fourni != null) ? this.fourni : null
    this.dis = (this.cmd != null) ? false : true
    var run = axios.get(this.link()+ 'activefournisseurs',this.cors())
    run.then(e=>{
      this.fournis = e.data
    })
    run.catch(e=>{
      console.log('err')
    })

    var run1 = axios.get(this.link() + 'getallproducts',this.cors())
    run1.then(e=>{
      this.prods = e.data
    })
    run1.catch(e=>{
      console.log('err')
    })
  }
}
</script>
