<template>
    <div class="composition">
      <aside v-if="stat == 0" class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" exact class='brand-link'>
    <img src="../assets/images/logo.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Administrateur <br> principale</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/images/user.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link to="/" class='d-block' >{{username}}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <router-link to="users" class="nav-link" exact>
            <ic icon="user" />
            <p class="left"> Utilisateurs</p>
            </router-link>
          </li>

           <li class="nav-item">
            <a href="" class="nav-link">
              <ic icon="cart-plus" class='nav-icon' />
              <p>
                Service achat
               <ic icon="angle-left" class='right' />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="fournisseurs" class='nav-link' exact>
                  <ic icon="truck-loading" class='nav-icon' />
                  <p>Fournisseurs</p>
              </router-link>
              </li>
              <li class="nav-item">
                <a href="achatcart" class="nav-link">
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Commandes fournisseur</p>
                </a>
              </li>
              <li class="nav-item">
                <router-link to="product" class='nav-link' exact>
                  <ic icon="box" class='nav-icon' />
                  <p>Produits</p>
              </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="" class="nav-link">
              <ic icon="cart-plus" class='nav-icon' />
              <p>
                Service commercial
               <ic icon="angle-left" class='right' />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="clients" class='nav-link' exact>
                  <ic icon="users" class='nav-icon' />
                  <p>Clients</p>
              </router-link>
              </li>

              <li class="nav-item">
                <router-link to="affichageProduit" class='nav-link' exact>
                  <ic icon="desktop" class='nav-icon' />
                  <p>Affichage produit</p>
              </router-link>
              </li>

              <li class="nav-item">
                <router-link to="warning" class='nav-link' exact>
                  <ic icon="exclamation" class='nav-icon' />
                  <p>Reclamation</p>
              </router-link>
              </li>

              <li class="nav-item">
                <a href="ventecart" class="nav-link">
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Commandes client</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="" class="nav-link">
              <ic icon="cart-plus" class='nav-icon' />
              <p>
                Service stock
               <ic icon="angle-left" class='right' />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="stock" class='nav-link' exact>
                  <ic icon="warehouse" class='nav-icon' />
                  <p>stock</p>
              </router-link>
              </li>
              <li class="nav-item">
                <a href="stockachatcart" class="nav-link">
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>commande envoyé</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="stockventecart" class="nav-link">
                   <ic icon="shopping-cart" class='nav-icon' />
                  <p>commande reçu</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="" class="nav-link">
              <ic icon="cart-plus" class='nav-icon' />
              <p>
                Service comptabilitè
               <ic icon="angle-left" class='right' />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="compachatcart" class="nav-link">
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Facture fournisseur</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="compventecart" class="nav-link">
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Facture client</p>
                </a>
              </li>
            </ul>
          </li>
              
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <aside v-if="stat == 2" class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" exact class='brand-link'>
    <img src="../assets/images/logo.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Responsable <br> achat</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/images/user.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link to="/" class='d-block' >{{username}}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
                <router-link to="fournisseurs" class='nav-link' exact>
                  <ic icon="truck-loading" class='nav-icon' />
                  <p>Fournisseurs</p>
              </router-link>
              </li>
              <li class="nav-item">
                <router-link to="achatcart" class='nav-link' exact>
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Commandes fournisseur</p>
              </router-link>
              </li>
              <li class="nav-item">
                <router-link to="product" class='nav-link' exact>
                  <ic icon="box" class='nav-icon' />
                  <p>Produits</p>
              </router-link>
              </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>


  <aside v-if="stat == 1" class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" exact class='brand-link'>
    <img src="../assets/images/logo.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Commercial</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/images/user.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link to="/" class='d-block' >{{username}}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
                <router-link to="clients" class='nav-link' exact>
                  <ic icon="users" class='nav-icon' />
                  <p>Clients</p>
              </router-link>
              </li>

              <li class="nav-item">
                <router-link to="affichageProduit" class='nav-link' exact>
                  <ic icon="desktop" class='nav-icon' />
                  <p>Affichage produit</p>
              </router-link>
              </li>

              <li class="nav-item">
                <router-link to="warning" class='nav-link' exact>
                  <ic icon="exclamation" class='nav-icon' />
                  <p>Reclamation</p>
              </router-link>
              </li>

              <li class="nav-item">
                <router-link to="ventecart" class='nav-link' exact>
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Commandes client</p>
              </router-link>
              </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <aside v-if="stat == 4" class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" exact class='brand-link'>
    <img src="../assets/images/logo.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Responsable <br> comptabilitè</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/images/user.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link to="/" class='d-block' >{{username}}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
                <router-link to="compachatcart" class='nav-link' exact>
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Facture fournisseur</p>
              </router-link>
              </li>
              <li class="nav-item">
                <router-link to="compventecart" class='nav-link' exact>
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Facture client</p>
              </router-link>
              </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <aside v-if="stat == 3" class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" exact class='brand-link'>
    <img src="../assets/images/logo.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Responsable <br> stock</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/images/user.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link to="/" class='d-block' >{{username}}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
                <router-link to="stock" class='nav-link' exact>
                  <ic icon="warehouse" class='nav-icon' />
                  <p>stock</p>
              </router-link>
              </li>
              <li class="nav-item">
                <router-link to="stockachatcart" class='nav-link' exact>
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Commandes envoyé</p>
              </router-link>
              </li>
              <li class="nav-item">
                <router-link to="stockventecart" class='nav-link' exact>
                  <ic icon="shopping-cart" class='nav-icon' />
                  <p>Commandes reçu</p>
              </router-link>
              </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
    </div>
</template>

<script>
export default {
  data : ()=>{
    return{
      stat : localStorage.getItem('statu'),
      username : localStorage.getItem('logged')
    }
  }
}
</script>