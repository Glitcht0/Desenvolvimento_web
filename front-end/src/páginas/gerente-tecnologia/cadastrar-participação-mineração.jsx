import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown"; // 1. IMPORTAR O DROPDOWN

import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia";

import {
  serviçoCadastrarParticipaçãoMineração,
  serviçoRemoverParticipaçãoMineração,
} from "../../serviços/serviços-gerente-tecnologia";

import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";

import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoRemover,
  estilizarCard,
  estilizarCheckbox,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputTextarea,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarParticipaçãoMineração() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { 
    participaçãoMineraçãoConsultado, 
    PatrocínioSelecionada, 
    setPatrocínioConsultada 
  } = useContext(ContextoGerenteTecnologia);

  // 2. DEFINIR AS OPÇÕES (COM BASE NA SUA ENTIDADE)
  const opçõesCategoria = [
    { label: "Extração", value: "Extração" },
    { label: "Exploração", value: "Exploração" },
    { label: "Consultoria", value: "Consultoria" },
    { label: "Pesquisa Mineral", value: "Pesquisa Mineral" }
  ];

  const opçõesResultado = [
    { label: "Sucesso", value: "Sucesso" },
    { label: "Parcial", value: "Parcial" },
    { label: "Falha", value: "Falha" }
  ];

  // 3. ADICIONAR CAMPOS AO ESTADO
  const [dados, setDados] = useState({
    id_patrocínio: PatrocínioSelecionada?.id || "",
    título: participaçãoMineraçãoConsultado?.título || "", // Título da participação
    necessidade_bolsa: participaçãoMineraçãoConsultado?.necessidade_bolsa || false,
    justificativa: participaçãoMineraçãoConsultado?.justificativa || "",
    área_atuação: participaçãoMineraçãoConsultado?.área_atuação || "",
    data_início: participaçãoMineraçãoConsultado?.data_início || "",
    descrição: participaçãoMineraçãoConsultado?.descrição || "",
    categoria: participaçãoMineraçãoConsultado?.categoria || "", // <-- ADICIONADO
    resultado: participaçãoMineraçãoConsultado?.resultado || ""  // <-- ADICIONADO
  });


  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    // Esta função já está correta para lidar com Dropdown também
    const chave = event.target.name; 
    const valor = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setDados({ ...dados, [chave]: valor });
  }

  // 4. ADICIONAR CAMPOS À VALIDAÇÃO
  function validarCampos() {
    const { título, justificativa, categoria, resultado, área_atuação, data_início } = dados; // <-- ADICIONADOS
    const errosCamposObrigatórios = validarCamposObrigatórios({ 
        título, 
        justificativa, 
        categoria, 
        resultado,
        área_atuação,
        data_início 
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }


  function patrocínioLabel() {
    if (participaçãoMineraçãoConsultado?.título_patrocínio || PatrocínioSelecionada)
      return "Patrocínio Selecionado*:";
    else return "Selecione um Patrocínio*:";
  }


  function consultarPatrocínioParticipaçãoMineração() {
    console.log("🔍 Participação atual (consultarPatrocínio):", participaçãoMineraçãoConsultado);

    // O seu backend (buscarParticipaçõesMineraçãoGerenteTecnologia) agora retorna 'patrocínios' (plural/array)
    const patrocinioArray = participaçãoMineraçãoConsultado?.patrocínios;
    
    // Pega o primeiro patrocínio do array, se existir
    const patrocinio = (Array.isArray(patrocinioArray) && patrocinioArray.length > 0) ? patrocinioArray[0] : null;

    if (patrocinio) {
      console.log("🔎 Patrocínio encontrado:", patrocinio);
      setPatrocínioConsultada(patrocinio);
      navegar("../consultar-patrocinio");
    } else {
      console.warn("⚠️ Nenhum patrocínio associado encontrado para esta participação.");
      mostrarToast(referênciaToast, "Esta participação não possui um patrocínio associado.", "info");
      setPatrocínioConsultada(null);
    }
};

  function pesquisarPatrocínios() {
    navegar("../pesquisar-patrocinios");
  }

  function retornarAdministrarParticipações() {
    navegar("../administrar-participacoes-mineracao");
  }

  async function cadastrarParticipação() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarParticipaçãoMineração({ 
          ...dados, 
          cpf: usuárioLogado.cpf,
          id_patrocínio: PatrocínioSelecionada?.id
        });
        mostrarToast(referênciaToast, "Participação cadastrada com sucesso!", "sucesso");
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function removerParticipação() {
    try {
      await serviçoRemoverParticipaçãoMineração(participaçãoMineraçãoConsultado.id);
      mostrarToast(referênciaToast, "Participação removida com sucesso!", "sucesso");
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "erro");
    }
  }

  function BotõesAções() {
    if (participaçãoMineraçãoConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarParticipações}
          />
          <Button
            className={estilizarBotãoRemover()}
            label="Remover"
            onClick={removerParticipação}
          />
          <Button className={estilizarBotão()} label="Patrocínio" onClick={consultarPatrocínioParticipaçãoMineração}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarParticipações}
          />
          <Button
            className={estilizarBotão()}
            label="Cadastrar"
            onClick={cadastrarParticipação}
          />
        </div>
      );
    }
  }

  function títuloFormulário() {
    if (participaçãoMineraçãoConsultado) return "Remover Participação";
    else return "Cadastrar Participação";
  }

 function PatrocínioInputText() {
    // 1. Verifica o patrocínio selecionado (quando você clica em "Selecionar/Substituir")
    if (PatrocínioSelecionada?.justificativa) {
      return (
        <InputText
          name="nome_patrocínio" 
          className={estilizarInputText(erros.nome_patrocínio, 400, usuárioLogado.cor_tema)}
          value={PatrocínioSelecionada?.justificativa} 
          disabled
        />
      );
    // 2. Verifica o patrocínio de uma participação existente (quando você está editando)
    //    Ajustado para o novo formato de 'patrocínios' (array)
    } else if (participaçãoMineraçãoConsultado?.patrocínios && participaçãoMineraçãoConsultado.patrocínios.length > 0) {
      return (
        <InputText
          name="nome_patrocínio"
          className={estilizarInputText(erros.nome_patrocínio, 400, usuárioLogado.cor_tema)}
          value={participaçãoMineraçãoConsultado.patrocínios[0].justificativa} // Pega do primeiro patrocínio
          disabled
        />
      );
    } else return null; // Retorna nulo se nenhum patrocínio for encontrado
  }

  function BotãoSelecionar() {
    if (!PatrocínioSelecionada && !participaçãoMineraçãoConsultado) {
      return (
        <Button
          className={estilizarBotão()}
          label="Selecionar"
          onClick={pesquisarPatrocínios}
        />
      );
    } else if (PatrocínioSelecionada) {
      return (
        <Button
          className={estilizarBotão()}
          label="Substituir"
          onClick={pesquisarPatrocínios}
        />
      );
    // Se estiver editando, não mostre "Selecionar" ou "Substituir",
    // o patrocínio é visto pelo botão "Patrocínio"
    } else if (participaçãoMineraçãoConsultado) {
        return null;
    }
    
    // Fallback caso nenhuma condição acima seja atendida (modo de cadastro inicial)
    return (
        <Button
            className={estilizarBotão()}
            label="Selecionar"
            onClick={pesquisarPatrocínios}
        />
    );
  }

  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={retornarAdministrarParticipações}
        position="bottom-center"
      />
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            {patrocínioLabel()}
          </label>
          <BotãoSelecionar />
          <PatrocínioInputText />
          <MostrarMensagemErro mensagem={erros.id} />
        </div>

        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Necessidade de Bolsa*:
          </label>
          <Checkbox
            name="necessidade_bolsa"
            checked={dados.necessidade_bolsa}
            className={estilizarCheckbox()}
            onChange={alterarEstado}
          />
        </div>


        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Título*:
          </label>
          <InputText
            name="título"
            value={dados.título}
            className={estilizarInputText(erros.título, 400, usuárioLogado.cor_tema)}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.título} />
        </div>

        {/* 5. ADICIONAR O JSX DO DROPDOWN DE CATEGORIA */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Categoria*:
          </label>
          <Dropdown
            name="categoria"
            value={dados.categoria}
            options={opçõesCategoria}
            onChange={alterarEstado}
            placeholder="Selecione uma categoria"
            // Você pode precisar de um 'estilizarDropdown' ou usar o 'estilizarInputText'
            className={estilizarInputText(erros.categoria, 400, usuárioLogado.cor_tema)} 
          />
          <MostrarMensagemErro mensagem={erros.categoria} />
        </div>


        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Área de Atuação*:
          </label>
          <InputText
            name="área_atuação"
            value={dados.área_atuação || ""}
            className={estilizarInputText(erros.área_atuação, 400, usuárioLogado.cor_tema)}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.área_atuação} />
        </div>


        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Descrição:
          </label>
          <InputTextarea
            name="descrição"
            value={dados.descrição || ""}
            className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)}
            onChange={alterarEstado}
            autoResize
            cols={40}
          />
          <MostrarMensagemErro mensagem={erros.descrição} />
        </div>

        {/* 5. ADICIONAR O JSX DO DROPDOWN DE RESULTADO */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Resultado*:
          </label>
          <Dropdown
            name="resultado"
            value={dados.resultado}
            options={opçõesResultado}
            onChange={alterarEstado}
            placeholder="Selecione um resultado"
            className={estilizarInputText(erros.resultado, 400, usuárioLogado.cor_tema)} 
          />
          <MostrarMensagemErro mensagem={erros.resultado} />
        </div>


        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data de Início*:
          </label>
          <InputText
            type="date"
            name="data_início"
            value={dados.data_início || ""}
            className={estilizarInputText(erros.data_início, 200, usuárioLogado.cor_tema)}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.data_início} />
        </div>



        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Justificativa*:
          </label>
          <InputTextarea
            name="justificativa"
            value={dados.justificativa}
            className={estilizarInputTextarea(erros.justificativa, usuárioLogado.cor_tema)}
            onChange={alterarEstado}
            autoResize
            cols={40}
          />
          <MostrarMensagemErro mensagem={erros.justificativa} />
        </div>

        <Divider className={estilizarDivider()} />
        <BotõesAções />
      </Card>
    </div>
  );
}