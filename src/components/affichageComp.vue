<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Produits'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Dèsignation</th>
      <th scope="col">Photo</th>
      <th scope="col">Categorie</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="(prod,index) in produits" :key="index">
          <td>{{prod.name_product}}</td>
          <td><img :src="linkk + prod.pic" style="width:100px;height:100px;" alt="logo"> </td>
          <td>{{prod.name_categorie}}</td>
          <td> <button type="button" class="btn btn-warning" data-toggle="modal" @click="format(prod)" data-target="#stockModal"> <ic icon="box" /></button></td>
      </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <stockModal v-if="produit != null" @empty="empty" :product="produit" />
  </div>
</template>

<script>
import dheaderComp from './dheaderComp'
import axios from 'axios'
import stockModal from '../modals/stockModal.vue'
import datatable from 'datatables.net-bs4'
export default {
  data : ()=>{
    return{
        produits : [],
        produit : null,
        linkk : null,
    }
  },
  components : {
    dheaderComp,
    stockModal
  },
  methods : {
    table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          format(product)
          {
              this.produit = product
          },
          empty()
          {
            this.produit = null
          }
  },
   created()
   {
       this.linkk = this.image()
       var run = axios.get(this.link() + 'getproductsAll',this.cors())
       run.then(e=>{
           this.produits = e.data
           this.table()
       })
       run.catch(e=>{
           console.log('err')
       })
   }
}
</script>