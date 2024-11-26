"use strict";
function resetunitSelection() {
  // Seleciona os elementos necessários
  const label = document.querySelector("#und_imp_label");
  const selectedSpan = label.querySelector("#img_und_imp .selected");
  const optionsContainer = document.getElementById("und_imp_options");

  // Define um valor padrão no atributo data-value do label
  if (label) {
    label.dataset.value = ""; // Resetar para vazio
  }

  // Define o texto do span como vazio ou estado inicial
  if (selectedSpan) {
    selectedSpan.textContent = ""; // Estado inicial ou nulo
  }

  // Remove todas as classes 'selected' das opções e limpa opções
  if (optionsContainer) {
    const options = optionsContainer.querySelectorAll(".option");
    options.forEach((option) => {
      option.classList.remove("selected");
    });

    // Limpa as opções existentes
    optionsContainer.innerHTML = ""; // Limpar opções
    generateUndMedidaImperial(); // Recriar opções

    // Fecha o menu de opções, retornando ao estado original
    optionsContainer.style.display = "none";
  }
}

// -----------

// Gera o seletor de Und. Medida Imperial
const unitSelect = document.getElementById("und_imp_options");

function generateUndMedidaImperial() {
  const undImpOptions = document.getElementById("und_imp_options");
  undImpOptions.innerHTML = ""; // Limpar opções anteriores

  // Definindo as unidades de medida imperiais
  const unidades = [
    { value: "yard", text: "Jarda" },
    { value: "foot", text: "Pé" },
    { value: "inch", text: "Polegada" },
    { value: "mile", text: "Milha" },
  ];

  // Gerar as opções para o menu suspenso
  unidades.forEach((unidade) => {
    const li = document.createElement("li");
    li.className = "option";
    li.dataset.value = unidade.value;
    li.textContent = unidade.text;
    undImpOptions.appendChild(li);

    // Adiciona funcionalidade de seleção
    li.addEventListener("click", () => {
      document.querySelector(".selected").textContent = unidade.text; // Atualiza o texto
      document
        .getElementById("und_imp_label")
        .setAttribute("data-value", unidade.value); // Armazena o valor
      undImpOptions.style.display = "none"; // Fecha o menu
    });
  });
}

// Função para exibir/ocultar o menu de opções ao clicar
document.getElementById("img_und_imp").addEventListener("click", () => {
  const options = document.getElementById("und_imp_options");
  options.style.display = options.style.display === "block" ? "none" : "block";
});

// Gera as opções ao carregar a página
generateUndMedidaImperial();

// Atualiza a mensundImpm e o IMC ao alterar a idade
document.querySelector(".plus-icon").addEventListener("click", convert);

var result;
var result = false;

function convert() {
  const meterInput = document.getElementById("meterInput");
  const unitLabel = document.getElementById("und_imp_label");
  const resultElement = document.querySelector(".result");

  // Obtenha os valores dos inputs
  const meters = parseFloat(meterInput.value);
  const unit = unitLabel.getAttribute("data-value");

  console.log("Valor inserido em metros:", meters);
  console.log("Unidade selecionada:", unit);

  // Verificar se há um resultado já exibido
  if (result) {
    const confirmReset = confirm(
      "Já existe um resultado na tela. Deseja limpar os campos e realizar uma nova conversão?"
    );
    if (confirmReset) {
      limparCampos();
      return; // Sair da função para reiniciar os campos
    } else {
      return; // Não faz nada e sai da função
    }
  }

  // Validar os inputs
  if (isNaN(meters) || meters <= 0) {
    resultElement.textContent = "Erro: valor inválido para metros.";
    console.error("Valor de metros inválido:", meters);
    meterInput.focus();
    return;
  }

  if (!unit || unit === "0") {
    resultElement.textContent = "Erro: selecione uma unidade válida.";
    console.error("Unidade inválida ou não selecionada:", unit);
    unitLabel.focus();
    return;
  }

  let conversionFactor;
  let unitName;

  // Atribuição de fator de conversão e nome da unidade
  switch (unit) {
    case "yard":
      conversionFactor = 1.094;
      unitName = "Jardas";
      break;
    case "foot":
      conversionFactor = 3.281;
      unitName = "Pés";
      break;
    case "inch":
      conversionFactor = 39.37;
      unitName = "Polegadas";
      break;
    case "mile":
      conversionFactor = 0.000621;
      unitName = "Milhas";
      break;
    default:
      resultElement.textContent = "Erro: unidade de medida inválida.";
      console.error("Unidade inválida:", unit);
      return;
  }

  // Realizar a conversão
  const convertedValue = (meters * conversionFactor).toFixed(3);

  // Atualizar o resultado
  resultElement.textContent = `${meters} metros equivalem a ${convertedValue} ${unitName}.`;
  result = true; // Indicar que um resultado foi exibido
}

function limparCampos() {
  location.reload(); // Recarrega a página
}

