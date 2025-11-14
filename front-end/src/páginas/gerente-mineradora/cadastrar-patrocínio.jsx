import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";

import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerente from "../../contextos/contexto-gerente-mineradora"; // ou o contexto correto

import {
  serviçoCadastrarPatrocínio,
  serviçoAlterarPatrocínio,
  serviçoRemoverPatrocínio,
  serviçoBuscarÁreasAtuaçãoPatrocínio
} from "../../serviços/serviços-gerente-mineradora";

import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios } from "../../utilitários/validações";

import {
  estilizarBotão,
  estilizarBotãoRemover,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputTextarea,
  estilizarLabel
} from "../../utilitários/estilos";

export default function CadastrarPatrocínio() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { patrocínioConsultada } = useContext(ContextoGerente);

  const [dados, setDados] = useState({
    necessidade_bolsa: patrocínioConsultada?.necessidade_bolsa || false, // <-- Mude para 'false'
    justificativa: patrocínioConsultada?.justificativa || "",
    categoria_participacao: patrocínioConsultada?.categoria_participacao || null
    });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
  const chave = event.target.name;
      // Se for um checkbox, pega 'checked'. Se não, pega 'value'.
  const valor = event.target.type === 'checkbox' ? event.target.checked : event.target.value; 
  setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    const { necessidade_bolsa, justificativa, categoria_participacao } = dados;
    const errosCampos = validarCamposObrigatórios({ necessidade_bolsa, justificativa, categoria_participacao });
    setErros(errosCampos);
    return checarListaVazia(errosCampos);
  }
  function mostrarParticipaçõesMineração() { navegar("../pesquisar-participacao-mineracao"); };
  
  function retornarAdministrarPatrocínios() {
    navegar("../administrar-patrocinios");
  }

  async function cadastrar() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarPatrocínio({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Patrocínio cadastrado com sucesso!", "sucesso");
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
  }

  async function alterar() {
    if (validarCampos()) {
      try {
        await serviçoAlterarPatrocínio({ ...dados, id: patrocínioConsultada.id });
        mostrarToast(referênciaToast, "Patrocínio alterado com sucesso!", "sucesso");
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
  }

  async function remover() {
    try {
      await serviçoRemoverPatrocínio(patrocínioConsultada.id);
      mostrarToast(referênciaToast, "Patrocínio removido com sucesso!", "sucesso");
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "error");
    }
  }

  function BotõesAções() {
    if (patrocínioConsultada) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornarAdministrarPatrocínios} />
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={remover} />
          <Button className={estilizarBotão()} label="Alterar" onClick={alterar} />
          <Button className={estilizarBotão()} label="Participações Mineração" onClick={mostrarParticipaçõesMineração}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornarAdministrarPatrocínios} />
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrar} />
        </div>
      );
    }
  }

  function títuloFormulário() {
    return patrocínioConsultada ? "Alterar Patrocínio" : "Cadastrar Patrocínio";
  }

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarPatrocínios} position="bottom-center" />
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        {/* Categoria / Tipo de participação */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Categoria (Tipo):</label>
          <Dropdown
            value={dados.categoria_participacao}
            options={[
              { label: "Mineração Lunar", value: "MineraçãoLunar" },
              { label: "Extração de Rochas", value: "ExtraçãoDeRochas" },
              { label: "Extração de Hélio-3", value: "ExtraçãoDeHelio3" }
            ]}
            onChange={(e) => setDados({ ...dados, categoria_participacao: e.value })}
            placeholder="Selecione a categoria"
          />
          <MostrarMensagemErro mensagem={erros.categoria_participacao} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Necessidade de Bolsa*:</label>
          <Checkbox
            name="necessidade_bolsa"
            checked={dados.necessidade_bolsa} // Use 'checked' em vez de 'value'
            onChange={alterarEstado}
            />
          <MostrarMensagemErro mensagem={erros.necessidade_bolsa} />
        </div>

        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Justificativa*:</label>
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

        <BotõesAções />
      </Card>
    </div>
  );
}
