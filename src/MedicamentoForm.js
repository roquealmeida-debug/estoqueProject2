import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Importa apenas o jsPDF
import 'jspdf-autotable'; // Importa a extensão para tabelas

const MedicamentoForm = React.memo(() => {
  const [nome, setNome] = useState('');
  const [laboratorio, setLaboratorio] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [tipoMedicamento, setTipoMedicamento] = useState('');
  const [lote, setLote] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [valor, setValor] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMedicamentos = localStorage.getItem('medicamentos');
    if (storedMedicamentos) {
      setMedicamentos(JSON.parse(storedMedicamentos));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Não prossegue se houver erros
    }

    const medicamento = {
      nome: nome.toUpperCase(),
      laboratorio: laboratorio.toUpperCase(),
      tipoServico: tipoServico.toUpperCase(),
      tipoMedicamento: tipoMedicamento.toUpperCase(),
      lotes: [{ 
        lote: lote.toUpperCase(), 
        quantidade, 
        dataValidade, 
        valor: parseFloat(valor.replace(/\./g, '').replace(',', '.')) 
      }],
    };

    const updatedMedicamentos = editIndex !== null 
      ? medicamentos.map((med, index) => (index === editIndex ? medicamento : med)) 
      : [...medicamentos, medicamento];

    setMedicamentos(updatedMedicamentos);
    localStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));
    resetForm();
  };

  const resetForm = () => {
    setNome('');
    setLaboratorio('');
    setTipoServico('');
    setTipoMedicamento('');
    setLote('');
    setQuantidade('');
    setDataValidade('');
    setValor('');
    setEditIndex(null);
  };

  const handleValueChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = formatCurrency(numericValue / 100);
    setValor(numericValue);
    e.target.value = formattedValue;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleEdit = (index) => {
    const medicamento = medicamentos[index];
    setNome(medicamento.nome);
    setLaboratorio(medicamento.laboratorio);
    setTipoServico(medicamento.tipoServico);
    setTipoMedicamento(medicamento.tipoMedicamento);
    setLote(medicamento.lotes[0].lote);
    setQuantidade(medicamento.lotes[0].quantidade);
    setDataValidade(medicamento.lotes[0].dataValidade);
    setValor(formatCurrency(medicamento.lotes[0].valor));
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este medicamento?");
    if (confirmDelete) {
      const updatedMedicamentos = medicamentos.filter((_, i) => i !== index);
      setMedicamentos(updatedMedicamentos);
      localStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));
    }
  };

  const exportJSON = () => {
    setLoading(true); // Inicia o carregamento
    const dataStr = JSON.stringify(medicamentos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medicamentos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setLoading(false); // Finaliza o carregamento
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }
    
    setLoading(true); // Inicia o carregamento
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setMedicamentos(data);
        localStorage.setItem('medicamentos', JSON.stringify(data)); // Salva os medicamentos importados no localStorage
      } catch (error) {
        alert("Erro ao importar JSON. Verifique o formato do arquivo.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    reader.readAsText(file);
  };

  const exportToPDF = () => {
    const estoque = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const doc = new jsPDF();

    // Definir margens verticais
    const topMargin = 20; // Margem superior
    const bottomMargin = 20; // Margem inferior

    let y = topMargin; // Posição inicial Y com margem
    const pageWidth = doc.internal.pageSize.getWidth(); // Largura total da página

    // Agrupar medicamentos por nome
    const groupedMedicamentos = estoque.reduce((acc, medicamento) => {
        const existing = acc.find(med => med.nome === medicamento.nome);
        if (existing) {
            existing.lotes.push(...medicamento.lotes);
        } else {
            acc.push({ ...medicamento, lotes: [...medicamento.lotes] });
        }
        return acc;
    }, []);

    groupedMedicamentos.forEach((medicamento) => {
        // Cabeçalho do medicamento
        doc.setFontSize(10);
        const rectHeight = 8; // Altura do retângulo
        const rectY = y; // Posição Y do retângulo

        // Desenhar o retângulo cinza
        doc.setFillColor(220, 220, 220); // Cor cinza
        doc.rect(0, rectY, pageWidth, rectHeight, 'F'); // Desenha o retângulo

        // Centralizar o texto à esquerda dentro do retângulo
        doc.setTextColor(0); // Cor do texto (preto)
        const nomeMedicamento = medicamento.nome || '';
        doc.text(nomeMedicamento, 10, rectY + 5); // Adiciona 5 para posicionar o texto no meio do retângulo

        y += rectHeight + 3; // Ajustar Y para a próxima seção (menos espaço abaixo do retângulo)

        // Resetar cor do texto e fonte para os lotes
        doc.setFontSize(7);
        let totalQuantidade = 0; // Para somar a quantidade
        let totalValor = 0; // Para somar o valor total

        medicamento.lotes.forEach((lote) => {
            let x = 10; // Reinicia a posição X para as informações do lote

            // Verificações para garantir que os valores são válidos
            const loteText = lote.lote || '';
            const validadeText = lote.dataValidade || '';
            const tipoServicoText = medicamento.tipoServico || '';
            const tipoMedicamentoText = medicamento.tipoMedicamento || '';
            const quantidade = Number(lote.quantidade) || 0;
            const valorLote = Number(lote.valor); // Corrigido para dividir por 100 aqui

            // Calcular o valor total do lote
            const valorTotalLote = valorLote * quantidade;

            // Desenhar informações centralizadas
            if (loteText) {
                doc.text(`${loteText}`, x, y);
                x += 30; // Atualiza x para a próxima coluna
            }
            if (validadeText) {
                doc.text(`${validadeText}`, x, y);
                x += 30; // Atualiza x para a próxima coluna
            }
            if (tipoServicoText) {
                doc.text(`${tipoServicoText}`, x, y);
                x += 50; // Atualiza x para a próxima coluna
            }
            if (tipoMedicamentoText) {
                doc.text(`${tipoMedicamentoText}`, x, y);
                x += 30; // Atualiza x para a próxima coluna
            }
            doc.text(`${quantidade}`, x, y);
            totalQuantidade += quantidade; // Acumula a quantidade total
            x += 30; // Atualiza x para a próxima coluna
            doc.text(`${formatCurrency(valorTotalLote)}`, x, y); // Centraliza o valor
            totalValor += valorTotalLote; // Acumula o valor total

            y += 5; // Ajustar posição y para o próximo lote

            // Verifica se a posição Y ultrapassa a altura da página
            if (y + rectHeight + 3 > doc.internal.pageSize.getHeight() - bottomMargin) {
                doc.addPage(); // Adiciona uma nova página
                y = topMargin; // Reseta a posição Y para o início da nova página
            }
        });

        // Total de Quantidade e Valor após cada medicamento, alinhado à direita na tabela
        y += 3; // Espaçamento extra antes dos totais
        doc.setFontSize(7);
        doc.text(`Total Quantidade: ${totalQuantidade}`, 10, y); // Total de quantidade
        doc.text(`Total Valor: ${formatCurrency(totalValor)}`, 100, y); // Total de valor

        y += 5; // Espaçamento extra após cada medicamento
    });

    // Finalizar o PDF e salvar
    doc.save('estoque_medicamentos.pdf');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!nome) newErrors.nome = "O nome é obrigatório.";
    if (!laboratorio) newErrors.laboratorio = "O laboratório é obrigatório.";
    if (!tipoServico) newErrors.tipoServico = "Selecione um tipo de serviço.";
    if (!tipoMedicamento) newErrors.tipoMedicamento = "Selecione um tipo de medicamento.";
    if (!lote) newErrors.lote = "O lote é obrigatório.";
    if (!quantidade || quantidade <= 0) newErrors.quantidade = "A quantidade deve ser maior que zero.";
    if (!dataValidade) newErrors.dataValidade = "A data de validade é obrigatória.";
    if (!valor || valor <= 0) newErrors.valor = "O valor deve ser maior que zero.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  return (
    <div>
      {loading && <div className="loading-indicator">Carregando...</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        {errors.nome && <span className="error">{errors.nome}</span>}
        
        <label htmlFor="laboratorio">Laboratório</label>
        <input type="text" id="laboratorio" placeholder="Laboratório" value={laboratorio} onChange={(e) => setLaboratorio(e.target.value)} required />
        {errors.laboratorio && <span className="error">{errors.laboratorio}</span>}
        
        <label htmlFor="tipoServico">Tipo de Serviço</label>
        <select id="tipoServico" value={tipoServico} onChange={(e) => setTipoServico(e.target.value)} required>
          <option value="">Selecione um tipo de serviço...</option>
          <option value="ANEMIA FALCIFORME">ANEMIA FALCIFORME</option>
          <option value="ANTIMICROBIANOS">ANTIMICROBIANOS</option>
          <option value="ASSISTÊNCIA FARMACÊUTICA">ASSISTÊNCIA FARMACÊUTICA</option>
          <option value="ASSISTÊNCIA FARMACÊUTICA BÁSICA">ASSISTÊNCIA FARMACÊUTICA BÁSICA</option>
          <option value="DIABETES">DIABETES</option>
          <option value="HIPERTENSÃO">HIPERTENSÃO</option>
          <option value="SAÚDE DA MULHER">SAÚDE DA MULHER</option>
          <option value="SAÚDE MENTAL">SAÚDE MENTAL</option>
          <option value="URGÊNCIA E EMERGÊNCIA">URGÊNCIA E EMERGÊNCIA</option>
        </select>
        {errors.tipoServico && <span className="error">{errors.tipoServico}</span>}
        
        <label htmlFor="tipoMedicamento">Tipo de Medicamento</label>
        <select id="tipoMedicamento" value={tipoMedicamento} onChange={(e) => setTipoMedicamento(e.target.value)} required>
          <option value="">Selecione um tipo de medicamento...</option>
          <option value="ADESIVO">ADESIVO</option>
          <option value="AMPOLA">AMPOLA</option>
          <option value="BISNAGA">BISNAGA</option>
          <option value="CAPSULA">CAPSULA</option>
          <option value="CARTELA">CARTELA</option>
          <option value="COMPRIMIDO">COMPRIMIDO</option>
          <option value="CREME">CREME</option>
          <option value="FRASCO">FRASCO</option>
          <option value="FRASCO AMPOLA">FRASCO AMPOLA</option>
          <option value="GEL">GEL</option>
          <option value="GOTAS">GOTAS</option>
          <option value="POMADA">POMADA</option>
          <option value="SPRAY">SPRAY</option>
          <option value="SUPOSITÓRIO">SUPOSITÓRIO</option>
          <option value="XAROPE">XAROPE</option>
        </select>
        {errors.tipoMedicamento && <span className="error">{errors.tipoMedicamento}</span>}
        
        <label htmlFor="lote">Lote</label>
        <input type="text" id="lote" placeholder="Lote" value={lote} onChange={(e) => setLote(e.target.value)} required />
        {errors.lote && <span className="error">{errors.lote}</span>}
        
        <label htmlFor="quantidade">Quantidade</label>
        <input type="number" id="quantidade" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        {errors.quantidade && <span className="error">{errors.quantidade}</span>}
        
        <label htmlFor="dataValidade">Data de Validade</label>
        <input type="date" id="dataValidade" placeholder="Data de Validade" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)} required />
        {errors.dataValidade && <span className="error">{errors.dataValidade}</span>}
        
        <label htmlFor="valor">Valor</label>
        <input type="text" id="valor" placeholder="Valor" value={formatCurrency(valor / 100)} onChange={handleValueChange} required />
        {errors.valor && <span className="error">{errors.valor}</span>}
        
        <button type="submit">{editIndex !== null ? 'Atualizar Medicamento' : 'Adicionar Medicamento'}</button>
      </form>

      {/* Campo de busca */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar Medicamento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input" // Adiciona a classe de estilo
        />
        <button className="search-button" onClick={() => {/* Ação de busca, se necessário */}}>
          Buscar
        </button>
      </div>

      {/* Botões de Exportação e Importação */}
      <div className="export-buttons">
        <button onClick={exportJSON}>Exportar Medicamentos</button>
        <input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} id="file-input" />
        <button onClick={() => document.getElementById('file-input').click()} className="import-button">Importar Medicamentos</button>
        <button onClick={exportToPDF}>Exportar PDF</button> {/* Botão para exportar PDF */}
      </div>

      {/* Tabela para exibir os medicamentos */}
      <div id="estoque">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Laboratório</th>
              <th>Tipo de Serviço</th>
              <th>Tipo de Medicamento</th>
              <th>Lote</th>
              <th>Quantidade</th>
              <th>Data de Validade</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos && medicamentos.length > 0 ? (
              medicamentos
                .filter((medicamento) =>
                  medicamento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  medicamento.laboratorio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  medicamento.tipoServico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  medicamento.tipoMedicamento.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena os medicamentos em ordem alfabética
                .map((medicamento, index) => (
                  <tr key={index}>
                    <td>{medicamento.nome}</td>
                    <td>{medicamento.laboratorio || 'N/A'}</td>
                    <td>{medicamento.tipoServico || 'N/A'}</td>
                    <td>{medicamento.tipoMedicamento || 'N/A'}</td>
                    <td>{medicamento.lotes.map(lote => lote.lote).join(', ')}</td>
                    <td>{medicamento.lotes.map(lote => lote.quantidade).join(', ')}</td>
                    <td>{medicamento.lotes.map(lote => lote.dataValidade).join(', ')}</td>
                    <td>{medicamento.lotes.map(lote => formatCurrency(lote.valor)).join(', ')}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Editar</button>
                      <button onClick={() => handleDelete(index)}>Excluir</button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="9">Nenhum medicamento encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default MedicamentoForm;