// -----------
function meters_mask(input) {
  // Remove caracteres que não sejam números
  let valorLimpo = input.value.replace(/\D/g, "");

  // Aplica a máscara apenas se houver mais de dois dígitos
  if (valorLimpo.length > 2) {
    const parteInteira = valorLimpo.slice(0, -2); // Dígitos antes dos dois últimos
    const parteDecimal = valorLimpo.slice(-2); // Últimos dois dígitos
    input.value = `${parteInteira}.${parteDecimal}`;
  } else if (valorLimpo.length > 0) {
    // Para valores com até 2 dígitos, exibe apenas os números
    input.value = valorLimpo;
  } else {
    input.value = ""; // Permite que o campo fique vazio inicialmente
  }

  // Exibe o botão de limpar se o campo tiver valor
  toggleClearButton(input);
}


function validate_meters(input) {
  // Converte o valor atual para número e verifica o intervalo permitido
  const valorAtual = parseFloat(input.value);
  if (isNaN(valorAtual) || valorAtual < 1) {
    input.value = "1.00"; // Força o mínimo de 1 metro
  } else if (valorAtual > 100000) {
    input.value = "100000.00"; // Força o máximo de 100 mil metros
  }
}

// select

var util = {
    f: {
      addStyle: function (elem, prop, val, vendors) {
        var i, ii, property, value;
        if (!util.f.isElem(elem)) {
          elem = document.getElementById(elem);
        }
        if (!util.f.isArray(prop)) {
          prop = [prop];
          val = [val];
        }
        for (i = 0; i < prop.length; i += 1) {
          var thisProp = String(prop[i]),
            thisVal = String(val[i]);
          if (typeof vendors !== "undefined") {
            if (!util.f.isArray(vendors)) {
              vendors.toLowerCase() == "all"
                ? (vendors = ["webkit", "moz", "ms", "o"])
                : (vendors = [vendors]);
            }
            for (ii = 0; ii < vendors.length; ii += 1) {
              elem.style[vendors[i] + thisProp] = thisVal;
            }
          }
          thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
          elem.style[thisProp] = thisVal;
        }
      },
      cssLoaded: function (event) {
        var child = util.f.getTrg(event);
        child.setAttribute("media", "all");
      },
      events: {
        cancel: function (event) {
          util.f.events.prevent(event);
          util.f.events.stop(event);
        },
        prevent: function (event) {
          event = event || window.event;
          event.preventDefault();
        },
        stop: function (event) {
          event = event || window.event;
          event.stopPropagation();
        },
      },
      getPath: function (cb, args) {
        GLOBAL.path = window.location.href
          .split("masterdemolition")[1]
          .replace("inc.com/admin/", "")
          .replace("inc.com/admin", "")
          .replace("#!/", "")
          .replace("#!", "")
          .replace("#/", "")
          .replace("#", "");
        if (GLOBAL.path.indexOf("?") >= 0) {
          GLOBAL.path = GLOBAL.path.split("?")[0];
        }
        if (typeof cb !== "undefined") {
          typeof args !== "undefined" ? cb(args) : cb();
        } else {
          return GLOBAL.path;
        }
      },
      getSize: function (elem, prop) {
        return parseInt(elem.getBoundingClientRect()[prop], 10);
      },
      getTrg: function (event) {
        event = event || window.event;
        if (event.srcElement) {
          return event.srcElement;
        } else {
          return event.target;
        }
      },
      isElem: function (elem) {
        return util.f.isNode(elem) && elem.nodeType == 1;
      },
      isArray: function (v) {
        return v.constructor === Array;
      },
      isNode: function (elem) {
        return typeof Node === "object"
          ? elem instanceof Node
          : elem &&
              typeof elem === "object" &&
              typeof elem.nodeType === "number" &&
              typeof elem.nodeName === "string" &&
              elem.nodeType !== 3;
      },
      isObj: function (v) {
        return typeof v == "object";
      },
      replaceAt: function (str, index, char) {
        return str.substr(0, index) + char + str.substr(index + char.length);
      },
    },
  },
  form = {
    f: {
      init: {
        register: function () {
          console.clear(); // just cuz codepen
          var child,
            children = document.getElementsByClassName("field"),
            i;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            util.f.addStyle(child, "Opacity", 1);
          }
          children = document.getElementsByClassName("psuedo_select");
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            child.addEventListener("click", form.f.select.toggle);
          }
        },
        unregister: function () {
          //just here as a formallity
          //call this to stop all ongoing timeouts are ready the pundImp for some sort of json re-route
        },
      },
      select: {
        blur: function (field) {
          field.classList.remove("focused");
          var child,
            children = field.childNodes,
            i,
            ii,
            nested_child,
            nested_children;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (util.f.isElem(child)) {
              if (child.classList.contains("deselect")) {
                child.parentNode.removeChild(child);
              } else if (child.tagName == "SPAN") {
                if (!field.dataset.value) {
                  util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"]);
                }
              } else if (child.classList.contains("psuedo_select")) {
                nested_children = child.childNodes;
                for (ii = 0; ii < nested_children.length; ii += 1) {
                  nested_child = nested_children[ii];
                  if (util.f.isElem(nested_child)) {
                    if (nested_child.tagName == "SPAN") {
                      if (!field.dataset.value) {
                        util.f.addStyle(
                          nested_child,
                          ["Opacity", "Transform"],
                          [0, "translateY(24px)"]
                        );
                      }
                    } else if (nested_child.tagName == "UL") {
                      util.f.addStyle(
                        nested_child,
                        ["Height", "Opacity"],
                        [0, 0]
                      );
                    }
                  }
                }
              }
            }
          }
        },
        focus: function (field) {
          field.classList.add("focused");
          var bool = false,
            child,
            children = field.childNodes,
            i,
            ii,
            iii,
            nested_child,
            nested_children,
            nested_nested_child,
            nested_nested_children,
            size = 0;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            util.f.isElem(child) && child.classList.contains("deselect")
              ? (bool = true)
              : null;
          }
          if (!bool) {
            child = document.createElement("div");
            child.className = "deselect";
            child.addEventListener("click", form.f.select.toggle);
            field.insertBefore(child, children[0]);
          }
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (
              util.f.isElem(child) &&
              child.classList.contains("psuedo_select")
            ) {
              nested_children = child.childNodes;
              for (ii = 0; ii < nested_children.length; ii += 1) {
                nested_child = nested_children[ii];
                if (
                  util.f.isElem(nested_child) &&
                  nested_child.tagName == "UL"
                ) {
                  size = 0;
                  nested_nested_children = nested_child.childNodes;
                  for (iii = 0; iii < nested_nested_children.length; iii += 1) {
                    nested_nested_child = nested_nested_children[iii];
                    if (
                      util.f.isElem(nested_nested_child) &&
                      nested_nested_child.tagName == "LI"
                    ) {
                      size += util.f.getSize(nested_nested_child, "height");
                      console.log("size: " + size);
                    }
                  }
                  util.f.addStyle(
                    nested_child,
                    ["Height", "Opacity"],
                    [size + "px", 1]
                  );
                }
              }
            }
          }
        },
        selection: function (child, parent) {
          var children = parent.childNodes,
            i,
            ii,
            nested_child,
            nested_children,
            time = 0,
            value;
          if (util.f.isElem(child) && util.f.isElem(parent)) {
            parent.dataset.value = child.dataset.value;
            value = child.innerHTML;
          }
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (util.f.isElem(child)) {
              if (child.classList.contains("psuedo_select")) {
                nested_children = child.childNodes;
                for (ii = 0; ii < nested_children.length; ii += 1) {
                  nested_child = nested_children[ii];
                  if (
                    util.f.isElem(nested_child) &&
                    nested_child.classList.contains("selected")
                  ) {
                    if (nested_child.innerHTML) {
                      time = 1e2;
                      util.f.addStyle(
                        nested_child,
                        ["Opacity", "Transform"],
                        [0, "translateY(24px)"],
                        "all"
                      );
                    }
                    setTimeout(
                      function (c, v) {
                        c.innerHTML = v;
                        util.f.addStyle(
                          c,
                          ["Opacity", "Transform", "TransitionDuration"],
                          [1, "translateY(0px)", ".1s"],
                          "all"
                        );
                      },
                      time,
                      nested_child,
                      value
                    );
                  }
                }
              } else if (child.tagName == "SPAN") {
                util.f.addStyle(child, ["FontSize", "Top"], ["12px", "8px"]);
              }
            }
          }
        },
        toggle: function (event) {
          util.f.events.stop(event);
          var child = util.f.getTrg(event),
            children,
            i,
            parent;
          switch (true) {
            case child.classList.contains("psuedo_select"):
            case child.classList.contains("deselect"):
              parent = child.parentNode;
              break;
            case child.classList.contains("options"):
              parent = child.parentNode.parentNode;
              break;
            case child.classList.contains("option"):
              parent = child.parentNode.parentNode.parentNode;
              form.f.select.selection(child, parent);
              break;
          }
          parent.classList.contains("focused")
            ? form.f.select.blur(parent)
            : form.f.select.focus(parent);
        },
      },
    },
  };

window.onload = form.f.init.register;

function toggleClearButton(input) {
  const clearButton = input.nextElementSibling.nextElementSibling; // Encontra o botão ao lado do input
  if (input.value) {
    clearButton.style.display = "block"; // Exibe o botão se o campo não estiver vazio
  } else {
    clearButton.style.display = "none"; // Esconde o botão se o campo estiver vazio
  }
}

// Função para limpar o campo
function clearInput() {
  const meterInput = document.getElementById("meterInput");
  const resultElement = document.getElementById("result");

  meterInput.value = ""; // Limpa o campo
  meterInput.focus(); // Foca no campo novamente
  resultElement.textContent = "";

  limparCampos();
  
  toggleClearButton(meterInput); // Esconde o botão de limpar
}
