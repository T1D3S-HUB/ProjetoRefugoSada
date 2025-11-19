// O arquivo data.js (constantes e variáveis de estado) deve ser carregado antes deste.

// =====================================================================
// 2. FUNÇÕES DE NAVEGAÇÃO E MODAIS
// =====================================================================

/**
 * Exibe a página principal (section) com o ID fornecido.
 * @param {string} pageId - O ID da página a ser exibida.
 */
function showPage(pageId) {
    document.querySelectorAll('.w-full.max-w-6xl.mx-auto > div').forEach(page => {
        page.style.display = 'none';
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
    }
    if (pageId === 'page-apontamento') prepararPaginaApontamento();

    if (pageId === 'page-relatorio') prepararPaginaRelatorio();
}

/**
 * Exibe o modal de aviso padrão.
 * @param {string} titulo - Título do modal.
 * @param {string} mensagem - Mensagem do modal.
 */
function mostrarModal(titulo, mensagem) {
     const modal = document.getElementById('modal');
     const modalContent = document.getElementById('modal-content');
     document.getElementById('modal-titulo').innerText = titulo;
     document.getElementById('modal-mensagem').innerHTML = mensagem;
     modal.style.display = 'flex';
     setTimeout(() => {
         modal.style.opacity = '1';
         modalContent.style.opacity = '1';
         modalContent.style.transform = 'scale(1)';
     }, 50); 
}

/**
 * Fecha um modal específico pelo ID.
 * @param {string} modalId - O ID do modal a ser fechado.
 */
function fecharModal(modalId) {
     const modal = document.getElementById(modalId);
     if (!modal) return; 

     const modalContent = modal.querySelector('.bg-white, .bg-gray-900');

     if (modalContent) {
        if (modalId === 'modal-defeitos') {
            modal.style.opacity = '0';
            document.getElementById('teclado-container').style.display = 'none';
            document.getElementById('teclado-input').value = '0';
        } else {
            modalContent.style.opacity = '0';
            if (modalContent.style.transform) {
                modalContent.style.transform = 'scale(0.95)';
            }
        }
     }

     setTimeout(() => {
         modal.style.display = 'none';
         if(modalId === 'modal-confirmacao') {
             modal.remove();
             window.confirmCallback = null;
         }
         if(modalId === 'modal-defeitos') {
             defeitoAtual = null;
             document.querySelectorAll('#modal-defeitos-lista .defeito-btn').forEach(btn => btn.classList.remove('selecionado'));
             document.getElementById('btn-confirmar-defeito-modal').disabled = true;
             document.getElementById('defeito-selecionado-modal').innerText = '';
         }
     }, 300);
}

/**
 * Adiciona um modal de confirmação genérico para ações críticas.
 */
function mostrarModalDeConfirmacao(titulo, mensagem, textoBotaoConfirmar, callbackConfirmar) {
     const modalHtml = `
        <div id="modal-confirmacao" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all scale-95 opacity-0" id="modal-confirmacao-content">
                <h3 class="text-lg font-medium text-gray-900">${titulo}</h3>
                <p class="mt-2 text-sm text-gray-600">${mensagem}</p>
                <div class="mt-4 flex justify-end gap-3">
                    <button onclick="fecharModal('modal-confirmacao')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-400 focus:outline-none">
                        Cancelar
                    </button>
                    <button onclick="
                        fecharModal('modal-confirmacao');
                        if(window.confirmCallback) window.confirmCallback();"
                        class="px-4 py-2 btn-danger text-white rounded-md font-semibold hover:bg-red-700 focus:outline-none">
                        ${textoBotaoConfirmar}
                    </button>
                </div>
            </div>
        </div>
     `;
     document.getElementById('modal-confirmacao')?.remove();
     document.body.insertAdjacentHTML('beforeend', modalHtml);
     window.confirmCallback = callbackConfirmar;

     const modal = document.getElementById('modal-confirmacao');
     const modalContent = document.getElementById('modal-confirmacao-content');
     setTimeout(() => {
         modal.style.opacity = '1';
         modalContent.style.opacity = '1';
         modalContent.style.transform = 'scale(1)';
     }, 50);
}

/**
 * Limpa todos os dados de apontamento no localStorage e recarrega a página.
 */
function limparTodoConteudo() {
    mostrarModalDeConfirmacao(
        'Confirmação de Limpeza',
        'Tem certeza que deseja apagar TODOS os dados de apontamento atuais? **Esta ação é IRREVERSÍVEL**.',
        'Continuar Limpando',
        () => {
            localStorage.removeItem('apontamentos');
            localStorage.removeItem('apontamentosBackup'); 
            localStorage.removeItem('datasFundicaoDisponiveis');
            localStorage.removeItem('ordemDefeitosAtual');
            localStorage.removeItem('dadosIniciais');
            // Mantém a chave de última exportação para não resetar o contador de 5 min
            // localStorage.removeItem(CHAVE_ULTIMA_EXPORTACAO); 

            dadosIniciais = {};
            dadosIniciaisPreenchidos = false;
            apontamentos = [];
            datasFundicaoDisponiveis = [];
            ordemDefeitosAtual = [...listaDeDefeitos]; 

            location.reload();
        }
    );
}


// =====================================================================
// 3. FUNÇÕES DA PÁGINA "DADOS INICIAIS"
// =====================================================================

function atualizarDadosPeca() {
    const codInternoInput = document.getElementById('codInterno');
    const clienteInput = document.getElementById('cliente');
    const codPecaInput = document.getElementById('codPeca');
    const codigoDigitado = codInternoInput.value;
    const dadosDaPeca = pecasData[codigoDigitado];

    if (dadosDaPeca) {
        clienteInput.value = dadosDaPeca.cliente;
        codPecaInput.value = dadosDaPeca.codPeca;
    } else {
        clienteInput.value = "";
        codPecaInput.value = "";
    }
}

function salvarDadosIniciais() {
    const form = document.getElementById('form-dados-iniciais');
    if (!form.checkValidity()) {
        form.reportValidity();
        mostrarModal('Erro', 'Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
    }

    const cavidadesInput = document.getElementById('cavidades').value.trim();
    let cavidadesTotal = 0;
    let cavidadeInicial = 1;
    let cavidadeFinal = 0;

    const rangeMatch = cavidadesInput.match(/^(\d+)-(\d+)$/);

    if (rangeMatch) {
        cavidadeInicial = parseInt(rangeMatch[1], 10);
        cavidadeFinal = parseInt(rangeMatch[2], 10);
        
        if (cavidadeInicial <= 0 || cavidadeFinal <= 0 || cavidadeInicial > cavidadeFinal || cavidadeFinal > 50) {
            mostrarModal('Erro', 'Intervalo de Cavidades inválido (deve ser entre 1 e 50, e o valor inicial deve ser menor ou igual ao final).');
            document.getElementById('cavidades').focus();
            return;
        }
        cavidadesTotal = cavidadeFinal; 
    } else {
        const numeroUnico = parseInt(cavidadesInput, 10);
        if (isNaN(numeroUnico) || numeroUnico <= 0 || numeroUnico > 50) {
            mostrarModal('Erro', 'O número de Cavidades é inválido (deve ser um número entre 1 e 50, ou um intervalo no formato X-Y).');
            document.getElementById('cavidades').focus();
            return;
        }
        cavidadeInicial = 1;
        cavidadeFinal = numeroUnico;
        cavidadesTotal = numeroUnico;
    }

    dadosIniciais = {
        funcionario: document.getElementById('funcionario').value,
        turno: document.getElementById('turno').value,
        local: document.getElementById('local').value,
        codInterno: document.getElementById('codInterno').value,
        cliente: document.getElementById('cliente').value,
        codPeca: document.getElementById('codPeca').value,
        dataFundicao: document.getElementById('dataFundicao').value.toUpperCase(),
        cavidades: cavidadesTotal, 
        cavidadeInicial: cavidadeInicial, 
        cavidadeFinal: cavidadeFinal, 
        dataInsp: new Date().toLocaleDateString('sv-SE') 
    };

    dadosIniciais.timestampCompleto = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });


    if (!dadosIniciais.cliente || !dadosIniciais.codPeca) {
         mostrarModal('Erro', 'Código Interno inválido ou não encontrado na base de dados. Verifique o código digitado.');
         document.getElementById('codInterno').focus();
         return;
    }

    dataFundicaoAtiva = dadosIniciais.dataFundicao; 

    if (!datasFundicaoDisponiveis.includes(dataFundicaoAtiva)) {
        datasFundicaoDisponiveis.push(dataFundicaoAtiva);
    }

    dadosIniciaisPreenchidos = true;

    document.getElementById('btn-menu-apontamento').disabled = false;
    document.getElementById('btn-menu-relatorio').disabled = false;

    document.getElementById('codInterno').value = '';
    document.getElementById('cliente').value = '';
    document.getElementById('codPeca').value = '';
    document.getElementById('dataFundicao').value = '';
    document.getElementById('cavidades').value = '';

    salvarBackupAutomatico();
    showPage('page-apontamento');
}


