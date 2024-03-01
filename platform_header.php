<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js" integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs" crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.2.13/jspdf.plugin.autotable.min.js"></script>
<script src="js/messages.js" defer></script>

<div class="row" id="menu">
				<nav class="navbar fixed-top navbar-dark navbar-expand-lg bg-dark">
				  <div class="container-fluid">
					  
					  <a class="navbar-brand" href="index.php"><img height="50" src="images/logo.png"></img></a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					  <span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
						<ul class="navbar-nav">
						  <li class="nav-item dropdown">
							  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Encomendas</a>
								  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<li><a class="dropdown-item" href="pendingApproval.php">Em Aprovação</a></li>
									<li><a class="dropdown-item" href="approved.php">Aprovadas</a></li>
								  </ul>
							</li>
							 
						 
						  	
						  
						<li class="nav-item">
						  <a class="nav-link active" aria-current="page">
							<i class="bi bi-bell-fill position-relative" style="font-size: 1rem; color: white;" id="bellNotifications">
								<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="contadorMensagens">
									<span class="visually-hidden">unread messages</span>
								</span>
							   </i>
							</a>
						</li>
						 
					  </ul>
					</div>
				  </div>
				</nav>

			</div> 

<div class="row">
	
	<div class="col-md-12" id="titulo">
		Sistema de Gestão de encomendas do Kuanto Kusta
	</div>
	</div>
<div class="row" id="botoes">
	<div class="col-md-7">
		<button class="btn btn-success btn-sm" type="button" id="dashboard">Dashboard</button>
		<button class="btn btn-secondary btn-sm" type="button" id="pendentes">Encomendas em aprovação</button>
		<button class="btn btn-secondary btn-sm" type="button" id="aprovadas">Encomendas aprovadas</button>
				
	</div>
	
	<div class="col-md-5" id="caixaPesquisa">
		<input class="form-control-sm" value=""  id="pesquisaEncText" aria-describedby="Pesquisa de encomenda">
					<button type="button" class="btn btn-secondary btn-sm" id="searchBtn">Pesquisar encomenda</button>
	</div>	
	</div>
	
<div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel">Encomendas com mensagens pendentes de resposta</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div id="corpoMensagensPendentes">
    </div>
  </div>
</div>
