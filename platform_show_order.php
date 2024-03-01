
<div class="container-fluid" id="bodyOrder">
	<div class="row">
		<div class="col-md-12" id="">
			<h4><div id="order"></div></h4>
		</div>
		<div class="col-md-12" id="showError">
		</div>
		<p></p>
	</div>
	
	<div class="row">

		<div class="col-md-5" id="statusComentario">
		
			<div class="col-mb-3">
					<label for="Notas" class="form-label">Notas sobre a encomenda</label>
					
					<textarea class="form-control" rows="3"  aria-label="With textarea" id="statusEncomenda"></textarea>			
					<button type="button" class="btn btn-primary" id="gravaComentario">Gravar notas</button>
					<p></p>
			</div>
			
			
				
		</div>
		<p></p>
	</div>

	<div class="row">
		<div class="col-md-12" id="produtosSelect">
	</div>
		
	<div class="row">
			<div class="col-md-12" id="messageRow">
			<p></p>
			</div>
	</div>	
		
		
	<div class="row" id="portesEtotal">
		
		<div class="col-md-6" id="portes">
		</div>
		
		<div class="col-md-6" id="total">
			</div>
	</div>
		
	<div class="row">
		<div class="col-md-6" id="entrega">
			
			<h3>Entrega</h3><br>
			<form id="entrega">
			  <div class="mb-3">
				<label for="nomeEntrega" class="form-label">Nome</label>
				<input type="text" value="" class="form-control" id="nomeEntrega" aria-describedby="nomeEntrega">
			  </div>
			  
			  <div class="mb-3">
				<label for="morada1Entrega" class="form-label">Morada</label>
				<input type="text" value="" class="form-control" id="morada1Entrega" aria-describedby="morada1Entrega">
			  </div>
				<div class="mb-3">
				<label for="morada2Entrega" class="form-label"></label>
				<input type="text" value="" class="form-control" id="morada2Entrega" aria-describedby="morada2Entrega">
			  </div>
				
			   <div class="mb-3">
				<label for="cpEntrega" class="form-label">Código postal</label>
				<input type="text" value="" class="form-control" id="cpEntrega" aria-describedby="cpEntrega">
			  </div>
				
			  <div class="mb-3">
				<label for="localEntrega" class="form-label">Cidade</label>
				<input type="text" value="" class="form-control" id="localEntrega" aria-describedby="localEntrega">
			  </div>
				 <div class="mb-3">
				<label for="paisEntrega" class="form-label">País</label>
				<input type="text" value="" class="form-control" id="paisEntrega" aria-describedby="paisEntrega">
			  </div>
				
				 <div class="mb-3">
				<label for="contatoEntrega" class="form-label">Contato</label>
				<input type="text" value="" class="form-control" id="contatoEntrega" aria-describedby="contatoEntrega">
			  </div>
				
				<div class="mb-3">
					<label for="observacoes" class="form-label">Observações</label>
  				<textarea class="form-control" rows="3" maxlength="50" aria-label="With textarea" id="observacoes"></textarea>
					
				</div>
				<div class="mb-3" id="charsLeft">
					Restam 50 de 50 caracteres.
				</div>	
			  
			  
			  <button type="button" class="btn btn-primary" id="sendParcel">Criar envio</button>
			</form>
		</div>
		
			<div class="col-md-6" id="faturacao">
			
			
			<h3>Faturação</h3><br>
			<form id="faturacao">
			  <div class="mb-3">
				<label for="nomeFatura" class="form-label">Nome</label>
				<input type="text" value="" class="form-control" id="nomeFatura" aria-describedby="nomeFatura">
			  </div>
			  
			  <div class="mb-3">
				<label for="morada1Fatura" class="form-label">Morada</label>
				<input type="text" value="" class="form-control" id="morada1Fatura" aria-describedby="morada1Fatura">
			  </div>
				<div class="mb-3">
				<label for="morada2Fatura" class="form-label"></label>
				<input type="text" value="" class="form-control" id="morada2Fatura" aria-describedby="morada2fatura">
			  </div>
				
			   <div class="mb-3">
				<label for="cpFatura" class="form-label">Código postal</label>
				<input type="text" value="" class="form-control" id="cpFatura" aria-describedby="cpFatura">
			  </div>
				
			  <div class="mb-3">
				<label for="localFatura" class="form-label">Cidade</label>
				<input type="text" value="" class="form-control" id="localFatura" aria-describedby="localFatura">
			  </div>
				<div class="mb-3">
				<label for="paisFatura" class="form-label">País</label>
				<input type="text" value="" class="form-control" id="paisFatura" aria-describedby="paisFatura">
			  </div>
				
				<div class="mb-3">
				<label for="nifFatura" class="form-label">NIF</label>
				<input type="text" value="" class="form-control" id="nifFatura" aria-describedby="nifFatura">
			  </div>
			  
			  
			  <button type="button" class="btn btn-primary" id="sendInvoice">Criar fatura</button>
			</form>
		</div>

	</div>
	<div class="row">
		<div class="col-md-12" id="produtos">
		</div>
	</div>
</div>
	<!-- Modal mensagem ou erro retornado ao criar envio -->
<div class="modal fade" id="avisaEnvio" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ZONPHARMA</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalBody">
	
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="footModal">Fechar</button>
        <!--<button type="button" class="btn btn-primary">Understood</button>-->
      </div>
    </div>
  </div>
</div>
	
		<!-- Modal mensagem aguardar -->
<div class="modal fade" id="aguardaEnvio" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ZONPHARMA</h1>
        <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
      </div>
      <div class="modal-body" id="modalBodyAguarda">
      </div>
    </div>
  </div>
</div>
	
</div>