// =====================================================================
// 4. FUNÇÕES DA PÁGINA "APONTAMENTO" (Lançamento de Refugo/Liberada)
// =====================================================================

function prepararPaginaApontamento() {
    if (!dadosIniciaisPreenchidos) {
        mostrarModal('Aviso', 'Você precisa preencher os "Dados Iniciais" da peça primeiro.');
        showPage('page-dados');
        return;
    }

    // 1. Preenche cabeçalho com dados iniciais
    document.getElementById('ap-funcionario').innerText = dadosIniciais.funcionario;
    document.getElementById('ap-codInterno').innerText = dadosIniciais.codInterno;
    document.getElementById('ap-cliente').innerText = dadosIniciais.cliente;
    document.getElementById('ap-codPeca').innerText = dadosIniciais.codPeca;
    document.getElementById('ap-turno').innerText = dadosIniciais.turno;
    document.getElementById('ap-local').innerText = dadosIniciais.local;
    
    const displayCavidades = (dadosIniciais.cavidadeInicial !== 1 || dadosIniciais.cavidadeInicial !== dadosIniciais.cavidadeFinal) 
        ? `${dadosIniciais.cavidadeInicial} a ${dadosIniciais.cavidadeFinal}` 
        : dadosIniciais.cavidadeFinal;
        
    document.getElementById('ap-cavidades').innerText = displayCavidades;


    // 2. Limpa inputs auxiliares
    document.getElementById('novaDataFundicaoInput').value = '';
    document.getElementById('qtdPecasLiberadasInput').value = '';

    // 3. Renderiza os botões de data de fundição
    renderizarBotoesDataFundicao();

    // 4. Gera botões de cavidade
    const gridCavidades = document.getElementById('cavidade-grid');
    gridCavidades.innerHTML = '';
    for (let i = dadosIniciais.cavidadeInicial; i <= dadosIniciais.cavidadeFinal; i++) {
        gridCavidades.innerHTML += `
            <button id="cav-btn-${i}"
                    onclick="selecionarCavidade(${i})"
		class="cavidade-btn w-20 h-1204 bg-white border-2 border-gray-300 rounded-md font-semibold text-2xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">                        ${i}
            </button>
        `;
    }

    // 5. Reseta seleções e atualiza o log
    cavidadeAtual = null;
    defeitoAtual = null;
    atualizarLogApontamento();
}

// --- Funções para Data de Fundição ---

function renderizarBotoesDataFundicao() {
    const container = document.getElementById('data-fundicao-botoes');
    container.innerHTML = '';
    datasFundicaoDisponiveis.forEach(data => {
        const selecionado = (data === dataFundicaoAtiva) ? 'selecionado' : '';
        container.innerHTML += `
            <button onclick="selecionarDataFundicao(this, '${data}')"
                    class="data-fundicao-btn px-4 py-1.5 border-2 border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-100 transition-colors text-sm ${selecionado}">
                ${data}
            </button>
        `;
    });
}

function selecionarDataFundicao(botao, data) {
    dataFundicaoAtiva = data;
    document.querySelectorAll('.data-fundicao-btn').forEach(btn => btn.classList.remove('selecionado'));
    botao.classList.add('selecionado');
    cavidadeAtual = null;
    document.querySelectorAll('.cavidade-btn').forEach(btn => btn.classList.remove('selecionado'));

}

function adicionarDataFundicao() {
    const input = document.getElementById('novaDataFundicaoInput');
    const novaData = input.value.toUpperCase().trim();

    if (!input.checkValidity() || novaData === '' || !/^\d{3}[a-zA-Z]{1}$/.test(novaData)) {
        mostrarModal('Erro de Formato', 'A data de fundição deve ter 3 números seguidos por 1 letra (Ex: 176J).');
        input.focus();
        return;
    }

    if (!datasFundicaoDisponiveis.includes(novaData)) {
        datasFundicaoDisponiveis.push(novaData);
    }
    
    dataFundicaoAtiva = novaData; 
    renderizarBotoesDataFundicao(); 
    input.value = '';
    salvarBackupAutomatico();
}

// --- Funções para Peças Liberadas ---

function registrarPecasLiberadas() {
    const inputQtd = document.getElementById('qtdPecasLiberadasInput');
    const quantidade = parseInt(inputQtd.value, 10);

    if (isNaN(quantidade) || quantidade <= 0) {
        mostrarModal('Erro', 'Por favor, insira uma quantidade válida de peças liberadas (maior que zero).');
        inputQtd.focus();
        return;
    }
    
    if (!dataFundicaoAtiva || dataFundicaoAtiva.trim() === '') {
        mostrarModal('Aviso', 'Selecione ou adicione uma Data de Fundição antes de registrar Peças Liberadas.');
        return;
    }

    apontamentos.push({
        tipo: 'liberada',
        qtd: quantidade,
        dataFundicao: dataFundicaoAtiva, 
        timestamp: new Date().toISOString(),
        contexto: { ...dadosIniciais, dataFundicao: dataFundicaoAtiva } 
    });

    atualizarLogApontamento(); 
    inputQtd.value = '';
    
    salvarBackupAutomatico();
}

