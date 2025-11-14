import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";

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
    setPatrocínioConsultada // Removido o 'setPatrocínioParticipaçãoMineração'
  } = useContext(ContextoGerenteTecnologia);
  const [dados, setDados] = useState({
    id_patrocínio: PatrocínioSelecionada?.id || "",
    título: PatrocínioSelecionada?.título || "",
    necessidade_bolsa: participaçãoMineraçãoConsultado?.necessidade_bolsa || false,
    justificativa: participaçãoMineraçãoConsultado?.justificativa || "",
    área_atuação: participaçãoMineraçãoConsultado?.área_atuação || "",
    data_início: participaçãoMineraçãoConsultado?.data_início || "",
    descrição: participaçãoMineraçãoConsultado?.descrição || "",
  });


  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    const { título, justificativa } = dados;
    const errosCamposObrigatórios = validarCamposObrigatórios({ título, justificativa });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }


  function patrocínioLabel() {
    if (participaçãoMineraçãoConsultado?.título_patrocínio || PatrocínioSelecionada)
      return "Patrocínio Selecionado*:";
    else return "Selecione um Patrocínio*:";
  }


  function consultarPatrocínioParticipaçãoMineração() {
    // Primeiro, logar o objeto da participação para debug
    console.log("🔍 Participação atual (consultarPatrocínio):", participaçãoMineraçãoConsultado);

    // Tentar várias propriedades: 'patrocínio' (singular) ou 'patrocínios' (array)
    const patrocinioSingular = participaçãoMineraçãoConsultado?.patrocínio;
    const patrocinioPlural = participaçãoMineraçãoConsultado?.patrocínios;
    const patrocinio = patrocinioSingular || (Array.isArray(patrocinioPlural) && patrocinioPlural.length > 0 ? patrocinioPlural[0] : null);

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
    if (PatrocínioSelecionada?.título) {
      return (
        <InputText
          name="título_patrocínio"
          className={estilizarInputText(erros.título_patrocínio, 400, usuárioLogado.cor_tema)}
          value={PatrocínioSelecionada?.título}
          disabled
        />
      );
    } else if (participaçãoMineraçãoConsultado?.patrocínio?.título) {
      return (
        <InputText
          name="título_patrocínio"
          className={estilizarInputText(erros.título_patrocínio, 400, usuárioLogado.cor_tema)}
          value={participaçãoMineraçãoConsultado?.patrocínio?.título}
          disabled
        />
      );
    } else return null;
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
    } else return null;
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
            autoResize
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
            className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)}
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
