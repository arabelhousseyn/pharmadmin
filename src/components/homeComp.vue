<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Admin panel</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/" class="breadcrumb-item" exact> Acceuil </router-link>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section v-if="stat == 0" class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{infos.ventes}}</h3>
                <p>Commandes client</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="ventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.achat}}</h3>

                <p>Commandes fournisseur</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="achatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{infos.clients}}</h3>

                <p>Clients</p>
              </div>
              <div class="icon">
                <ic icon="users" />
              </div>
              <router-link to="clients" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{infos.recs}}</h3>
                <p>Reclamations</p>
              </div>
              <div class="icon">
                <ic icon="exclamation" />
              </div>
              <router-link to="warning" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-primary">
              <div class="inner">
                <h3>{{infos.nbrproduct}}</h3>
                <p>Produits</p>
              </div>
              <div class="icon">
                <ic icon="box" />
              </div>
              <router-link to="product" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>

          <div class="col-lg-4 col-sm-12">
            <div class="info-box mb-3 bg-success">
              <span class="info-box-icon"><ic icon="dollar-sign" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Vente/jour <span class="second">Vente/mois</span></span>
                <span class="info-box-number">{{infos.venteday}}.00 DA  <span class="second">{{infos.ventemonth}}.00 DA</span></span>
              </div>
              <!-- /.info-box-content -->
              <router-link to="ventecart" class="box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>

          <div class="col-lg-4 col-sm-12">
            <div class="info-box mb-3 bg-warning">
              <span class="info-box-icon"><ic icon="dollar-sign" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Achat/jour <span class="second">Achat/mois</span></span>
                <span class="info-box-number">{{infos.achatday}}.00 DA  <span class="second">{{infos.achatmonth}}.00 DA</span></span>
              </div>
              <router-link to="achatcart" class="box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="col-lg-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                Ventes
              </div>
              <div class="card-body">
                <linechart-vente />
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                Achat
              </div>
              <div class="card-body">
                <linechart-achat />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <!-- Main content -->
    <section v-if="stat == 2" class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{infos.fns}}</h3>
                <p>Nombre fournisseurs</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="fournisseurs" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.achat}}</h3>

                <p>Commandes fournisseurs</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="achatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-primary">
              <div class="inner">
                <h3>{{infos.nbrproduct}}</h3>

                <p>Total produit</p>
              </div>
              <div class="icon">
                <ic icon="box" />
              </div>
              <router-link to="product" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.dachat}}.00 DA</h3>
                <p>Total achat</p>
              </div>
              <div class="icon">
                <ic icon="dollar-sign" />
              </div>
              <router-link to="achatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                Achat
              </div>
              <div class="card-body">
                <linechart-achat />
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-sm-12">
            <div class="info-box mb-3 bg-warning">
              <span class="info-box-icon"><ic icon="dollar-sign" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Achat/jour <span class="second">Achat/mois</span></span>
                <span class="info-box-number">{{infos.achatday}}.00 DA  <span class="second">{{infos.achatmonth}}.00 DA</span></span>
              </div>
              <router-link to="achatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
          </div>
          </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <!-- Main content -->
    <section v-if="stat == 1" class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{infos.ventes}}</h3>
                <p>Commandes client</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="ventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.clients}}</h3>

                <p>clients</p>
              </div>
              <div class="icon">
                <ic icon="users" />
              </div>
              <router-link to="achatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{infos.recs}}</h3>

                <p>Reclamations</p>
              </div>
              <div class="icon">
                <ic icon="exclamation" />
              </div>
              <router-link to="warning" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.revenu}}.00 DA</h3>
                <p>Total vente</p>
              </div>
              <div class="icon">
                <ic icon="dollar-sign" />
              </div>
              <router-link to="ventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-primary">
              <div class="inner">
                <h3>{{infos.nbrproduct}}</h3>
                <p>Nombre produit</p>
              </div>
              <div class="icon">
                <ic icon="box" />
              </div>
              <router-link to="vente" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <div class="col-lg-5 col-sm-12">
            <div class="info-box mb-3 bg-success">
              <span class="info-box-icon"><ic icon="dollar-sign" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Vente/jour <span class="second">Vente/mois</span></span>
                <span class="info-box-number">{{infos.venteday}}.00 DA  <span class="second">{{infos.ventemonth}}.00 DA</span></span>
              </div>
              <router-link to="ventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
              <!-- /.info-box-content -->
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <div class="card">
              <div class="card-header">
                Ventes
              </div>
              <div class="card-body">
                <linechart-vente />
              </div>
            </div>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <!-- Main content -->
    <section v-if="stat == 4" class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{infos.ventes}}</h3>
                <p>Commandes clients</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="ventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.achat}}</h3>

                <p>Commandes fournisseurs</p>
              </div>
              <div class="icon">
                <ic icon="chart-pie" />
              </div>
              <router-link to="achatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{infos.revenu}}.00 DA</h3>

                <p>Total vente</p>
              </div>
              <div class="icon">
                <ic icon="dollar-sign" />
              </div>
              <router-link to="compventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{infos.dachat}}.00 DA</h3>
                <p>Total achat</p>
              </div>
              <div class="icon">
                <ic icon="dollar-sign" />
              </div>
              <router-link to="compachatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                Ventes
              </div>
              <div class="card-body">
                <linechart-vente />
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-sm-12">
           <div class="info-box mb-3 bg-success">
              <span class="info-box-icon"><ic icon="dollar-sign" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Vente/jour <span class="second">Vente/mois</span></span>
                <span class="info-box-number">{{infos.venteday}}.00 DA  <span class="second">{{infos.ventemonth}}.00 DA</span></span>
              </div>
              <router-link to="compventecart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
              <!-- /.info-box-content -->
            </div>

           <div class="info-box mb-3 bg-warning">
              <span class="info-box-icon"><ic icon="dollar-sign" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Achat/jour <span class="second">Achat/mois</span></span>
                <span class="info-box-number">{{infos.achatday}}.00 DA  <span class="second">{{infos.achatmonth}}.00 DA</span></span>
              </div>
              <router-link to="compachatcart" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                Achat
              </div>
              <div class="card-body">
                <linechart-achat />
              </div>
            </div>
          </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <!-- Main content -->
    <section v-if="stat == 3" class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{infos.stks}}</h3>
                <p>Stocks</p>
              </div>
              <div class="icon">
                <ic icon="warehouse" />
              </div>
              <router-link to="stock" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{infos.stocksor}}</h3>

                <p>Stock sortire</p>
              </div>
              <div class="icon">
                <ic icon="warehouse" />
              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{infos.stocken}}</h3>

                <p>Stock entrèe</p>
              </div>
              <div class="icon">
                <ic icon="warehouse" />
              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-primary">
              <div class="inner">
                <h3>{{infos.nbrproduct}}</h3>
                <p>Produits</p>
              </div>
              <div class="icon">
                <ic icon="box" />
              </div>
              <router-link to="stock" class="small-box-footer">Details <ic icon="arrow-circle-right" /></router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                Stock sortie
              </div>
              <div class="card-body">
                <linechartstk-vente />
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-sm-12">
           <div class="info-box mb-3 bg-success">
              <span class="info-box-icon"><ic icon="warehouse" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Stocks</span>
                <span class="info-box-number">{{infos.stks}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>

            <div class="info-box mb-3 bg-primary">
              <span class="info-box-icon"><ic icon="box" /></span>

              <div class="info-box-content">
                <span class="info-box-text">Nombre produit</span>
                <span class="info-box-number">{{infos.nbrproduct}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                Stock entrèe
              </div>
              <div class="card-body">
                <linechartstk-achat />
              </div>
            </div>
          </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import axios from 'axios'
import linechartVente from '../charts/linechartVente'
import linechartAchat from '../charts/linechartAchat'
import linechartstkVente from '../charts/linechartstkVente'
import linechartstkAchat from '../charts/linechartstkAchat'
import MoneyFormat from 'vue-money-format'

export default {
  data : ()=>{
    return{
      stat : localStorage.getItem('statu'),
      infos : {
        ventes : null,
        achat : null,
        venteday : null,
        ventemonth : null,
        achatday : null,
        achatmonth : null,
        clients : null,
        recs : null,
        revenu : null,
        dachat : null,
        nbrproduct : null,
        fns : null,
        stocken : null,
        stocksor : null,
        stks : null,
      },
    }
  },
  components : {
    linechartVente,
    linechartAchat,
    linechartstkVente,
    linechartstkAchat,
    'money-format': MoneyFormat
  },
 async created()
  {
    var rn1 = axios.get(this.link() + 'countvente',this.cors())
    rn1.then(e=>{
      if(e.status == 200)
      {
        this.infos.ventes = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    rn1.catch(e=>{
      console.log('err')
    })

    var rn2 = axios.get(this.link() + 'countachat',this.cors())
    rn2.then(e=>{
      if(e.status == 200)
      {
        this.infos.achat = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    rn2.catch(e=>{
      console.log('err')
    })

    var run1 = axios.get(this.link() + 'ventejour',this.cors())
    run1.then(e=>{
      if(e.status == 200)
      {
        this.infos.venteday = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run1.catch(e=>{
      console.log('err')
    })

    var run2 = axios.get(this.link() + 'ventemois',this.cors())
    run2.then(e=>{
      if(e.status == 200)
      {
        this.infos.ventemonth = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run2.catch(e=>{
      console.log('err')
    })

    var run11 = axios.get(this.link() + 'achatjour',this.cors())
    run11.then(e=>{
      if(e.status == 200)
      {
        this.infos.achatday = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run11.catch(e=>{
      console.log('err')
    })

    var run22 = axios.get(this.link() + 'achatmois',this.cors())
    run22.then(e=>{
      if(e.status == 200)
      {
        this.infos.achatmonth = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run22.catch(e=>{
      console.log('err')
    })


    var run3 =  axios.get(this.link() + 'countclient',this.cors())
   await run3.then(e=>{
     if(e.status == 200)
     {
       this.infos.clients = e.data
     }else{
       this.alrt('Erreur dans server','','error')
     }
    })
    run3.catch(e=>{
      console.log('err')
    });

    var run4 =  axios.get(this.link() + 'countrec',this.cors())
   await run4.then(e=>{
     if(e.status == 200)
     {
       this.infos.recs = e.data
     }else{
       this.alrt('Erreur dans server','','error')
     }
    })
    run4.catch(e=>{
      console.log('err')
    });

    var run5 = axios.get(this.link() + 'revenu',this.cors())
    await run5.then(e=>{
      if(e.status == 200)
      {
        this.infos.revenu = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run5.catch(e=>{
      console.log('err')
    });

    var run6 = axios.get(this.link() + 'dacaht',this.cors())
   await run6.then(e=>{
     if(e.status == 200)
     {
       this.infos.dachat = e.data
     }else{
       this.alrt('Erreur dans server','','error')
     }
    })
    run6.catch(e=>{
      console.log('err')
    });

    var run7 = axios.get(this.link() + 'nbrproduct',this.cors())
    await run7.then(e=>{
      if(e.status == 200)
      {
        this.infos.nbrproduct = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run7.catch(e=>{
      console.log('err')
    });

    var run8 = axios.get(this.link() + 'fns',this.cors())
   await run8.then(e=>{
     if(e.status == 200)
     {
       this.infos.fns = e.data
     }else{
       this.alrt('Erreur dans server','','error')
     }
    })
    run8.catch(e=>{
      console.log('err')
    });

    var run9 = axios.get(this.link() + 'stksrt',this.cors())
    await run9.then(e=>{
      if(e.status == 200)
      {
        this.infos.stocksor = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run9.catch(e=>{
      console.log('err')
    });

    var run10 = axios.get(this.link() + 'stockss',this.cors())
    await run10.then(e=>{
      if(e.status == 200)
      {
        this.infos.stks = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run10.catch(e=>{
      console.log('err')
    });

    var run11 = axios.get(this.link() + 'stken',this.cors())
    await run11.then(e=>{
      if(e.status == 200)
      {
        this.infos.stocken = e.data
      }else{
        this.alrt('Erreur dans server','','error')
      }
    })
    run11.catch(e=>{
      console.log('err')
    });
  }
}
</script>