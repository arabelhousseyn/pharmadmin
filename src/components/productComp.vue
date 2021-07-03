<template>
    <div class="main">
        <div v-if="!view" class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Produits'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target="#exampleModal12">AJOUTER</button>
              <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Visibilitè
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item pointer" @click="filter()" >Tous</a>
    <a class="dropdown-item pointer" v-for="(cat,index) in cats" :key="index" @click="filter(cat.id_categorie)" >{{cat.name_categorie}}</a>
  </div>
</div>
              <button class='btn btn-danger' data-toggle="modal" data-target="#delprods"><ic icon="trash" /> SUPPRIMER</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Dèsignation produit</th>
      <th scope="col">Miniature</th>
      <th scope="col">Dèsignation categorie</th>
      <th scope="col">Lots</th>
      <th scope="col">Seuil</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(prd,index) in prods" :key="index">
      <td><input type="checkbox" @change="push(prd)"></td>
        <td>{{prd.name_product}}
         <div>
           <button  @click="format(prd)" data-toggle="modal" data-target="#upprdmodal" class='pointer btnsp'><ic style='color:green;' size='2x' icon="pen" /></button>
         <button  @click="psh(prd)" data-toggle="modal" data-target="#delprods" class='pointer btnsp'><ic style='color:red;' size='2x' icon="trash" /></button>
         </div>
        </td>
        <td>
          <div v-if="prd.pic != null" class="one flxbtn">
            <img :src="ph + prd.pic" alt="photo" :name='prd.pic' style="width:150px;height:150px;">
            <button @click="format(prd)" data-toggle="modal" data-target="#delphoto" class='btn btn-danger'><ic icon="trash" /></button>
          </div>
            <div  v-if="prd.pic == null " class="image flxbtn">
              <button @click="format(prd)" class='btn btn-primary' data-toggle="modal" data-target="#addphotomodal"><ic icon="arrow-up" /></button>
            </div>
        </td>
        <td>
          <div class="flxbtn" v-if="prd.id_categorie == 2">
            <span>{{prd.name_categorie}}</span>
            <button @click="format1(prd)" data-toggle="modal" data-target="#formdci" class="btn btn-success"><ic icon="bookmark" /></button>
          </div>
          <div class="flxbtn" v-else>
            {{prd.name_categorie}}
          </div>
        </td>
        <td><a :href="'?lots=' + prd.id_product + '&name=' + prd.name_product" class="btn btn-warning"><ic icon="box" /></a></td>
        <td>{{prd.sill}}</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <addproductlot-modal />
    <addphoto-modal v-if="lk != null" :lk="lk" />
    <deletephoto-modal v-if="lk != null" :lk="lk" />
    <viewformdci-modal v-if="lk1 != null" :lk1="lk1"  />
    <updateproduct-modal v-if="lk != null" :lk="lk" />
    <deleteprods-modal v-if="dds.length > 0" :dds="dds" :dds1="dds1" />
  </div>

  <div v-if="view != false" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/product" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Lots ' + name}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target="#lotprd">AJOUTER</button>
              <button class='btn btn-danger' data-toggle="modal" data-target="#dellotprd"><ic icon="trash" /> SUPPRIMER</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Code lot</th>
      <th scope="col">Date fabrication</th>
      <th scope="col">Date expiration</th>
      <th scope="col">Prix</th>
      <th scope="col">Quantitè</th>
      <th scope="col">Statu</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(lot,index) in lots" v-if="index < lots.length - 1" :key="index">
      <td><input @change="getId(lot.id_lot)" type="checkbox"></td>
      <td>{{lot.code_lot}}
        <div>
          <button  @click="getData(lot)" data-toggle="modal" data-target="#uplotprd" class='pointer btnsp'><ic style='color:green;' size="2x" icon="pen" /></button>
      <button  @click="getId(lot.id_lot)" data-toggle="modal" data-target="#dellotprd" class='pointer btnsp'><ic style='color:red;' size="2x" icon="trash" /></button>
        </div>
      </td>
      <td>{{lot.date_fab}}</td>
      <td>{{lot.date_exp}}</td>
      <td>{{lot.price}}.00 DA</td>
      <td>{{lot.qt}}</td>
      <td><span v-if="lot.qt > lots[lots.length - 1].sill " class="weight green">Bon</span>  <span v-else class="weight red">Non bon</span> </td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <addlotprdModal :view="view" />
    <deletelotprd-modal :ids="ids" v-if="ids.length > 0" />
      <updatelot-modal v-if="dataLot != null" :lot="dataLot"  />
  </div>
    </div>
</template>

<script>
import dheaderComp from './dheaderComp'
import addproductlotModal from '../modals/addproductlotModal'
import addphotoModal from '../modals/addphotoModal'
import deletephotoModal from '../modals/deletephotoModal'
import viewformdciModal from '../modals/viewformdciModal'
import addlotprdModal from '../modals/addlotprdModal'
import deletelotprdModal from '../modals/deletelotprdModal'
import updateproductModal from '../modals/updateproductModal'
import deleteprodsModal from '../modals/deleteprodsModal'
import updatelotModal from '../modals/updatelotModal'
import axios from 'axios'
import datatable from 'datatables.net-bs4'
export default {
  data : ()=>{
    return{
        prods : [],
        tmps : [],
        view : false,
        ph : null,
        cats : [],
        lk : null,
        lk1 : null,
        name : null,
        lots : [],
        send : {
          code : null,
          fab : null,
          exp : null,
          price : null,
        },
        tmp : null,
        ids : [],
        dds : [],
        dds1 : [],
        dataLot : null
        
    }
  },
  components : {
    dheaderComp,
    addproductlotModal,
    addphotoModal,
    deletephotoModal,
    viewformdciModal,
    addlotprdModal,
    deletelotprdModal,
    updateproductModal,
    deleteprodsModal,
    updatelotModal
  },
  methods : {
    table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          filter(value = "none")
          {
              this.prods  = (value == "none") ? this.tmps : this.tmps.filter(tmp => tmp.id_categorie == value)
          },
          format(value)
          {
            this.lk = value
          },
          format1(value)
          {
            this.lk1 = value
          },
          handle(value)
          {
            this.tmp = value
          },
          push(value)
          {
            this.dds.push(value.id_product)
            this.dds1.push(value.name_product)
          },
          psh(value)
          {
            this.dds.push(value.id_product)
          },
          getId(value)
          {
            this.ids.push(value)
          },
          getData(value)
          {
            this.dataLot = value
          } 
  },
   created()
   {
     if(this.$route.query.lots != undefined)
     {
       this.view = this.$route.query.lots
       this.name = this.$route.query.name
       var run = axios.post(this.link() + 'lotsprd',{idprd : this.view},this.cors())
       run.then(e=>{
         this.lots = e.data
       })
       run.catch(e=>{
         console.log('err')
       })
     }else{
       this.ph = this.image()

          var run = axios.get(this.link() + 'getproductsjoincategorie',this.cors())
          run.then(e=>{
            this.prods = e.data
            this.tmps = e.data
            this.table()
          })
          run.catch(e=>{
            console.log('err')
          })

          var run1 = axios.get(this.link() + 'catss',this.cors())
          run1.then(e=>{
              this.cats = e.data
          })
          run1.catch(e=>{
              console.log('err')
          })
     }
   }
}
</script>