// --- Funções para Apontamento de Refugo (Modal) ---

function selecionarCavidade(numeroCavidade) {
    
    if (!dataFundicaoAtiva || dataFundicaoAtiva.trim() === '') {
        mostrarModal('Aviso', 'Selecione ou adicione uma Data de Fundição antes de apontar o Refugo.');
        document.querySelectorAll('.cavidade-btn').forEach(btn => btn.classList.remove('selecionado'));
        return; 
    }
    
    cavidadeAtual = numeroCavidade;

    document.querySelectorAll('.cavidade-btn').forEach(btn => btn.classList.remove('selecionado'));
    document.getElementById(`cav-btn-${numeroCavidade}`).classList.add('selecionado');

    defeitoAtual = null;
    document.querySelectorAll('#modal-defeitos-lista .defeito-btn').forEach(btn => btn.classList.remove('selecionado'));
     document.getElementById('defeito-selecionado-modal').innerText = '';
    document.getElementById('btn-confirmar-defeito-modal').disabled = true;

    document.getElementById('teclado-container').style.display = 'none';
    document.getElementById('teclado-input').value = '0';

    document.getElementById('modal-defeitos-titulo').innerText = `Selecione o Defeito para Cavidade ${cavidadeAtual}`;
    document.getElementById('modal-defeitos-data').innerText = dataFundicaoAtiva;

    gerarBotoesDefeitoModal();

    const modal = document.getElementById('modal-defeitos');
    modal.style.display = 'flex';
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
}

function gerarBotoesDefeitoModal() {
    const listaBotoesModal = document.getElementById('modal-defeitos-lista');
    listaBotoesModal.innerHTML = '';

    ordemDefeitosAtual.forEach(defeitoCompleto => {
        const match = defeitoCompleto.match(/^(\d+)\s*(.*)$/);
        const numeroDefeito = match ? match[1] : '?';
        const nomeDefeito = defeitoCompleto;

        listaBotoesModal.innerHTML += `
            <button value="${defeitoCompleto}"
                    data-nome-defeito="${nomeDefeito}"
                    onclick="selecionarDefeitoModal(this)"
                    class="defeito-btn">
                ${numeroDefeito}
            </button>
        `;
    });
}

function selecionarDefeitoModal(buttonElement) {
    const jaSelecionado = buttonElement.classList.contains('selecionado');
    const nomeCompletoDefeito = buttonElement.getAttribute('data-nome-defeito');
    const spanDoNomeFooter = document.getElementById('defeito-selecionado-modal');

    document.querySelectorAll('#modal-defeitos-lista .defeito-btn').forEach(btn => {
        if (btn !== buttonElement) {
            btn.classList.remove('selecionado');
        }
    });

    if (!jaSelecionado) {
        buttonElement.classList.add('selecionado');
        defeitoAtual = buttonElement.value;
        if (spanDoNomeFooter) spanDoNomeFooter.innerText = nomeCompletoDefeito;
        
        document.getElementById('teclado-container').style.display = 'block';
        document.getElementById('teclado-input').value = '1';
    } else {
         buttonElement.classList.remove('selecionado');
        defeitoAtual = null;
        if (spanDoNomeFooter) spanDoNomeFooter.innerText = '';
        
        document.getElementById('teclado-container').style.display = 'none';
        document.getElementById('teclado-input').value = '0';
    }

     verificarEstadoConfirmarModal();
}

function verificarEstadoConfirmarModal() {
    const btnConfirmar = document.getElementById('btn-confirmar-defeito-modal');
    if (cavidadeAtual !== null && defeitoAtual !== null) {
        btnConfirmar.disabled = false;
    } else {
        btnConfirmar.disabled = true;
    }
}

function confirmarDefeitosModal() {
    const inputQtd = document.getElementById('teclado-input');
    const quantidade = parseInt(inputQtd.value, 10);

    if (isNaN(quantidade) || quantidade <= 0) {
        mostrarModal('Erro', 'Por favor, insira uma quantidade válida (maior que zero).');
        inputQtd.focus();
        return;
    }

    if (cavidadeAtual === null || defeitoAtual === null) {
        mostrarModal('Erro', 'Seleção inválida de cavidade ou defeito.');
        return;
    }
    
     if (!dataFundicaoAtiva || dataFundicaoAtiva.trim() === '') {
        mostrarModal('Erro', 'Data de Fundição não definida. Não é possível registrar o refugo.');
        fecharModal('modal-defeitos');
        return; 
    }

    apontamentos.push({
        tipo: 'refugo',
        cavidade: cavidadeAtual,
        defeito: defeitoAtual,
        quantidade: quantidade,
        dataFundicao: dataFundicaoAtiva, 
        timestamp: new Date().toISOString(),
        contexto: { ...dadosIniciais, dataFundicao: dataFundicaoAtiva } 
    });

    const indexDefeito = ordemDefeitosAtual.indexOf(defeitoAtual);
    if (indexDefeito > -1) {
        ordemDefeitosAtual.splice(indexDefeito, 1);
        ordemDefeitosAtual.unshift(defeitoAtual);
    }

    atualizarLogApontamento();
    salvarBackupAutomatico();
    fecharModal('modal-defeitos');

    const cavidadeBtnSelecionado = document.querySelector('.cavidade-btn.selecionado');
     if(cavidadeBtnSelecionado) {
         cavidadeBtnSelecionado.classList.remove('selecionado');
     }
    cavidadeAtual = null;
}

// --- Funções do Teclado Numérico ---

function manipularTeclado(valor) {
    const input = document.getElementById('teclado-input');
    let atual = input.value;
    
    if (valor === 'C') { 
        input.value = '0';
    } else if (valor === 'BSP') { 
        input.value = atual.length > 1 ? atual.slice(0, -1) : '0';
    } else { 
        if (atual === '0') {
            input.value = valor;
        } else if (atual.length < 4) { 
            input.value += valor;
        }
    }
}

// --- Funções de Exclusão e Log ---

