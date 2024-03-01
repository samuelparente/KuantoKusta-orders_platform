
	
<div class="container-fluid" id="bodyPending">
	

	
	<div class="row">
		
		<div class="col-md-12" id="left-column-text">
			<h4>Encomendas para aprovação</h4>
		</div>
		
	</div>
	<div class="row">
		<div class="col-md-12" id="buttonsForm">
			<button class="btn btn-primary" type="submit"  id="selectAllBtn">Selecionar todas</button>
			<button class="btn btn-primary" type="submit" id="clearAllBtn">Limpar seleção</button>
			<button class="btn btn-primary" type="submit" id="approveBtn">Aprovar selecionadas</button>
			<button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-danger" id="canceledBtn">Cancelar selecionadas</button>
		</div>
		<div class="col-md-12" id="showMessage">	
				
		</div>
		
		<div class="col-md-12" id="column-pending">
		</div>
	</div>
</div>



<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="modalColors">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ZONPHARMA</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		  
       <i id="perigo" class="bi bi-exclamation-triangle-fill text-danger"> Esta ação irá cancelar as encomendas selecionadas!</i>
		  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Voltar</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="cancelBtn">Continuar</button>
      </div>
    </div>
  </div>
</div>

				