function confirmarExcluirUltimo() {
    if (apontamentos.length === 0) {
        mostrarModal('Aviso', 'Não há nenhum lançamento para excluir.');
        return;
    }

    const ultimoApontamento = apontamentos[apontamentos.length - 1];
    let descricao = '';

    if (ultimoApontamento.tipo === 'refugo') {
        descricao = `Tipo: Refugo<br>Cavidade: ${ultimoApontamento.cavidade}<br>Defeito: ${ultimoApontamento.defeito}<br>Quantidade: ${ultimoApontamento.quantidade || 1}`;
    } else if (ultimoApontamento.tipo === 'liberada') {
        descricao = `Tipo: Liberada<br>Quantidade: ${ultimoApontamento.qtd}`;
    }

    mostrarModalDeConfirmacao(
        'Confirmar Exclusão',
        `Tem certeza que deseja excluir o último lançamento?<br><br>${descricao}`,
        'Excluir Agora',
        excluirUltimoApontamento
    );
}

function excluirUltimoApontamento() {
    if (apontamentos.length > 0) {
        apontamentos.pop();
        atualizarLogApontamento();
        salvarBackupAutomatico();
    }
}

function atualizarLogApontamento() {
    const logDiv = document.getElementById('apontamento-log');

    const apontamentosDaPecaAtual = apontamentos.filter(ap =>
        ap.contexto && ap.contexto.codInterno === dadosIniciais.codInterno
    );

    if (apontamentosDaPecaAtual.length === 0) {
        logDiv.innerHTML = '<p class="text-gray-500">Nenhuma atividade registrada para esta peça.</p>';
        return;
    }

    logDiv.innerHTML = '';
    apontamentosDaPecaAtual.slice().reverse().forEach((ap) => {
         const dataHora = new Date(ap.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

         if (ap.tipo === 'refugo') {
            logDiv.innerHTML += `
                <div class="bg-white p-2 border border-red-200 rounded-md">
                    <p class="font-semibold text-sm">Refugo: ${ap.quantidade || 1}x em Cav. ${ap.cavidade} <span class="text-xs text-gray-400">(${dataHora})</span></p>
                    <p class="text-xs text-red-600">${ap.defeito}</p>
                    <p class="text-xs text-gray-500">Data F.: ${ap.dataFundicao}</p>
                </div>
            `;
         } else if (ap.tipo === 'liberada') {
            logDiv.innerHTML += `
                <div class="bg-white p-2 border border-green-200 rounded-md">
                    <p class="font-semibold text-sm text-green-700">${ap.qtd} Peça(s) Liberada(s) <span class="text-xs text-gray-400">(${dataHora})</span></p>
                    <p class="text-xs text-gray-500">Data F.: ${ap.dataFundicao}</p>
                </div>
            `;
         }
    });

    logDiv.scrollTop = 0;
}


// =====================================================================
// 5. FUNÇÕES DA PÁGINA "RELATÓRIO" (Geração de Dados e Visualização)
// =====================================================================

function prepararPaginaRelatorio() {
    const containerTabela = document.getElementById('tabela-relatorio-container');
    const containerResumo = document.getElementById('tabela-resumo-total-container');
    const msgDefeitos = document.getElementById('msg-grafico-defeitos');
    const msgCavidades = document.getElementById('msg-grafico-cavidades');

    if (apontamentos.length === 0) {
        containerTabela.innerHTML = '<p class="text-gray-500 text-center">Nenhum dado para exibir. Preencha os Dados Iniciais e faça os apontamentos.</p>';
        containerResumo.innerHTML = '<p class="text-gray-500 text-center">Nenhum dado de lançamento encontrado para o resumo.</p>';
        destruirGraficos();
        msgDefeitos.style.display = 'block';
        msgCavidades.style.display = 'block';
        return;
    }

    gerarTabelaResumoTotal();
    gerarTabelaRelatorioTela();
    gerarGraficos();

    msgDefeitos.style.display = 'none';
    msgCavidades.style.display = 'none';
}

function gerarTabelaResumoTotal() {
    const container = document.getElementById('tabela-resumo-total-container');
    const dataResumo = {};
    
    apontamentos.forEach(ap => {
        if (ap.contexto && ap.contexto.codInterno) {
            const codInterno = ap.contexto.codInterno;
            
            if (!dataResumo[codInterno]) {
                dataResumo[codInterno] = {
                    refugo: 0,
                    liberada: 0,
                    cliente: ap.contexto.cliente,
                    codPeca: ap.contexto.codPeca,
                    codInterno: codInterno
                };
            }

            if (ap.tipo === 'refugo') {
                dataResumo[codInterno].refugo += (ap.quantidade || 1);
            } else if (ap.tipo === 'liberada') {
                dataResumo[codInterno].liberada += ap.qtd;
            }
        }
    });

    const itensResumo = Object.values(dataResumo);

    if (itensResumo.length === 0) {
         container.innerHTML = '<p class="text-gray-500 text-center">Nenhum dado de lançamento encontrado para o resumo.</p>';
         return;
    }

    let tableHTML = `
        <table class="min-w-full divide-y divide-gray-200 text-sm border border-gray-300 rounded-lg overflow-hidden">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-3 py-2 text-left font-medium text-gray-600 uppercase tracking-wider">Cód. Interno</th>
                    <th class="px-3 py-2 text-left font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                    <th class="px-3 py-2 text-left font-medium text-gray-600 uppercase tracking-wider">Cód. Peça</th>
                    <th class="px-3 py-2 text-right font-medium text-red-600 uppercase tracking-wider">Refugo Total (Qtd)</th>
                    <th class="px-3 py-2 text-right font-medium text-green-600 uppercase tracking-wider">Liberada Total (Qtd)</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
    `;

    itensResumo.forEach(item => {
         tableHTML += `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-3 py-2 whitespace-nowrap font-semibold text-gray-900">${item.codInterno}</td>
                <td class="px-3 py-2 whitespace-nowrap">${item.cliente}</td>
                <td class="px-3 py-2 whitespace-normal text-xs">${item.codPeca}</td>
                <td class="px-3 py-2 whitespace-nowrap text-right font-bold text-red-700">${item.refugo}</td>
                <td class="px-3 py-2 whitespace-nowrap text-right font-bold text-green-700">${item.liberada}</td>
            </tr>
         `;
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

function gerarTabelaRelatorioTela() {
    const container = document.getElementById('tabela-relatorio-container');

    const apontamentosFiltrados = apontamentos.filter(ap => ap.contexto);

    if (apontamentosFiltrados.length === 0) {
         container.innerHTML = `<p class="text-gray-500 text-center">Nenhum refugo ou liberação encontrado.</p>`;
         return;
    }

     const gruposDePecas = {};
     apontamentosFiltrados.forEach(ap => {
         const chaveGrupo = `${ap.contexto.codInterno}_${ap.dataFundicao}`;
         if (!gruposDePecas[chaveGrupo]) {
             gruposDePecas[chaveGrupo] = {
                 contexto: ap.contexto,
                 apontamentosDoGrupo: [],
                 totalLiberadasLote: 0, 
                 totalRefugadasLote: 0  
             };
         }
         gruposDePecas[chaveGrupo].apontamentosDoGrupo.push(ap);

         if (ap.tipo === 'liberada') {
             gruposDePecas[chaveGrupo].totalLiberadasLote += ap.qtd;
         } else if (ap.tipo === 'refugo') {
             gruposDePecas[chaveGrupo].totalRefugadasLote += (ap.quantidade || 1);
         }
     });

     const chavesOrdenadas = Object.keys(gruposDePecas).sort();

     let tableHTML = `
        <table class="min-w-full divide-y divide-gray-200 text-xs">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Funcionário</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Turno</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Linha</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Cód. Peça</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Cód. Interno</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Data Fundição</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Data Insp.</th>
                    <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Cav.</th>
                    <th class="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Cav. Esp.</th>
                    <th class="px-2 py-2 text-right font-medium text-red-600 uppercase tracking-wider">Qtd. Refugada</th> 
                    <th class="px-2 py-2 text-right font-medium text-green-600 uppercase tracking-wider">Qtd. Liberada</th>
     `;
     listaDeDefeitos.forEach((def, index) => {
         tableHTML += `<th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider" title="${def}">D${index + 1}</th>`;
     });
     tableHTML += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';


     chavesOrdenadas.forEach(chaveGrupo => {
         const grupo = gruposDePecas[chaveGrupo];
         const contextoPeca = grupo.contexto;
         const apontamentosDoGrupo = grupo.apontamentosDoGrupo;

         const numCavidades = contextoPeca.cavidades;
         const dataFundPeca = contextoPeca.dataFundicao;
         const cavInicial = contextoPeca.cavidadeInicial || 1; 
         const cavFinal = contextoPeca.cavidadeFinal || numCavidades; 

         const totalLiberadasLote = grupo.totalLiberadasLote;
         const totalRefugadasLote = grupo.totalRefugadasLote;
         
         // 1. CÁLCULO DA PRODUÇÃO IMPLÍCITA (Isolado por lote, usando o total verificado)
         const totalVerificadoLote = totalLiberadasLote + totalRefugadasLote;
         const producaoPorCavidade = numCavidades > 0 ? Math.floor(totalVerificadoLote / numCavidades) : 0; 
         
         // 2. PRIMEIRA PASSAGEM: DISTRIBUIÇÃO INICIAL E IDENTIFICAÇÃO DO EXCESSO
         const liberadasIniciais = distribuirLiberadasInteiro(numCavidades, apontamentosDoGrupo);
         
         let remanejamento = 0;
         const liberadasFinais = {};
         const cavidadesAptas = [];
         
         const refugosPorCavidadeMapa = {}; 
         for (let i = cavInicial; i <= cavFinal; i++) {
             refugosPorCavidadeMapa[i] = 0;
         }
         apontamentosDoGrupo.filter(ap => ap.tipo === 'refugo').forEach(ap => {
             if (ap.cavidade >= cavInicial && ap.cavidade <= cavFinal) {
                 refugosPorCavidadeMapa[ap.cavidade] += (ap.quantidade || 1);
             }
         });


         for (let cavNum = cavInicial; cavNum <= cavFinal; cavNum++) {
             const qtdRefugadaTotalCav = refugosPorCavidadeMapa[cavNum];
             const qtdLiberadaInicial = liberadasIniciais[cavNum] || 0;
             
             // Max Liberadas Posível (Lógica de Limite Zero/Coerência)
             // Se o refugo (20) é maior que a produção implícita (6), a capacidade de liberadas é 0.
             const maxLiberadasPossivel = producaoPorCavidade - qtdRefugadaTotalCav;

             if (qtdRefugadaTotalCav >= producaoPorCavidade) {
                 // Esta cavidade refugou mais do que poderia ter produzido. Força 0 liberadas.
                 liberadasFinais[cavNum] = 0;
                 // O remanejamento só adiciona o que o ALGORITMO TENTOU dar à cavidade (o qtdLiberadaInicial)
                 // que na prática, era o que vinha da distribuição original (baseado em 5 peças liberadas)
                 remanejamento += qtdLiberadaInicial; 
             }
             else if (qtdLiberadaInicial > maxLiberadasPossivel) {
                 // A distribuição inicial excedeu o limite coerente.
                 const excesso = qtdLiberadaInicial - maxLiberadasPossivel;
                 remanejamento += excesso;
                 liberadasFinais[cavNum] = maxLiberadasPossivel; 
             } else {
                 // Fica com a quantidade inicial e é apta a receber remanejamento.
                 liberadasFinais[cavNum] = qtdLiberadaInicial;
                 cavidadesAptas.push(cavNum); 
             }
         }
         
         // 3. SEGUNDA PASSAGEM: REDISTRIBUIÇÃO DO REMANESCENTE
         
         // O valor que falta para fechar a conta com o INPUT total do operador.
         let liberadasRemanescentes = totalLiberadasLote - Object.values(liberadasFinais).reduce((sum, current) => sum + current, 0);

         if (liberadasRemanescentes > 0 && cavidadesAptas.length > 0) {
             
             // Prioriza cavidades com MENOS refugo para o remanejamento
             const aptasComRefugo = cavidadesAptas.map(cavNum => ({
                 cavNum: cavNum,
                 refugo: refugosPorCavidadeMapa[cavNum]
             }));

             aptasComRefugo.sort((a, b) => a.refugo - b.refugo);

             let index = 0;
             while (liberadasRemanescentes > 0) {
                 const cavNum = aptasComRefugo[index % aptasComRefugo.length].cavNum;
                 
                 liberadasFinais[cavNum] += 1;
                 liberadasRemanescentes -= 1;
                 index++;
             }
         }

         // 4. IMPRESSÃO DA TABELA
         for (let cavNum = cavInicial; cavNum <= cavFinal; cavNum++) {
             const refugosParaEstaCavidadeData = apontamentosDoGrupo.filter(ap =>
                 ap.tipo === 'refugo' &&
                 ap.cavidade === cavNum
             );

             const qtdRefugadaTotalCav = refugosPorCavidadeMapa[cavNum] || 0; // Usando o mapa para eficiência

             let contagemDefeitosParaLinha = new Array(listaDeDefeitos.length).fill(0);

             refugosParaEstaCavidadeData.forEach(refugo => {
                 const indiceDefeito = mapaDefeitosParaIndiceCSV[refugo.defeito];
                 if (indiceDefeito !== undefined) {
                     contagemDefeitosParaLinha[indiceDefeito] += (refugo.quantidade || 1); 
                 }
             });

             const qtdLiberadaCav = liberadasFinais[cavNum] || 0; 
             
             tableHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.funcionario}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.turno}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.cliente}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.local}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.codPeca}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.codInterno}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${dataFundPeca}</td>
                    <td class="px-2 py-1 whitespace-nowrap">${contextoPeca.dataInsp}</td>
                    <td class="px-2 py-1 whitespace-nowrap text-center">${cavNum}</td>
                    <td class="px-2 py-1 whitespace-nowrap"></td> 
                    <td class="px-2 py-1 whitespace-nowrap text-right font-bold text-red-600">${qtdRefugadaTotalCav}</td> 
                    <td class="px-2 py-1 whitespace-nowrap text-right text-green-700">${qtdLiberadaCav}</td>
                 `;
                 contagemDefeitosParaLinha.forEach(count => {
                     tableHTML += `<td class="px-2 py-1 whitespace-nowrap ${count > 0 ? 'refugo-cell' : 'zero-cell'}">${count}</td>`;
                 });
                 tableHTML += '</tr>';
             }
        });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

function distribuirLiberadasInteiro(numCavidades, apontamentosDoGrupo) {
    if (numCavidades <= 0) return {};

    let totalLiberadas = 0;
    apontamentosDoGrupo.forEach(ap => {
        if (ap.tipo === 'liberada') {
            totalLiberadas += ap.qtd;
        }
    });

    if (totalLiberadas === 0) {
         const distribuicaoZero = {};
         for(let i=1; i<= numCavidades; i++) { distribuicaoZero[i] = 0;}
         return distribuicaoZero;
    }

    const basePorCavidade = Math.floor(totalLiberadas / numCavidades);
    let resto = totalLiberadas % numCavidades;

    // Calcula a contagem de refugos por cavidade para priorizar o resto
    const refugosPorCavidade = {};
    for (let i = 1; i <= numCavidades; i++) {
        refugosPorCavidade[i] = 0;
    }
    apontamentosDoGrupo.forEach(ap => {
        if (ap.tipo === 'refugo') {
            if (refugosPorCavidade.hasOwnProperty(ap.cavidade)) {
                refugosPorCavidade[ap.cavidade]++;
            }
        }
    });
    
    // Inicializa a distribuição final com a base
    const distribuicaoFinal = {};
    for (let i = 1; i <= numCavidades; i++) {
        distribuicaoFinal[i] = basePorCavidade;
    }

    // Ordena as cavidades pela menor quantidade de refugos
    const cavidadesOrdenadas = Object.entries(refugosPorCavidade) 
                                  .sort(([, a], [, b]) => a - b) 
                                  .map(([cavNum]) => parseInt(cavNum, 10));

    // Distribui o resto para as cavidades com menos refugos
    for (let i = 0; i < resto; i++) {
        const cavidadeParaReceberExtra = cavidadesOrdenadas[i % numCavidades]; 
        distribuicaoFinal[cavidadeParaReceberExtra]++;
    }

    return distribuicaoFinal;
}


// =====================================================================
// 6. FUNÇÕES DE EXPORTAÇÃO (SOMENTE DOWNLOAD)
// =====================================================================

/**
 * Cria uma worksheet com metadados de controle (ISO/IATF).
 * @param {Object} dadosIniciais - O contexto da sessão.
 * @returns {Object} Uma worksheet do SheetJS.
 */
function criarWorksheetMetadados(dadosIniciais) {
    const dataHora = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'medium' });
    
    // Simulação de metadados oficiais do seu SGQ (valores marcados A SER DEFINIDO)
    const metadados = [
        ["INFORMAÇÕES DE CONTROLE DE DOCUMENTO"],
        ["Nome do Documento Sugerido:", "RELATÓRIO DE REFUGO POR CAV/LOTE"],
        ["Código do Documento (SGQ):", "PR-XX.XX (A SER DEFINIDO)"],
        ["Revisão Atual (SGQ):", "REV. 01 (A SER DEFINIDO)"],
        ["Versão da Aplicação (DEV):", APLICACAO_VERSAO],
        ["Data e Hora de Geração:", dataHora],
        ["Geração Pelo Usuário:", dadosIniciais.funcionario || 'N/A'],
    ];

    const ws_meta = XLSX.utils.aoa_to_sheet(metadados);

    // Estilização básica: negrito na primeira coluna e cabeçalhos.
    ws_meta['!cols'] = [{ wch: 30 }, { wch: 45 }];
    
    // Aplicar estilos para títulos e primeira coluna
    for (let R = 0; R < metadados.length; ++R) {
        if (metadados[R].length > 0) {
            const cellA = XLSX.utils.encode_cell({ r: R, c: 0 });
            if (!ws_meta[cellA].s) ws_meta[cellA].s = {};
            ws_meta[cellA].s.font = { bold: true, sz: 10 };
            
            // Estilo para os títulos (primeira coluna em negrito e fundo cinza)
            if (metadados[R][0].includes("INFORMAÇÕES DE CONTROLE")) {
                if (!ws_meta[cellA].s.fill) ws_meta[cellA].s.fill = {};
                ws_meta[cellA].s.fill.fgColor = { rgb: "D9D9D9" }; // Light gray background
                ws_meta[cellA].s.font.color = { rgb: "000000" };
                ws_meta[cellA].s.font.sz = 12; 
            }
        }
    }
    
    return ws_meta;
}


function gerarNomeArquivoDinamico(tipo = 'Agrupado') {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');

    const dadosParaNome = dadosIniciaisPreenchidos ? dadosIniciais : JSON.parse(localStorage.getItem('dadosIniciais') || '{}');
    
    const linha = dadosParaNome.local || 'Linha_NaoDefinida';
    const turno = dadosParaNome.turno || 'Turno_NaoDefinida';

    const linhaLimpa = String(linha).replace(/[^a-z0-9]/gi, '_');
    const turnoLimpo = String(turno).replace(/[^a-z0-9]/gi, '_');

	return `Relatorio_Refugo_${tipo}_${dia}${mes}${ano}_Turno_${turnoLimpo}_${linhaLimpa}_${hora}${minuto}.xlsx`;
}

function exportarRelatorioAgrupadoXLSX() {
    // 1. Garante que a tabela está renderizada
    gerarTabelaRelatorioTela();
    const tabela = document.querySelector("#tabela-relatorio-container table");

    if (!tabela) {
        mostrarModal('Erro', "Nenhum dado disponível para exportação. Realize os apontamentos primeiro.");
        return false;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabela, { raw: true }); 

    const range = XLSX.utils.decode_range(ws['!ref']);

    const colWidths = [];
    for (let C = range.s.c; C <= range.e.c; C++) {
        let maxWidth = 10;

        for (let R = range.s.r; R <= range.e.r; R++) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            const cell = ws[cellAddress];

            if (R === 0 && ws[cellAddress]) {
                ws[cellAddress].s = {
                    font: { bold: true, color: { rgb: "374151" } }, 
                    fill: { fgColor: { rgb: "E5E7EB" } },
                    alignment: { horizontal: "center", vertical: "center", wrapText: true }
                };
            }

            if (cell && cell.v) {
                let length = String(cell.v).length;
                
                if (C >= 10 && R > 0) { 
                    if (!isNaN(Number(cell.v))) {
                        cell.t = 'n';
                        cell.v = Number(cell.v);
                        cell.z = '#,##0';
                        
                        length = String(cell.v).length + 2; 
                    }
                }
                
                if (length > maxWidth) maxWidth = length;

                if (C >= 10 && C <= 11) {
                    if (!ws[cellAddress].s) ws[cellAddress].s = {};
                    ws[cellAddress].s.alignment = { horizontal: "right", vertical: "center" };
                } else if (R > 0 && C >= 12) { 
                    if (!ws[cellAddress].s) ws[cellAddress].s = {};
                    ws[cellAddress].s.alignment = { horizontal: "center", vertical: "center" };
                }
            }
        }
        colWidths.push({ wch: Math.min(maxWidth + 2, 45) });
    }
    ws['!cols'] = colWidths;


    XLSX.utils.book_append_sheet(wb, ws, "Relatório Agrupado");

    // 2. Adicionar a segunda aba (Metadados de Geração)
    const dadosParaMetadados = dadosIniciaisPreenchidos ? dadosIniciais : JSON.parse(localStorage.getItem('dadosIniciais') || '{}');
    const ws_meta = criarWorksheetMetadados(dadosParaMetadados);
    
    XLSX.utils.book_append_sheet(wb, ws_meta, "Metadados de Geração"); 

    const nomeArquivo = gerarNomeArquivoDinamico("Agrupado");

    const wbArray = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
    const blob = new Blob([wbArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);

    return nomeArquivo;
}

// =====================================================================
// 6.1. CONSTANTES DE CONTROLE DE TEMPO
// =====================================================================
const CHAVE_ULTIMA_EXPORTACAO = 'ultimaExportacaoTimestamp';
// Intervalo de tempo mínimo entre as exportações (5 minutos em milissegundos)
const INTERVALO_MINIMO_MS = 5 * 60 * 1000; // 300.000 ms


/**
 * Função responsável por exportar os dados (somente download, sem e-mail).
 * Implementa um bloqueio de 5 minutos entre as chamadas.
 */
function exportarRelatorio() {
    if (apontamentos.length === 0) {
        mostrarModal('Erro', 'Nenhum apontamento encontrado para exportar.');
        return;
    }
    
    // --- Lógica de Bloqueio de 5 Minutos ---
    const agora = Date.now();
    const ultimaExportacaoStr = localStorage.getItem(CHAVE_ULTIMA_EXPORTACAO);
    const ultimaExportacao = ultimaExportacaoStr ? parseInt(ultimaExportacaoStr, 10) : 0;
    
    // Verifica se o tempo mínimo de 5 minutos passou
    if (agora - ultimaExportacao < INTERVALO_MINIMO_MS) {
        // O tempo não passou, bloqueia a execução
        const tempoRestanteMs = INTERVALO_MINIMO_MS - (agora - ultimaExportacao);
        const minutosRestantes = Math.ceil(tempoRestanteMs / 60000); // Arredonda para cima
        
        mostrarModal(
            "Exportação Bloqueada 🛑",
            `A função de exportação está disponível apenas a cada 5 minutos.<br><br>
             **Favor verificar a pasta de downloads, arquivos já gerados.**<br><br>
             Tente novamente em aproximadamente **${minutosRestantes} minuto(s)**.
            `
        );
        return; // Sai da função sem executar a exportação
    }

    // --- Execução da Exportação ---
    const nomeArquivoAgrupado = exportarRelatorioAgrupadoXLSX();
    
    if (nomeArquivoAgrupado) {
        
        // 1. Atualiza o timestamp da última exportação
        localStorage.setItem(CHAVE_ULTIMA_EXPORTACAO, agora.toString());

        mostrarModalDeConfirmacao(
            'Exportação Concluída',
            `O arquivo **${nomeArquivoAgrupado}** foi baixado com sucesso.<br><br>Deseja **limpar os dados de apontamento atuais** para iniciar um novo projeto?`,
            'Limpar Dados',
            () => {
                limparTodoConteudo();
            }
        );
        
    } else {
         mostrarModal('Aviso', 'Nenhum dado encontrado para exportar (Verifique se há lançamentos).');
    }
}


// =====================================================================
// 7. FUNÇÕES PARA OS GRÁFICOS (Chart.js)
// =====================================================================

function destruirGraficos() {
    if (graficoDefeitosInstance) {
        graficoDefeitosInstance.destroy();
        graficoDefeitosInstance = null;
    }
    if (graficoCavidadesInstance) {
        graficoCavidadesInstance.destroy();
        graficoCavidadesInstance = null;
    }
    document.getElementById('graficoDefeitos').style.display = 'none';
    document.getElementById('graficoCavidades').style.display = 'none';
}

function gerarGraficos() {
    destruirGraficos();

    const refugosFiltrados = apontamentos.filter(ap =>
        ap.tipo === 'refugo' && ap.contexto
    );

    if(refugosFiltrados.length === 0) {
        document.getElementById('msg-grafico-defeitos').style.display = 'block';
        document.getElementById('msg-grafico-cavidades').style.display = 'block';
        return;
    }

    document.getElementById('msg-grafico-defeitos').style.display = 'none';
    document.getElementById('msg-grafico-cavidades').style.display = 'none';
    document.getElementById('graficoDefeitos').style.display = 'block';
    document.getElementById('graficoCavidades').style.display = 'block';


    // --- Preparação de Dados para Gráfico 1: Defeitos ---
    const contagemDefeitos = {};
    listaDeDefeitos.forEach(def => contagemDefeitos[def] = 0);
    refugosFiltrados.forEach(ap => {
        if (contagemDefeitos.hasOwnProperty(ap.defeito)) {
            contagemDefeitos[ap.defeito] += (ap.quantidade || 1);
        }
    });

    const labelsDefeitos = Object.keys(contagemDefeitos).filter(def => contagemDefeitos[def] > 0).map(def => def.replace(/^\d+\s*:?\s*/, ''));
    const dataDefeitos = Object.values(contagemDefeitos).filter(count => count > 0);

    // --- Renderização Gráfico 1: Defeitos (Pizza) ---
     const ctxDefeitos = document.getElementById('graficoDefeitos').getContext('2d');
     graficoDefeitosInstance = new Chart(ctxDefeitos, {
        type: 'pie',
        data: {
            labels: labelsDefeitos,
            datasets: [{
                label: 'Quantidade de Refugos',
                data: dataDefeitos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 
                    'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)',
                    'rgba(199, 199, 199, 0.7)', 'rgba(83, 102, 255, 0.7)', 'rgba(255, 0, 0, 0.7)', 
                    'rgba(0, 255, 0, 0.7)', 'rgba(0, 0, 255, 0.7)', 'rgba(255, 255, 0, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                 title: {
                    display: true,
                    text: `Distribuição de Defeitos (Total)`,
                    font: { size: 16 }
                },
                legend: {
                    position: 'bottom',
                    labels: { font: { size: 10 } }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (context.parsed !== null) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                label += `: ${context.parsed} (${percentage}%)`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });


    // --- Preparação de Dados para Gráfico 2: Cavidades ---
    const contagemCavidades = {};
    let maxCavidade = 0;
    refugosFiltrados.forEach(ap => {
        const cavNum = parseInt(ap.cavidade, 10);
        if (!isNaN(cavNum)) {
           if (cavNum > maxCavidade) maxCavidade = cavNum;
           contagemCavidades[cavNum] = (contagemCavidades[cavNum] || 0) + (ap.quantidade || 1);
        }
    });

    const labelsCavidades = [];
    const dataCavidades = [];
    for (let i = 1; i <= maxCavidade; i++) {
        labelsCavidades.push(`Cav. ${i}`);
        dataCavidades.push(contagemCavidades[i] || 0);
    }

    const totalRefugosFiltrados = refugosFiltrados.reduce((total, refugo) => total + (refugo.quantidade || 1), 0);


    // --- Renderização Gráfico 2: Cavidades (Barras) ---
    const ctxCavidades = document.getElementById('graficoCavidades').getContext('2d');
     graficoCavidadesInstance = new Chart(ctxCavidades, {
        type: 'bar',
        data: {
            labels: labelsCavidades,
            datasets: [{
                label: 'Quantidade de Refugos',
                data: dataCavidades,
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
             indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true,
                     ticks: { stepSize: 1 }
                }
            },
            plugins: {
                 title: {
                    display: true,
                    text: `Refugo por Cavidade (Total)`,
                    font: { size: 16 }
                },
                legend: {
                    display: false
                },
                tooltip: {
                     callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (context.parsed.y !== null) {
                                const percentage = totalRefugosFiltrados > 0 ? ((context.parsed.y / totalRefugosFiltrados) * 100).toFixed(1) : 0;
                                label += `: ${context.parsed.y} (${percentage}%)`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// =====================================================================
// 8. FUNÇÕES DE BACKUP E INICIALIZAÇÃO (LOCAL STORAGE)
// =====================================================================

function salvarBackupAutomatico() {
    try {
        localStorage.setItem('apontamentos', JSON.stringify(apontamentos));
        localStorage.setItem('apontamentosBackup', JSON.stringify(apontamentos));
        localStorage.setItem('datasFundicaoDisponiveis', JSON.stringify(datasFundicaoDisponiveis));
        localStorage.setItem('ordemDefeitosAtual', JSON.stringify(ordemDefeitosAtual));
        if (dadosIniciaisPreenchidos) {
           localStorage.setItem('dadosIniciais', JSON.stringify(dadosIniciais));
       } else {
            localStorage.removeItem('dadosIniciais');
        }
    } catch (e) {
        console.error("[Backup] Erro ao salvar backup automático:", e);
    }
}

function carregarDadosSalvos() {
    const apontamentosSalvos = localStorage.getItem('apontamentos');
    const apontamentosBackup = localStorage.getItem('apontamentosBackup');

    if (apontamentosSalvos || apontamentosBackup) {
        try {
            const dadosParaCarregar = apontamentosSalvos || apontamentosBackup;
            apontamentos = JSON.parse(dadosParaCarregar);
            if (apontamentosSalvos === null && apontamentosBackup !== null) {
                console.warn("[Backup] Apontamentos carregados do backup.");
            }
        } catch (e) {
            console.error("Erro ao carregar apontamentos:", e);
            apontamentos = [];
        }
    }
    
    const datasSalvas = localStorage.getItem('datasFundicaoDisponiveis');
    if (datasSalvas) {
        try {
            datasFundicaoDisponiveis = JSON.parse(datasSalvas);
            if (datasFundicaoDisponiveis.length > 0) {
                dataFundicaoAtiva = datasFundicaoDisponiveis[datasFundicaoDisponiveis.length - 1];
            }
        } catch (e) {
            console.error("Erro ao carregar datas de fundição:", e);
            datasFundicaoDisponiveis = [];
        }
    }
    
    const ordemDefeitosSalva = localStorage.getItem('ordemDefeitosAtual');
    if (ordemDefeitosSalva) {
         try {
            const ordemCarregada = JSON.parse(ordemDefeitosSalva);
            if (Array.isArray(ordemCarregada) && ordemCarregada.length === listaDeDefeitos.length &&
                listaDeDefeitos.every(def => ordemCarregada.includes(def))) {
                ordemDefeitosAtual = ordemCarregada;
            } else {
                 console.warn("Ordem de defeitos salva inválida, usando ordem padrão.");
                 ordemDefeitosAtual = [...listaDeDefeitos];
            }
        } catch (e) {
            console.error("Erro ao carregar ordem de defeitos:", e);
            ordemDefeitosAtual = [...listaDeDefeitos];
        }
    } else {
         ordemDefeitosAtual = [...listaDeDefeitos];
    }

    const dadosIniciaisSalvos = localStorage.getItem('dadosIniciais');
    if (dadosIniciaisSalvos) {
         try {
            dadosIniciais = JSON.parse(dadosIniciaisSalvos);
            dadosIniciaisPreenchidos = true;
            
            document.getElementById('btn-menu-apontamento').disabled = false;
            document.getElementById('btn-menu-relatorio').disabled = false;
            
             document.getElementById('funcionario').value = dadosIniciais.funcionario || '';
             document.getElementById('turno').value = dadosIniciais.turno || '';
             document.getElementById('local').value = dadosIniciais.local || '';
        } catch (e) {
            console.error("Erro ao carregar dados iniciais:", e);
            dadosIniciais = {};
            dadosIniciaisPreenchidos = false;
        }
    }
    
    backupIntervalId = setInterval(salvarBackupAutomatico, 60000); 
}

window.addEventListener('beforeunload', () => {
     salvarBackupAutomatico();
     if (backupIntervalId) {
        clearInterval(backupIntervalId);
     }
});

document.addEventListener('DOMContentLoaded', carregarDadosSalvos);

// Exporta funções globais necessárias (mantidas no escopo global para o HTML)
window.showPage = showPage;
window.atualizarDadosPeca = atualizarDadosPeca;
window.salvarDadosIniciais = salvarDadosIniciais;
window.adicionarDataFundicao = adicionarDataFundicao;
window.registrarPecasLiberadas = registrarPecasLiberadas;
window.selecionarCavidade = selecionarCavidade;
window.manipularTeclado = manipularTeclado;
window.confirmarDefeitosModal = confirmarDefeitosModal;
window.confirmarExcluirUltimo = confirmarExcluirUltimo;
window.exportarRelatorio = exportarRelatorio; // Função AGORA É APENAS DOWNLOAD
window.limparTodoConteudo = limparTodoConteudo;
window.fecharModal = fecharModal;
window.selecionarDefeitoModal = selecionarDefeitoModal;
window.selecionarDataFundicao = selecionarDataFundicao;